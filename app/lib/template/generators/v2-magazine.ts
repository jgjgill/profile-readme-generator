import type { ProcessedGitHubData } from "~/lib/types/github";
import type { ReadmeTemplate } from "~/lib/types/template";

/**
 * 📰 매거진/신문형 템플릿 생성
 * 기술 매거진의 개발자 프로필 기사처럼 작성
 */
export function generateMagazineTemplate(githubData: ProcessedGitHubData): ReadmeTemplate {
  const { userProfile, topRepositories, topLanguages, mostStarredRepository } = githubData;
  
  // 총 스타 수 계산
  const totalStars = topRepositories.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const featuredProject = mostStarredRepository || topRepositories[0];
  
  const content = `# 📰 개발자 스포트라이트: ${userProfile.name || userProfile.login}

<div align="center">

![Developer Spotlight](https://img.shields.io/badge/Developer%20Spotlight-${userProfile.login}-059669?style=for-the-badge&logo=newspaper&logoColor=white)

**"${featuredProject?.name || 'GitHub Projects'}"로 주목받는 개발자**

</div>

---

## 📰 헤드라인 뉴스

### 🌟 "${featuredProject?.name || 'GitHub 프로젝트'}" 개발자, 커뮤니티에서 ${totalStars}개 스타 획득

**${new Date().getFullYear()}년 ${new Date().getMonth() + 1}월 특별 인터뷰** - ${userProfile.name || userProfile.login}씨가 개발한 프로젝트들이 GitHub 커뮤니티에서 큰 주목을 받고 있다. 특히 "${featuredProject?.name || '대표 프로젝트'}"는 ${featuredProject?.stargazers_count || 0}개의 스타를 획득하며 ${featuredProject?.language || topLanguages[0] || 'Multi-tech'} 분야에서 혁신적인 솔루션으로 평가받고 있다.

---

## 📊 개발자 프로필 분석

| 항목 | 상세 정보 |
|------|-----------|
| **전문 분야** | ${topLanguages.slice(0, 3).join(", ")} |
| **활동 규모** | ${topRepositories.length}개 프로젝트 운영 |
| **커뮤니티 반응** | ⭐ ${totalStars}개 스타 획득 |
| **대표 프로젝트** | [${featuredProject?.name || 'N/A'}](${featuredProject?.html_url || '#'}) |

---

## 🎤 개발자 인터뷰

### Q. 개발자로서의 여정은 어떻게 시작되었나요?

**A.** "${userProfile.bio || '지속적인 학습과 혁신을 통해 더 나은 소프트웨어를 만들어가고 있습니다.'}"

### Q. 가장 자신 있는 기술 스택은 무엇인가요?

**A.** 현재 ${topLanguages[0] || 'JavaScript'}를 중심으로 작업하고 있으며, ${topLanguages.slice(1, 3).join(", ")} 등 다양한 기술을 활용하여 프로젝트를 진행하고 있습니다.

---

## 🏆 주요 프로젝트 리뷰

${topRepositories.slice(0, 3).map((repo, index) => {
  const rating = repo.stargazers_count > 50 ? '★★★★★' : 
                 repo.stargazers_count > 20 ? '★★★★☆' : 
                 repo.stargazers_count > 5 ? '★★★☆☆' : '★★☆☆☆';
  
  return `### ${index + 1}. [${repo.name}](${repo.html_url}) ${rating}

**기술 리뷰**: ${repo.description || '혁신적인 접근방식으로 개발된 프로젝트'}

**커뮤니티 평가**: ⭐ ${repo.stargazers_count}개 스타 | 🔄 ${repo.forks_count}회 포크

**기술 스택**: ${repo.language || 'Multi-tech'} | **출시**: ${new Date(repo.created_at).getFullYear()}년`;
}).join('\n\n')}

---

## 📈 시장 트렌드 분석

### 개발 동향 리포트

\`\`\`
📊 프로젝트 다양성    ${topRepositories.length}개
⭐ 커뮤니티 인지도    ${totalStars}개 스타 (${totalStars > 100 ? '상위' : '성장'} 수준)
🔧 기술 전문성       ${topLanguages.length}개 언어
🚀 프로젝트 완성도    ${topRepositories.filter(r => r.description).length}/${topRepositories.length} (문서화 완료)
\`\`\`

---

<div align="center">

### 📰 기사 정보

**발행**: GitHub Developer Magazine  
**기자**: AI Reporter  
**발행일**: ${new Date().getFullYear()}년 ${new Date().getMonth() + 1}월 ${new Date().getDate()}일

[![GitHub Profile](https://img.shields.io/badge/프로필%20보기-${userProfile.login}-059669?style=for-the-badge&logo=github)](https://github.com/${userProfile.login})

---

*이 기사는 공개된 GitHub 데이터를 바탕으로 작성되었습니다.*

</div>`;

  return {
    content,
    sections: {
      headline: "헤드라인 뉴스",
      profile: "개발자 프로필 분석", 
      interview: "개발자 인터뷰",
      projects: "주요 프로젝트 리뷰",
      trends: "시장 트렌드 분석"
    }
  };
}