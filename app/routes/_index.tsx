import { useState } from "react";
import { useNavigate, useLoaderData } from "react-router";
import type { MetaFunction, LoaderFunctionArgs } from "react-router";
import { getUserInfo, isLoggedIn } from "~/lib/session";
import { Header } from "~/components/header";

interface LoaderData {
  isLoggedIn: boolean;
  userInfo: {
    id: number;
    login: string;
    name: string | null;
    avatar_url: string;
  } | null;
}

export async function loader({
  request,
}: LoaderFunctionArgs): Promise<LoaderData> {
  const loggedIn = await isLoggedIn(request);
  const userInfo = loggedIn ? await getUserInfo(request) : null;

  return {
    isLoggedIn: loggedIn,
    userInfo,
  };
}

export const meta: MetaFunction = () => {
  return [
    { title: "GitHub 프로필 README 생성기" },
    {
      name: "description",
      content: "누구나 주목할 만한 GitHub 프로필 README를 자동으로 생성하세요!",
    },
  ];
};

export default function IndexPage() {
  const { isLoggedIn, userInfo } = useLoaderData<LoaderData>();
  const [githubUsername, setGitHubUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!githubUsername.trim()) {
      return;
    }

    setIsLoading(true);

    try {
      navigate(`/generate/${githubUsername.trim()}`);
    } catch (error) {
      console.error("Navigation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGitHubUsername(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      <Header currentPage="home" isLoggedIn={isLoggedIn} userInfo={userInfo} />

      {/* 배경 애니메이션 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="max-w-4xl w-full text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 leading-tight">
              GitHub 프로필 README 생성기
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
            GitHub 사용자명을 입력하면 누구나 주목할 만한
            <br />
            <span className="text-blue-300 font-semibold">README 템플릿</span>을
            자동으로 생성합니다
          </p>

          {/* API 요청 수 안내 */}
          {isLoggedIn ? (
            <div className="mb-12 p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center justify-center mb-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-green-300 font-bold text-lg">
                  프리미엄 사용자
                </span>
              </div>
              <p className="text-green-200 text-lg">
                <strong className="text-white text-xl">
                  시간당 약 800개 README
                </strong>
                까지 자유롭게 생성하세요! 🚀
                <br />
                <span className="text-sm text-green-300 opacity-75">
                  (API 요청 5,000회 기준)
                </span>
              </p>
            </div>
          ) : (
            <div className="mb-12 p-6 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/30 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center justify-center mb-3">
                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-amber-300 font-bold text-lg">
                  무료 체험
                </span>
              </div>
              <p className="text-amber-200 text-lg mb-4">
                <strong className="text-white text-xl">
                  시간당 약 10개의 README
                </strong>{" "}
                생성 제한이 있어요.
                <br />
                <span className="text-sm text-amber-300 opacity-75">
                  (API 요청 60회 기준)
                </span>
              </p>
              <a
                href="/auth/login"
                className="inline-flex items-center text-amber-200 hover:text-white font-semibold text-lg transition-colors duration-200 group"
              >
                로그인하면{" "}
                <strong className="mx-2 text-yellow-300">
                  80배 더 많은 생성
                </strong>
                이 가능해요!
                <svg
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8 mb-16">
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={githubUsername}
                  onChange={handleUsernameChange}
                  placeholder="GitHub 사용자명 입력"
                  className="w-full px-6 py-4 bg-white/10 border-2 border-white/20 rounded-xl focus:outline-none focus:border-blue-400 focus:bg-white/20 text-lg text-white placeholder-gray-300 backdrop-blur-sm transition-all duration-200"
                  disabled={isLoading}
                  required
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 -z-10 blur-xl"></div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !githubUsername.trim()}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-500 hover:to-purple-500 focus:outline-none focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>생성 중...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>README 생성</span>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                )}
              </button>
            </div>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 group">
              <div className="w-14 h-14 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-7 h-7 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-white text-xl mb-3">즉시 생성</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                5초 이내에 완성된 README 템플릿을 받아보세요
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 group">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-7 h-7 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
              </div>
              <h3 className="font-bold text-white text-xl mb-3">역량 파악</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                3초 내에 핵심 역량을 파악할 수 있는 구성
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 group">
              <div className="w-14 h-14 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-7 h-7 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-white text-xl mb-3">바로 사용</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                복사해서 GitHub 프로필에 바로 적용 가능
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 그라데이션 */}
      <div className="h-32 bg-gradient-to-t from-slate-900 to-transparent"></div>
    </div>
  );
}
