import { useState } from "react";
import type { ProcessedGitHubData, TechExpertData } from "~/lib/types/github";
import type { ReadmeTemplate } from "~/lib/types/template";
import { generateDashboardTemplate } from "~/lib/template/generators/v2-dashboard";
import { generateRPGTemplate } from "~/lib/template/generators/v2-rpg";
import { generateMagazineTemplate } from "~/lib/template/generators/v2-magazine";
import { generateCertificateTemplate } from "~/lib/template/generators/v2-certificate";
import ReadmeOutput from "./readme-output";

interface TemplateSelectorProps {
  githubData: ProcessedGitHubData;
  techExpertData: TechExpertData;
}

type TemplateType = "dashboard" | "rpg" | "magazine" | "certificate";

interface TemplateOption {
  id: TemplateType;
  name: string;
  description: string;
  icon: string;
  concept: string;
  features: string[];
  theme: {
    primaryColor: string;
    style: string;
  };
}

const templateOptions: TemplateOption[] = [
  {
    id: "dashboard",
    name: "📊 비즈니스 대시보드",
    description: "경영진이 보는 성과 대시보드처럼 GitHub 데이터를 표현",
    icon: "📊",
    concept: "KPI 중심",
    features: ["비즈니스 메트릭", "성과 지표", "ROI 분석", "포트폴리오 다양성"],
    theme: {
      primaryColor: "#1E40AF",
      style: "corporate",
    },
  },
  {
    id: "rpg",
    name: "🎮 RPG 캐릭터 시트",
    description: "개발자를 RPG 캐릭터로, GitHub 활동을 게임 스탯으로 표현",
    icon: "🎮",
    concept: "게이미피케이션",
    features: ["레벨 시스템", "업적 달성", "스킬 트리", "경험치 획득"],
    theme: {
      primaryColor: "#7C3AED",
      style: "fantasy",
    },
  },
  {
    id: "magazine",
    name: "📰 기술 매거진 인터뷰",
    description: "기술 매거진의 개발자 프로필 기사처럼 작성",
    icon: "📰",
    concept: "스토리텔링",
    features: ["헤드라인 기사", "프로젝트 스토리", "인포그래픽", "성공 사례"],
    theme: {
      primaryColor: "#059669",
      style: "editorial",
    },
  },
  {
    id: "certificate",
    name: "🏛️ 공식 개발자 증명서",
    description: "학위증명서나 자격증처럼 공식적이고 격식있는 문서",
    icon: "🏛️",
    concept: "공문서 양식",
    features: ["자격 증명", "공인 기관", "정량적 성과", "발급 일자"],
    theme: {
      primaryColor: "#374151",
      style: "formal",
    },
  },
];

