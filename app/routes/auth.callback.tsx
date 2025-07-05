import { redirect } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { exchangeCodeForToken, getGitHubUserInfo } from "~/lib/oauth";
import { getSession, commitSession } from "~/lib/session";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  // OAuth 에러 처리
  if (error) {
    console.error("GitHub OAuth 에러:", error);
    return redirect("/?error=oauth_denied");
  }

  // code 파라미터 없음
  if (!code) {
    return redirect("/?error=oauth_invalid");
  }

  try {
    // 1. code를 access_token으로 교환
    const accessToken = await exchangeCodeForToken(code);
    
    // 2. 사용자 정보 가져오기
    const userInfo = await getGitHubUserInfo(accessToken);
    
    // 3. 세션에 저장
    const session = await getSession(request.headers.get("Cookie"));
    session.set("oauth_token", accessToken);
    session.set("user_info", {
      id: userInfo.id,
      login: userInfo.login,
      name: userInfo.name,
      avatar_url: userInfo.avatar_url,
    });

    // 4. 쿠키 설정하고 홈페이지로 리다이렉트
    const cookieHeader = await commitSession(session);
    
    return redirect("/", {
      headers: {
        "Set-Cookie": cookieHeader,
      },
    });
  } catch (error) {
    console.error("OAuth 콜백 처리 실패:", error);
    return redirect("/?error=oauth_failed");
  }
}

export default function CallbackPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">로그인 처리 중...</p>
      </div>
    </div>
  );
}