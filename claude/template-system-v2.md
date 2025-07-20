# 템플릿 시스템 v2.0 기획서

## 🎯 핵심 문제점

### 현재 시스템의 한계
1. **정적 데이터 문제**: Star, Fork 수 등이 텍스트로 고정되어 실시간 업데이트 불가
2. **Shop 방식 미활용**: API Routes를 통한 동적 생성 방식을 템플릿에서 활용하지 못함
3. **GitHub API 전략 부족**: 지속적인 데이터 동기화 메커니즘 부재
4. **사용자 요구사항 미충족**: 한 번 생성된 README가 최신 정보를 반영하지 못함
5. **선언적 코드 부족**: 템플릿 구성이 명시적이지 않아 개발자 경험이 떨어짐
6. **차별화 부족**: 비슷비슷한 템플릿들로 사용자 선택의 의미가 없음
7. **창의성 부재**: 기존 GitHub README의 틀에서 벗어나지 못함
8. **시각적 임팩트 부족**: 평범한 마크다운 구성으로 기억에 남지 않음

## 🚀 개선 방향

### 1. 혁신적 템플릿 테마 시스템

**완전히 차별화된 4가지 템플릿**
```typescript
// 각 템플릿은 완전히 다른 세계관과 표현 방식
const TEMPLATE_THEMES = {
  dashboard: DashboardTemplate,     // 📊 비즈니스 대시보드형
  gamification: RPGTemplate,       // 🎮 게이미피케이션형  
  magazine: NewsTemplate,          // 📰 신문/매거진형
  certificate: DocumentTemplate    // 🏛️ 이력서/공문서형
};
```

**동적 + 정적 하이브리드 시스템**
- GitHub API 데이터를 24시간 캐시로 실시간 반영
- Shop 방식의 API Routes 활용한 동적 SVG 생성
- 테마별 특화된 데이터 수집 및 표현

### 2. 컴포넌트 기반 아키텍처

**선언적 템플릿 구성**
```typescript
// 테마별로 완전히 다른 컴포넌트 조합
const DashboardTemplate = {
  components: [
    MetricsPanel,      // KPI 대시보드
    ROICalculator,     // 투자 수익률
    ImpactChart,       // 비즈니스 임팩트
    ProjectTimeline    // 프로젝트 타임라인
  ],
  layout: 'grid',
  style: 'corporate'
};

const RPGTemplate = {
  components: [
    CharacterSheet,    // 개발자 스탯
    SkillTree,         // 기술 스킬 트리
    QuestLog,          // 진행 중인 프로젝트
    Achievements       // 업적 시스템
  ],
  layout: 'game-ui',
  style: 'fantasy'
};
```

**지속적 최신화 시스템**
- 사용자별 맞춤 데이터 수집 전략
- 템플릿별 특화된 GitHub API 활용
- 실시간 업데이트되는 동적 요소들

### 3. 현실적인 캐싱 전략

```typescript
const CACHE_DURATIONS = {
  userProfile: 24 * 60 * 60 * 1000,    // 24시간 - 프로필 정보
  repoStats: 24 * 60 * 60 * 1000,     // 24시간 - Star/Fork 수
  languages: 24 * 60 * 60 * 1000,     // 24시간 - 언어 통계
  recentActivity: 12 * 60 * 60 * 1000, // 12시간 - 최근 활동
};
```

**캐싱 전략의 근거:**
- GitHub 통계는 하루 단위로 변경되어도 자연스러움
- API 사용량 대폭 절약 (기존 5분 → 24시간)
- 서버 부하 최소화로 안정적인 서비스 제공
- 사용자 경험상 전혀 어색하지 않음

### 4. 템플릿별 차별화 전략 (핵심)

각 템플릿은 **섹션 컴포넌트 조합**, **시각적 스타일**, **전용 API 컴포넌트** 모두에서 뚜렷한 차별점을 가져야 함.

#### **기본 템플릿** - "친근하고 접근하기 쉬운 개발자"
```typescript
// 선언적 템플릿 정의
const BasicTemplate: TemplateDefinition = {
  id: 'basic',
  name: '기본 템플릿',
  sections: [
    HeaderSection.friendly,      // 친근한 인사
    AboutSection.storytelling,   // 스토리텔링 중심 소개
    TechStackSection.simple,     // 간단한 기술 스택
    StatsSection.growth,         // 성장 중심 통계
    ProjectsSection.showcase,    // 프로젝트 쇼케이스
    ContactSection.approachable  // 접근하기 쉬운 연락처
  ],
  theme: {
    colors: 'friendly',
    icons: 'warm',
    layout: 'comfortable'
  }
};
```

