import type { ProcessedGitHubData } from "../../types/github";

/**
 * 기본 헤더 섹션 생성
 */
export function generateHeaderSection(githubData: ProcessedGitHubData): string {
  const { userProfile } = githubData;
  const displayName = userProfile.name || userProfile.login;
  const bioSection = userProfile.bio ? `\n> ${userProfile.bio}\n` : "";

  return `# 안녕하세요! 👋 저는 ${displayName}입니다
${bioSection}
[![GitHub followers](https://img.shields.io/github/followers/${userProfile.login}?label=Follow&style=social)](${userProfile.html_url})
[![GitHub stars](https://img.shields.io/github/stars/${userProfile.login}?affiliations=OWNER&style=social)](${userProfile.html_url})

---`;
}

/**
 * 임팩트 헤더 섹션 생성
 */
export function generateImpactHeaderSection(githubData: ProcessedGitHubData): string {
  const { userProfile } = githubData;
  const displayName = userProfile.name || userProfile.login;
  const bioSection = userProfile.bio ? `\n> ${userProfile.bio}\n` : "";

  return `# 🚀 ${displayName} - 임팩트 드리븐 개발자

${bioSection}`;
}

/**
 * 기술 전문가 헤더 섹션 생성
 */
export function generateTechExpertHeaderSection(userProfile: any): string {
  const displayName = userProfile.name || userProfile.login;
  const bioSection = userProfile.bio ? `\n> ${userProfile.bio}\n` : "";

  return `# ⚡ ${displayName} - Technical Problem Solver
${bioSection}`;
}

/**
 * 연락처 섹션 생성
 */
export function generateContactSection(userProfile: any): string {
  return `## 📬 연락하기

- **GitHub**: [${userProfile.login}](${userProfile.html_url})
- **Email**: \`이메일 주소를 입력하세요\`
- **LinkedIn**: \`LinkedIn 프로필 링크를 입력하세요\`

---

⭐ **이 프로필이 도움이 되었다면 GitHub에서 Star를 눌러주세요!**`;
}