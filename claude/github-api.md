# GitHub API 연동 가이드

## API 전략 및 사용자 경험

### API 요청 제한 및 사용자 혜택

- **무료 사용자 (비로그인)**: 시간당 약 10개 README 생성 (API 60회 제한)
- **로그인 사용자 (OAuth)**: 시간당 약 800개 README 생성 (API 5,000회 제한)
- **README 1개 생성**: 평균 6-7회 API 호출 (최적화됨)

### API 호출 구조

**기본 템플릿 생성 과정:**
1. 사용자 프로필 정보 (1회)
2. 저장소 목록 조회 (1회)
3. 상위 5개 저장소 언어 통계 (최대 5회)

**총 API 호출**: 6-7회 (효율적으로 최적화됨)

## 수집 데이터 범위

### 필수 데이터 (모든 템플릿)

1. **기본 정보**: 사용자명, 실명, 프로필 이미지
2. **자기소개 텍스트**: GitHub bio
3. **공개 리포지토리 수**: 활동 규모 측정
4. **상위 3개 프로그래밍 언어**: 기술 스택 파악
5. **가장 많은 스타를 받은 리포지토리**: 대표 프로젝트

### 수집하지 않을 데이터

- 상세한 커밋 히스토리
- 협업 패턴
- 활동 시간대 패턴
- 팔로워/팔로잉 관계

## OAuth 인증 플로우

### GitHub OAuth App 설정

**등록 정보:**
- **Application name**: GitHub Profile README Generator
- **Homepage URL**: http://localhost:5173
- **Authorization callback URL**: http://localhost:5173/auth/callback

### 환경변수 설정

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

### 인증 플로우

1. **로그인 시작**: `/auth/login` → GitHub OAuth 페이지로 리다이렉트
2. **사용자 승인**: GitHub에서 권한 승인
3. **콜백 처리**: `/auth/callback`에서 authorization code 받음
4. **토큰 교환**: code를 access token으로 교환
5. **세션 저장**: React Router의 cookie session에 저장
6. **사용자 리다이렉트**: 메인 페이지로 복귀

## API 모듈 구조

### 파일 구조
```
app/lib/github/
├── core.ts          # 기본 API 함수들
├── analysis.ts      # 데이터 분석 함수들
├── tech-expert.ts   # 기술 전문가형 추가 API
└── index.ts         # 통합 export
```

### 핵심 API 함수

**기본 데이터 수집:**
```typescript
// 사용자 프로필 정보
async function fetchUserProfile(username: string): Promise<GitHubUserProfile>

// 저장소 목록 (최신순 정렬)
async function fetchUserRepositories(username: string): Promise<GitHubRepository[]>

// 특정 저장소의 언어 통계
async function fetchRepositoryLanguages(owner: string, repo: string): Promise<Record<string, number>>
```

**분석 함수:**
```typescript
// 상위 언어 추출 (전체 저장소 기준)
function getTopLanguages(repositories: GitHubRepository[]): string[]

// 대표 프로젝트 선정
function selectTopRepositories(repositories: GitHubRepository[]): GitHubRepository[]

// 활동 패턴 분석
function analyzeActivityPattern(repositories: GitHubRepository[]): ActivityPattern
```

## 템플릿별 추가 API 호출

### 기본 템플릿
- 추가 API 호출 없음
- 기본 6-7회 호출로 완성

### 임팩트 중심형 템플릿
- 프로젝트별 상세 통계
- 최근 활동 패턴
- 기여도 지표

### 기술 전문가형 템플릿
추가 API 호출로 기술적 깊이 강화:

```typescript
// 커밋 활동 패턴
GET /repos/{owner}/{repo}/stats/contributors

// 코드 품질 지표 (README, tests, docs 존재 여부)
GET /repos/{owner}/{repo}/contents

// PR 기여 패턴
GET /search/issues?q=author:{username}+type:pr

// 이슈 해결 능력
GET /search/issues?q=author:{username}+type:issue

// 코드 리뷰 활동
GET /search/issues?q=reviewed-by:{username}
```

## 에러 처리 및 제한사항

### API 제한 처리

```typescript
// Rate limit 확인
function checkRateLimit(response: Response): void

// 재시도 로직
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3
): Promise<T>
```

### 일반적인 에러 상황

1. **사용자를 찾을 수 없음**: 404 응답
2. **API 제한 초과**: 403 응답 (rate limit)
3. **네트워크 오류**: 연결 실패
4. **권한 부족**: 403 응답 (private repository)

### 우아한 실패 처리

- 필수 데이터를 얻지 못한 경우 기본값 제공
- 선택적 데이터 실패 시 해당 섹션만 생략
- 사용자에게 명확한 에러 메시지 표시

## 성능 최적화

### API 호출 최적화

1. **병렬 처리**: 독립적인 API 호출을 동시에 실행
2. **선택적 호출**: 템플릿 타입에 따라 필요한 API만 호출
3. **캐싱**: 동일한 사용자 요청 시 캐시 활용 (세션 기간 내)

### 데이터 처리 최적화

```typescript
// 언어 통계 계산 최적화
function calculateLanguageStats(repositories: GitHubRepository[]): Record<string, number> {
  // 상위 5개 저장소만 분석하여 API 호출 제한
  const topRepos = repositories
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5);
    
  // 병렬로 언어 통계 수집
  return Promise.all(
    topRepos.map(repo => fetchRepositoryLanguages(repo.owner.login, repo.name))
  );
}
```

## 개발 및 테스트

### 개발용 설정

```typescript
// 개발 모드에서 mock 데이터 사용
const isDevelopment = process.env.NODE_ENV === 'development';

if (isDevelopment && !process.env.GITHUB_TOKEN) {
  return mockGitHubData; // 실제 API 호출 대신 mock 데이터 반환
}
```

### API 테스트

- Storybook을 통한 템플릿 시각적 테스트
- Mock 데이터로 다양한 사용자 프로필 시뮬레이션
- API 제한 상황 테스트