# CLAUDE.md

이 파일은 저장소에서 코드 작업을 할 때 Claude Code (claude.ai/code)에 대한 가이드를 제공합니다.

## 개발 명령어

**개발 서버:**

```bash
pnpm run dev
```

서버는 HMR이 활성화된 상태로 `http://localhost:5173`에서 실행됩니다.

**빌드:**

```bash
pnpm run build
```

**타입 검사:**

```bash
pnpm run typecheck
```

React Router 타입 생성 및 TypeScript 컴파일을 실행합니다.

**프로덕션 서버:**

```bash
pnpm run start
```

## 아키텍처

이 프로젝트는 기본적으로 서버 사이드 렌더링이 활성화된 React Router v7 애플리케이션입니다.

**주요 디렉토리:**

- `app/` - 메인 애플리케이션 코드
  - `root.tsx` - 에러 바운더리와 메타 태그 설정이 포함된 루트 레이아웃
  - `routes.ts` - React Router의 파일 기반 라우팅을 사용한 라우트 설정
  - `routes/` - 개별 라우트 컴포넌트
  - `app.css` - 전역 스타일

**설정 파일:**

- `react-router.config.ts` - React Router 설정 (SSR 활성화)
- `vite.config.ts` - TailwindCSS와 함께 Vite 번들러 설정
- `tsconfig.json` - 경로 별칭이 포함된 TypeScript 설정 (`~/*`는 `./app/*`에 매핑)

**스타일링:**
Vite 플러그인 통합과 함께 TailwindCSS v4를 사용합니다.

**패키지 매니저:**
pnpm (버전 9.15.0)을 사용합니다 - `npm` 대신 항상 `pnpm` 명령어를 사용하세요.

**배포:**
컨테이너화된 배포를 위한 Dockerfile이 포함되어 있습니다. 빌드 출력물은 별도의 `client/`와 `server/` 폴더가 있는 `build/` 디렉토리에 생성됩니다.

## 모범 사례

- 항상 설명적인 변수명을 사용하세요

---

## 프로젝트 개요: GitHub 프로필 README 생성기

### 핵심 미션

**GitHub 프로필 README 템플릿 제공 서비스**

- GitHub 사용자 정보를 활용해 전문적인 README 템플릿 생성
- 취준생/이직자가 즉시 사용할 수 있는 완성도 높은 템플릿

### MVP 범위

1. **템플릿 생성**: GitHub 데이터 기반 README 템플릿 자동 생성
2. **템플릿 품질**: 채용담당자에게 어필할 수 있는 전문적인 구성
3. **즉시 사용**: 생성된 템플릿을 바로 복사해서 GitHub에 적용 가능

### 핵심 개발 원칙

- **기술적 복잡성보다 템플릿 품질**: 템플릿이 서비스의 전부
- **사용자 맞춤형 템플릿**: 강점 유형별 다양한 템플릿 제공
- **컴포넌트 상점**: README 구성 요소를 독립적으로 선택/복사 가능
- **채용담당자 중심**: 채용 담당자가 보고 싶어하는 내용
- **3초 룰**: 3초 내에 핵심 역량을 파악할 수 있어야 함
- **즉시 가치 제공**: 사용자가 바로 활용할 수 있는 결과

### 프로젝트 구조 가이드라인

