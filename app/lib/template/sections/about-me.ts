import type { ProcessedGitHubData } from "../../types/github";
import { analyzeUserActivity } from "../helpers";

/**
 * About Me 섹션 생성
 */
export function generateAboutMeSection(githubData: ProcessedGitHubData): string {
  const { userProfile } = githubData;
  const {
    primaryLanguage,
    secondaryLanguage,
    isActiveRecently,
    hasHighStarProject,
    totalStars,
    isPolyglot,
  } = analyzeUserActivity(githubData);
  
  // 동적 문구 생성
  const aboutItems = [];
  
  // 현재 활동 상태
  if (isActiveRecently) {
    aboutItems.push(
      `🔭 현재 **${primaryLanguage}** 기반 프로젝트를 활발히 개발하고 있습니다`
    );
  } else {
    aboutItems.push(
      `🔭 **${primaryLanguage}** 중심의 솔루션 개발에 집중하고 있습니다`
    );
  }
  
  // 기술 학습 패턴
  if (isPolyglot) {
    const languages = secondaryLanguage
      ? `${primaryLanguage}, ${secondaryLanguage}`
      : primaryLanguage;
    aboutItems.push(
      `🌱 **${languages}** 등 다양한 기술 스택을 학습하며 성장하고 있습니다`
    );
  } else {
    aboutItems.push(
      `🌱 **${primaryLanguage}** 생태계를 깊이 있게 탐구하고 있습니다`
    );
  }
  
  // 커뮤니티 기여도
  if (hasHighStarProject) {
    aboutItems.push(
      `⭐ **오픈소스 기여**를 통해 개발자 커뮤니티와 소통하고 있습니다`
    );
  } else if (totalStars >= 10) {
    aboutItems.push(
      `💡 **창의적인 프로젝트**를 통해 문제 해결에 기여하고 있습니다`
    );
  } else {
    aboutItems.push(`💬 **협업**과 **문제 해결**에 관심이 많습니다`);
  }
  
  // 연락처 (항상 포함)
  aboutItems.push(`📫 연락처: [GitHub](${userProfile.html_url})`);
  
  return `## 🧑‍💻 About Me

${aboutItems.map((item) => `- ${item}`).join("\n")}`;
}