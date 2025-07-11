interface DesktopNavProps {
  currentPage: "home" | "shop";
}

export function DesktopNav({ currentPage }: DesktopNavProps) {
  return (
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
  );
}