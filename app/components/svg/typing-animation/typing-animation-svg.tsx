import type { TypingAnimationProps } from "./types";

export function TypingAnimationSVG({
  prefix,
  typingTexts,
  speed,
  theme,
  width,
  height,
}: TypingAnimationProps) {
  // 테마별 스타일 정의
  const themeConfig = {
    default: {
      background: "#ffffff",
      textColor: "#1f2937",
      fontFamily: "Inter, system-ui, sans-serif",
      fontSize: "24"
    },
    gradient: {
      background: "#ffffff",
      textColor: "url(#gradientText)",
      fontFamily: "Inter, system-ui, sans-serif",
      fontSize: "24"
    },
    terminal: {
      background: "#0f172a",
      textColor: "#22c55e",
      fontFamily: "JetBrains Mono, Consolas, monospace",
      fontSize: "20"
    },
    neon: {
      background: "#0f0f23",
      textColor: "#00ffff",
      fontFamily: "Orbitron, monospace",
      fontSize: "22"
    }
  };

  const currentTheme = themeConfig[theme];

  // 애니메이션 계산
  let totalDuration = 0;
  const animations = typingTexts.map((item) => {
    const typingDuration = item.text.length * speed;
    const startTime = totalDuration;
    totalDuration += typingDuration + item.delay;
    
    return {
      text: item.text,
      startTime,
      typingDuration,
      endTime: startTime + typingDuration,
      delay: item.delay
    };
  });


  // 애니메이션 키프레임 생성
  const generateAnimationKeyframes = () => {
    const keyframes = animations.map((anim, index) => {
      const startPercent = (anim.startTime / totalDuration) * 100;
      const endPercent = (anim.endTime / totalDuration) * 100;
      const hidePercent = (((anim.endTime + anim.delay) / totalDuration) * 100);
      
      return `
        @keyframes typing-${index} {
          0% { opacity: 0; }
          ${startPercent.toFixed(2)}% { opacity: 0; }
          ${endPercent.toFixed(2)}% { opacity: 1; }
          ${hidePercent.toFixed(2)}% { opacity: 0; }
          100% { opacity: 0; }
        }
        .typing-text-${index} {
          animation: typing-${index} ${totalDuration}ms infinite;
        }
      `;
    }).join("\n");

    return `
      .typing-container {
        font-family: ${currentTheme.fontFamily};
        font-size: ${currentTheme.fontSize}px;
        font-weight: 600;
      }
      
      .prefix-text {
        fill: ${currentTheme.textColor};
        ${theme === "neon" ? "filter: url(#neonGlow);" : ""}
      }
      
      .typing-text {
        fill: ${currentTheme.textColor};
        opacity: 0;
        ${theme === "neon" ? "filter: url(#neonGlow);" : ""}
      }
      
      
      ${keyframes}
    `;
  };

  const textX = 50;
  const textY = height / 2 + 8;
  const prefixWidth = prefix.length * (parseInt(currentTheme.fontSize) * 0.6);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ background: currentTheme.background }}
    >
      <defs>
        {/* 그라디언트 정의 */}
        {theme === "gradient" && (
          <linearGradient id="gradientText" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff0080" stopOpacity="1" />
            <stop offset="25%" stopColor="#ff8c00" stopOpacity="1" />
            <stop offset="50%" stopColor="#40e0d0" stopOpacity="1" />
            <stop offset="75%" stopColor="#ff0080" stopOpacity="1" />
            <stop offset="100%" stopColor="#7b68ee" stopOpacity="1" />
          </linearGradient>
        )}
        
        {/* 네온 효과 정의 */}
        {theme === "neon" && (
          <filter id="neonGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        )}
      </defs>

      <style>{generateAnimationKeyframes()}</style>
      
      <g className="typing-container">
        {/* 고정 텍스트 (prefix) */}
        <text
          x={textX}
          y={textY}
          className="prefix-text"
          textAnchor="start"
          fontSize={currentTheme.fontSize}
          fontFamily={currentTheme.fontFamily}
          fill={currentTheme.textColor}
        >
          {prefix}
        </text>
        
        {/* 타이핑되는 텍스트들 */}
        {animations.map((anim, index) => (
          <text
            key={index}
            x={textX + prefixWidth + 10}
            y={textY}
            className={`typing-text typing-text-${index}`}
            textAnchor="start"
            fontSize={currentTheme.fontSize}
            fontFamily={currentTheme.fontFamily}
            fill={currentTheme.textColor}
          >
            {anim.text}
          </text>
        ))}
        
      </g>
    </svg>
  );
}