**특징:**
- 🎨 부드러운 색상, 친근한 아이콘
- 📝 간단명료한 설명 위주
- 🌱 성장 스토리와 학습 과정 중심
- 👥 협업과 소통 능력 강조

#### **임팩트 중심 템플릿** - "성과와 수치로 어필하는 전문가"
```markdown
# 🚀 성과 중심 개발자 [이름]

[비즈니스 임팩트와 성과 중심 소개]

## 📈 핵심 성과 지표
![Impact Stats](https://your-domain.com/api/impact-stats?username=user&metrics=stars,forks,contributors&theme=professional)

## 🏆 주요 프로젝트 성과
![Top Projects](https://your-domain.com/api/project-showcase?username=user&sort=impact&count=3&theme=business)

## 💼 기여도 분석
![Contribution Analysis](https://your-domain.com/api/contribution-timeline?username=user&theme=corporate)
```

**특징:**
- 💼 프로페셔널한 색상 (파란색, 회색, 금색)
- 📊 숫자와 그래프 강조, 큰 폰트 사용
- 🏆 성과 지표와 비즈니스 임팩트 중심
- 📈 정량적 데이터와 증가 추세 강조

#### **기술 전문가 템플릿** - "문제 해결과 기술 리더십"
```markdown
# ⚡ 기술 전문가 [이름]

[기술적 철학과 문제 해결 접근법]

## 🔧 기술 전문성 맵
![Tech Expertise](https://your-domain.com/api/tech-expertise?username=user&depth=advanced&theme=technical)

## 🎯 문제 해결 이력
![Problem Solving](https://your-domain.com/api/problem-solving?username=user&include=issues,prs,reviews&theme=expert)

## 🏗️ 아키텍처 경험
![Architecture Projects](https://your-domain.com/api/architecture-projects?username=user&complexity=high&theme=engineering)
```

**특징:**
- ⚡ 기술적인 색상 (녹색, 주황색, 보라색)
- 🔧 복잡한 차트와 상세 데이터 시각화
- 🎯 문제 해결 능력과 기술적 깊이 강조
- 🏗️ 아키텍처 설계와 시스템 사고 중심

## 🔧 동적 API 컴포넌트 설계

### GitHub API 데이터를 테마별로 활용하는 구체적 방법

각 테마는 **기본 GitHub API 데이터**를 공유하면서도, **테마 특성에 맞는 추가 API**를 활용하여 차별화합니다.

#### **기본 GitHub API 데이터 (모든 템플릿 공통)**
```typescript
// 모든 템플릿에서 기본으로 수집하는 데이터
interface BaseGitHubApiData {
  // 기본 프로필
  userProfile: { login, name, bio, followers, following, public_repos }
  
  // 저장소 통계
  repositories: { name, language, stars, forks, size, created_at, pushed_at }
  
  // 언어 통계 (상위 5개 저장소 기준)
  languageStats: { JavaScript: 45%, Python: 30%, TypeScript: 25% }
  
  // 활동 통계
  activityStats: { total_commits, issues_opened, prs_created, code_reviews }
  
  // 프로젝트 메트릭
  projectMetrics: { most_starred_repo, total_stars, total_forks, avg_repo_size }
}
```

---

### **📊 대시보드형 템플릿** - "비즈니스 KPI 스타일"

**테마 컨셉**: 경영진이 보는 성과 대시보드처럼 GitHub 데이터를 표현 (기본 데이터를 비즈니스 용어로 변환)

```typescript
// 기본 GitHub 데이터를 비즈니스 KPI 스타일로 변환
const transformToDashboard = (data: BaseGitHubApiData) => ({
  // "매출" → "총 스타 수"
  revenue: data.projectMetrics.total_stars,
  
  // "고객 수" → "팔로워 수" 
  customers: data.userProfile.followers,
  
  // "제품 라인" → "활성 프로젝트"
  productLines: data.repositories.filter(r => r.pushed_at > sixMonthsAgo),
  
  // "시장 점유율" → "언어별 비중"
  marketShare: data.languageStats,
  
  // "성장률" → "최근 활동 증가폭"
  growthRate: calculateGrowthRate(data.activityStats),
});
```