```
app/
├── routes/
│   ├── _index.tsx              # 홈페이지 (OAuth 로그인 + 사용자명 입력)
│   ├── generate.$username.tsx  # README 생성 페이지
│   ├── shop.tsx                # SVG 컴포넌트 상점
│   ├── api.timeline.tsx        # 타임라인 SVG API
│   ├── api.wave-banner.tsx     # 파도 배너 SVG API
│   ├── api.neon-sign.tsx       # 네온 사인 SVG API
│   ├── auth.login.tsx          # GitHub OAuth 로그인 리다이렉트
│   ├── auth.callback.tsx       # OAuth 콜백 처리
│   └── auth.logout.tsx         # 로그아웃 처리
├── lib/
│   ├── github/                 # GitHub API 연동 (모듈화)
│   │   ├── core.ts             # 기본 API 함수들
│   │   ├── analysis.ts         # 데이터 분석 함수들
│   │   ├── tech-expert.ts      # 기술 전문가형 추가 API
│   │   └── index.ts            # 통합 export
│   ├── types/                  # TypeScript 정의 (관심사별 분리)
│   │   ├── github.ts           # GitHub API 관련 타입
│   │   ├── template.ts         # 템플릿 관련 타입
│   │   └── index.ts            # 통합 export
│   ├── template.ts             # 템플릿 생성 로직
│   ├── session.ts              # 세션 관리 (OAuth 토큰 저장)
│   └── oauth.ts                # GitHub OAuth 플로우
└── components/
    ├── header.tsx              # 공통 헤더 컴포넌트
    ├── user-card.tsx           # 사용자 프로필 표시
    ├── template-selector.tsx   # 템플릿 선택/비교
    ├── readme-output.tsx       # README 출력 (react-markdown 사용)
    ├── copy-button.tsx         # 통합 복사 버튼
    └── svg/                    # SVG 컴포넌트들
        ├── timeline/
        ├── wave-banner/
        └── neon-sign/
```

### GitHub API 전략 및 사용자 경험

**API 요청 제한 및 사용자 혜택:**

- **무료 사용자 (비로그인)**: 시간당 약 10개 README 생성 (API 60회 제한)
- **로그인 사용자 (OAuth)**: 시간당 약 800개 README 생성 (API 5,000회 제한)
- **README 1개 생성**: 평균 6-7회 API 호출 (최적화됨)

**API 호출 구조:**

1. 사용자 프로필 정보 (1회)
2. 저장소 목록 조회 (1회)
3. 상위 5개 저장소 언어 통계 (최대 5회)

**필수 데이터만 수집:**

1. 기본 정보: 사용자명, 실명, 프로필 이미지
2. 자기소개 텍스트
3. 공개 리포지토리 수
4. 상위 3개 프로그래밍 언어 (최적화된 수집)
5. 가장 많은 스타를 받은 리포지토리

**수집하지 않을 데이터:**

- 상세한 커밋 히스토리
- 협업 패턴
- 활동 시간대 패턴
- 팔로워/팔로잉 관계

### 템플릿 철학

- **임팩트 있는 헤더**: 이름, 포지션, 핵심 역량 요약
- **시각적 기술 스택**: 깔끔한 배지와 스킬 레벨
- **프로젝트 하이라이트**: 맥락이 있는 상위 3개 리포지토리
- **GitHub 지표**: 커밋, 언어 사용, 기여 통계
- **연락처 정보**: 쉽게 연결할 수 있는 방법

### 성공 기준

- ✅ GitHub 사용자명 입력으로 전문적인 README 생성
- ✅ 템플릿이 프로필 조회수/채용담당자 관심 증가
- ✅ 즉시 GitHub에 복사-붙여넣기 가능
- ✅ 모바일 기기에서 작동
- ✅ 5초 이내 로딩 시간

### 개발 단계

**1주차**: React Router v7 설정 + GitHub API 연동
**2주차**: 핵심 로직 (데이터 수집 + 템플릿 생성)
**3주차**: UI/UX (입력 폼 + 결과 페이지)
**4주차**: 완성도 높이기 (디자인 + 모바일 + 배포)

### 품질 기준

- **가독성 있는 코드**: 영리함보다 명확성 우선
- **에러 처리**: 도움이 되는 메시지와 함께 우아한 실패
- **타입 안전성**: 포괄적인 TypeScript 정의
- **성능**: 빠른 로딩, 효율적인 API 호출
- **유지보수성**: 간단한 구조, 확장하기 쉬움

### 최종 목표

