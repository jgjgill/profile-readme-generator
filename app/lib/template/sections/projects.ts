import type { ProcessedGitHubData } from "../../types/github";

/**
 * 프로젝트 섹션 생성
 */
export function generateProjectsSection(
  topRepositories: ProcessedGitHubData["topRepositories"]
): string {
  if (topRepositories.length === 0) {
    return "### 🚀 주요 프로젝트\n\n*아직 공개된 프로젝트가 없습니다.*";
  }

  const projectsMarkdown = topRepositories
    .map((repository, index) => {
      const projectNumber = index + 1;
      const description = repository.description || "프로젝트 설명이 없습니다.";
      const topics =
        repository.topics.length > 0
          ? repository.topics
              .slice(0, 3)
              .map((topic) => `\`${topic}\``)
              .join(" ")
          : "";

      return `
#### ${projectNumber}. [${repository.name}](${repository.html_url})
${description}

**⭐ Stars:** ${repository.stargazers_count} | **💻 Language:** ${
        repository.language || "Mixed"
      } ${topics ? `| **🏷️ Tags:** ${topics}` : ""}
`;
    })
    .join("\n");

  return `## 🚀 주요 프로젝트
${projectsMarkdown}`;
}

/**
 * 임팩트 프로젝트 섹션 생성
 */
export function generateImpactProjectsSection(
  topRepositories: ProcessedGitHubData["topRepositories"]
): string {
  if (topRepositories.length === 0) {
    return "*성과를 보여줄 프로젝트를 준비 중입니다.*";
  }

  const projectsMarkdown = topRepositories
    .slice(0, 3)
    .map((repo, index) => {
      const impactLevel =
        repo.stargazers_count >= 50
          ? "🔥 High Impact"
          : repo.stargazers_count >= 10
          ? "⚡ Medium Impact"
          : "🌱 Growing Impact";

      return `### ${index + 1}. [${repo.name}](${repo.html_url}) ${impactLevel}

**${repo.description || "실용적인 솔루션을 제공하는 프로젝트입니다."}**

- 🌟 **커뮤니티 반응**: ${repo.stargazers_count}개 스타
- 🛠 **핵심 기술**: ${repo.language || "Multiple"}
- 📅 **최근 업데이트**: ${new Date(repo.updated_at).getFullYear()}년

`;
    })
    .join("");

  return projectsMarkdown;
}