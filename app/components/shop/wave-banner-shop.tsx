import { useState, useMemo } from "react";
import CopyButton from "~/components/copy-button";
import { useDebounce } from "~/lib/hooks/useDebounce";
import type { WaveBannerProps } from "~/components/svg/wave-banner/types";

type WaveBannerConfig = {
  title: string;
  subtitle: string;
  theme: WaveBannerProps["theme"];
};

interface WaveBannerShopProps {
  origin: string;
}

const WAVE_THEMES = [
  {
    value: "ocean" as const,
    name: "바다",
    color: "bg-blue-500",
    desc: "시원한 바다 테마",
  },
  {
    value: "sunset" as const,
    name: "석양",
    color: "bg-orange-500",
    desc: "따뜻한 석양 테마",
  },
  {
    value: "aurora" as const,
    name: "오로라",
    color: "bg-purple-500",
    desc: "신비로운 오로라 테마",
  },
  {
    value: "dark" as const,
    name: "다크",
    color: "bg-gray-700",
    desc: "고급스러운 다크 테마",
  },
];

export function WaveBannerShop({ origin }: WaveBannerShopProps) {
  const [config, setConfig] = useState<WaveBannerConfig>({
    title: "Welcome to My Profile",
    subtitle: "Frontend Developer",
    theme: "ocean",
  });

  // Debounced values for API optimization
  const debouncedConfig = useDebounce(config, 500);

  const generateUrl = useMemo(() => {
    const params = new URLSearchParams({
      title: debouncedConfig.title,
      subtitle: debouncedConfig.subtitle,
      theme: debouncedConfig.theme,
    });
    return `/api/wave-banner?${params.toString()}`;
  }, [debouncedConfig]);

  const generateMarkdown = useMemo(() => {
    const url = `${origin}${generateUrl}`;
    return `![${debouncedConfig.title}](${url})`;
  }, [origin, generateUrl, debouncedConfig.title]);

  return (
    <div className="space-y-6">
      {/* 파도 배너 설정 */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          파도 애니메이션 배너 생성
        </h2>

        {/* 제목 및 서브타이틀 설정 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              메인 타이틀
            </label>
            <input
              type="text"
              value={config.title}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="예: Welcome to My Profile, 안녕하세요!"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              서브타이틀
            </label>
            <input
              type="text"
              value={config.subtitle}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  subtitle: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="예: Frontend Developer, 백엔드 개발자"
            />
          </div>
        </div>

        {/* 테마 선택 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            테마 선택
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {WAVE_THEMES.map((theme) => (
              <button
                key={theme.value}
                onClick={() =>
                  setConfig((prev) => ({
                    ...prev,
                    theme: theme.value,
                  }))
                }
                className={`p-3 rounded-lg border-2 transition-all ${
                  config.theme === theme.value
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div
                  className={`w-full h-8 rounded mb-2 ${theme.color}`}
                ></div>
                <div className="text-sm font-medium text-gray-900">
                  {theme.name}
                </div>
                <div className="text-xs text-gray-600">
                  {theme.desc}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 미리보기 */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          미리보기
        </h3>
        <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
          {origin && (
            <img
              src={`${origin}${generateUrl}`}
              alt={debouncedConfig.title}
              className="mx-auto max-w-full h-auto rounded-lg shadow-sm"
            />
          )}
        </div>
      </div>

      {/* 마크다운 코드 */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          README에 추가하기
        </h3>
        <div className="relative">
          <textarea
            readOnly
            value={generateMarkdown}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
            rows={3}
          />
          <div className="absolute top-2 right-2">
            <CopyButton
              text={generateMarkdown || ""}
              sectionName="component-markdown"
              label="복사"
              size="sm"
              variant="primary"
            />
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          위 마크다운 코드를 복사해서 GitHub README.md 파일에
          붙여넣으세요.
        </p>
      </div>
    </div>
  );
}