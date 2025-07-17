import type { LoaderFunctionArgs } from "react-router";
import { renderToStaticMarkup } from "react-dom/server";
import {
  TypingAnimationSVG,
  type TypingText,
} from "~/components/svg/typing-animation";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const prefix = url.searchParams.get("prefix") || "Hi, I'm";
  const textsParam = url.searchParams.get("texts");
  const speed = parseInt(url.searchParams.get("speed") || "100");
  const theme =
    (url.searchParams.get("theme") as
      | "default"
      | "gradient"
      | "terminal"
      | "neon") || "default";

  if (!textsParam) {
    return new Response("Texts parameter is required", { status: 400 });
  }

  try {
    // texts 파라미터 파싱: "Frontend Developer,1000;React Enthusiast,1500"
    const typingTexts: TypingText[] = textsParam
      .split(";")
      .map((item) => {
        const [text, delay] = item.split(",");
        return {
          text: text?.trim() || "",
          delay: parseInt(delay?.trim() || "1000"),
        };
      })
      .filter((item) => item.text);

    if (typingTexts.length === 0) {
      return new Response("No valid typing texts found", { status: 400 });
    }

    // SVG 크기 계산
    const maxTextLength = Math.max(
      prefix.length,
      ...typingTexts.map((t) => t.text.length)
    );
    const svgWidth = Math.max(400, (prefix.length + maxTextLength) * 15 + 100);
    const svgHeight = 120;

    // JSX로 SVG 생성
    const svg = renderToStaticMarkup(
      <TypingAnimationSVG
        prefix={prefix}
        typingTexts={typingTexts}
        speed={speed}
        theme={theme}
        width={svgWidth}
        height={svgHeight}
      />
    );

    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600", // 1시간 캐시
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Typing Animation Generation Error:", error);
    return new Response("Failed to generate typing animation", { status: 500 });
  }
}
