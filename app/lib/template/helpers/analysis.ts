import type { ProcessedGitHubData } from "../../types/github";

/**
 * 사용자 활동 패턴 분석
 */
export function analyzeUserActivity(githubData: ProcessedGitHubData) {
  const { topLanguages, topRepositories, languageStats } = githubData;
  
  // 주력 언어 결정
  const primaryLanguage = topLanguages[0] || "개발";
  const secondaryLanguage = topLanguages[1];
  
  // 활동 패턴 분석
  const recentlyActiveRepos = topRepositories.filter((repo) => {
    const lastUpdate = new Date(repo.updated_at);
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    return lastUpdate > sixMonthsAgo;
  });
  
  const isActiveRecently = recentlyActiveRepos.length >= 2;
  
  // 프로젝트 규모 분석
  const hasHighStarProject = topRepositories.some(
    (repo) => repo.stargazers_count >= 50
  );
  const totalStars = topRepositories.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0
  );
  
  // 다양성 분석
  const languageCount = Object.keys(languageStats).length;
  const isPolyglot = languageCount >= 4;
  
  return {
    primaryLanguage,
    secondaryLanguage,
    isActiveRecently,
    hasHighStarProject,
    totalStars,
    isPolyglot,
    languageCount,
    recentlyActiveRepos,
  };
}

/**
 * 임팩트 지표 계산
 */
export function calculateImpactMetrics(githubData: ProcessedGitHubData) {
  const { userProfile, topRepositories, languageStats } = githubData;
  
  const totalStars = topRepositories.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0
  );
  const totalRepos = userProfile.public_repos;
  const languageCount = Object.keys(languageStats).length;
  const mostUsedLanguage =
    Object.entries(languageStats).sort(([, a], [, b]) => b - a)[0]?.[0] ||
    "Unknown";
  
  return {
    totalStars,
    totalRepos,
    languageCount,
    mostUsedLanguage,
  };
}

/**
 * 성취도 분석
 */
export function analyzeAchievements(githubData: ProcessedGitHubData) {
  const { userProfile, topRepositories, mostStarredRepository } = githubData;
  
  const achievements = [];
  
  if (mostStarredRepository && mostStarredRepository.stargazers_count >= 100) {
    achievements.push("🏆 **100+ 스타 프로젝트** 보유");
  }
  
  if (userProfile.public_repos >= 20) {
    achievements.push("📚 **20+ 프로젝트** 공개 기여");
  }
  
  if (topRepositories.some((repo) => repo.language === "TypeScript")) {
    achievements.push("⚡ **TypeScript** 전문성");
  }
  
  const recentProjects = topRepositories.filter(
    (repo) =>
      new Date(repo.updated_at).getFullYear() === new Date().getFullYear()
  ).length;
  
  if (recentProjects >= 3) {
    achievements.push(
      `🚀 **${new Date().getFullYear()}년 ${recentProjects}개 프로젝트** 활발한 활동`
    );
  }
  
  if (achievements.length === 0) {
    achievements.push("🌱 **성장하는 개발자** - 꾸준한 기여 지속");
  }
  
  return achievements;
}