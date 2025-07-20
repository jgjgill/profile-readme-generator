import { useLoaderData } from "react-router";
import type { MetaFunction, LoaderFunctionArgs } from "react-router";
import { getUserInfo, isLoggedIn } from "~/lib/session";
import { Header } from "~/components/header";
import {
  BackgroundAnimation,
  ReadmeGeneratorTitle,
  LoginStatusNotice,
  ReadmeGeneratorForm,
  FeatureCards,
} from "~/components/home";

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      <Header currentPage="home" isLoggedIn={isLoggedIn} userInfo={userInfo} />

      <BackgroundAnimation />

      <div className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="max-w-4xl w-full text-center">
          <ReadmeGeneratorTitle />
          <LoginStatusNotice isLoggedIn={isLoggedIn} />
          <ReadmeGeneratorForm />
          <FeatureCards />
        </div>
      </div>

      <div className="h-32 bg-gradient-to-t from-slate-900 to-transparent"></div>
    </div>
  );
}
