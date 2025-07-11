import { GitHubIcon } from "./github-icon";

interface UserInfo {
  id: number;
  login: string;
  name: string | null;
  avatar_url: string;
}

interface UserMenuProps {
  isLoggedIn: boolean;
  userInfo: UserInfo | null;
}

export function UserMenu({ isLoggedIn, userInfo }: UserMenuProps) {
  if (isLoggedIn && userInfo) {
    return (
      <>
        <div className="flex items-center space-x-3 bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
          <img
            src={userInfo.avatar_url}
            alt={userInfo.login}
            className="w-8 h-8 rounded-full ring-2 ring-blue-400/50"
          />
          <span className="text-white font-medium text-sm">
            {userInfo.name || userInfo.login}
          </span>
        </div>
        <a
          href="/auth/logout"
          className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 font-medium transition-all duration-200 rounded-lg text-sm"
        >
          로그아웃
        </a>
      </>
    );
  }

  return (
    <a
      href="/auth/login"
      className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-200 text-sm shadow-lg hover:shadow-xl transform hover:scale-105"
    >
      <GitHubIcon />
      GitHub으로 로그인
    </a>
  );
}