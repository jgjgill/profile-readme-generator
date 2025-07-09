/**
 * 기술 스택 배지 생성
 */
export function generateTechStackBadges(topLanguages: string[]): string {
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

/**
 * GitHub 통계 카드 생성
 */
export function generateGitHubStatsCards(username: string): string {
  return `
![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=radical&hide_border=true)
![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=radical&hide_border=true)`;
}