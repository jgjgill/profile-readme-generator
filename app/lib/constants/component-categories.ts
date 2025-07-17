export interface ComponentCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: "available" | "coming-soon";
}

export const COMPONENT_CATEGORIES: ComponentCategory[] = [
  {
    id: "timeline",
    name: "타임라인 컴포넌트",
    description: "개인 경력과 프로젝트 여정을 시각적으로 표현",
    icon: "📅",
    status: "available" as const,
  },
  {
    id: "wave-banner",
    name: "파도 애니메이션 배너",
    description: "흐르는 파도 효과와 함께 이름/타이틀을 멋지게 표시",
    icon: "🌊",
    status: "available" as const,
  },
  {
    id: "neon-sign",
    name: "네온 사인 텍스트",
    description: "80년대 레트로 네온 효과로 깜빡이고 빛나는 텍스트",
    icon: "✨",
    status: "available" as const,
  },
  {
    id: "typing-animation",
    name: "타이핑 애니메이션",
    description: "타이핑 효과로 동적인 자기소개 표시",
    icon: "⌨️",
    status: "available" as const,
  },
  {
    id: "github-stats",
    name: "GitHub 통계 카드",
    description: "커밋, 스타, PR 통계를 한눈에 보여주는 카드",
    icon: "📊",
    status: "coming-soon" as const,
  },
  {
    id: "tech-stack",
    name: "기술 스택 배지",
    description: "사용 중인 기술들을 깔끔한 배지로 표시",
    icon: "💻",
    status: "coming-soon" as const,
  },
];