**"채용담당자가 생성된 README를 보고 3초 내에 지원자 역량을 평가할 수 있어야 함"**

템플릿 품질이 서비스 성공을 결정합니다. 기술적 구현은 템플릿을 위해 존재하며, 그 반대가 아닙니다.

---

## 환경 설정

### 필수 환경변수

`.env` 파일을 생성하고 다음 변수들을 설정하세요:

```bash
# GitHub OAuth App (필수)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_REDIRECT_URI=http://localhost:5173/auth/callback

# 세션 암호화 (필수)
SESSION_SECRET=your-super-secret-session-key

# GitHub Personal Access Token (선택사항, 개발용)
GITHUB_TOKEN=your_github_token_here
```

### GitHub OAuth App 등록

1. https://github.com/settings/developers 접속
2. "New OAuth App" 클릭
3. 다음 정보 입력:
   - **Application name**: GitHub Profile README Generator
   - **Homepage URL**: http://localhost:5173
   - **Authorization callback URL**: http://localhost:5173/auth/callback
4. 생성된 Client ID와 Client Secret을 `.env`에 추가

### 주요 의존성

```json
{
  "react-router": "^7.6.2",
  "react-markdown": "^10.1.0",
  "remark-gfm": "^4.0.1",
  "rehype-highlight": "^7.0.2",
  "highlight.js": "^11.11.1"
}
```

## 사용자 플로우

### 1. 무료 체험 (비로그인)

- GitHub 사용자명 입력
- 시간당 약 10개 README 생성 제한
- 무료 GitHub API 사용 (60회/시간)

### 2. 로그인 후 사용

- GitHub OAuth 로그인
- 시간당 약 800개 README 생성 가능
- 인증된 GitHub API 사용 (5,000회/시간)
- 세션 기반 토큰 관리

### 3. README 생성 과정

1. 사용자명 입력 → `/generate/{username}` 이동
2. 서버에서 GitHub API 호출 (6-7회)
3. 템플릿 생성 및 마크다운 렌더링
4. 복사 가능한 README 제공

## 기술적 특징

### React Router v7 + SSR

- 서버 사이드 렌더링으로 빠른 초기 로딩
- 파일 기반 라우팅 (`$username` 동적 라우트)
- Loader 함수로 데이터 미리 로딩

### GitHub 마크다운 호환

- `react-markdown` + `remark-gfm` 사용
- GitHub과 동일한 렌더링 결과
- 코드 하이라이팅 및 배지 지원

### 세션 관리

- React Router의 `createCookieSessionStorage` 사용
- HttpOnly 쿠키로 보안 강화
- 24시간 세션 유지

---

## 템플릿 시스템 설계

### 강점 유형별 템플릿

사용자의 GitHub 프로필과 강점에 따라 최적화된 템플릿을 제공합니다:

1. **기술 전문가형 (Tech Expert)**

   - 기술 스택 + 오픈소스 기여 중심
   - 깊이 있는 기술적 전문성 강조

2. **성과 중심형 (Project Leader)**

   - 프로젝트 성과 + 임팩트 지표 중심
   - 리더십과 프로젝트 관리 능력 강조

### 컴포넌트 상점 개념

README 구성 요소를 독립적으로 선택하고 복사할 수 있는 시스템:

**구현 완료된 차별화 컴포넌트:**

1. **타임라인 컴포넌트** ⭐ (프로젝트 핵심 차별점)
   - 사용자 커스텀 경력/프로젝트 타임라인
   - 년도, 콘텐츠, 방향, 색상 커스터마이징
   - GitHub 데이터가 아닌 사용자 입력 기반
   - 경력 사항을 직관적으로 시각화

2. **파도 애니메이션 배너** 🌊
   - 동적 인트로 배너, 프로필 헤더용
   - 4가지 테마별 그라디언트 배경
   - CSS 애니메이션 기반 파도 움직임

