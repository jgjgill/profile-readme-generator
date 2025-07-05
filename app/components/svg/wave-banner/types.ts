export interface WaveBannerProps {
  title: string;
  subtitle?: string;
  width: number;
  height: number;
  theme: "ocean" | "sunset" | "aurora" | "dark";
}

export interface WaveTheme {
  bg: string;
  wave1: string;
  wave2: string;
  wave3: string;
  title: string;
  subtitle: string;
  accent: string;
}