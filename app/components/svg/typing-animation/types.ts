export interface TypingText {
  text: string;
  delay: number;
}

export interface TypingAnimationProps {
  prefix: string;
  typingTexts: TypingText[];
  speed: number;
  theme: "default" | "gradient" | "terminal" | "neon";
  width: number;
  height: number;
}