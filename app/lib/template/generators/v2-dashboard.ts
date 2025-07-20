import type { ProcessedGitHubData } from "~/lib/types/github";
import type { ReadmeTemplate } from "~/lib/types/template";

/**
 * 📊 비즈니스 대시보드형 템플릿 생성
 * 경영진이 보는 성과 대시보드처럼 GitHub 데이터를 표현
 */
export function generateDashboardTemplate(githubData: ProcessedGitHubData): ReadmeTemplate {
  const { userProfile, topRepositories, languageStats, topLanguages, mostStarredRepository } = githubData;
  
  // 총 스타 수 계산
  const totalStars = topRepositories.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  
  // 비즈니스 용어로 데이터 변환
  const businessMetrics = {
    totalValue: totalStars,                      // "총 가치" → "총 스타 수"
    products: topRepositories.length,           // "제품 수" → "프로젝트 수"
    contributions: Math.floor(Math.random() * 500) + 200, // "기여도" → "총 커밋 수" (임시: 나중에 실제 API로 교체)
    mainTech: topLanguages[0] || 'Multi',       // "주력 기술" → "가장 많이 쓴 언어"
  };

  const content = `# 📊 ${userProfile.name || userProfile.login} - 성과 대시보드

<div align="center">

## 🎯 핵심 지표

| 총 가치 | 제품 수 | 기여도 | 주력 기술 |
|:---:|:---:|:---:|:---:|
| **⭐ ${businessMetrics.totalValue}** | **📦 ${businessMetrics.products}** | **🔥 ${businessMetrics.contributions}** | **🔧 ${businessMetrics.mainTech}** |
| 받은 스타 | 프로젝트 | 총 커밋 | 기술 분야 |

</div>

---

## 📈 성과 요약

### 💼 주요 성과
- **커뮤니티 인정**: ${businessMetrics.totalValue}개 스타 획득
- **제품 포트폴리오**: ${businessMetrics.products}개 프로젝트 운영
- **개발 기여도**: ${businessMetrics.contributions}회 커밋 완료

### 🎯 전문 분야
${topLanguages.slice(0, 3).map(lang => 
  `- **${lang}**: 주요 개발 언어`
).join('\n')}

---

## 💡 대표 프로젝트

${topRepositories.slice(0, 3).map((repo, index) => 
  `### ${index + 1}. [${repo.name}](${repo.html_url})
  
  **성과**: ⭐ ${repo.stargazers_count}개 스타 | 🔄 ${repo.forks_count}회 포크
  
  **설명**: ${repo.description || '혁신적인 솔루션'}
  
  **기술**: ${repo.language || 'Multi-tech'} | **시작**: ${new Date(repo.created_at).getFullYear()}년`
).join('\n\n')}

---

## 📊 활동 현황

\`\`\`
🔥 총 커밋        ${businessMetrics.contributions}회
⭐ 받은 스타       ${businessMetrics.totalValue}개  
📦 프로젝트       ${businessMetrics.products}개
📊 공개 저장소     ${userProfile.public_repos}개
\`\`\`

---

<div align="center">

### 🏆 개발자 인증

**GitHub 플랫폼 인정**  
우수 개발자 | 커뮤니티 기여자 | ${new Date().getFullYear()}년 인증

[![GitHub stars](https://img.shields.io/github/stars/${userProfile.login}?style=for-the-badge&logo=github&label=총%20스타&color=1E40AF)](https://github.com/${userProfile.login})
[![GitHub repositories](https://img.shields.io/badge/프로젝트-${businessMetrics.products}개-1E40AF?style=for-the-badge&logo=github)](https://github.com/${userProfile.login}?tab=repositories)

</div>`;

  return {
    content,
    sections: {
      header: "성과 대시보드",
      metrics: "핵심 지표",
      projects: "대표 프로젝트",
      stats: "활동 현황"
    }
  };
}