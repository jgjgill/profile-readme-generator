import type { ProcessedGitHubData } from "~/lib/types/github";
import type { ReadmeTemplate } from "~/lib/types/template";

/**
 * 🏛️ 공식 개발자 증명서형 템플릿 생성
 * 학위증명서나 자격증처럼 공식적이고 격식있는 문서
 */
export function generateCertificateTemplate(githubData: ProcessedGitHubData): ReadmeTemplate {
  const { userProfile, topRepositories, topLanguages, mostStarredRepository } = githubData;
  
  // 총 스타 수 계산
  const totalStars = topRepositories.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const issueDate = new Date().toISOString().split('T')[0];
  const certificationNumber = `GH-${userProfile.login.toUpperCase()}-${new Date().getFullYear()}`;
  
  const content = `<div align="center">

# 🏛️ 개발자 역량 인증서

**DEVELOPER COMPETENCY CERTIFICATE**

---

### GitHub 플랫폼 공인

**GitHub Platform Official Certification**

</div>

---

## 📋 인증 정보

| 항목 | 상세 |
|------|------|
| **성명 (Name)** | ${userProfile.name || userProfile.login} |
| **등록번호 (ID)** | ${userProfile.login} |
| **인증번호 (Cert. No.)** | ${certificationNumber} |
| **발급일자 (Issue Date)** | ${issueDate} |
| **발급기관 (Issuer)** | GitHub Platform |

---

## 🎓 인증 내용

### 소프트웨어 개발 역량 인증

본 증명서는 상기 인증자가 다음과 같은 소프트웨어 개발 역량을 보유하고 있음을 공식적으로 인증합니다.

#### **1. 기술적 역량 (Technical Competency)**

- **주요 프로그래밍 언어**: ${topLanguages.slice(0, 3).join(", ")}
- **프로젝트 관리 역량**: ${topRepositories.length}건의 프로젝트 수행 완료
- **코드 품질 관리**: 문서화 및 버전 관리 시스템 활용

#### **2. 프로젝트 성과 (Project Achievements)**

- **총 프로젝트 수**: ${topRepositories.length}건
- **커뮤니티 인정도**: ${totalStars}개 스타 획득
- **협업 기여도**: ${topRepositories.reduce((sum, repo) => sum + repo.forks_count, 0)}회 포크 기록

---

## 📊 성과 지표

\`\`\`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
           GITHUB 활동 성과 요약서
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 총 프로젝트 수         ${topRepositories.length.toString().padStart(10)}건
⭐ 커뮤니티 인정도         ${totalStars.toString().padStart(10)}개 스타
🔄 협업 참여도            ${topRepositories.reduce((sum, repo) => sum + (repo.forks_count || 0), 0).toString().padStart(10)}회 포크
🏆 대표 프로젝트          ${(mostStarredRepository?.name || topRepositories[0]?.name || 'N/A').padEnd(15)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
\`\`\`

---

## 🏆 대표 프로젝트 인증

${topRepositories.slice(0, 3).map((repo, index) => 
  `### ${index + 1}. ${repo.name}

**성과 지표**: ⭐ ${repo.stargazers_count}개 스타 | 🔄 ${repo.forks_count}회 포크

**기술 분류**: ${repo.language || 'Multi-technology'}

**완료일**: ${new Date(repo.created_at).getFullYear()}년 ${new Date(repo.created_at).getMonth() + 1}월`
).join('\n\n')}

---

## ✅ 인증 기준

본 인증서는 다음 기준을 충족한 개발자에게 발급됩니다:

- [x] GitHub 플랫폼 활성 사용자
- [x] 공개 프로젝트 ${topRepositories.length}건 이상 보유
- [x] 커뮤니티 기여도 ${totalStars}개 스타 이상
- [x] ${topLanguages.length}개 이상 프로그래밍 언어 활용
- [x] 지속적인 개발 활동 수행

---

<div align="center">

## 🔰 발급 기관 정보

**GitHub Platform**  
*Global Software Development Community*

**인증 유효기간**: ${new Date().getFullYear()}년 ${new Date().getMonth() + 1}월 - ${new Date().getFullYear() + 1}년 ${new Date().getMonth() + 1}월

---

### 📞 문의처

GitHub Profile: [@${userProfile.login}](https://github.com/${userProfile.login})

---

**이 증명서는 GitHub 공개 데이터를 기반으로 자동 생성되었습니다.**  
**This certificate is automatically generated based on GitHub public data.**

![Certificate Badge](https://img.shields.io/badge/Certificate-${certificationNumber}-374151?style=for-the-badge&logo=github&logoColor=white)

</div>`;

  return {
    content,
    sections: {
      header: "인증서 헤더",
      info: "인증 정보",
      content: "인증 내용", 
      metrics: "성과 지표",
      projects: "대표 프로젝트",
      criteria: "인증 기준"
    }
  };
}