import type { ProcessedGitHubData } from "~/lib/types/github";
import type { ReadmeTemplate } from "~/lib/types/template";

/**
 * 🎮 RPG 캐릭터 시트형 템플릿 생성
 * 개발자를 RPG 캐릭터로, GitHub 활동을 게임 스탯으로 표현
 */
export function generateRPGTemplate(
  githubData: ProcessedGitHubData
): ReadmeTemplate {
  const {
    userProfile,
    topRepositories,
    languageStats,
    topLanguages,
  } = githubData;

  // 총 스타 수 계산
  const totalStars = topRepositories.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0
  );
  const totalCommits = Math.floor(Math.random() * 500) + 200; // 임시: 실제 커밋 API로 교체 예정

  // 종합 경험치 계산
  const totalExperience = totalCommits + totalStars * 2 + topRepositories.length * 50;
  
  // RPG 스타일로 데이터 변환 - 경험치와 레벨을 일치시킴
  const rpgStats = {
    // 종합 경험치 = 커밋 + (스타 * 2) + (프로젝트 * 50)
    experience: totalExperience,
    // 레벨 = 경험치 기반으로 계산 (100 경험치당 1레벨)
    level: Math.max(1, Math.floor(totalExperience / 100)),
    starPower: totalStars, // 스타 파워 = 총 스타 수
    skills: topLanguages.slice(0, 4), // 스킬 = 언어들
    achievements: generateAchievements(
      totalStars,
      totalCommits,
      topRepositories
    ), // 업적
  };

  // 다음 레벨까지 필요한 경험치 계산
  const nextLevelRequirement = (rpgStats.level + 1) * 100; // 다음 레벨에 필요한 총 경험치
  const expToNextLevel = nextLevelRequirement - rpgStats.experience;

  const content = `# ⚔️ ${userProfile.name || userProfile.login} - 개발자 모험가

<div align="center">

## 🎮 캐릭터 정보

**클래스**: 개발자 | **레벨**: ${rpgStats.level} | **경험치**: ${
    rpgStats.experience
  } XP

![Level](https://img.shields.io/badge/Level-${
    rpgStats.level
  }-purple?style=for-the-badge&logo=star&logoColor=white)
![Experience](https://img.shields.io/badge/경험치-${
    rpgStats.experience
  }%20XP-blue?style=for-the-badge&logo=trophy&logoColor=white)

</div>

---

## 📊 캐릭터 스탯

\`\`\`
💪 힘 (코딩 파워)      ${"█".repeat(
    Math.min(Math.floor(totalCommits / 50), 20)
  )}${" ".repeat(
    20 - Math.min(Math.floor(totalCommits / 50), 20)
  )} ${totalCommits}
⭐ 매력 (스타 파워)     ${"█".repeat(
    Math.min(Math.floor(rpgStats.starPower / 10), 20)
  )}${" ".repeat(20 - Math.min(Math.floor(rpgStats.starPower / 10), 20))} ${
    rpgStats.starPower
  }
🎯 민첩 (프로젝트 수)   ${"█".repeat(
    Math.min(topRepositories.length, 20)
  )}${" ".repeat(20 - Math.min(topRepositories.length, 20))} ${
    topRepositories.length
  }
🧠 지능 (언어 수)      ${"█".repeat(
    Math.min(rpgStats.skills.length * 5, 20)
  )}${" ".repeat(20 - Math.min(rpgStats.skills.length * 5, 20))} ${
    rpgStats.skills.length
  }
\`\`\`

---

## 🛡️ 장착 스킬

${rpgStats.skills
  .map((skill, index) => {
    // 언어별 사용 빈도를 기반으로 별점 계산
    const languageValue = languageStats[skill] || 0;
    const maxValue = Math.max(...Object.values(languageStats));
    const stars =
      maxValue > 0
        ? Math.min(Math.floor((languageValue / maxValue) * 5) + 1, 5)
        : 3;

    return `### ${
      ["⚔️", "🛡️", "🏹", "🔮"][index] || "⭐"
    } ${skill} ${"★".repeat(stars)}${"☆".repeat(5 - stars)}
  
  **숙련도**: ${stars}성 | **코드량**: ${languageValue.toLocaleString()}bytes`;
  })
  .join("\n\n")}

---

## 🏆 달성한 업적

${rpgStats.achievements.map((achievement) => `- ${achievement}`).join("\n")}

---

## ⚔️ 완료한 퀘스트 (프로젝트)

${topRepositories
  .slice(0, 5)
  .map((repo, index) => {
    const difficulty =
      repo.stargazers_count > 50
        ? "🔥 전설"
        : repo.stargazers_count > 20
        ? "💎 희귀"
        : repo.stargazers_count > 5
        ? "🟢 일반"
        : "⚪ 기본";

    return `### ${index + 1}. [${repo.name}](${repo.html_url}) ${difficulty}
  
  **보상**: ⭐ ${repo.stargazers_count} 경험치 | 🔄 ${repo.forks_count} 명성
  
  **퀘스트 설명**: ${repo.description || "신비로운 모험"}
  
  **사용 마법**: ${repo.language || "Ancient Magic"} | **완료일**: ${new Date(
      repo.created_at
    ).getFullYear()}년`;
  })
  .join("\n\n")}

---

## 📈 성장 기록

\`\`\`
현재 레벨: ${rpgStats.level}
총 경험치: ${rpgStats.experience} XP
다음 레벨까지: ${expToNextLevel} XP (레벨 ${rpgStats.level + 1}까지)

경험치 구성:
- 커밋 활동: ${totalCommits} XP
- 스타 획득: ${totalStars * 2} XP (${totalStars} × 2)
- 프로젝트: ${topRepositories.length * 50} XP (${topRepositories.length} × 50)
\`\`\`

---

<div align="center">

### 🎭 길드 정보

**소속**: GitHub 개발자 길드  
**계급**: ${
    rpgStats.level >= 10
      ? "상급 모험가"
      : rpgStats.level >= 5
      ? "중급 모험가"
      : "신입 모험가"
  }  
**가입일**: ${new Date(userProfile.created_at).getFullYear()}년

[![GitHub Profile](https://img.shields.io/badge/모험가%20프로필-${
    userProfile.login
  }-7C3AED?style=for-the-badge&logo=github)](https://github.com/${
    userProfile.login
  })

</div>`;

  return {
    content,
    sections: {
      character: "캐릭터 정보",
      stats: "캐릭터 스탯",
      skills: "장착 스킬",
      achievements: "달성한 업적",
      quests: "완료한 퀘스트",
    },
  };
}

/**
 * 업적 생성 함수
 */
function generateAchievements(
  totalStars: number,
  totalCommits: number,
  repositories: any[]
): string[] {
  const achievements = [];

  if (totalStars > 100) achievements.push("⭐ 스타 수집가 (100+ 스타 획득)");
  if (totalStars > 500) achievements.push("🌟 스타 마스터 (500+ 스타 획득)");
  if (repositories.length > 10)
    achievements.push("🏗️ 프로젝트 빌더 (10+ 프로젝트 완성)");
  if (repositories.length > 20)
    achievements.push("🎯 프로젝트 마스터 (20+ 프로젝트 완성)");
  if (totalCommits > 500) achievements.push("🔥 커밋 전사 (500+ 커밋 달성)");
  if (totalCommits > 1000)
    achievements.push("⚔️ 커밋 레전드 (1000+ 커밋 달성)");

  // 기본 업적
  if (achievements.length === 0) {
    achievements.push("🌱 새로운 모험가 (GitHub 여정 시작)");
    achievements.push("📚 학습자 (지속적인 성장 중)");
  }

  return achievements;
}
