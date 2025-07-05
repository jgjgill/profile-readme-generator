import type { LoaderFunctionArgs } from "react-router";
import { renderToStaticMarkup } from "react-dom/server";
import { WaveBannerSVG } from "~/components/svg/wave-banner";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const title = url.searchParams.get("title") || "Welcome";
  const subtitle = url.searchParams.get("subtitle") || "";
  const theme = (url.searchParams.get("theme") as "ocean" | "sunset" | "aurora" | "dark") || "ocean";
  
  if (!title) {
    return new Response("Title parameter is required", { status: 400 });
  }

  try {
    // SVG 크기 설정
    const svgWidth = 600;
    const svgHeight = 300;

    // JSX로 SVG 생성
    const svg = renderToStaticMarkup(
      <WaveBannerSVG 
        title={title}
        subtitle={subtitle}
        width={svgWidth}
        height={svgHeight}
        theme={theme}
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
    console.error("Wave Banner Generation Error:", error);
    return new Response("Failed to generate wave banner", { status: 500 });
  }
}