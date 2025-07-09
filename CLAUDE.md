# CLAUDE.md

이 파일은 저장소에서 코드 작업을 할 때 Claude Code (claude.ai/code)에 대한 가이드를 제공합니다.

## 📚 문서 구조

프로젝트 문서가 관심사별로 분리되어 있습니다:

- **[프로젝트 개요](./claude/project-overview.md)** - 핵심 미션, MVP 범위, 개발 원칙
- **[아키텍처 가이드](./claude/architecture.md)** - 기술 스택, 프로젝트 구조, 핵심 설정
- **[개발 가이드](./claude/development-guide.md)** - 개발 명령어, 환경 설정, 코딩 규칙
- **[기술적 결정사항](./claude/technical-decisions.md)** - 주요 아키텍처 결정, UI/UX 개선사항
- **[템플릿 시스템](./claude/template-system.md)** - 템플릿 철학, 차별화 전략
- **[SVG 컴포넌트](./claude/svg-components.md)** - SVG 컴포넌트 상점 시스템
- **[GitHub API 전략](./claude/github-api.md)** - API 사용 전략, 데이터 수집 방식

## 🚀 빠른 시작

### 개발 서버 실행

```bash
pnpm run dev
```

### 환경 설정

1. `.env` 파일에 GitHub OAuth 설정 추가
2. 개발 서버 실행
3. http://localhost:5173 접속

자세한 내용은 [개발 가이드](./claude/development-guide.md)를 참고하세요.

## 🎯 현재 프로젝트 상태

### ✅ 완성된 기능

- GitHub README 템플릿 생성 (3가지 타입)
- SVG 컴포넌트 상점 (타임라인, 파도배너, 네온사인)
- OAuth 기반 로그인/세션 관리
- 반응형 디자인 시스템
- 모듈화된 템플릿 시스템

### 🔄 진행 중인 작업

- 번들 크기 최적화 (highlight.js 선택적 import)
- 코드 분할 (Dynamic Import) 적용
- 컴포넌트 지연 로딩 구현

## 📝 개발 원칙

1. **관심사 분리**: 파일이 150줄 초과시 분리 검토
2. **단일 책임**: 각 파일은 명확한 단일 목적
3. **재사용성**: 공통 함수는 독립적으로 분리
4. **타입 안전성**: `any` 타입 사용 금지
5. **작업 단위별 커밋**: 관심사별로 커밋 분리

## 🔧 주요 기술 스택

- **React Router v7**: SSR + 파일 기반 라우팅
- **TypeScript**: 엄격한 타입 안전성
- **TailwindCSS v4**: 유틸리티 퍼스트 CSS
- **GitHub API**: 사용자 데이터 수집
- **pnpm**: 고성능 패키지 매니저

## 📖 추가 정보

각 문서는 독립적으로 읽을 수 있도록 구성되어 있습니다. 필요한 정보에 따라 해당 문서를 참조하세요.

---

> 💡 **Tip**: 새로운 기능을 개발할 때는 먼저 해당 문서를 확인하고, 변경사항이 있으면 문서도 함께 업데이트해주세요.