**API 컴포넌트 예시 (기본 데이터 활용):**
```typescript
// 📈 비즈니스 대시보드 스타일 차트
GET /api/dashboard-metrics?username={username}&format=business
// → "Q3 성과: ⭐ 1,247 stars (목표 대비 124%)"

// 💼 프로젝트 포트폴리오 (투자 포트폴리오 스타일)
GET /api/project-portfolio?username={username}&style=investment
// → "포트폴리오 다양성: JavaScript 45%, Python 30%, TypeScript 25%"
```

---

### **🎮 게이미피케이션형 템플릿** - "RPG 캐릭터 시트"

**테마 컨셉**: 개발자를 RPG 캐릭터로, GitHub 활동을 게임 스탯으로 표현

#### **추가 GitHub API (게이미피케이션 특화)**
```typescript
// RPG 특화: 업적 시스템을 위한 상세 활동 데이터
interface RPGApiData extends BaseGitHubApiData {
  // GET /search/issues?q=author:{username}+type:issue+is:closed
  closedIssues: number,  // "몬스터 처치"로 표현
  
  // GET /search/issues?q=author:{username}+type:pr+is:merged  
  mergedPRs: number,     // "퀘스트 완료"로 표현
  
  // GET /users/{username}/events - 연속 활동일
  streakDays: number,    // "출석 보상"으로 표현
}
```

```typescript
// RPG 스타일로 변환
const transformToRPG = (data: BaseGitHubApiData & RPGApiData) => ({
  // "레벨" → 총 저장소 수 기반
  level: Math.floor(data.userProfile.public_repos / 5) + 1,
  
  // "경험치" → 총 커밋 수
  experience: data.activityStats.total_commits,
  
  // "스킬 포인트" → 언어별 코드 라인 수 비율
  skillPoints: data.languageStats,
  
  // "업적" → 마일스톤 달성
  achievements: [
    data.projectMetrics.total_stars > 100 ? "⭐ 스타 수집가" : null,
    data.mergedPRs > 50 ? "🤝 협업 마스터" : null,
    data.closedIssues > 20 ? "🐛 버그 헌터" : null,
    data.streakDays > 30 ? "🔥 연속 출석왕" : null,
  ].filter(Boolean),
  
  // "장비" → 주력 기술 스택
  equipment: Object.keys(data.languageStats).slice(0, 3),
});
```

**API 컴포넌트 예시:**
```typescript
// ⚔️ RPG 캐릭터 시트
GET /api/rpg-character?username={username}&class=developer
// → "레벨 15 풀스택 개발자 | 경험치: 3,247 | 다음 레벨까지: 753"

// 🏆 업적 시스템 (추가 API 활용)
GET /api/achievements?username={username}&style=gaming
// → "⭐ 스타 수집가 | 🤝 협업 마스터 | 🐛 버그 헌터 (23마리 처치)"
```

---

### **📰 매거진/신문형 템플릿** - "개발자 인터뷰 기사"

**테마 컨셉**: 기술 매거진의 개발자 프로필 기사처럼 작성

#### **추가 GitHub API (스토리텔링 특화)**
```typescript
// 매거진 특화: 스토리텔링을 위한 프로젝트 히스토리
interface MagazineApiData extends BaseGitHubApiData {
  // GET /repos/{owner}/{repo} - 대표 프로젝트 상세 정보
  featuredProject: {
    description: string,      // 프로젝트 스토리
    created_at: string,       // "개발 시작 시점"
    topics: string[],         // "주요 키워드"  
    readme: string,          // 프로젝트 배경 스토리
  },
  
  // GET /users/{username}/events - 최근 주목할 만한 활동
  recentHighlights: Array<{
    type: string,           // "신규 릴리즈", "중요 기여" 등
    repo: string,
    created_at: string,
  }>,
}
```

```typescript
// 뉴스 기사 스타일로 변환
const transformToNews = (data: BaseGitHubApiData & MagazineApiData) => ({
  // "헤드라인" → 가장 주목받는 프로젝트 중심
  headline: `"${data.featuredProject.name}" 개발자가 말하는 성공 스토리`,
  
  // "리드문" → 핵심 성과를 뉴스톤으로  
  leadParagraph: `${data.userProfile.name}씨가 ${data.languageStats[0]} 기반으로 개발한 프로젝트들이 총 ${data.projectMetrics.total_stars}개의 관심을 받고 있다.`,
  
  // "본문" → 프로젝트 개발 스토리
  story: `${data.featuredProject.created_at}부터 시작된 이 프로젝트는 "${data.featuredProject.description}"라는 목표로...`,
  
  // "통계 박스" → 뉴스 인포그래픽 스타일
  statsBox: {
    "프로젝트 수": data.userProfile.public_repos,
    "팔로워": data.userProfile.followers, 
    "기여도": data.activityStats.total_commits,
  },
});
```