3. **네온 사인 텍스트** ✨
   - 임팩트 있는 타이틀, 80년대 레트로 스타일
   - 다중 레이어 글로우 효과
   - 4가지 애니메이션 패턴

각 컴포넌트는 독립적으로 생성, 미리보기, 복사가 가능합니다.

### 타임라인 컴포넌트 상세 설계

**핵심 아이디어:**

- GitHub 데이터 의존성 없이 **개인 경력/프로젝트 스토리** 표현
- **경력 하이라이트**를 시각적으로 어필

**사용자 입력 파라미터:**

```typescript
interface TimelineItem {
  period: string; // "2023", "2023.03", "2024.06" 등 유연한 시기 표현
  content: string; // "React 풀스택 개발자로 이직"
  direction: "left" | "right"; // 타임라인 좌우 배치
  color: "blue" | "green" | "purple" | "orange"; // 테마 색상
}
```

**URL 예시:**

```
![Timeline](https://domain.com/api/timeline?items=2023.03,React입문,left,blue;2024.06,프로젝트완성,right,green)
```

**시각적 특징:**

- 세로형 타임라인 (모바일 친화적)
- 년도별 마일스톤 포인트
- 좌우 교대 배치로 시각적 균형
- 색상 테마로 카테고리 구분 (학습/경력/프로젝트 등)

## 개발 규칙

### 코드 작업 프로세스

1. **사전 논의**: 모든 코드 변경은 사전에 논의 후 진행
2. **점진적 구현**: 한 번에 하나씩 기능을 구현
3. **문서 업데이트**: 중요한 결정사항은 CLAUDE.md에 지속적으로 반영
4. **사용자 중심**: 기술적 복잡성보다 사용자 경험 우선

---

## 템플릿 차별화 전략

### API 사용 원칙

- **저장소 분석**: 모든 템플릿에서 **5개 저장소로 통일** (일관성 유지)
- **템플릿 차별화**: 각 템플릿 타입별 **추가 GitHub API 호출**로 특성 강화
- **성능 최적화**: 필요한 경우에만 선택적 추가 API 호출

### 템플릿별 추가 API 전략

1. **기본 템플릿**: 추가 API 없음 (기존 데이터만 사용)

2. **기술 전문가형**: 기술적 깊이를 드러내는 추가 API
   - `/repos/{owner}/{repo}/stats/contributors` - 커밋 활동 패턴
   - `/repos/{owner}/{repo}/contents` - 코드 품질 (README, tests, docs)
   - `/search/issues?q=author:{username}+type:pr` - PR 기여 패턴
   - `/search/issues?q=author:{username}+type:issue` - 이슈 해결 능력
   - `/search/issues?q=reviewed-by:{username}` - 코드 리뷰 활동

### 파일 구조 설계

```
app/lib/
├── types/
│   ├── github.ts        # GitHub API 관련 타입
│   ├── template.ts      # 템플릿 관련 타입
│   └── index.ts         # 통합 export
├── github/              # GitHub API 관련 (분리 예정)
│   ├── core.ts          # 기본 API 함수들
│   ├── analysis.ts      # 데이터 분석 함수들
│   └── tech-expert.ts   # 기술 전문가형 추가 API
├── template.ts          # 템플릿 생성 로직
├── session.ts           # 세션 관리
└── oauth.ts             # OAuth 처리
```

### 코드 구조 원칙

- **관심사 분리**: 파일이 150줄 초과시 분리 검토
- **단일 책임**: 각 파일은 명확한 단일 목적
- **재사용성**: 공통 함수는 독립적으로 분리

---

## TypeScript 개발 규칙

### 타입 안전성 원칙

1. **엄격한 타입 정의**: `any` 타입 사용 금지

   - 모든 함수, 변수, 객체는 명시적 타입 정의
   - 외부 API 응답도 적절한 인터페이스로 정의
   - 타입 추론보다 명시적 타입 선언 선호

