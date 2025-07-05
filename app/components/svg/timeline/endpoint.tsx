import type { TimelineEndPointProps } from "./types";

export function TimelineEndPoint({ centerX, height }: TimelineEndPointProps) {
  return (
    <circle 
      cx={centerX} 
      cy={height - 30} 
      r="6" 
      fill="#d1d5db"
    />
  );
}