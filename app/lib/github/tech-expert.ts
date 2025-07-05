import type {
  GitHubRepository,
  TechExpertData,
  CommitActivity,
  ContributionStats,
  IssueContributions,
  ReviewActivity,
  CodeQualityDetails,
  GitHubContributor,
  GitHubSearchResponse,
  GitHubIssueOrPR,
  GitHubFileContent,
} from "../types/github";

import { fetchFromGitHubApi } from "./core";
import { fetchCompleteGitHubData } from "./core";
import {
  analyzeLanguageExpertise,
  analyzeCodeQualityWithDetails,
  analyzeTechnicalDepthWithActivity,
  calculateConsistencyScore,
} from "./analysis";

// 기술 전문가형을 위한 확장 데이터 수집
export async function fetchTechExpertData(
  username: string,
  token?: string
): Promise<TechExpertData> {
  try {
    // 기본 데이터 가져오기
    const baseData = await fetchCompleteGitHubData(username, token);
    
    // 기술 전문가형 추가 데이터 수집 (병렬 처리)
    const [
      commitActivity,
      codeQualityDetails,
      contributionStats,
      issueContributions,
      reviewActivity
    ] = await Promise.all([
      fetchCommitActivity(baseData.topRepositories, token),
      fetchCodeQualityDetails(baseData.topRepositories, token),
      fetchContributionStats(username, token),
      fetchIssueContributions(username, token),
      fetchReviewActivity(username, token)
    ]);
    
    // 기존 분석에 추가 데이터 반영
    const languageExpertise = analyzeLanguageExpertise(
      baseData.topRepositories,
      baseData.languageStats
    );
    
    const codeQualityMetrics = analyzeCodeQualityWithDetails(
      baseData.topRepositories,
      codeQualityDetails
    );
    
    const technicalDepth = analyzeTechnicalDepthWithActivity(
      baseData.topRepositories,
      baseData.topLanguages,
      baseData.userProfile,
      commitActivity,
      contributionStats
    );

    return {
      ...baseData,
      languageExpertise,
      codeQualityMetrics,
      technicalDepth,
      // 추가 기술 전문가 데이터
      commitActivity,
      contributionStats,
      issueContributions,
      reviewActivity,
    };
  } catch (error) {
    throw new Error(
      `기술 전문가 데이터 수집 중 오류가 발생했습니다: ${
        error instanceof Error ? error.message : "알 수 없는 오류"
      }`
    );
  }
}

// 커밋 활동 패턴 분석
async function fetchCommitActivity(
  repositories: GitHubRepository[],
  token?: string
): Promise<CommitActivity> {
  try {
    // 상위 3개 저장소의 커밋 통계 수집
    const commitPromises = repositories.slice(0, 3).map(async (repo) => {
      try {
        const stats = await fetchFromGitHubApi<GitHubContributor[]>(
          `/repos/${repo.full_name}/stats/contributors`,
          token
        );
        return { repo: repo.name, stats };
      } catch (error) {
        return { repo: repo.name, stats: null };
      }
    });

    const commitData = await Promise.all(commitPromises);
    
    // 전체 커밋 수와 패턴 분석
    let totalCommits = 0;
    let weeklyPattern = [0, 0, 0, 0, 0, 0, 0]; // 월-일
    
    commitData.forEach(({ stats }) => {
      if (stats && Array.isArray(stats)) {
        stats.forEach(contributor => {
          totalCommits += contributor.total || 0;
          // 주간 패턴 누적 (최근 데이터만)
          if (contributor.weeks && contributor.weeks.length > 0) {
            const recentWeeks = contributor.weeks.slice(-4); // 최근 4주
            recentWeeks.forEach((week) => {
              if (week.days) {
                week.days.forEach((commits, dayIndex) => {
                  weeklyPattern[dayIndex] += commits;
                });
              }
            });
          }
        });
      }
    });

    return {
      totalCommits,
      weeklyPattern,
      consistencyScore: calculateConsistencyScore(weeklyPattern),
    };
  } catch (error) {
    return {
      totalCommits: 0,
      weeklyPattern: [0, 0, 0, 0, 0, 0, 0],
      consistencyScore: 0,
    };
  }
}

