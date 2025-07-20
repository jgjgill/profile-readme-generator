import { useLoaderData } from "react-router";
import type { MetaFunction, LoaderFunctionArgs } from "react-router";
import {
  fetchCompleteGitHubData,
  fetchTechExpertData,
  GitHubApiError,
} from "~/lib/github";
import type { ProcessedGitHubData, TechExpertData } from "~/lib/types/github";
import { getGitHubToken, isLoggedIn, getUserInfo } from "~/lib/session";
import { Header } from "~/components/header";
import { BackgroundAnimation } from "~/components/shared/background-animation";
import {
  GenerateErrorBoundary,
  CompletionHeader,
  UserInfoSidebar,
  TemplateContent,
} from "~/components/generate";

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
  return <GenerateErrorBoundary />;
}

export default function GeneratePage() {
  const { githubData, techExpertData, isLoggedIn, userInfo } =
    useLoaderData<LoaderData>();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      <Header currentPage="home" isLoggedIn={isLoggedIn} userInfo={userInfo} />

      <BackgroundAnimation variant="generate" />

      <div className="flex-1 relative z-10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CompletionHeader />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <UserInfoSidebar userData={githubData} />
            <TemplateContent
              githubData={githubData}
              techExpertData={techExpertData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
