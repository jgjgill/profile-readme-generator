import { useState, useEffect } from "react";
import { Header } from "~/components/header";
import { ComponentSidebar } from "~/components/shop/component-sidebar";
import { TimelineShop } from "~/components/shop/timeline-shop";
import { WaveBannerShop } from "~/components/shop/wave-banner-shop";
import { NeonSignShop } from "~/components/shop/neon-sign-shop";

type ComponentType = "timeline" | "wave-banner" | "neon-sign";

export default function ComponentShop() {
  const [activeComponent, setActiveComponent] =
    useState<ComponentType>("timeline");
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header currentPage="shop" />

      {/* 배경 애니메이션 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* 페이지 타이틀 */}
      <div className="relative z-10 bg-gradient-to-r from-slate-800/80 to-purple-800/80 border-b border-purple-500/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              컴포넌트 상점
            </h1>
            <p className="text-gray-300 mt-3 text-lg">
              README에 추가할 수 있는 다양한 컴포넌트를 생성하고
              커스터마이징하세요
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 사이드바 - 컴포넌트 목록 */}
          <div className="lg:col-span-1">
            <ComponentSidebar
              activeComponent={activeComponent}
              onComponentChange={setActiveComponent}
            />
          </div>

          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-3">
            {activeComponent === "timeline" && <TimelineShop origin={origin} />}
            {activeComponent === "wave-banner" && (
              <WaveBannerShop origin={origin} />
            )}
            {activeComponent === "neon-sign" && (
              <NeonSignShop origin={origin} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