// 코드 품질 세부사항 분석
async function fetchCodeQualityDetails(
  repositories: GitHubRepository[],
  token?: string
): Promise<CodeQualityDetails> {
  const qualityDetails = {
    hasReadme: 0,
    hasTests: 0,
    hasDocs: 0,
    hasLicense: 0,
    hasCI: 0,
  };

  // 상위 5개 저장소의 파일 구조 분석
  const analysisPromises = repositories.map(async (repo) => {
    try {
      const contents = await fetchFromGitHubApi<GitHubFileContent[]>(
        `/repos/${repo.full_name}/contents`,
        token
      );

      const analysis = {
        hasReadme: false,
        hasTests: false,
        hasDocs: false,
        hasLicense: false,
        hasCI: false,
      };

      contents.forEach(item => {
        const name = item.name.toLowerCase();
        
        if (name.includes('readme')) analysis.hasReadme = true;
        if (name.includes('test') || name.includes('spec') || name === '__tests__') analysis.hasTests = true;
        if (name.includes('doc') || name === 'docs') analysis.hasDocs = true;
        if (name.includes('license')) analysis.hasLicense = true;
        if (name === '.github' || name.includes('ci') || name.includes('workflow')) analysis.hasCI = true;
      });

      return analysis;
    } catch (error) {
      return {
        hasReadme: false,
        hasTests: false,
        hasDocs: false,
        hasLicense: false,
        hasCI: false,
      };
    }
  });

  const results = await Promise.all(analysisPromises);
  
  results.forEach(result => {
    if (result.hasReadme) qualityDetails.hasReadme++;
    if (result.hasTests) qualityDetails.hasTests++;
    if (result.hasDocs) qualityDetails.hasDocs++;
    if (result.hasLicense) qualityDetails.hasLicense++;
    if (result.hasCI) qualityDetails.hasCI++;
  });

  return qualityDetails;
}

// 기여 통계 수집
async function fetchContributionStats(username: string, token?: string): Promise<ContributionStats> {
  try {
    // PR 기여 검색
    const prSearch = await fetchFromGitHubApi<GitHubSearchResponse<GitHubIssueOrPR>>(
      `/search/issues?q=author:${username}+type:pr&sort=created&order=desc&per_page=100`,
      token
    );

    const totalPRs = prSearch.total_count || 0;
    const recentPRs = prSearch.items ? prSearch.items.filter((pr) => {
      const createdDate = new Date(pr.created_at);
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      return createdDate > sixMonthsAgo;
    }).length : 0;

    return {
      totalPRs,
      recentPRs,
      avgPRsPerMonth: recentPRs / 6,
    };
  } catch (error) {
    return {
      totalPRs: 0,
      recentPRs: 0,
      avgPRsPerMonth: 0,
    };
  }
}

// 이슈 기여도 분석
async function fetchIssueContributions(username: string, token?: string): Promise<IssueContributions> {
  try {
    const issueSearch = await fetchFromGitHubApi<GitHubSearchResponse<GitHubIssueOrPR>>(
      `/search/issues?q=author:${username}+type:issue&sort=created&order=desc&per_page=100`,
      token
    );

    const totalIssues = issueSearch.total_count || 0;
    const closedIssues = issueSearch.items ? issueSearch.items.filter((issue) => 
      issue.state === 'closed'
    ).length : 0;

    return {
      totalIssues,
      closedIssues,
      resolutionRate: totalIssues > 0 ? Math.round((closedIssues / totalIssues) * 100) : 0,
    };
  } catch (error) {
    return {
      totalIssues: 0,
      closedIssues: 0,
      resolutionRate: 0,
    };
  }
}

// 코드 리뷰 활동 분석
async function fetchReviewActivity(username: string, token?: string): Promise<ReviewActivity> {
  try {
    const reviewSearch = await fetchFromGitHubApi<GitHubSearchResponse<GitHubIssueOrPR>>(
      `/search/issues?q=reviewed-by:${username}+type:pr&sort=created&order=desc&per_page=50`,
      token
    );

    return {
      totalReviews: reviewSearch.total_count || 0,
      recentReviews: reviewSearch.items ? reviewSearch.items.length : 0,
    };
  } catch (error) {
    return {
      totalReviews: 0,
      recentReviews: 0,
    };
  }
}