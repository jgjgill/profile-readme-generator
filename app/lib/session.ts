import { createCookieSessionStorage } from "react-router";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "github_session",
      secure: process.env.NODE_ENV === "production",
      secrets: [process.env.SESSION_SECRET || "default-secret"],
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 24시간
      httpOnly: true,
    },
  });

export { getSession, commitSession, destroySession };

// OAuth 토큰 관련 함수들
export async function getOAuthToken(request: Request): Promise<string | null> {
  const session = await getSession(request.headers.get("Cookie"));
  return session.get("oauth_token") || null;
}

export async function getUserInfo(request: Request): Promise<any | null> {
  const session = await getSession(request.headers.get("Cookie"));
  return session.get("user_info") || null;
}

export async function isLoggedIn(request: Request): Promise<boolean> {
  const session = await getSession(request.headers.get("Cookie"));
  return !!session.get("oauth_token");
}

// GitHub API 호출용 토큰 가져오기 (OAuth만 사용, 없으면 null)
export async function getGitHubToken(
  request: Request
): Promise<string | undefined> {
  const session = await getSession(request.headers.get("Cookie"));

  // OAuth 토큰만 사용 (로그인한 사용자만 토큰 혜택)
  return session.get("oauth_token");
}

// 기존 함수들 (하위 호환성)
export async function setGitHubToken(
  request: Request,
  token: string
): Promise<string> {
  const session = await getSession(request.headers.get("Cookie"));
  session.set("github_token", token);
  return await commitSession(session);
}

export async function clearGitHubToken(request: Request): Promise<string> {
  const session = await getSession(request.headers.get("Cookie"));
  session.unset("github_token");
  return await commitSession(session);
}