**API 컴포넌트 예시:**
```typescript
// 📰 뉴스 헤드라인 스타일 (프로젝트 스토리 활용)
GET /api/news-headline?username={username}&focus=featured-project
// → "혁신 개발자 김개발, '웹 접근성 향상 도구'로 1,000+ 스타 달성"

// 📊 인포그래픽 스타일 통계  
GET /api/infographic-stats?username={username}&style=magazine
// → 신문 통계 박스 디자인으로 데이터 표시
```

---

### **🏛️ 이력서/공문서형 템플릿** - "공식 개발자 증명서"

**테마 컨셉**: 학위증명서나 자격증처럼 공식적이고 격식있는 문서 (기본 데이터를 공문서 양식으로 변환)

```typescript
// 기본 GitHub 데이터를 공문서 스타일로 변환
const transformToCertificate = (data: BaseGitHubApiData) => ({
  // "자격증명" → GitHub 활동 기반 역량 증명
  certifications: [
    `${data.languageStats[0]} 개발 숙련도 인증`,
    `오픈소스 기여 ${data.activityStats.prs_created}건 완료`,
    `프로젝트 관리 ${data.userProfile.public_repos}건 수행`,
  ],
  
  // "공인 기관" → GitHub 플랫폼
  issuingAuthority: "GitHub Platform",
  
  // "증명 내용" → 정량적 성과를 공식 문서 형태로
  credentials: {
    "성명": data.userProfile.name || data.userProfile.login,
    "등록번호": data.userProfile.login,
    "총 프로젝트 수행": `${data.userProfile.public_repos}건`,
    "커뮤니티 인지도": `${data.userProfile.followers}명`,
    "코드 기여도": `${data.activityStats.total_commits}회`,
    "주요 기술분야": Object.keys(data.languageStats).slice(0, 3).join(", "),
  },
  
  // "발급일자" → 현재 날짜
  issueDate: new Date().toISOString().split('T')[0],
});
```

**API 컴포넌트 예시 (기본 데이터 활용):**
```typescript
// 🏛️ 공식 증명서 스타일
GET /api/certificate?username={username}&type=professional
// → "개발 역량 인증서" 형태로 GitHub 데이터 표시

// 📜 공문서 양식 (기본 데이터를 격식있게 표현)
GET /api/official-document?username={username}&format=credential
// → "성명: 김개발 | 등록번호: kimdev | 주요기술: JavaScript, Python, TypeScript"
```

---

### **핵심 포인트: 테마별 특화 vs 기본 데이터 활용**

#### **API 사용 전략 요약**
```typescript
const templateApiStrategy = {
  // 기본 데이터만으로 충분한 템플릿
  dashboard: "기본 데이터를 비즈니스 용어로 재표현",
  certificate: "기본 데이터를 공문서 양식으로 변환",
  
  // 테마 특성상 추가 API가 의미있는 템플릿  
  rpg: "업적 시스템을 위해 이슈/PR 해결 데이터 추가",
  magazine: "스토리텔링을 위해 프로젝트 상세 정보 추가",
};
```

#### **같은 데이터, 다른 스토리텔링 예시**
```typescript
// 예시: "총 스타 수 1,247개" 데이터를 테마별로 표현
const starCount = 1247;

const presentations = {
  dashboard: "📈 고객 만족도 지수: 1,247 (목표 대비 124%)",
  rpg: "🌟 경험치 획득: 1,247 XP (레벨업까지 753 XP 남음)", 
  magazine: "📰 화제의 프로젝트들, 커뮤니티 1,247명이 주목",
  certificate: "🏛️ 커뮤니티 기여 인정도: 1,247건 (GitHub 공인)"
};
```

이렇게 **기본 GitHub API 데이터의 효율적 활용**과 **테마 특성에 맞는 선택적 API 확장**을 통해, 각 템플릿이 확실한 차별점을 가지면서도 API 사용량을 최적화할 수 있습니다.

