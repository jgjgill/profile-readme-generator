# 개발 가이드

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

**Storybook:**
```bash
pnpm run storybook
```

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

## 코드 작업 프로세스

1. **사전 논의**: 모든 코드 변경은 사전에 논의 후 진행
2. **점진적 구현**: 한 번에 하나씩 기능을 구현
3. **문서 업데이트**: 중요한 결정사항은 문서에 지속적으로 반영
4. **사용자 중심**: 기술적 복잡성보다 사용자 경험 우선
5. **작업 단위별 커밋**: 관심사별로 커밋을 분리하여 변경사항 추적

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

## 커밋 관리 원칙

### 작업 단위별 커밋 생성

**기본 원칙:**
- 기능 완성 시점에 즉시 커밋 작성
- 관심사별로 커밋을 분리하여 변경사항 추적 용이
- 커밋 메시지는 변경 내용과 목적을 명확히 표현

**커밋 메시지 형식:**
```
type: brief description

- Detailed changes (if needed)
- Multiple changes listed separately
- Focus on "why" rather than "what"

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

**커밋 타입:**
- `feat`: 새로운 기능 추가
- `fix`: 버그 수정  
- `refactor`: 코드 리팩터링
- `docs`: 문서 업데이트
- `style`: 코드 스타일 변경
- `test`: 테스트 추가/수정
- `chore`: 빌드/설정 변경

**커밋 시점:**
- 새로운 컴포넌트/기능 완성 후
- 버그 수정 완료 후
- 리팩터링 작업 완료 후
- 문서 업데이트 완료 후
- 설정 변경 완료 후

## 모범 사례

- 항상 설명적인 변수명을 사용하세요
- 파일이 150줄을 초과하면 분리를 검토하세요
- 각 파일은 명확한 단일 목적을 가져야 합니다
- 공통 함수는 독립적으로 분리하세요
- 패키지 매니저는 pnpm을 사용하세요 (npm 대신)
- **작업 완료 시 반드시 커밋을 작성하세요**