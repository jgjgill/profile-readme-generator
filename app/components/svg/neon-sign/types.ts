export interface NeonSignProps {
  text: string;
  subtitle?: string;
  width: number;
  height: number;
  theme: "classic" | "cyberpunk" | "retro" | "electric";
  animation: "steady" | "flicker" | "pulse" | "wave";
}

export interface NeonTheme {
  bg: string;
  neonColor: string;
  neonShadow: string;
  subtitleColor: string;
  borderColor: string;
  sparkColor: string;
}