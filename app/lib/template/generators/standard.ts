import type { ProcessedGitHubData } from "../../types/github";
import type { ReadmeTemplate } from "../../types/template";
import {
  generateHeaderSection,
  generateAboutMeSection,
  generateStatsSection,
  generateProjectsSection,
  generateContactSection,
} from "../sections";

/**
 * 기본 템플릿 생성
 */
export function generateStandardTemplate(
  githubData: ProcessedGitHubData
): ReadmeTemplate {
  const { userProfile } = githubData;

  const headerSection = generateHeaderSection(githubData);
  const aboutSection = generateAboutMeSection(githubData);
  const techStackSection = generateStatsSection(githubData);
  const projectsSection = generateProjectsSection(githubData.topRepositories);
  const contactSection = generateContactSection(userProfile);

  const fullContent = `${headerSection}

${aboutSection}

${techStackSection}

${projectsSection}

${contactSection}`;

  // 기술 스택과 통계 섹션 분리
  const techStackMatch = techStackSection.match(
    /(## 💻 주요 기술 스택[\\s\\S]*?)(?=## 🌟 하이라이트 프로젝트|$)/
  );
  const techStackOnly = techStackMatch ? techStackMatch[1] : "";

  const statsMatch = techStackSection.match(
    /(## 📊 GitHub 통계[\\s\\S]*?)(?=## 💻 주요 기술 스택|## 🌟 하이라이트 프로젝트|$)/
  );
  const statsOnly = statsMatch ? statsMatch[1] : "";

  const highlightMatch = techStackSection.match(
    /(## 🌟 하이라이트 프로젝트[\\s\\S]*)/
  );
  const highlightOnly = highlightMatch ? highlightMatch[1] : "";

  return {
    content: fullContent,
    sections: {
      header: headerSection,
      about: aboutSection,
      stats: statsOnly,
      techStack: techStackOnly,
      highlight: highlightOnly,
      projects: projectsSection,
      contact: contactSection,
    },
  };
}