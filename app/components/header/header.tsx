import { useState } from "react";
import { Logo } from "./logo";
import { DesktopNav } from "./desktop-nav";
import { UserMenu } from "./user-menu";
import { MobileNav } from "./mobile-nav";
import { HamburgerButton } from "./hamburger-button";

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

export function Header({
  currentPage,
  isLoggedIn = false,
  userInfo = null,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 backdrop-blur-sm border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Logo />
            <DesktopNav currentPage={currentPage} />
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <UserMenu isLoggedIn={isLoggedIn} userInfo={userInfo} />
          </div>

          <HamburgerButton
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>
      </div>

      <MobileNav
        currentPage={currentPage}
        isLoggedIn={isLoggedIn}
        userInfo={userInfo}
        isOpen={isMobileMenuOpen}
      />
    </header>
  );
}