2. **인터페이스 활용**: 재사용 가능한 타입 구조

   ```typescript
   // 올바른 예시
   interface GitHubUser {
     login: string;
     name: string | null;
     bio: string | null;
   }

   // 피해야 할 예시
   function fetchUser(): any {}
   ```

3. **제네릭 타입**: 타입 안전성과 재사용성 확보

   ```typescript
   async function fetchFromGitHubApi<T>(endpoint: string): Promise<T>;
   ```

4. **Union 타입**: 명확한 상태 표현
   ```typescript
   type TemplateType = "tech-expert" | "project-leader" | "creator";
   ```

### 타입 파일 구조

- **관심사별 분리**: 큰 타입 파일은 도메인별로 분리
- **명확한 네이밍**: 타입명은 목적과 범위를 명확히 표현
- **Export 관리**: index.ts를 통한 통합 export

### 에러 처리 타입화

- **커스텀 에러 클래스**: 구체적인 에러 타입 정의
- **Result 패턴**: 성공/실패 상태를 타입으로 표현
- **Validation**: 런타임 타입 검증

### 현재 타입 구조 현황

```
app/lib/types/
├── github.ts      # GitHub API 관련 타입 (완료)
├── template.ts    # 템플릿 관련 타입 (완료)
└── index.ts       # 통합 export (완료)
```

**주요 타입 정의:**

- `GitHubUserProfile`, `GitHubRepository` - 기본 GitHub 데이터
- `TechExpertData` - 기술 전문가형 확장 데이터
- `ReadmeTemplate` - 템플릿 구조
- `TemplateType` - 템플릿 유형 정의

---

## SVG 컴포넌트 시스템

### 핵심 개념

GitHub README에 임베드 가능한 **동적 SVG 컴포넌트 상점** 구축. 사용자가 맞춤형 비주얼 요소를 생성하고 README에 바로 사용할 수 있는 시스템.

### 기술적 아키텍처

**SVG 생성 파이프라인:**
```
React JSX → renderToStaticMarkup → SVG 문자열 → API 응답 → GitHub 이미지 임베드
```

**핵심 설계 원칙:**
- **서버사이드 렌더링**: `renderToStaticMarkup` 사용 (vs `renderToString`)
- **URL 파라미터 기반**: 모든 설정을 URL 쿼리스트링으로 전달
- **GitHub 마크다운 호환**: `![Alt Text](URL)` 형태로 즉시 사용 가능
- **SVG 내 스타일링**: Tailwind 불가, CSS-in-JS 방식 사용

### 컴포넌트 상점 구조

```
app/components/svg/
├── timeline/                 # 경력/프로젝트 타임라인
│   ├── types.ts             # 인터페이스 정의
│   ├── timeline-svg.tsx     # 메인 SVG 컴포넌트
│   └── index.ts             # Export 통합
├── wave-banner/             # 파도 애니메이션 배너
│   ├── types.ts
│   ├── wave-banner-svg.tsx
│   └── index.ts
├── neon-sign/               # 네온 사인 텍스트
│   ├── types.ts
│   ├── neon-sign-svg.tsx
│   └── index.ts
└── index.ts                 # 전체 SVG 컴포넌트 Export
```

**API 엔드포인트 구조:**
```
app/routes/
├── api.timeline.tsx         # GET /api/timeline?title=...&items=...
├── api.wave-banner.tsx      # GET /api/wave-banner?title=...&theme=...
└── api.neon-sign.tsx        # GET /api/neon-sign?text=...&animation=...
```

### 구현된 컴포넌트

#### 1. 타임라인 컴포넌트 ⭐
**용도**: 경력 여정, 프로젝트 마일스톤 시각화
**파라미터**: 
- `title`: 타임라인 제목
- `items`: 시기,내용,방향,색상 세미콜론 구분 (`2023.03,React입문,left,blue;2024.06,프로젝트완성,right,green`)

**차별점**: GitHub 데이터 독립적, 사용자 커스텀 스토리

