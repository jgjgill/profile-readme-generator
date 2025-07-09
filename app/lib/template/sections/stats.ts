import type { ProcessedGitHubData } from "../../types/github";
import { generateTechStackBadges, generateGitHubStatsCards } from "../helpers";

/**
 * 통계 섹션 생성
 */
export function generateStatsSection(userData: ProcessedGitHubData): string {
  const { userProfile, topLanguages, mostStarredRepository } = userData;

  const statsCards = generateGitHubStatsCards(userProfile.login);

  const highlightSection = mostStarredRepository
    ? `
## 🌟 하이라이트 프로젝트

**[${mostStarredRepository.name}](${mostStarredRepository.html_url})**  
⭐ ${mostStarredRepository.stargazers_count} stars | 💻 ${
        mostStarredRepository.language || "Mixed"
      }

${
  mostStarredRepository.description ||
  "이 프로젝트는 특별한 주목을 받고 있습니다."
}
`
    : "";

  return `## 📊 GitHub 통계

${statsCards}

## 💻 주요 기술 스택
${generateTechStackBadges(topLanguages)}
${highlightSection}`;
}

/**
 * 성취도 섹션 생성
 */
export function generateAchievementSection(githubData: ProcessedGitHubData): string {
  const { userProfile } = githubData;
  const achievements = [];

  // 성취도 분석 로직은 helpers/analysis.ts로 이동 예정
  if (achievements.length === 0) {
    achievements.push("🌱 **성장하는 개발자** - 꾸준한 기여 지속");
  }

  return `## 🏅 주요 성취

${achievements.map((achievement) => `- ${achievement}`).join("\n")}

## 📈 GitHub 활동 통계

${generateGitHubStatsCards(userProfile.login)}`;
}