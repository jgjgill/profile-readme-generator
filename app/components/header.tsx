import { useState } from "react";

interface HeaderProps {
  currentPage: "home" | "shop";
  isLoggedIn?: boolean;
  userInfo?: {
    id: number;
    login: string;
    name: string | null;
    avatar_url: string;
  } | null;
}

export function Header({ currentPage, isLoggedIn = false, userInfo = null }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 backdrop-blur-sm border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 및 네비게이션 */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                README 생성기
              </h2>
            </div>
            
            {/* 데스크톱 네비게이션 */}
            <nav className="hidden md:ml-10 md:flex md:space-x-1">
              <a
                href="/"
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentPage === "home"
                    ? "bg-blue-500/20 text-blue-300 shadow-lg shadow-blue-500/25"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                홈
              </a>
              <a
                href="/shop"
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentPage === "shop"
                    ? "bg-purple-500/20 text-purple-300 shadow-lg shadow-purple-500/25"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                컴포넌트 상점
              </a>
            </nav>
          </div>

          {/* 데스크톱 사용자 메뉴 */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {isLoggedIn && userInfo ? (
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
            ) : (
              <a
                href="/auth/login"
                className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-200 text-sm shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
                </svg>
                GitHub으로 로그인
              </a>
            )}
          </div>

          {/* 모바일 햄버거 메뉴 버튼 */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">메뉴 열기</span>
              {!isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-4 pt-2 pb-3 space-y-2 bg-slate-800/95 backdrop-blur-sm border-t border-purple-500/20">
            {/* 모바일 네비게이션 */}
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
            
            {/* 모바일 사용자 메뉴 */}
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
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    GitHub으로 로그인
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}