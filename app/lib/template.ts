import type { ProcessedGitHubData, TechExpertData } from "./types/github";
import type { ReadmeTemplate } from "./types/template";

function generateTechStackBadges(topLanguages: string[]): string {
  const languageBadges: Record<string, string> = {
    JavaScript:
      "![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)",
    TypeScript:
      "![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)",
    Python:
      "![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)",
    Java: "![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)",
    React:
      "![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)",
    Vue: "![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)",
    Angular:
      "![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)",
    "Node.js":
      "![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)",
    Express:
      "![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)",
    MongoDB:
      "![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)",
    PostgreSQL:
      "![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)",
    MySQL:
      "![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)",
    Docker:
      "![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)",
    AWS: "![AWS](https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)",
    Git: "![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)",
    HTML: "![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)",
    CSS: "![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)",
    Go: "![Go](https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white)",
    Rust: "![Rust](https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=white)",
    "C++":
      "![C++](https://img.shields.io/badge/C%2B%2B-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white)",
    C: "![C](https://img.shields.io/badge/C-00599C?style=for-the-badge&logo=c&logoColor=white)",
  };

  return topLanguages
    .map(
      (language) =>
        languageBadges[language] ||
        `![${language}](https://img.shields.io/badge/${language}-0078D4?style=for-the-badge)`
    )
    .join(" ");
}

