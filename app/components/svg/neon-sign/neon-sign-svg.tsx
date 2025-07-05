import type { NeonSignProps } from "./types";

export function NeonSignSVG({ text, subtitle, width, height, theme, animation }: NeonSignProps) {
  const centerX = width / 2;
  const centerY = height / 2;

  // 테마별 색상 설정
  const themes = {
    classic: {
      bg: "#0a0a0a",
      neonColor: "#ff006e",
      neonShadow: "#ff006e80",
      subtitleColor: "#ff69b4",
      borderColor: "#ff1493",
      sparkColor: "#ffff00"
    },
    cyberpunk: {
      bg: "#0d1117",
      neonColor: "#00ffff",
      neonShadow: "#00ffff80", 
      subtitleColor: "#39ff14",
      borderColor: "#00bfff",
      sparkColor: "#ff00ff"
    },
    retro: {
      bg: "#1a0033",
      neonColor: "#ff9500",
      neonShadow: "#ff950080",
      subtitleColor: "#ffff00",
      borderColor: "#ff6600",
      sparkColor: "#ffffff"
    },
    electric: {
      bg: "#000011",
      neonColor: "#4169e1",
      neonShadow: "#4169e180",
      subtitleColor: "#87ceeb",
      borderColor: "#0000ff",
      sparkColor: "#ffffff"
    }
  };

  const currentTheme = themes[theme];

  // 애니메이션 설정
  const getAnimationValues = () => {
    switch (animation) {
      case "flicker":
        return {
          opacity: "1;0.3;1;0.7;1;0.2;1",
          duration: "1.5s"
        };
      case "pulse":
        return {
          opacity: "0.7;1;0.7",
          duration: "2s"
        };
      case "wave":
        return {
          opacity: "0.5;1;0.8;1;0.6;1;0.5",
          duration: "3s"
        };
      default: // steady
        return {
          opacity: "1",
          duration: "0s"
        };
    }
  };

  const animConfig = getAnimationValues();

  return (
    <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* 네온 글로우 효과 */}
        <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* 강한 네온 글로우 */}
        <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="6" result="blur1"/>
          <feGaussianBlur stdDeviation="12" result="blur2"/>
          <feMerge>
            <feMergeNode in="blur2"/>
            <feMergeNode in="blur1"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* 반짝이는 효과 */}
        <filter id="sparkle">
          <feGaussianBlur stdDeviation="1" result="sparkBlur"/>
          <feMerge>
            <feMergeNode in="sparkBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* 배경 그라디언트 */}
        <radialGradient id="bgGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={currentTheme.bg} stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#000000" stopOpacity="1"/>
        </radialGradient>

        {/* 네온 테두리 그라디언트 */}
        <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={currentTheme.borderColor} stopOpacity="0.8"/>
          <stop offset="50%" stopColor={currentTheme.neonColor} stopOpacity="1"/>
          <stop offset="100%" stopColor={currentTheme.borderColor} stopOpacity="0.8"/>
        </linearGradient>
      </defs>

      {/* 스타일 정의 */}
      <style>
        {`
          .neon-main { 
            font-family: 'Arial Black', sans-serif; 
            font-size: 48px; 
            font-weight: 900; 
            text-anchor: middle;
            fill: ${currentTheme.neonColor};
            stroke: ${currentTheme.neonColor};
            stroke-width: 2;
            filter: url(#strongGlow);
          }
          .neon-subtitle { 
            font-family: 'Arial', sans-serif; 
            font-size: 20px; 
            font-weight: 600; 
            text-anchor: middle;
            fill: ${currentTheme.subtitleColor};
            filter: url(#neonGlow);
          }
          .neon-border {
            fill: none;
            stroke: url(#borderGrad);
            stroke-width: 3;
            filter: url(#neonGlow);
          }
          .sparkle {
            fill: ${currentTheme.sparkColor};
            filter: url(#sparkle);
          }
          
          /* 애니메이션 적용 */
          .animated {
            animation: neonFlicker ${animConfig.duration} infinite ease-in-out;
          }
          
          @keyframes neonFlicker {
            0%, 100% { opacity: ${animConfig.opacity.split(';')[0] || '1'}; }
            ${animation === "flicker" ? `
              20% { opacity: 0.3; }
              40% { opacity: 1; }
              60% { opacity: 0.7; }
              80% { opacity: 0.2; }
            ` : animation === "pulse" ? `
              50% { opacity: 1; }
            ` : animation === "wave" ? `
              16% { opacity: 1; }
              33% { opacity: 0.8; }
              50% { opacity: 1; }
              66% { opacity: 0.6; }
              83% { opacity: 1; }
            ` : ''}
          }
        `}
      </style>

      {/* 배경 */}
      <rect width="100%" height="100%" fill="url(#bgGradient)" />

      {/* 네온 테두리 프레임 */}
      <rect 
        x="20" 
        y="20" 
        width={width - 40} 
        height={height - 40} 
        rx="15"
        className="neon-border animated"
      />

      {/* 코너 장식 */}
      {[
        [30, 30], [width - 30, 30], 
        [30, height - 30], [width - 30, height - 30]
      ].map(([x, y], i) => (
        <g key={i}>
          <circle 
            cx={x} 
            cy={y} 
            r="5" 
            fill={currentTheme.borderColor}
            filter="url(#neonGlow)"
            className="animated"
          />
          <circle 
            cx={x} 
            cy={y} 
            r="2" 
            className="sparkle animated"
          />
        </g>
      ))}

      {/* 반짝이는 파티클들 */}
      {Array.from({ length: 15 }, (_, i) => (
        <circle
          key={i}
          cx={Math.random() * (width - 60) + 30}
          cy={Math.random() * (height - 60) + 30}
          r={Math.random() * 2 + 0.5}
          className="sparkle"
          opacity={Math.random() * 0.8 + 0.2}
        >
          <animate
            attributeName="opacity"
            values={`${Math.random() * 0.3};${Math.random() * 0.9 + 0.5};${Math.random() * 0.3}`}
            dur={`${Math.random() * 2 + 1}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}

      {/* 메인 텍스트 */}
      <text
        x={centerX}
        y={centerY - (subtitle ? 15 : 0)}
        className="neon-main animated"
      >
        {text}
      </text>

      {/* 서브타이틀 */}
      {subtitle && (
        <text
          x={centerX}
          y={centerY + 35}
          className="neon-subtitle animated"
        >
          {subtitle}
        </text>
      )}

      {/* 하단 장식 라인 */}
      <line
        x1={centerX - 80}
        y1={height - 50}
        x2={centerX + 80}
        y2={height - 50}
        stroke={currentTheme.neonColor}
        strokeWidth="2"
        filter="url(#neonGlow)"
        className="animated"
      />

      {/* 전력 표시등 */}
      <g transform={`translate(${width - 60}, 40)`}>
        <circle 
          cx="0" 
          cy="0" 
          r="8" 
          fill={currentTheme.bg}
          stroke={currentTheme.borderColor}
          strokeWidth="2"
        />
        <circle 
          cx="0" 
          cy="0" 
          r="4" 
          fill={currentTheme.neonColor}
          filter="url(#neonGlow)"
          className="animated"
        />
      </g>

      {/* 전선 장식 */}
      <path
        d={`M ${width - 60} 48 Q ${width - 40} 60 ${width - 30} 80`}
        fill="none"
        stroke={currentTheme.borderColor}
        strokeWidth="3"
        opacity="0.6"
      />
    </svg>
  );
}