export default function TemplateSelector({
  githubData,
}: TemplateSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateType>("dashboard");
  const [isCompareMode, setIsCompareMode] = useState(false);

  const generateTemplate = (type: TemplateType): ReadmeTemplate => {
    switch (type) {
      case "dashboard":
        return generateDashboardTemplate(githubData);
      case "rpg":
        return generateRPGTemplate(githubData);
      case "magazine":
        return generateMagazineTemplate(githubData);
      case "certificate":
        return generateCertificateTemplate(githubData);
      default:
        return generateDashboardTemplate(githubData);
    }
  };

  const selectedTemplateData = generateTemplate(selectedTemplate);

  if (isCompareMode) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">템플릿 비교</h2>
            <button
              onClick={() => setIsCompareMode(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              단일 선택으로 돌아가기
            </button>
          </div>
          <p className="text-gray-600 mt-2">
            4가지 템플릿을 비교해보고 원하는 테마를 선택하세요
          </p>
        </div>

        {/* 2x2 그리드 비교 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {templateOptions.map((option) => {
            const template = generateTemplate(option.id);
            return (
              <div
                key={option.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col"
              >
                {/* 템플릿 헤더 - 컴팩트하게 */}
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex-shrink-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{option.icon}</span>
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">
                          {option.name}
                        </h3>
                        <p className="text-xs text-gray-600">
                          {option.description}
                        </p>
                      </div>
                    </div>
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded flex-shrink-0">
                      {option.concept}
                    </span>
                  </div>

                  {/* 특징 태그들 - 더 작게 */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {option.features.slice(0, 3).map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 text-xs bg-gray-200 text-gray-600 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                    {option.features.length > 3 && (
                      <span className="px-2 py-0.5 text-xs bg-gray-200 text-gray-600 rounded">
                        +{option.features.length - 3}개 더
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setSelectedTemplate(option.id);
                      setIsCompareMode(false);
                    }}
                    className="w-full px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
                  >
                    이 템플릿 선택
                  </button>
                </div>

                {/* 템플릿 미리보기 - 스크롤 가능 */}
                <div className="flex-1 overflow-hidden">
                  <div className="h-96 overflow-y-auto overflow-x-hidden p-2">
                    <div className="transform scale-50 origin-top-left w-[200%]">
                      <ReadmeOutput template={template} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* 추가 예정 카드 */}
          <div className="bg-gray-50 rounded-lg shadow-sm border-2 border-dashed border-gray-300 overflow-hidden flex flex-col">
            {/* 템플릿 헤더 */}
            <div className="bg-gray-100 px-4 py-3 border-b border-gray-300 flex-shrink-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🚀</span>
                  <div>
                    <h3 className="text-base font-semibold text-gray-700">
                      추가 템플릿
                    </h3>
                    <p className="text-xs text-gray-500">
                      더 많은 템플릿이 준비 중입니다
                    </p>
                  </div>
                </div>
                <span className="px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded flex-shrink-0">
                  곧 출시
                </span>
              </div>

              {/* 특징 태그들 */}
              <div className="flex flex-wrap gap-1 mb-2">
                <span className="px-2 py-0.5 text-xs bg-gray-300 text-gray-600 rounded">
                  ???형
                </span>
                <span className="px-2 py-0.5 text-xs bg-gray-300 text-gray-600 rounded">
                  ???형
                </span>
                <span className="px-2 py-0.5 text-xs bg-gray-300 text-gray-600 rounded">
                  ???형
                </span>
              </div>

              <button
                disabled
                className="w-full px-3 py-1.5 text-sm font-medium text-gray-500 bg-gray-300 rounded cursor-not-allowed"
              >
                개발 중...
              </button>
            </div>

            {/* 미리보기 영역 */}
            <div className="flex-1 overflow-hidden">
              <div className="h-96 p-4 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4 text-gray-400">🔧</div>
                  <h4 className="text-lg font-medium text-gray-600 mb-2">
                    개발 중인 템플릿
                  </h4>
                  <p className="text-sm text-gray-500 max-w-xs">
                    사용자 피드백을 바탕으로 더 다양하고 전문적인 템플릿을
                    준비하고 있습니다.
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="h-2 bg-gray-200 rounded overflow-hidden">
                      <div className="h-full bg-blue-500 rounded w-0/4 animate-pulse"></div>
                    </div>
                    <p className="text-xs text-gray-400">ing...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 선택 안내 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-blue-600 text-xl">💡</div>
            <div>
              <h4 className="font-medium text-blue-900">템플릿 선택 팁</h4>
              <p className="text-sm text-blue-700 mt-1">
                각 템플릿의 구성과 스타일을 확인한 후, 자신의 경력과 목표에 가장
                적합한 템플릿을 선택해보세요. 선택 후에도 언제든 다른 템플릿으로
                변경할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">템플릿 선택</h2>
          <button
            onClick={() => setIsCompareMode(true)}
            className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
          >
            모든 템플릿 비교하기
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {templateOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => setSelectedTemplate(option.id)}
              className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                selectedTemplate === option.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="text-center mb-3">
                <div className="text-3xl mb-2">{option.icon}</div>
                <h3 className="font-semibold text-gray-900">{option.name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {option.description}
                </p>
                <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                  {option.concept}
                </span>
              </div>

              <ul className="space-y-1">
                {option.features.map((feature, index) => (
                  <li
                    key={index}
                    className="text-sm text-gray-600 flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* 추가 예정 카드 */}
          <div className="rounded-xl border-2 border-dashed border-white/30 p-6 bg-white/5 backdrop-blur-sm">
            <div className="text-center mb-4">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="font-semibold text-gray-300 text-lg mb-2">
                추가 템플릿
              </h3>
              <p className="text-sm text-gray-400 mb-3 leading-relaxed">
                더 많은 템플릿이 준비 중입니다
              </p>
              <span className="inline-block px-3 py-1 text-xs bg-white/20 text-gray-300 rounded-lg font-medium">
                곧 출시
              </span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-300 mb-2">
            선택된 템플릿:{" "}
            <span className="text-blue-400">
              {templateOptions.find((t) => t.id === selectedTemplate)?.name}
            </span>
          </h3>
          <p className="text-gray-400 mb-4 text-lg leading-relaxed">
            {
              templateOptions.find((t) => t.id === selectedTemplate)
                ?.description
            }
          </p>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
        <ReadmeOutput template={selectedTemplateData} />
      </div>
    </div>
  );
}
