import { useState, useMemo } from "react";
import CopyButton from "~/components/copy-button";
import { useDebounce } from "~/lib/hooks/useDebounce";
import type { NeonSignProps } from "~/components/svg/neon-sign/types";

type NeonSignConfig = {
  text: string;
  subtitle: string;
  theme: NeonSignProps["theme"];
  animation: NeonSignProps["animation"];
};

interface NeonSignShopProps {
  origin: string;
}

const NEON_THEMES = [
  {
    value: "classic" as const,
    name: "클래식",
    color: "bg-pink-500",
    desc: "핑크 네온",
  },
  {
    value: "cyberpunk" as const,
    name: "사이버펑크",
    color: "bg-cyan-500",
    desc: "청록 네온",
  },
  {
    value: "retro" as const,
    name: "레트로",
    color: "bg-orange-500",
    desc: "오렌지 네온",
  },
  {
    value: "electric" as const,
    name: "일렉트릭",
    color: "bg-blue-500",
    desc: "블루 네온",
  },
];

const NEON_ANIMATIONS = [
  { value: "steady" as const, name: "고정", desc: "깜빡임 없음" },
  {
    value: "flicker" as const,
    name: "깜빡임",
    desc: "불규칙한 깜빡임",
  },
  { value: "pulse" as const, name: "맥박", desc: "부드러운 맥박" },
  { value: "wave" as const, name: "파도", desc: "물결치듯 변화" },
];

export function NeonSignShop({ origin }: NeonSignShopProps) {
  const [config, setConfig] = useState<NeonSignConfig>({
    text: "DEVELOPER",
    subtitle: "CODING ALL NIGHT",
    theme: "classic",
    animation: "steady",
  });

  // Debounced values for API optimization
  const debouncedConfig = useDebounce(config, 500);

  const generateUrl = useMemo(() => {
    const params = new URLSearchParams({
      text: debouncedConfig.text,
      subtitle: debouncedConfig.subtitle,
      theme: debouncedConfig.theme,
      animation: debouncedConfig.animation,
    });
    return `/api/neon-sign?${params.toString()}`;
  }, [debouncedConfig]);

  const generateMarkdown = useMemo(() => {
    const url = `${origin}${generateUrl}`;
    return `![${debouncedConfig.text}](${url})`;
  }, [origin, generateUrl, debouncedConfig.text]);

  return (
    <div className="space-y-6">
      {/* 네온 사인 설정 */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          네온 사인 텍스트 생성
        </h2>

        {/* 텍스트 설정 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              메인 텍스트
            </label>
            <input
              type="text"
              value={config.text}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  text: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="예: DEVELOPER, CODER, 개발자"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              서브 텍스트
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
              placeholder="예: CODING ALL NIGHT, 24/7"
            />
          </div>
        </div>

        {/* 테마 선택 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            네온 테마
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {NEON_THEMES.map((theme) => (
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

        {/* 애니메이션 선택 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            애니메이션 효과
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {NEON_ANIMATIONS.map((anim) => (
              <button
                key={anim.value}
                onClick={() =>
                  setConfig((prev) => ({
                    ...prev,
                    animation: anim.value,
                  }))
                }
                className={`p-3 rounded-lg border-2 transition-all ${
                  config.animation === anim.value
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="text-sm font-medium text-gray-900 mb-1">
                  {anim.name}
                </div>
                <div className="text-xs text-gray-600">
                  {anim.desc}
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
        <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
          {origin && (
            <img
              src={`${origin}${generateUrl}`}
              alt={debouncedConfig.text}
              className="mx-auto max-w-full h-auto rounded-lg"
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