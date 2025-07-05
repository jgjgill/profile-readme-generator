import type { LoaderFunctionArgs } from "react-router";
import { renderToStaticMarkup } from "react-dom/server";
import { TimelineSVG, type TimelineItem } from "~/components/svg/timeline";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const itemsParam = url.searchParams.get("items");
  const title = url.searchParams.get("title") || "My Journey";
  
  if (!itemsParam) {
    return new Response("Items parameter is required", { status: 400 });
  }

  try {
    // items 파라미터 파싱: "2023.03,React입문,left,blue;2024.06,프로젝트완성,right,green"
    const items: TimelineItem[] = itemsParam.split(";").map(item => {
      const [period, content, direction, color] = item.split(",");
      return {
        period: period?.trim() || "",
        content: content?.trim() || "",
        direction: (direction?.trim() as "left" | "right") || "left",
        color: (color?.trim() as "blue" | "green" | "purple" | "orange") || "blue"
      };
    }).filter(item => item.period && item.content);

    if (items.length === 0) {
      return new Response("No valid timeline items found", { status: 400 });
    }

    // SVG 크기 계산
    const svgHeight = Math.max(300, items.length * 120 + 100);
    const svgWidth = 600;

    // JSX로 SVG 생성
    const svg = renderToStaticMarkup(
      <TimelineSVG 
        title={title}
        items={items}
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
    console.error("Timeline Generation Error:", error);
    return new Response("Failed to generate timeline", { status: 500 });
  }
}