import type { LoaderFunctionArgs } from "react-router";
import { fetchCompleteGitHubData } from "~/lib/github";

interface DashboardMetrics {
  revenue: number;
  growth: number;
  market: string;
  roi: number;
}

interface DashboardData {
  username: string;
  metrics: DashboardMetrics;
  repositories: any[];
  theme: string;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const username = url.searchParams.get("username");
  const theme = url.searchParams.get("theme") || "corporate";

  if (!username) {
    throw new Response("Username required", { status: 400 });
  }

  try {
    // GitHub 데이터 가져오기
    const githubData = await fetchCompleteGitHubData(username);

    // 비즈니스 메트릭 계산
    const totalStars = githubData.topRepositories.reduce(
      (sum, repo) => sum + repo.stargazers_count,
      0
    );
    const projectCount = githubData.topRepositories.length;
    const mainTech = githubData.topLanguages[0] || "Multi";

    // Corporate 스타일 SVG 생성
    const svg = generateCorporateDashboard({
      username: githubData.userProfile.name || githubData.userProfile.login,
      metrics: {
        revenue: totalStars, // "매출" → 총 스타
        growth: calculateGrowth(githubData), // 성장률
        market: mainTech, // 시장 점유율
        roi: calculateROI(totalStars, projectCount), // ROI
      },
      repositories: githubData.topRepositories.slice(0, 4),
      theme,
    });

    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=86400", // 24시간 캐시
      },
    });
  } catch (error) {
    console.error("Dashboard generation error:", error);
    throw new Response("Error generating dashboard", { status: 500 });
  }
}

/**
 * Corporate Bloomberg Terminal 스타일 대시보드 SVG 생성
 */
