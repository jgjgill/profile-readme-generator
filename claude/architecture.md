# 아키텍처 가이드

## 기술 스택

이 프로젝트는 기본적으로 서버 사이드 렌더링이 활성화된 React Router v7 애플리케이션입니다.

### 주요 기술

- **React Router v7**: 서버사이드 렌더링 + 파일 기반 라우팅
- **TypeScript**: 엄격한 타입 안전성
- **TailwindCSS v4**: 유틸리티 퍼스트 CSS 프레임워크
- **pnpm**: 고성능 패키지 매니저
- **GitHub API**: 사용자 데이터 수집
- **OAuth 2.0**: 안전한 인증

## 프로젝트 구조

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
│   ├── template/               # 템플릿 시스템 (모듈화 완료)
│   │   ├── generators/         # 템플릿 생성기들
│   │   │   ├── standard.ts     # 기본 템플릿
│   │   │   ├── impact.ts       # 임팩트 중심 템플릿
│   │   │   ├── tech-expert.ts  # 기술 전문가 템플릿
│   │   │   └── index.ts        # 통합 export
│   │   ├── sections/           # 재사용 가능한 섹션들
│   │   │   ├── about-me.ts     # About Me 섹션 (동적 생성)
│   │   │   ├── projects.ts     # 프로젝트 섹션
│   │   │   ├── stats.ts        # 통계 섹션
│   │   │   ├── header.ts       # 헤더 섹션
│   │   │   └── index.ts        # 통합 export
│   │   ├── helpers/            # 유틸리티 함수들
│   │   │   ├── badges.ts       # 배지 생성 함수
│   │   │   ├── analysis.ts     # 데이터 분석 함수
│   │   │   └── index.ts        # 통합 export
│   │   ├── template.stories.tsx # Storybook 스토리
│   │   └── index.ts            # 전체 통합 export
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

## 핵심 설정 파일

- `react-router.config.ts` - React Router 설정 (SSR 활성화)
- `vite.config.ts` - TailwindCSS와 함께 Vite 번들러 설정
- `tsconfig.json` - 경로 별칭이 포함된 TypeScript 설정 (`~/*`는 `./app/*`에 매핑)

## 주요 기술적 특징

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

### 스타일링
- TailwindCSS v4 사용
- Vite 플러그인 통합
- 모든 페이지 반응형 디자인

### 배포
- 컨테이너화된 배포를 위한 Dockerfile 포함
- 빌드 출력: `build/client/`와 `build/server/` 분리

## 코드 구조 원칙

- **관심사 분리**: 파일이 150줄 초과시 분리 검토
- **단일 책임**: 각 파일은 명확한 단일 목적
- **재사용성**: 공통 함수는 독립적으로 분리
- **모듈화**: 기능별 독립적 모듈 구성