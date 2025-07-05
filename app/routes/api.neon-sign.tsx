import type { LoaderFunctionArgs } from "react-router";
import { renderToStaticMarkup } from "react-dom/server";
import { NeonSignSVG } from "~/components/svg/neon-sign";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const text = url.searchParams.get("text") || "Hello World";
  const subtitle = url.searchParams.get("subtitle") || "";
  const theme =
    (url.searchParams.get("theme") as
      | "classic"
      | "cyberpunk"
      | "retro"
      | "electric") || "classic";
  const animation =
    (url.searchParams.get("animation") as
      | "steady"
      | "flicker"
      | "pulse"
      | "wave") || "steady";

  if (!text) {
    return new Response("Text parameter is required", { status: 400 });
  }

  try {
    // SVG 크기 설정
    const svgWidth = 600;
    const svgHeight = 250;

    // JSX로 SVG 생성
    const svg = renderToStaticMarkup(
      <NeonSignSVG
        text={text}
        subtitle={subtitle}
        width={svgWidth}
        height={svgHeight}
        theme={theme}
        animation={animation}
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
    console.error("Neon Sign Generation Error:", error);
    return new Response("Failed to generate neon sign", { status: 500 });
  }
}