#### 2. 파도 애니메이션 배너 🌊  
**용도**: 동적 인트로 배너, 프로필 헤더
**파라미터**:
- `title`: 메인 타이틀
- `subtitle`: 서브타이틀  
- `theme`: ocean/sunset/aurora/dark

**기술적 특징**: 
- CSS 애니메이션 기반 파도 움직임
- 4가지 테마별 그라디언트 배경
- 반짝이는 파티클 효과

#### 3. 네온 사인 텍스트 ✨
**용도**: 임팩트 있는 타이틀, 80년대 레트로 스타일
**파라미터**:
- `text`: 메인 텍스트
- `subtitle`: 서브 텍스트
- `theme`: classic/cyberpunk/retro/electric  
- `animation`: steady/flicker/pulse/wave

**고급 기능**:
- 다중 레이어 글로우 효과 (`feGaussianBlur` + `feMerge`)
- 4가지 애니메이션 패턴
- 네온사인 프레임과 장식 요소

### SVG 스타일링 기술적 제약사항

**Tailwind CSS 불가:**
```jsx
// ❌ 작동하지 않음
<text className="text-blue-500 font-bold">Hello</text>

// ✅ 올바른 방법 - CSS-in-JS
<style>{`
  .neon-text { 
    fill: #00ffff; 
    font-weight: bold;
    filter: url(#glow);
  }
`}</style>
<text className="neon-text">Hello</text>
```

**SVG 필터 효과:**
```jsx
// 글로우 효과 구현
<filter id="glow">
  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
  <feMerge>
    <feMergeNode in="coloredBlur"/>  // 흐린 버전 (후광)
    <feMergeNode in="SourceGraphic"/> // 원본 (선명한 텍스트)
  </feMerge>
</filter>
```

### 사용자 플로우

1. **상점 접속**: `/shop` 페이지에서 컴포넌트 선택
2. **커스터마이징**: 실시간 폼으로 설정 변경
3. **미리보기**: 즉시 SVG 렌더링 확인
4. **마크다운 생성**: 자동 생성된 코드 복사
5. **README 임베드**: GitHub에 붙여넣기

### 컴포넌트 상점 네비게이션

**네비게이션 시스템 추가:**
- 홈페이지(`/`)와 상점(`/shop`) 간 양방향 링크
- 공통 헤더 컴포넌트로 일관성 확보
- 현재 페이지 강조 표시

### 향후 확장 계획

**차별화된 컴포넌트 아이디어:**
- 🌌 우주/별자리 패턴 (개인 성향 표현)
- 🎭 홀로그램 카드 (미래지향적 디자인)
- 🔥 불꽃 애니메이션 효과 (열정 표현)
- 🎨 커스텀 일러스트레이션 (개성 표현)
- 🌐 인터랙티브 월드맵 (글로벌 경험)

**시스템 개선:**
- 컴포넌트 카테고리 분류 (애니메이션/장식/개성표현)
- 컴포넌트 조합 시뮬레이터
- 실시간 미리보기 최적화

---

## 개발 의사결정 로그

### CLAUDE.md 업데이트 자동화 부족 원인 분석

**문제점:**
1. **작업 우선순위**: 구현에만 집중하고 문서화 후순위
2. **명시적 리마인더 부족**: 코드 변경 후 문서 업데이트 체크리스트 없음
3. **컨텍스트 제한**: 긴 대화에서 초기 지침 망각

**개선 방안:**
1. **매 세션 시작**: CLAUDE.md 현재 상태 확인
2. **주요 결정 후**: 즉시 CLAUDE.md 업데이트 수행  
3. **체크리스트 활용**: 새 기능 완성 시 문서화 단계 포함
4. **정기적 리뷰**: 매 5-10개 주요 변경사항마다 문서 정비

**실행 규칙:**
- 새로운 컴포넌트/기능 추가 시 → 즉시 CLAUDE.md 업데이트
- 아키텍처 변경 시 → 해당 섹션 수정
- 기술적 제약사항 발견 시 → 별도 섹션에 기록
- 사용자 플로우 변경 시 → 해당 부분 갱신

### 주요 기술적 결정사항

**1. renderToStaticMarkup vs renderToString**
- **결정**: `renderToStaticMarkup` 사용
- **이유**: React 하이드레이션 속성 없는 깔끔한 SVG 출력
- **효과**: GitHub에서 렌더링 시 불필요한 속성 제거

**2. SVG 애니메이션 방식**
- **결정**: CSS `@keyframes` + SVG `<animate>` 혼합 사용
- **이유**: 브라우저 호환성과 성능의 균형
- **제약**: GitHub README에서 애니메이션 지원 제한적

**3. 컴포넌트 모듈화 구조**
- **결정**: 컴포넌트별 독립 폴더 + types.ts 분리
- **이유**: 유지보수성과 재사용성 향상
- **패턴**: `types.ts` → `component-svg.tsx` → `index.ts`

**4. 공통 헤더 컴포넌트**
- **결정**: 모바일 친화적 공통 헤더 컴포넌트 생성
- **이유**: 디자인 일관성 및 모바일 UX 개선
- **특징**: 햄버거 메뉴, 반응형 네비게이션, 사용자 정보 표시
- **위치**: `app/components/header.tsx`

### UI/UX 개선사항

**모바일 최적화:**
- 768px 이하에서 햄버거 메뉴 표시
- 모바일 메뉴에서 사용자 정보 및 네비게이션 통합
- 터치 친화적 버튼 크기 (최소 44px)
- 현재 페이지 하이라이트 표시

**디자인 일관성:**
- 모든 페이지에서 동일한 헤더 사용
- Tailwind CSS 기반 반응형 디자인
- 로그인/비로그인 상태별 다른 UI 표시

**5. 통합 디자인 시스템 적용**
- **결정**: 모든 페이지에 동일한 그라데이션 테마 적용
- **이유**: 브랜딩 일관성과 전문적인 느낌 제공
- **특징**: 
  - 슬레이트-퍼플 그라데이션 배경
  - 글래스모피즘 효과 (backdrop-blur)
  - 통일된 애니메이션 배경 파티클
- **적용 범위**: 홈(`/`), 생성 페이지(`/generate/{username}`), 컴포넌트 상점(`/shop`)

**6. CopyButton 컴포넌트 통일화**
- **결정**: 모든 복사 기능을 `CopyButton` 컴포넌트로 통일
- **이유**: 일관된 UX와 피드백 제공, 중복 코드 제거
- **개선사항**:
  - 인라인 복사 버튼을 컴포넌트로 교체
  - 성공/실패 피드백 통일
  - 크기와 스타일 옵션 제공

### 현재 구현 완료 상태

**✅ 완성된 기능:**
1. GitHub README 템플릿 생성 (3가지 타입)
2. SVG 컴포넌트 상점 (타임라인, 파도배너, 네온사인)
3. OAuth 기반 로그인/세션 관리
4. 반응형 디자인 시스템
5. 템플릿 비교 모드
6. 통합된 복사 기능

**⚠️ 수정 필요한 내용:**
- 프로젝트 구조 가이드라인이 현재와 다름 (`/shop` 라우트 누락)
- "기본 제공 컴포넌트" 섹션에 미구현 컴포넌트들 나열됨

### 최근 핵심 개선사항

**UI/UX 품질 향상:**
- 비교 모드에서 가로스크롤 문제 해결
- 버튼 크기 최적화로 레이아웃 오버플로우 방지
- "준비중" 텍스트 줄바꿈 방지
- 템플릿 미리보기 스케일링 최적화

**사용자 경험 개선:**
- 모든 템플릿 비교 모드에서 복사/미리보기 기능 활성화
- 컴포넌트 상점의 복사 버튼 일관성 확보
- 에러 페이지 디자인 통일
