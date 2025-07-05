import type {
  GitHubRepository,
  GitHubLanguageStats,
  GitHubUserProfile,
  LanguageExpertise,
  CodeQualityMetrics,
  TechnicalDepth,
  CommitActivity,
  ContributionStats,
  CodeQualityDetails,
} from "../types/github";

// 언어 전문성 분석 함수
export function analyzeLanguageExpertise(
  repositories: GitHubRepository[],
  languageStats: GitHubLanguageStats
): LanguageExpertise {
  const expertise: LanguageExpertise = {};
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  Object.entries(languageStats).forEach(([language, bytes]) => {
    const reposWithLanguage = repositories.filter(repo => repo.language === language);
    const totalStars = reposWithLanguage.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const avgStars = reposWithLanguage.length > 0 ? totalStars / reposWithLanguage.length : 0;
    const hasRecentActivity = reposWithLanguage.some(repo => 
      new Date(repo.updated_at) > sixMonthsAgo
    );

    // 전문성 수준 계산 (바이트 수와 저장소 수 기반)
    const proficiencyLevel = calculateProficiencyLevel(bytes, reposWithLanguage.length, avgStars);

    expertise[language] = {
      proficiencyLevel,
      repositoryCount: reposWithLanguage.length,
      totalBytes: bytes,
      averageStars: Math.round(avgStars * 10) / 10,
      recentActivity: hasRecentActivity,
    };
  });

  return expertise;
}

// 전문성 수준 계산
function calculateProficiencyLevel(
  bytes: number, 
  repoCount: number, 
  avgStars: number
): 'Expert' | 'Advanced' | 'Intermediate' | 'Beginner' {
  const score = (bytes / 10000) + (repoCount * 10) + (avgStars * 5);
  
  if (score >= 100) return 'Expert';
  if (score >= 50) return 'Advanced';
  if (score >= 20) return 'Intermediate';
  return 'Beginner';
}

// 코드 품질 지표 분석
export function analyzeCodeQuality(repositories: GitHubRepository[]): CodeQualityMetrics {
  const totalRepos = repositories.length;
  if (totalRepos === 0) {
    return {
      documentationScore: 0,
      projectMaturity: 0,
      codeOrganization: 0,
      communityEngagement: 0,
    };
  }

  // 문서화 점수 (description과 topics 기반)
  const reposWithDescription = repositories.filter(repo => 
    repo.description && repo.description.length > 20
  ).length;
  const documentationScore = Math.round((reposWithDescription / totalRepos) * 100);

  // 프로젝트 성숙도 (스타 수와 업데이트 빈도 기반)
  const avgStars = repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0) / totalRepos;
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const recentlyUpdated = repositories.filter(repo => 
    new Date(repo.updated_at) > oneYearAgo
  ).length;
  const projectMaturity = Math.round(((avgStars * 10) + (recentlyUpdated / totalRepos * 50)) / 6);

  // 코드 조직화 (topics 사용률 기반)
  const reposWithTopics = repositories.filter(repo => 
    repo.topics && repo.topics.length > 0
  ).length;
  const codeOrganization = Math.round((reposWithTopics / totalRepos) * 100);

  // 커뮤니티 참여도 (총 스타 수 기반)
  const totalStars = repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const communityEngagement = Math.min(100, Math.round(totalStars / 5));

  return {
    documentationScore: Math.min(100, documentationScore),
    projectMaturity: Math.min(100, projectMaturity),
    codeOrganization: Math.min(100, codeOrganization),
    communityEngagement: Math.min(100, communityEngagement),
  };
}

// 기술적 깊이 분석
export function analyzeTechnicalDepth(
  repositories: GitHubRepository[],
  topLanguages: string[],
  userProfile: GitHubUserProfile
): TechnicalDepth {
  // 주요 전문 분야 (가장 많이 사용된 언어)
  const primaryExpertise = topLanguages[0] || 'General';

  // 보조 기술들 (2-4번째 언어들)
  const secondarySkills = topLanguages.slice(1, 4);

  // 최신 기술 채택 여부
  const modernLanguages = ['TypeScript', 'Rust', 'Go', 'Swift', 'Kotlin', 'Dart'];
  const modernTechAdoption = topLanguages.some(lang => modernLanguages.includes(lang));

  // 프로젝트 복잡도 계산
  const avgStars = repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0) / repositories.length;
  const totalRepos = userProfile.public_repos;
  
  let projectComplexity: 'High' | 'Medium' | 'Low';
  if (avgStars >= 10 && totalRepos >= 15) {
    projectComplexity = 'High';
  } else if (avgStars >= 3 && totalRepos >= 5) {
    projectComplexity = 'Medium';
  } else {
    projectComplexity = 'Low';
  }

  return {
    primaryExpertise,
    secondarySkills,
    modernTechAdoption,
    projectComplexity,
  };
}

