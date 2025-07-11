import { GitHubIcon } from "./github-icon";

interface UserInfo {
  id: number;
  login: string;
  name: string | null;
  avatar_url: string;
}

interface MobileNavProps {
  currentPage: "home" | "shop";
  isLoggedIn: boolean;
  userInfo: UserInfo | null;
  isOpen: boolean;
}

export function MobileNav({ currentPage, isLoggedIn, userInfo, isOpen }: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="px-4 pt-2 pb-3 space-y-2 bg-slate-800/95 backdrop-blur-sm border-t border-purple-500/20">
        <a
          href="/"
          className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
            currentPage === "home"
              ? "text-blue-300 bg-blue-500/20 shadow-lg shadow-blue-500/25"
              : "text-gray-300 hover:text-white hover:bg-white/10"
          }`}
        >
          홈
        </a>
        <a
          href="/shop"
          className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
            currentPage === "shop"
              ? "text-purple-300 bg-purple-500/20 shadow-lg shadow-purple-500/25"
              : "text-gray-300 hover:text-white hover:bg-white/10"
          }`}
        >
          컴포넌트 상점
        </a>
        
        <div className="pt-4 pb-3 border-t border-purple-500/20">
          {isLoggedIn && userInfo ? (
            <div className="space-y-3">
              <div className="flex items-center space-x-3 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <img
                  src={userInfo.avatar_url}
                  alt={userInfo.login}
                  className="w-10 h-10 rounded-full ring-2 ring-blue-400/50"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-base font-medium text-white truncate">
                    {userInfo.name || userInfo.login}
                  </p>
                  <p className="text-sm text-gray-300 truncate">
                    @{userInfo.login}
                  </p>
                </div>
              </div>
              <a
                href="/auth/logout"
                className="block w-full text-left px-4 py-3 text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 rounded-lg"
              >
                로그아웃
              </a>
            </div>
          ) : (
            <div>
              <a
                href="/auth/login"
                className="flex items-center justify-center w-full px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-200 shadow-lg"
              >
                <GitHubIcon />
                GitHub으로 로그인
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}