function generateProjectsSection(
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

function generateStatsSection(userData: ProcessedGitHubData): string {
  const { userProfile, topLanguages, mostStarredRepository } = userData;

  const statsCards = `
![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${userProfile.login}&show_icons=true&theme=radical&hide_border=true)
![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=${userProfile.login}&layout=compact&theme=radical&hide_border=true)`;

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

// 임팩트 중심 템플릿 생성
export function generateImpactTemplate(
  githubData: ProcessedGitHubData
): ReadmeTemplate {
  const { userProfile, topRepositories, languageStats } = githubData;

  const displayName = userProfile.name || userProfile.login;
  const bioSection = userProfile.bio ? `\n> ${userProfile.bio}\n` : "";

  // 임팩트 지표 계산
  const totalStars = topRepositories.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0
  );
  const totalRepos = userProfile.public_repos;
  const languageCount = Object.keys(languageStats).length;
  const mostUsedLanguage =
    Object.entries(languageStats).sort(([, a], [, b]) => b - a)[0]?.[0] ||
    "Unknown";

  const headerSection = `# 🚀 ${displayName} - 임팩트 드리븐 개발자

${bioSection}
## 📊 핵심 성과 지표

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

  const achievementSection = generateAchievementSection(githubData);

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
  const contactMatch = fullContent.match(/(## 🤝 함께 성장하기[\s\S]*)/);
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

function generateImpactProjectsSection(
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

function generateAchievementSection(githubData: ProcessedGitHubData): string {
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

// 기존 함수는 기본 템플릿으로 유지
export function generateReadmeTemplate(
  githubData: ProcessedGitHubData
): ReadmeTemplate {
  const { userProfile } = githubData;

  const displayName = userProfile.name || userProfile.login;
  const bioSection = userProfile.bio ? `\n> ${userProfile.bio}\n` : "";

  const headerSection = `# 안녕하세요! 👋 저는 ${displayName}입니다
${bioSection}
[![GitHub followers](https://img.shields.io/github/followers/${userProfile.login}?label=Follow&style=social)](${userProfile.html_url})
[![GitHub stars](https://img.shields.io/github/stars/${userProfile.login}?affiliations=OWNER&style=social)](${userProfile.html_url})

---`;

  const aboutSection = `## 🧑‍💻 About Me

- 🔭 현재 **오픈소스 프로젝트**에 기여하고 있습니다
- 🌱 **새로운 기술**을 배우고 성장하는 것을 좋아합니다  
- 💬 **협업**과 **문제 해결**에 관심이 많습니다
- 📫 연락처: [GitHub](${userProfile.html_url})`;

  const techStackSection = generateStatsSection(githubData);
  const projectsSection = generateProjectsSection(githubData.topRepositories);

  const contactSection = `## 📬 연락하기

- **GitHub**: [${userProfile.login}](${userProfile.html_url})
- **Email**: \`이메일 주소를 입력하세요\`
- **LinkedIn**: \`LinkedIn 프로필 링크를 입력하세요\`

---

⭐ **이 프로필이 도움이 되었다면 GitHub에서 Star를 눌러주세요!**`;

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

// 기술 전문가형 템플릿 생성 - 문제 해결 중심
export function generateTechExpertTemplate(
  techExpertData: TechExpertData
): ReadmeTemplate {
  const { userProfile } = techExpertData;

  const displayName = userProfile.name || userProfile.login;
  const bioSection = userProfile.bio ? `\n> ${userProfile.bio}\n` : "";

  const headerSection = `# ⚡ ${displayName} - Technical Problem Solver
${bioSection}
## 🎯 해결한 핵심 문제들

### 🚀 성능 최적화 전문가
- **대용량 데이터 처리**: 10만+ 레코드 실시간 처리 시스템 구축
- **응답 시간 개선**: API 응답 속도 2.5초 → 0.3초 단축
- **메모리 최적화**: 서버 리소스 사용량 60% 절감

### 🏗️ 시스템 아키텍처 설계
- **확장 가능한 구조**: 사용자 10배 증가 대응 마이크로서비스 설계
- **데이터베이스 최적화**: 복잡한 쿼리 성능 20배 향상
- **장애 대응 시스템**: 99.9% 가용성 확보

### 🔧 기술 부채 해결
- **레거시 시스템 모던화**: 5년된 코드베이스 단계적 리팩토링
- **코드 품질 개선**: 테스트 커버리지 30% → 85% 달성
- **개발 프로세스 구축**: CI/CD 파이프라인 도입으로 배포 시간 90% 단축

[![GitHub Profile](https://img.shields.io/badge/GitHub-Technical_Problem_Solver-000000?style=for-the-badge&logo=github)](${userProfile.html_url})

---`;

  const problemSolvingSection = generateProblemSolvingSection(techExpertData);
  const technicalLeadershipSection =
    generateTechnicalLeadershipSection(techExpertData);

  const fullContent = `${headerSection}

${problemSolvingSection}

${technicalLeadershipSection}

## 🤝 기술적 협업

**복잡한 문제를 단순하게 해결하는 것**을 추구합니다.  
기술적 도전과 팀의 성장을 함께 만들어가고 싶습니다.

📫 **연락하기**: [GitHub](${userProfile.html_url}) | \`professional.email@domain.com\``;

  // 문제 해결 섹션 분리
  const problemCasesMatch = problemSolvingSection.match(
    /(## 💡 실제 문제 해결 사례[\s\S]*?)(?=## 🛠️ 문제 해결 도구상자|$)/
  );
  const problemCasesOnly = problemCasesMatch ? problemCasesMatch[1] : "";

  const techToolboxMatch = problemSolvingSection.match(
    /(## 🛠️ 문제 해결 도구상자[\s\S]*)/
  );
  const techToolboxOnly = techToolboxMatch ? techToolboxMatch[1] : "";

  // 기술 리더십 섹션 분리
  const leadershipMatch = technicalLeadershipSection.match(
    /(## 🏆 기술 리더십 & 영향력[\s\S]*?)(?=### 📚 지식 공유 활동|$)/
  );
  const leadershipOnly = leadershipMatch ? leadershipMatch[1] : "";

  const knowledgeMatch = technicalLeadershipSection.match(
    /(### 📚 지식 공유 활동[\s\S]*)/
  );
  const knowledgeOnly = knowledgeMatch ? knowledgeMatch[1] : "";

  // 연락처 섹션 추출
  const contactMatch = fullContent.match(/(## 🤝 기술적 협업[\s\S]*)/);
  const contactSection = contactMatch ? contactMatch[1] : "";

  return {
    content: fullContent,
    sections: {
      header: headerSection,
      problemCases: problemCasesOnly,
      techToolbox: techToolboxOnly,
      leadershipExperience: leadershipOnly,
      knowledgeSharing: knowledgeOnly,
      contact: contactSection,
    },
  };
}

function generateProblemSolvingSection(data: TechExpertData): string {
  const { topRepositories, topLanguages } = data;

  // 실제 프로젝트 기반으로 문제 해결 사례 생성
  const projectCases = topRepositories
    .slice(0, 3)
    .map((repo, index) => {
      const problemTypes = [
        {
          icon: "🚀",
          title: "성능 최적화 도전",
          problem: `${repo.name} 프로젝트에서 확장성 문제 해결`,
          solution: `${repo.language} 기반 최적화로 처리 성능 3배 향상`,
          impact: `⭐ ${repo.stargazers_count}개 스타로 검증된 솔루션`,
        },
        {
          icon: "🏗️",
          title: "아키텍처 설계 경험",
          problem: `복잡한 비즈니스 로직을 위한 확장 가능한 구조 설계`,
          solution: `모듈화된 ${repo.language} 아키텍처 구축`,
          impact: `커뮤니티에서 ${repo.stargazers_count}+ 개발자가 활용`,
        },
        {
          icon: "🔧",
          title: "기술 부채 해결",
          problem: `기존 시스템의 유지보수성과 확장성 한계`,
          solution: `${repo.language}로 점진적 리팩토링 및 모던화`,
          impact: `${repo.stargazers_count}개 스타 달성으로 효과 입증`,
        },
      ];

      const caseType = problemTypes[index % problemTypes.length];

      return `### ${caseType.icon} ${caseType.title}

**문제 상황**  
${caseType.problem}

**해결 접근법**  
${caseType.solution}

**비즈니스 임팩트**  
${caseType.impact}

🔗 **프로젝트**: [${repo.name}](${repo.html_url})
`;
    })
    .join("\n");

  return `## 💡 실제 문제 해결 사례
${projectCases}
## 🛠️ 문제 해결 도구상자

![Tech Stack](https://skillicons.dev/icons?i=${topLanguages
    .slice(0, 6)
    .map((lang) =>
      lang.toLowerCase().replace("javascript", "js").replace("typescript", "ts")
    )
    .join(",")})

**깊이 있는 전문 영역**: ${topLanguages.slice(0, 3).join(" • ")}
`;
}

function generateTechnicalLeadershipSection(data: TechExpertData): string {
  const { userProfile } = data;

  return `## 🏆 기술 리더십 & 영향력

### 📈 기술적 기여 현황
![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user=${userProfile.login}&theme=dark&hide_border=true)

### 🎯 오픈소스 영향력
![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${userProfile.login}&show_icons=true&theme=github_dark&hide_border=true&include_all_commits=true&count_private=false)

### 🏅 개발자 성취도
![Trophy](https://github-profile-trophy.vercel.app/?username=${userProfile.login}&theme=darkhub&no-frame=true&row=1&column=6)

### 💼 기술 리더십 경험
- **팀 기술 결정**: 핵심 기술 스택 선정 및 아키텍처 가이드라인 수립
- **코드 리뷰 문화**: 팀 내 코드 품질 표준 정립 및 멘토링
- **기술 부채 관리**: 체계적인 리팩토링 계획 수립 및 실행
- **신기술 도입**: 팀 생산성 향상을 위한 도구 및 프로세스 개선

### 📚 지식 공유 활동
- **사내 기술 세미나**: 복잡한 기술 개념을 쉽게 전달
- **주니어 멘토링**: 체계적인 성장 가이드 제공
- **기술 문서화**: 팀 지식 베이스 구축 및 유지보수
`;
}
