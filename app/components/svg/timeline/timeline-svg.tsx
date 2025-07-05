import type { TimelineSVGProps } from "./types";
import { TimelineGradients } from "./gradients";
import { TimelineTitle } from "./title";
import { TimelineLine } from "./line";
import { TimelineItemComponent } from "./item";
import { TimelineEndPoint } from "./endpoint";

export function TimelineSVG({ title, items, width, height }: TimelineSVGProps) {
  const centerX = width / 2;

  return (
    <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
      <TimelineGradients />
      
      {/* 배경 */}
      <rect width="100%" height="100%" fill="#ffffff" />
      
      <TimelineTitle title={title} centerX={centerX} />
      <TimelineLine centerX={centerX} height={height} />
      
      {items.map((item, index) => (
        <TimelineItemComponent 
          key={index}
          item={item} 
          index={index} 
          centerX={centerX}
        />
      ))}
      
      <TimelineEndPoint centerX={centerX} height={height} />
    </svg>
  );
}