function generateCorporateDashboard({
  username,
  metrics,
  repositories,
  theme,
}: DashboardData) {
  const colors = {
    background: "#0F172A", // Dark Navy
    cardBg: "#1E293B", // Slightly lighter
    gold: "#F59E0B", // Gold accent
    green: "#10B981", // Success green
    white: "#F8FAFC", // Text white
    gray: "#94A3B8", // Subtle gray
    border: "#334155", // Border color
  };

  return `
    <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Corporate gradient -->
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:${
            colors.gold
          };stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:${
            colors.gold
          };stop-opacity:0.4" />
        </linearGradient>
        
        <!-- Success gradient -->
        <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:${
            colors.green
          };stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:${
            colors.green
          };stop-opacity:0.4" />
        </linearGradient>
        
        <!-- Professional shadows -->
        <filter id="cardShadow">
          <feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.3"/>
        </filter>
      </defs>
      
      <!-- Background -->
      <rect width="800" height="600" fill="${colors.background}"/>
      
      <!-- Header -->
      <rect x="0" y="0" width="800" height="80" fill="${
        colors.cardBg
      }" filter="url(#cardShadow)"/>
      <text x="40" y="30" font-family="system-ui, -apple-system" font-size="24" font-weight="700" fill="${
        colors.white
      }">
        EXECUTIVE DASHBOARD
      </text>
      <text x="40" y="55" font-family="system-ui, -apple-system" font-size="14" fill="${
        colors.gray
      }">
        ${username} • Performance Analytics • Updated: ${new Date().toLocaleDateString()}
      </text>
      
      <!-- KPI Cards Grid -->
      <!-- Revenue Card -->
      <rect x="40" y="100" width="170" height="120" rx="8" fill="${
        colors.cardBg
      }" stroke="${colors.border}" filter="url(#cardShadow)"/>
      <text x="60" y="125" font-family="system-ui, -apple-system" font-size="12" font-weight="600" fill="${
        colors.gray
      }">REVENUE</text>
      <text x="60" y="155" font-family="system-ui, -apple-system" font-size="32" font-weight="300" fill="${
        colors.gold
      }">
        ${metrics.revenue.toLocaleString()}
      </text>
      <text x="60" y="175" font-family="system-ui, -apple-system" font-size="11" fill="${
        colors.gray
      }">Community Stars</text>
      <rect x="60" y="185" width="${Math.min(
        metrics.revenue / 20,
        120
      )}" height="4" fill="url(#goldGradient)" rx="2"/>
      
      <!-- Growth Card -->
      <rect x="230" y="100" width="170" height="120" rx="8" fill="${
        colors.cardBg
      }" stroke="${colors.border}" filter="url(#cardShadow)"/>
      <text x="250" y="125" font-family="system-ui, -apple-system" font-size="12" font-weight="600" fill="${
        colors.gray
      }">GROWTH</text>
      <text x="250" y="155" font-family="system-ui, -apple-system" font-size="32" font-weight="300" fill="${
        colors.green
      }">
        +${metrics.growth}%
      </text>
      <text x="250" y="175" font-family="system-ui, -apple-system" font-size="11" fill="${
        colors.gray
      }">YoY Performance</text>
      <polygon points="250,185 260,190 250,195" fill="${colors.green}"/>
      <text x="265" y="192" font-family="system-ui, -apple-system" font-size="10" fill="${
        colors.green
      }">Trending Up</text>
      
      <!-- Market Share Card -->
      <rect x="420" y="100" width="170" height="120" rx="8" fill="${
        colors.cardBg
      }" stroke="${colors.border}" filter="url(#cardShadow)"/>
      <text x="440" y="125" font-family="system-ui, -apple-system" font-size="12" font-weight="600" fill="${
        colors.gray
      }">MARKET FOCUS</text>
      <text x="440" y="155" font-family="system-ui, -apple-system" font-size="24" font-weight="500" fill="${
        colors.white
      }">
        ${metrics.market}
      </text>
      <text x="440" y="175" font-family="system-ui, -apple-system" font-size="11" fill="${
        colors.gray
      }">Primary Technology</text>
      <circle cx="560" cy="190" r="8" fill="${colors.gold}" opacity="0.8"/>
      
      <!-- ROI Card -->
      <rect x="610" y="100" width="150" height="120" rx="8" fill="${
        colors.cardBg
      }" stroke="${colors.border}" filter="url(#cardShadow)"/>
      <text x="630" y="125" font-family="system-ui, -apple-system" font-size="12" font-weight="600" fill="${
        colors.gray
      }">ROI</text>
      <text x="630" y="155" font-family="system-ui, -apple-system" font-size="32" font-weight="300" fill="${
        colors.green
      }">
        ${metrics.roi}%
      </text>
      <text x="630" y="175" font-family="system-ui, -apple-system" font-size="11" fill="${
        colors.gray
      }">Return on Investment</text>
      
      <!-- Portfolio Performance Chart -->
      <rect x="40" y="240" width="720" height="200" rx="8" fill="${
        colors.cardBg
      }" stroke="${colors.border}" filter="url(#cardShadow)"/>
      <text x="60" y="265" font-family="system-ui, -apple-system" font-size="16" font-weight="600" fill="${
        colors.white
      }">
        PORTFOLIO PERFORMANCE
      </text>
      <text x="60" y="285" font-family="system-ui, -apple-system" font-size="12" fill="${
        colors.gray
      }">
        Top ${repositories.length} Projects • Performance Metrics
      </text>
      
      <!-- Project Bars -->
      ${repositories
        .map((repo: any, index: number) => {
          const barHeight = Math.max(
            (repo.stargazers_count /
              Math.max(...repositories.map((r: any) => r.stargazers_count))) *
              80,
            8
          );
          const x = 80 + index * 160;
          const y = 400 - barHeight;

          return `
          <!-- Project Bar -->
          <rect x="${x}" y="${y}" width="120" height="${barHeight}" 
                fill="url(#goldGradient)" rx="4"/>
          
          <!-- Project Name -->
          <text x="${
            x + 60
          }" y="420" font-family="system-ui, -apple-system" font-size="11" 
                font-weight="500" fill="${colors.white}" text-anchor="middle">
            ${
              repo.name.length > 12
                ? repo.name.substring(0, 12) + "..."
                : repo.name
            }
          </text>
          
          <!-- Star Count -->
          <text x="${
            x + 60
          }" y="435" font-family="system-ui, -apple-system" font-size="10" 
                fill="${colors.gray}" text-anchor="middle">
            ${repo.stargazers_count} ⭐
          </text>
        `;
        })
        .join("")}
      
      <!-- Footer Status -->
      <rect x="0" y="560" width="800" height="40" fill="${colors.cardBg}"/>
      <circle cx="50" cy="580" r="4" fill="${colors.green}"/>
      <text x="65" y="585" font-family="system-ui, -apple-system" font-size="12" fill="${
        colors.white
      }">
        LIVE • Last updated: ${new Date().toLocaleTimeString()}
      </text>
      
      <text x="700" y="585" font-family="system-ui, -apple-system" font-size="11" fill="${
        colors.gray
      }">
        GitHub Analytics Platform
      </text>
    </svg>
  `;
}

/**
 * 성장률 계산 - GitHub 데이터 기반
 */
function calculateGrowth(githubData: any): number {
  const totalStars = githubData.topRepositories.reduce(
    (sum: number, repo: any) => sum + repo.stargazers_count,
    0
  );
  const avgStarsPerRepo =
    githubData.topRepositories.length > 0
      ? totalStars / githubData.topRepositories.length
      : 0;

  // 저장소당 평균 스타 수를 기반으로 성장률 계산
  const growthRate = Math.min(Math.floor(avgStarsPerRepo * 2) + 10, 85);
  return Math.max(growthRate, 12); // 최소 12%, 최대 85%
}

/**
 * ROI 계산
 */
function calculateROI(totalStars: number, projectCount: number): number {
  if (projectCount === 0) return 0;
  return Math.floor((totalStars / projectCount) * 10); // Stars per project * 10
}
