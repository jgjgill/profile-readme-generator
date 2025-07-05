import type { ProcessedGitHubData } from "./types/github";

export const mockGitHubData: ProcessedGitHubData = {
  userProfile: {
    login: "jgjgill",
    name: "김개발",
    bio: "풀스택 개발자로 새로운 기술을 배우고 적용하는 것을 좋아합니다.",
    avatar_url: "https://github.com/github.png",
    html_url: "https://github.com/jgjgill",
    public_repos: 25,
  },
  topRepositories: [
    {
      name: "awesome-react-components",
      full_name: "devjohn/awesome-react-components",
      html_url: "https://github.com/devjohn/awesome-react-components",
      description:
        "재사용 가능한 React 컴포넌트 라이브러리입니다. 다양한 UI 요소를 모듈화하여 개발 효율성을 높였습니다.",
      language: "TypeScript",
      stargazers_count: 150,
      topics: ["react", "typescript", "components", "ui-library"],
      created_at: "2023-08-10T09:00:00Z",
      updated_at: "2024-06-25T14:20:00Z",
    },
    {
      name: "nodejs-api-server",
      full_name: "devjohn/nodejs-api-server",
      html_url: "https://github.com/devjohn/nodejs-api-server",
      description:
        "Express.js와 MongoDB를 사용한 RESTful API 서버입니다. JWT 인증과 실시간 알림 기능을 포함합니다.",
      language: "JavaScript",
      stargazers_count: 89,
      topics: ["nodejs", "express", "mongodb", "api"],
      created_at: "2023-05-20T10:15:00Z",
      updated_at: "2024-06-20T11:45:00Z",
    },
    {
      name: "python-data-analysis",
      full_name: "devjohn/python-data-analysis",
      html_url: "https://github.com/devjohn/python-data-analysis",
      description:
        "Pandas와 Matplotlib을 활용한 데이터 분석 도구입니다. 다양한 시각화와 통계 분석 기능을 제공합니다.",
      language: "Python",
      stargazers_count: 67,
      topics: ["python", "data-analysis", "pandas", "visualization"],
      created_at: "2023-03-12T08:30:00Z",
      updated_at: "2024-06-15T16:00:00Z",
    },
  ],
  languageStats: {
    TypeScript: 125000,
    JavaScript: 98000,
    Python: 75000,
    Java: 45000,
    CSS: 20000,
  },
  topLanguages: ["TypeScript", "JavaScript", "Python"],
  mostStarredRepository: {
    name: "awesome-react-components",
    full_name: "devjohn/awesome-react-components",
    html_url: "https://github.com/devjohn/awesome-react-components",
    description:
      "재사용 가능한 React 컴포넌트 라이브러리입니다. 다양한 UI 요소를 모듈화하여 개발 효율성을 높였습니다.",
    language: "TypeScript",
    stargazers_count: 150,
    topics: ["react", "typescript", "components", "ui-library"],
    created_at: "2023-08-10T09:00:00Z",
    updated_at: "2024-06-25T14:20:00Z",
  },
};
