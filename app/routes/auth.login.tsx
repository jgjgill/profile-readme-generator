import { redirect } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { getGitHubAuthUrl } from "~/lib/oauth";

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const authUrl = getGitHubAuthUrl();
    return redirect(authUrl);
  } catch (error) {
    console.error("GitHub OAuth URL 생성 실패:", error);
    return redirect("/?error=oauth_config");
  }
}

// 이 컴포넌트는 실행되지 않음 (loader에서 바로 리다이렉트)
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">GitHub으로 이동 중...</p>
      </div>
    </div>
  );
}