import type { ProcessedGitHubData } from "~/lib/types/github";
import type { ReadmeTemplate } from "~/lib/types/template";

/**
 * 📊 비즈니스 대시보드형 템플릿 생성
 * 경영진이 보는 성과 대시보드처럼 GitHub 데이터를 표현
 */
export function generateDashboardTemplate(
  githubData: ProcessedGitHubData
): ReadmeTemplate {
  const { userProfile } = githubData;

  // 동적 API 기반 템플릿 - 모든 데이터는 실시간으로 API에서 가져옴

  const content = `# 📊 ${
    userProfile.name || userProfile.login
  } - Executive Dashboard

<div align="center">

![Executive Dashboard](${
    import.meta.env.VITE_APP_URL || "http://localhost:5173"
  }/api/dashboard-executive?username=${userProfile.login}&theme=corporate)

</div>`;

  return {
    content,
  };
}
