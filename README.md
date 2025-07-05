# GitHub Profile README Generator 🚀

**3초 만에 전문적인 GitHub README를 생성하세요!**

GitHub 프로필 README 템플릿 생성 서비스입니다. GitHub 사용자 정보를 활용해 자신을 어필할 수 있는 완성도 높은 템플릿을 자동으로 생성합니다.

## ✨ 주요 기능

### 📝 README 템플릿 생성

- **기본형**: 깔끔하고 전문적인 기본 템플릿
- **기술 전문가형**: 기술 스택과 오픈소스 기여 중심
- **프로젝트 리더형**: 프로젝트 성과와 리더십 경험 강조

### 🎨 SVG 컴포넌트 상점

- **타임라인**: 경력 여정과 프로젝트 마일스톤 시각화
- **파도 애니메이션 배너**: 동적 인트로 배너 (4가지 테마)
- **네온 사인 텍스트**: 80년대 레트로 스타일 임팩트 텍스트

### 🔧 기술적 특징

- **즉시 사용 가능**: 생성된 마크다운을 바로 GitHub에 적용
- **OAuth 인증**: GitHub 로그인으로 API 제한 해제

## 🎯 사용자 혜택

| 사용자 유형 | API 제한 | 시간당 생성 가능 |
|-------------|----------|-----------------|
| **무료 사용자** | 60회/시간 | ~10개 README |
| **로그인 사용자** | 5,000회/시간 | ~800개 README |

## 🚀 빠른 시작

### 필수 요구사항

- Node.js 20+
- pnpm 9.15.0+
- GitHub OAuth App (선택사항)

### 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 시작
pnpm run dev
```

서버가 `http://localhost:5173`에서 실행됩니다.

## ⚙️ 환경 설정

### GitHub OAuth App 등록 (선택사항)

더 많은 API 호출을 위해 GitHub OAuth App을 등록하세요:

1. [GitHub Developer Settings](https://github.com/settings/developers)에서 "New OAuth App" 클릭
2. 다음 정보 입력:
   - **Application name**: GitHub Profile README Generator
   - **Homepage URL**: `http://localhost:5173`
   - **Authorization callback URL**: `http://localhost:5173/auth/callback`

### 환경변수 설정

`.env` 파일을 생성하고 다음 내용을 추가하세요:

```bash
# GitHub OAuth (선택사항)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_REDIRECT_URI=http://localhost:5173/auth/callback

# 세션 암호화 (필수)
SESSION_SECRET=your-super-secret-session-key

# 개발용 토큰 (선택사항)
GITHUB_TOKEN=your_github_token_here
```

## 📱 사용 방법

### 1. README 템플릿 생성
1. 홈페이지에서 GitHub 사용자명 입력
2. 템플릿 유형 선택 (기본형/기술전문가형/프로젝트리더형)
3. 생성된 마크다운 복사하여 GitHub 프로필에 적용

### 2. SVG 컴포넌트 사용
1. `/shop` 페이지에서 원하는 컴포넌트 선택
2. 실시간으로 설정 변경하며 미리보기 확인
3. 생성된 마크다운 코드를 README에 추가

## 🏗️ 빌드 및 배포

### 프로덕션 빌드

```bash
# TypeScript 검사
pnpm run typecheck

# 프로덕션 빌드
pnpm run build

# 프로덕션 서버 시작
pnpm run start
```

## 🛠️ 기술 스택

### Frontend
- **React Router v7**: SSR이 활성화된 풀스택 프레임워크
- **TypeScript**: 타입 안전성
- **TailwindCSS v4**: 유틸리티 기반 스타일링
- **React Markdown**: GitHub 호환 마크다운 렌더링

### Backend
- **Node.js**: 서버사이드 런타임
- **GitHub API**: 사용자 프로필 및 저장소 데이터
- **Session Management**: 쿠키 기반 세션 관리

### DevOps
- **pnpm**: 빠른 패키지 매니저
- **Docker**: 컨테이너화 배포
- **Storybook**: 컴포넌트 문서화

## 🎨 프로젝트 구조

```
app/
├── routes/                 # 페이지 라우트
│   ├── _index.tsx         # 홈페이지
│   ├── generate.$username.tsx  # README 생성
│   ├── shop.tsx           # SVG 컴포넌트 상점
│   └── api.*.tsx          # SVG API 엔드포인트
├── components/            # 재사용 컴포넌트
│   ├── shop/              # 상점 관련 컴포넌트
│   └── svg/               # SVG 컴포넌트들
├── lib/                   # 비즈니스 로직
│   ├── github/            # GitHub API 연동
│   ├── types/             # TypeScript 타입
│   └── hooks/             # 커스텀 훅
└── assets/                # 정적 파일
```

## 🤝 기여하기

이슈와 풀 리퀘스트를 환영합니다!

### 개발 가이드라인
1. 코드 변경 전 이슈 생성
2. 타입 안전성 유지 (`pnpm run typecheck`)
3. 명확한 커밋 메시지 작성
4. 새로운 컴포넌트 추가 시 Storybook 스토리 작성

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

---

**💡 Tip**: 생성된 README가 마음에 드시나요? ⭐ 스타를 눌러주세요!

Built with ❤️ using React Router v7
