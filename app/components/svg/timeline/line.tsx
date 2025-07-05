import type { TimelineLineProps } from "./types";

export function TimelineLine({ centerX, height }: TimelineLineProps) {
  return (
    <line 
      x1={centerX} 
      y1="70" 
      x2={centerX} 
      y2={height - 30} 
      className="timeline-line"
    />
  );
}