import type { TimelineTitleProps } from "./types";

export function TimelineTitle({ title, centerX }: TimelineTitleProps) {
  return (
    <text 
      x={centerX} 
      y="40" 
      textAnchor="middle" 
      className="timeline-title" 
      fill="#1f2937"
    >
      {title}
    </text>
  );
}