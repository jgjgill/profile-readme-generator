import {
  Link,
  useLoaderData,
  useRouteError,
  isRouteErrorResponse,
} from "react-router";
import type { MetaFunction, LoaderFunctionArgs } from "react-router";
import {
  fetchCompleteGitHubData,
  fetchTechExpertData,
  GitHubApiError,
} from "~/lib/github";
import type { ProcessedGitHubData, TechExpertData } from "~/lib/types/github";
import { getGitHubToken, isLoggedIn, getUserInfo } from "~/lib/session";
import { Header } from "~/components/header";
import UserCard from "~/components/user-card";
import TemplateSelector from "~/components/template-selector";

interface LoaderData {
  githubData: ProcessedGitHubData;
  techExpertData: TechExpertData;
  username: string;
  isLoggedIn: boolean;
  userInfo: {
    id: number;
    login: string;
    name: string | null;
    avatar_url: string;
  } | null;
}

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { username } = params;

  if (!username) {
    throw new Response("사용자명이 제공되지 않았습니다.", { status: 400 });
  }

  try {
    // 세션에서 GitHub 토큰 가져오기 (OAuth 우선, fallback으로 환경변수)
    const githubToken = await getGitHubToken(request);
    const loggedIn = await isLoggedIn(request);
    const userInfo = loggedIn ? await getUserInfo(request) : null;

    const githubData = await fetchCompleteGitHubData(username, githubToken);
    const techExpertData = await fetchTechExpertData(username, githubToken);

    return {
      githubData,
      techExpertData,
      username,
      isLoggedIn: loggedIn,
      userInfo,
    };
  } catch (error) {
    if (error instanceof GitHubApiError) {
      if (error.status === 404) {
        throw new Response(error.message, {
          status: 404,
        });
      }
      if (error.status === 403) {
        throw new Response(error.message, {
          status: 429,
        });
      }
    }

    console.error("GitHub 데이터 가져오기 실패:", error);
    throw new Response("GitHub 데이터를 가져오는 중 오류가 발생했습니다.", {
      status: 500,
    });
  }
}

export const meta: MetaFunction<typeof loader> = ({ data, params }) => {
  const username = data?.username || params.username;
  return [
    { title: `${username}님의 GitHub README 생성 결과` },
    {
      name: "description",
      content: `${username}님을 위한 프로페셔널한 GitHub README 템플릿`,
    },
  ];
};

export function ErrorBoundary() {
  const error = useRouteError();

  let errorMessage = "GitHub 데이터를 불러오는 중 문제가 발생했습니다.";
  let errorIcon = "⚠️";

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 404:
        errorMessage = error.data;
        errorIcon = "🔍";
        break;
      case 429:
        errorMessage = error.data;
        errorIcon = "⏱️";
        break;
      case 500:
        errorMessage = "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
        errorIcon = "🔧";
        break;
      default:
        errorMessage = error.data || "알 수 없는 오류가 발생했습니다.";
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4">
      {/* 배경 애니메이션 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="max-w-md w-full text-center bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-xl relative z-10">
        <div className="text-6xl mb-6">{errorIcon}</div>
        <h2 className="text-2xl font-bold text-white mb-4">
          오류가 발생했습니다
        </h2>
        <p className="text-gray-300 mb-8 leading-relaxed">{errorMessage}</p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          다시 시도하기
        </Link>
      </div>
    </div>
  );
}

export default function GeneratePage() {
  const { githubData, techExpertData, isLoggedIn, userInfo } = useLoaderData<LoaderData>();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      <Header currentPage="home" isLoggedIn={isLoggedIn} userInfo={userInfo} />
      
      {/* 배경 애니메이션 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="flex-1 relative z-10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 페이지 헤더 */}
          <div className="mb-8 text-center">
            <Link
              to="/"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 transition-colors duration-200 group"
            >
              <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              새로운 README 생성하기
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              README 생성 완료! 🎉
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-4"></div>
            <p className="text-xl text-gray-300 leading-relaxed">
              원하는 템플릿을 선택해서 GitHub 프로필에 사용하세요
            </p>
          </div>

          {/* 메인 콘텐츠 */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
                <UserCard userData={githubData} />
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8">
                <TemplateSelector
                  githubData={githubData}
                  techExpertData={techExpertData}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
