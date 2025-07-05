import type { WaveBannerProps } from "./types";

export function WaveBannerSVG({
  title,
  subtitle,
  width,
  height,
  theme,
}: WaveBannerProps) {
  const centerX = width / 2;
  const centerY = height / 2;

  // 테마별 색상 설정
  const themes = {
    ocean: {
      bg: "url(#oceanBg)",
      wave1: "#0ea5e9",
      wave2: "#0284c7",
      wave3: "#0369a1",
      title: "#ffffff",
      subtitle: "#e0f2fe",
      accent: "#38bdf8",
    },
    sunset: {
      bg: "url(#sunsetBg)",
      wave1: "#f97316",
      wave2: "#ea580c",
      wave3: "#dc2626",
      title: "#ffffff",
      subtitle: "#fed7aa",
      accent: "#fbbf24",
    },
    aurora: {
      bg: "url(#auroraBg)",
      wave1: "#8b5cf6",
      wave2: "#7c3aed",
      wave3: "#6d28d9",
      title: "#ffffff",
      subtitle: "#e9d5ff",
      accent: "#a78bfa",
    },
    dark: {
      bg: "url(#darkBg)",
      wave1: "#374151",
      wave2: "#4b5563",
      wave3: "#6b7280",
      title: "#f9fafb",
      subtitle: "#d1d5db",
      accent: "#60a5fa",
    },
  };

  const currentTheme = themes[theme];

  // 파도 경로 생성 함수
  const generateWavePath = (
    amplitude: number,
    frequency: number,
    phase: number
  ) => {
    const points = [];
    const stepSize = 10;

    for (let x = 0; x <= width; x += stepSize) {
      const y =
        amplitude * Math.sin((x / width) * frequency * Math.PI * 2 + phase) +
        height * 0.7;
      points.push(`${x},${y}`);
    }

    // 파도 하단 닫기
    points.push(`${width},${height}`);
    points.push(`0,${height}`);

    return `M ${points.join(" L ")} Z`;
  };

  return (
    <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* 배경 그라디언트들 */}
        <linearGradient id="oceanBg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0c4a6e" />
          <stop offset="100%" stopColor="#075985" />
        </linearGradient>

        <linearGradient id="sunsetBg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7c2d12" />
          <stop offset="50%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#fed7aa" />
        </linearGradient>

        <linearGradient id="auroraBg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e1b4b" />
          <stop offset="50%" stopColor="#4c1d95" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>

        <linearGradient id="darkBg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#111827" />
          <stop offset="100%" stopColor="#374151" />
        </linearGradient>

        {/* 글로우 효과 */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* 텍스트 그림자 */}
        <filter id="textShadow">
          <feDropShadow
            dx="2"
            dy="2"
            stdDeviation="3"
            floodColor="rgba(0,0,0,0.5)"
          />
        </filter>

        {/* 파도 애니메이션 */}
        <animateTransform
          id="waveAnimation"
          attributeName="transform"
          type="translate"
          values="0,0; 50,0; 0,0"
          dur="4s"
          repeatCount="indefinite"
        />
      </defs>

      {/* 스타일 정의 */}
      <style>
        {`
          .wave-title { 
            font-family: 'Arial', sans-serif; 
            font-size: 32px; 
            font-weight: 700; 
            text-anchor: middle;
          }
          .wave-subtitle { 
            font-family: 'Arial', sans-serif; 
            font-size: 18px; 
            font-weight: 400; 
            text-anchor: middle;
          }
          .wave-layer {
            opacity: 0.8;
          }
          .wave-layer:nth-child(1) {
            animation: wave1 6s ease-in-out infinite;
          }
          .wave-layer:nth-child(2) {
            animation: wave2 8s ease-in-out infinite reverse;
          }
          .wave-layer:nth-child(3) {
            animation: wave3 10s ease-in-out infinite;
          }
          
          @keyframes wave1 {
            0%, 100% { transform: translateX(0px); }
            50% { transform: translateX(-20px); }
          }
          
          @keyframes wave2 {
            0%, 100% { transform: translateX(0px); }
            50% { transform: translateX(30px); }
          }
          
          @keyframes wave3 {
            0%, 100% { transform: translateX(0px); }
            50% { transform: translateX(-15px); }
          }
        `}
      </style>

      {/* 배경 */}
      <rect width="100%" height="100%" fill={currentTheme.bg} />

      {/* 장식 원들 (별처럼) */}
      {Array.from({ length: 20 }, (_, i) => (
        <circle
          key={i}
          cx={Math.random() * width}
          cy={Math.random() * height * 0.4}
          r={Math.random() * 3 + 1}
          fill={currentTheme.accent}
          opacity={Math.random() * 0.6 + 0.2}
          className="glow"
        >
          <animate
            attributeName="opacity"
            values={`${Math.random() * 0.6 + 0.2};${
              Math.random() * 0.8 + 0.4
            };${Math.random() * 0.6 + 0.2}`}
            dur={`${Math.random() * 3 + 2}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}

      {/* 파도 레이어들 */}
      <g className="wave-layers">
        <path
          className="wave-layer"
          d={generateWavePath(15, 2, 0)}
          fill={currentTheme.wave1}
          opacity="0.6"
        />
        <path
          className="wave-layer"
          d={generateWavePath(20, 1.5, Math.PI / 3)}
          fill={currentTheme.wave2}
          opacity="0.7"
        />
        <path
          className="wave-layer"
          d={generateWavePath(25, 1, Math.PI / 2)}
          fill={currentTheme.wave3}
          opacity="0.8"
        />
      </g>

      {/* 텍스트 컨테이너 */}
      <g transform={`translate(${centerX}, ${centerY - 30})`}>
        {/* 메인 타이틀 */}
        <text
          className="wave-title"
          fill={currentTheme.title}
          filter="url(#textShadow)"
        >
          {title}
        </text>

        {/* 서브타이틀 */}
        {subtitle && (
          <text
            className="wave-subtitle"
            fill={currentTheme.subtitle}
            y="40"
            filter="url(#textShadow)"
          >
            {subtitle}
          </text>
        )}
      </g>

      {/* 장식 라인 */}
      <line
        x1={centerX - 100}
        y1={centerY + 30}
        x2={centerX + 100}
        y2={centerY + 30}
        stroke={currentTheme.accent}
        strokeWidth="2"
        opacity="0.8"
        filter="url(#glow)"
      >
        <animate
          attributeName="stroke-width"
          values="2;4;2"
          dur="3s"
          repeatCount="indefinite"
        />
      </line>
    </svg>
  );
}
