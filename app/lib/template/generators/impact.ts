import type { ProcessedGitHubData } from "../../types/github";
import type { ReadmeTemplate } from "../../types/template";
import { calculateImpactMetrics, analyzeAchievements } from "../helpers";
import { generateImpactHeaderSection, generateImpactProjectsSection } from "../sections";

/**
 * 임팩트 중심 템플릿 생성
 */
export function generateImpactTemplate(
  githubData: ProcessedGitHubData
): ReadmeTemplate {
  const { userProfile, topRepositories } = githubData;
  const { totalStars, totalRepos, languageCount, mostUsedLanguage } = calculateImpactMetrics(githubData);

  const displayName = userProfile.name || userProfile.login;
  const bioSection = userProfile.bio ? `\n> ${userProfile.bio}\n` : "";

  const headerSection = `# 🚀 ${displayName} - 임팩트 드리븐 개발자

${bioSection}## 📊 핵심 성과 지표

| 지표 | 수치 | 의미 |
|------|------|------|
| ⭐ **누적 스타** | **${totalStars}개** | 커뮤니티 인정도 |
| 📦 **공개 프로젝트** | **${totalRepos}개** | 지속적 기여 |
| 💻 **기술 스택** | **${languageCount}개 언어** | 기술 다양성 |
| 🎯 **주력 기술** | **${mostUsedLanguage}** | 전문성 영역 |

[![GitHub Profile](https://img.shields.io/badge/GitHub-Profile-000000?style=for-the-badge&logo=github)](${userProfile.html_url})

---`;

  const impactSection = `## 💥 임팩트가 증명된 프로젝트

${generateImpactProjectsSection(topRepositories)}`;

  const achievementSection = generateAchievementSectionInternal(githubData);

  const fullContent = `${headerSection}

${impactSection}

${achievementSection}

## 🤝 함께 성장하기

저는 **"코드로 실제 문제를 해결하는 것"**에 가치를 둡니다.  
다음 프로젝트에서 함께 의미있는 임팩트를 만들어보세요!

📫 **연락하기**: [GitHub](${userProfile.html_url}) | \`이메일을 입력하세요\``;

  // 메트릭스 섹션 추출
  const metricsMatch = headerSection.match(
    /## 📊 핵심 성과 지표([\s\S]*?)(?=---|$)/
  );
  const metricsSection = metricsMatch
    ? `## 📊 핵심 성과 지표${metricsMatch[1]}`
    : "";

  // 성취 섹션 분리
  const achievementsMatch = achievementSection.match(
    /(## 🏅 주요 성취[\s\S]*?)(?=## 📈 GitHub 활동 통계|$)/
  );
  const achievementsOnly = achievementsMatch ? achievementsMatch[1] : "";

  const githubStatsMatch = achievementSection.match(
    /(## 📈 GitHub 활동 통계[\s\S]*)/
  );
  const githubStatsOnly = githubStatsMatch ? githubStatsMatch[1] : "";

  // 연락처 섹션 추출
  const contactMatch = fullContent.match(/(## 🤝 함께 성장하기[\s\S]*)$/);
  const contactSection = contactMatch ? contactMatch[1] : "";

  return {
    content: fullContent,
    sections: {
      header: headerSection,
      metrics: metricsSection,
      impactProjects: impactSection,
      achievements: achievementsOnly,
      githubStats: githubStatsOnly,
      contact: contactSection,
    },
  };
}

function generateAchievementSectionInternal(githubData: ProcessedGitHubData): string {
  const { userProfile } = githubData;
  const achievements = analyzeAchievements(githubData);

  return `## 🏅 주요 성취

${achievements.map((achievement) => `- ${achievement}`).join("\n")}

## 📈 GitHub 활동 통계

![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${
    userProfile.login
  }&show_icons=true&theme=radical&hide_border=true)

![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=${
    userProfile.login
  }&layout=compact&theme=radical&hide_border=true)`;
}