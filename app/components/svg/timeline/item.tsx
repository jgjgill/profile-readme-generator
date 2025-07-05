import type { TimelineItemProps } from "./types";
import { colorSchemes } from "./constants";

export function TimelineItemComponent({ item, index, centerX }: TimelineItemProps) {
  const y = 100 + index * 120;
  const isLeft = item.direction === "left";
  const contentX = isLeft ? centerX - 30 : centerX + 30;
  const textAnchor = isLeft ? "end" : "start";
  const yearX = isLeft ? centerX - 40 : centerX + 40;
  const cardX = isLeft ? contentX - 200 : contentX;
  const colorScheme = colorSchemes[item.color];

  return (
    <g>
      {/* 타임라인 포인트 */}
      <circle 
        cx={centerX} 
        cy={y} 
        r="8" 
        fill={`url(#gradient-${item.color})`} 
        stroke="#ffffff" 
        strokeWidth="3"
      />
      
      {/* 연결선 */}
      <line 
        x1={centerX} 
        y1={y} 
        x2={contentX} 
        y2={y} 
        stroke={colorScheme.primary} 
        strokeWidth="2"
      />
      
      {/* 시기 */}
      <text 
        x={yearX} 
        y={y - 20} 
        textAnchor={textAnchor} 
        className="year-text" 
        fill={colorScheme.primary}
      >
        {item.period}
      </text>
      
      {/* 콘텐츠 카드 */}
      <rect 
        x={cardX} 
        y={y + 10} 
        width="180" 
        height="50" 
        rx="8" 
        fill={colorScheme.bg} 
        stroke={colorScheme.light} 
        strokeWidth="1"
      />
      
      {/* 콘텐츠 텍스트 */}
      <text 
        x={cardX + 90} 
        y={y + 32} 
        textAnchor="middle"
        className="content-text" 
        fill="#374151"
        fontSize="12"
        fontFamily="'Segoe UI', Ubuntu, sans-serif"
      >
        {item.content.length > 22 ? `${item.content.slice(0, 22)}...` : item.content}
      </text>
    </g>
  );
}