## 📊 GitHub API 최적화 전략

### 1. 스마트 캐싱 시스템
```typescript
interface CacheStrategy {
  userProfile: 24 * 60 * 60 * 1000;      // 24시간
  repoStats: 24 * 60 * 60 * 1000;       // 24시간
  languages: 24 * 60 * 60 * 1000;       // 24시간
  recentActivity: 12 * 60 * 60 * 1000;  // 12시간
  issuesAndPRs: 24 * 60 * 60 * 1000;    // 24시간
}
```

### 2. 조건부 데이터 수집
```typescript
// 템플릿별 필요 데이터만 수집
const getRequiredData = (templateType: TemplateType) => {
  switch (templateType) {
    case 'basic':
      return ['userProfile', 'repoStats', 'languages'];
    case 'impact':
      return ['userProfile', 'repoStats', 'languages', 'projectMetrics'];
    case 'tech-expert':
      return ['userProfile', 'repoStats', 'languages', 'issuesAndPRs', 'codeReviews'];
  }
};
```

### 3. 배치 처리 및 병렬 호출
```typescript
// 여러 저장소 정보를 병렬로 처리
const fetchProjectMetrics = async (username: string, repos: string[]) => {
  const batchRequests = repos.map(repo => 
    Promise.all([
      fetchRepoStats(username, repo),
      fetchRepoLanguages(username, repo),
      fetchRepoContributors(username, repo)
    ])
  );
  
  return Promise.all(batchRequests);
};
```

## 🎨 시각적 차별화 전략

### 색상 팔레트 시스템
```typescript
const THEME_COLORS = {
  friendly: {
    primary: '#4F46E5',    // 부드러운 보라
    secondary: '#10B981',  // 따뜻한 초록
    accent: '#F59E0B',     // 친근한 주황
    background: '#F8FAFC'  // 밝은 배경
  },
  professional: {
    primary: '#1E40AF',    // 진한 파랑
    secondary: '#374151',  // 차분한 회색
    accent: '#D97706',     // 골드 액센트
    background: '#F9FAFB'  // 깔끔한 배경
  },
  technical: {
    primary: '#059669',    // 기술적 초록
    secondary: '#7C3AED',  // 전문적 보라
    accent: '#DC2626',     // 강조 빨강
    background: '#F3F4F6'  // 중성 배경
  }
};
```

### 아이콘 및 이모지 시스템
```typescript
const TEMPLATE_ICONS = {
  basic: {
    tech: '🛠️', activity: '📊', growth: '🌱',
    collaboration: '👥', learning: '📚'
  },
  impact: {
    metrics: '📈', projects: '🏆', contribution: '💼',
    performance: '⚡', results: '🎯'
  },
  expert: {
    expertise: '🔧', problem: '🎯', architecture: '🏗️',
    leadership: '👨‍💼', innovation: '💡'
  }
};
```

## 🎯 예상 효과

### 기술적 효과
- **GitHub API 사용량 90% 절감** (5분 → 24시간 캐싱)
- **서버 부하 최소화** (캐시 히트율 95% 예상)
- **사용자 경험 개선** (항상 최신 데이터 표시)

### 비즈니스 효과
- **사용자 만족도 증가** (실시간 업데이트)
- **템플릿 차별화 강화** (각 템플릿의 고유 가치 증대)
- **재방문율 증가** (지속적으로 업데이트되는 콘텐츠)

### 사용자 경험 효과
- **맞춤형 템플릿** (사용자 유형별 특화)
- **지속적인 가치** (한 번 생성 후 계속 활용 가능)
- **전문성 강화** (각 분야별 전문적인 표현)

## 📋 성공 지표

### 정량적 지표
- API 응답 시간: 평균 < 500ms
- 캐시 히트율: > 90%
- GitHub API 사용률: < 30% (rate limit 대비)
- 사용자 템플릿 재생성율: > 80%

### 정성적 지표
- 템플릿별 차별점 인식도
- 사용자 만족도 (실시간 데이터 업데이트)
- 전문성 표현 만족도
- 재사용 의향

---

이 기획을 통해 **Shop의 API Routes 방식을 템플릿 시스템에 완전히 활용**하면서, **각 템플릿의 고유한 정체성과 차별점을 강화**할 수 있습니다. 24시간 캐싱으로 현실적이고 효율적인 시스템을 구축하여 사용자 요구사항을 완전히 충족시킬 수 있을 것입니다.