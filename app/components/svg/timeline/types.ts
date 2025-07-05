export interface TimelineItem {
  period: string;
  content: string;
  direction: "left" | "right";
  color: "blue" | "green" | "purple" | "orange";
}

export interface ColorScheme {
  primary: string;
  light: string;
  bg: string;
}

export interface TimelineSVGProps {
  title: string;
  items: TimelineItem[];
  width: number;
  height: number;
}

export interface TimelineTitleProps {
  title: string;
  centerX: number;
}

export interface TimelineLineProps {
  centerX: number;
  height: number;
}

export interface TimelineItemProps {
  item: TimelineItem;
  index: number;
  centerX: number;
}

export interface TimelineEndPointProps {
  centerX: number;
  height: number;
}