// 향상된 코드 품질 분석 (세부사항 포함)
export function analyzeCodeQualityWithDetails(
  repositories: GitHubRepository[],
  qualityDetails: CodeQualityDetails
): CodeQualityMetrics {
  const totalRepos = repositories.length;
  if (totalRepos === 0) {
    return {
      documentationScore: 0,
      projectMaturity: 0,
      codeOrganization: 0,
      communityEngagement: 0,
    };
  }

  // 문서화 점수 (README + 실제 파일 확인)
  const documentationScore = Math.round(
    ((qualityDetails.hasReadme / totalRepos) * 50 + 
     (qualityDetails.hasDocs / totalRepos) * 50)
  );

  // 프로젝트 성숙도 (CI/CD, 라이선스, 테스트 포함)
  const projectMaturity = Math.round(
    ((qualityDetails.hasLicense / totalRepos) * 30 +
     (qualityDetails.hasTests / totalRepos) * 40 +
     (qualityDetails.hasCI / totalRepos) * 30)
  );

  // 기존 로직 유지
  const avgStars = repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0) / totalRepos;
  const codeOrganization = Math.min(100, Math.round(avgStars * 10));
  const totalStars = repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const communityEngagement = Math.min(100, Math.round(totalStars / 5));

  return {
    documentationScore: Math.min(100, documentationScore),
    projectMaturity: Math.min(100, projectMaturity),
    codeOrganization: Math.min(100, codeOrganization),
    communityEngagement: Math.min(100, communityEngagement),
  };
}

// 향상된 기술적 깊이 분석 (활동 데이터 포함)
export function analyzeTechnicalDepthWithActivity(
  repositories: GitHubRepository[],
  topLanguages: string[],
  userProfile: GitHubUserProfile,
  commitActivity: CommitActivity,
  contributionStats: ContributionStats
): TechnicalDepth {
  const primaryExpertise = topLanguages[0] || 'General';
  const secondarySkills = topLanguages.slice(1, 4);

  const modernLanguages = ['TypeScript', 'Rust', 'Go', 'Swift', 'Kotlin', 'Dart'];
  const modernTechAdoption = topLanguages.some(lang => modernLanguages.includes(lang));

  // 활동 데이터를 반영한 프로젝트 복잡도 계산
  const avgStars = repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0) / repositories.length;
  const totalRepos = userProfile.public_repos;
  const commitConsistency = commitActivity.consistencyScore;
  const prActivity = contributionStats.avgPRsPerMonth;
  
  let projectComplexity: 'High' | 'Medium' | 'Low';
  const complexityScore = (avgStars * 0.3) + (totalRepos * 0.2) + (commitConsistency * 0.3) + (prActivity * 0.2);
  
  if (complexityScore >= 20) {
    projectComplexity = 'High';
  } else if (complexityScore >= 8) {
    projectComplexity = 'Medium';
  } else {
    projectComplexity = 'Low';
  }

  return {
    primaryExpertise,
    secondarySkills,
    modernTechAdoption,
    projectComplexity,
  };
}

// 일관성 점수 계산
export function calculateConsistencyScore(weeklyPattern: number[]): number {
  const total = weeklyPattern.reduce((sum, commits) => sum + commits, 0);
  if (total === 0) return 0;
  
  const average = total / 7;
  const variance = weeklyPattern.reduce((sum, commits) => sum + Math.pow(commits - average, 2), 0) / 7;
  const standardDeviation = Math.sqrt(variance);
  
  // 낮은 표준편차 = 높은 일관성
  return Math.max(0, Math.min(100, 100 - (standardDeviation / average) * 20));
}