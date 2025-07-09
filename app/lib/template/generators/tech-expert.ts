import type { TechExpertData } from "../../types/github";
import type { ReadmeTemplate } from "../../types/template";

/**
 * 기술 전문가 템플릿 생성
 */
export function generateTechExpertTemplate(
  techExpertData: TechExpertData
): ReadmeTemplate {
  const { userProfile } = techExpertData;

  const displayName = userProfile.name || userProfile.login;
  const bioSection = userProfile.bio ? `\n> ${userProfile.bio}\n` : "";

  const headerSection = `# ⚡ ${displayName} - Technical Problem Solver
${bioSection}## 🎯 해결한 핵심 문제들

### 🚀 성능 최적화 전문가
- **대용량 데이터 처리**: 10만+ 레코드 실시간 처리 시스템 구축
- **응답 시간 개선**: API 응답 속도 2.5초 → 0.3초 단축
- **메모리 최적화**: 서버 리소스 사용량 60% 절감

### 🏗️ 시스템 아키텍처 설계
- **확장 가능한 구조**: 사용자 10배 증가 대응 마이크로서비스 설계
- **데이터베이스 최적화**: 복잡한 쿼리 성능 20배 향상
- **장애 대응 시스템**: 99.9% 가용성 확보

### 🔧 기술 부채 해결
- **레거시 시스템 모던화**: 5년된 코드베이스 단계적 리팩토링
- **코드 품질 개선**: 테스트 커버리지 30% → 85% 달성
- **개발 프로세스 구축**: CI/CD 파이프라인 도입으로 배포 시간 90% 단축

[![GitHub Profile](https://img.shields.io/badge/GitHub-Technical_Problem_Solver-000000?style=for-the-badge&logo=github)](${userProfile.html_url})

---`;

  const problemSolvingSection = generateProblemSolvingSection(techExpertData);
  const technicalLeadershipSection = generateTechnicalLeadershipSection(techExpertData);

  const fullContent = `${headerSection}

${problemSolvingSection}

${technicalLeadershipSection}

## 🤝 기술적 협업

**복잡한 문제를 단순하게 해결하는 것**을 추구합니다.  
기술적 도전과 팀의 성장을 함께 만들어가고 싶습니다.

📫 **연락하기**: [GitHub](${userProfile.html_url}) | \`professional.email@domain.com\``;

  // 문제 해결 섹션 분리
  const problemCasesMatch = problemSolvingSection.match(
    /(## 💡 실제 문제 해결 사례[\s\S]*?)(?=## 🛠️ 문제 해결 도구상자|$)/
  );
  const problemCasesOnly = problemCasesMatch ? problemCasesMatch[1] : "";

  const techToolboxMatch = problemSolvingSection.match(
    /(## 🛠️ 문제 해결 도구상자[\s\S]*)/
  );
  const techToolboxOnly = techToolboxMatch ? techToolboxMatch[1] : "";

  // 기술 리더십 섹션 분리
  const leadershipMatch = technicalLeadershipSection.match(
    /(## 🏆 기술 리더십 & 영향력[\s\S]*?)(?=### 📚 지식 공유 활동|$)/
  );
  const leadershipOnly = leadershipMatch ? leadershipMatch[1] : "";

  const knowledgeMatch = technicalLeadershipSection.match(
    /(### 📚 지식 공유 활동[\s\S]*)/
  );
  const knowledgeOnly = knowledgeMatch ? knowledgeMatch[1] : "";

  // 연락처 섹션 추출
  const contactMatch = fullContent.match(/(## 🤝 기술적 협업[\s\S]*)$/);
  const contactSection = contactMatch ? contactMatch[1] : "";

  return {
    content: fullContent,
    sections: {
      header: headerSection,
      problemCases: problemCasesOnly,
      techToolbox: techToolboxOnly,
      leadershipExperience: leadershipOnly,
      knowledgeSharing: knowledgeOnly,
      contact: contactSection,
    },
  };
}

function generateProblemSolvingSection(data: TechExpertData): string {
  const { topRepositories, topLanguages } = data;

  // 실제 프로젝트 기반으로 문제 해결 사례 생성
  const projectCases = topRepositories
    .slice(0, 3)
    .map((repo, index) => {
      const problemTypes = [
        {
          icon: "🚀",
          title: "성능 최적화 도전",
          problem: `${repo.name} 프로젝트에서 확장성 문제 해결`,
          solution: `${repo.language} 기반 최적화로 처리 성능 3배 향상`,
          impact: `⭐ ${repo.stargazers_count}개 스타로 검증된 솔루션`,
        },
        {
          icon: "🏗️",
          title: "아키텍처 설계 경험",
          problem: `복잡한 비즈니스 로직을 위한 확장 가능한 구조 설계`,
          solution: `모듈화된 ${repo.language} 아키텍처 구축`,
          impact: `커뮤니티에서 ${repo.stargazers_count}+ 개발자가 활용`,
        },
        {
          icon: "🔧",
          title: "기술 부채 해결",
          problem: `기존 시스템의 유지보수성과 확장성 한계`,
          solution: `${repo.language}로 점진적 리팩토링 및 모던화`,
          impact: `${repo.stargazers_count}개 스타 달성으로 효과 입증`,
        },
      ];

      const caseType = problemTypes[index % problemTypes.length];

      return `### ${caseType.icon} ${caseType.title}

**문제 상황**  
${caseType.problem}

**해결 접근법**  
${caseType.solution}

**비즈니스 임팩트**  
${caseType.impact}

🔗 **프로젝트**: [${repo.name}](${repo.html_url})
`;
    })
    .join("\n");

  return `## 💡 실제 문제 해결 사례
${projectCases}
## 🛠️ 문제 해결 도구상자

![Tech Stack](https://skillicons.dev/icons?i=${topLanguages
    .slice(0, 6)
    .map((lang) =>
      lang.toLowerCase().replace("javascript", "js").replace("typescript", "ts")
    )
    .join(",")})

**깊이 있는 전문 영역**: ${topLanguages.slice(0, 3).join(" • ")}
`;
}

function generateTechnicalLeadershipSection(data: TechExpertData): string {
  const { userProfile } = data;

  return `## 🏆 기술 리더십 & 영향력

### 📈 기술적 기여 현황
![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user=${userProfile.login}&theme=dark&hide_border=true)

### 🎯 오픈소스 영향력
![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${userProfile.login}&show_icons=true&theme=github_dark&hide_border=true&include_all_commits=true&count_private=false)

### 🏅 개발자 성취도
![Trophy](https://github-profile-trophy.vercel.app/?username=${userProfile.login}&theme=darkhub&no-frame=true&row=1&column=6)

### 💼 기술 리더십 경험
- **팀 기술 결정**: 핵심 기술 스택 선정 및 아키텍처 가이드라인 수립
- **코드 리뷰 문화**: 팀 내 코드 품질 표준 정립 및 멘토링
- **기술 부채 관리**: 체계적인 리팩토링 계획 수립 및 실행
- **신기술 도입**: 팀 생산성 향상을 위한 도구 및 프로세스 개선

### 📚 지식 공유 활동
- **사내 기술 세미나**: 복잡한 기술 개념을 쉽게 전달
- **주니어 멘토링**: 체계적인 성장 가이드 제공
- **기술 문서화**: 팀 지식 베이스 구축 및 유지보수
`;
}