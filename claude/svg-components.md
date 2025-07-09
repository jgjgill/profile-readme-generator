# SVG 컴포넌트 시스템

## 핵심 개념

GitHub README에 임베드 가능한 **동적 SVG 컴포넌트 상점** 구축. 사용자가 맞춤형 비주얼 요소를 생성하고 README에 바로 사용할 수 있는 시스템.

## 기술적 아키텍처

### SVG 생성 파이프라인
```
React JSX → renderToStaticMarkup → SVG 문자열 → API 응답 → GitHub 이미지 임베드
```

### 핵심 설계 원칙
- **서버사이드 렌더링**: `renderToStaticMarkup` 사용 (vs `renderToString`)
- **URL 파라미터 기반**: 모든 설정을 URL 쿼리스트링으로 전달
- **GitHub 마크다운 호환**: `![Alt Text](URL)` 형태로 즉시 사용 가능
- **SVG 내 스타일링**: Tailwind 불가, CSS-in-JS 방식 사용

## 컴포넌트 상점 구조

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

### API 엔드포인트 구조
```
app/routes/
├── api.timeline.tsx         # GET /api/timeline?title=...&items=...
├── api.wave-banner.tsx      # GET /api/wave-banner?title=...&theme=...
└── api.neon-sign.tsx        # GET /api/neon-sign?text=...&animation=...
```

## 구현된 컴포넌트

### 1. 타임라인 컴포넌트 ⭐
**용도**: 경력 여정, 프로젝트 마일스톤 시각화

**파라미터**: 
- `title`: 타임라인 제목
- `items`: 시기,내용,방향,색상 세미콜론 구분
  
**예시**: `2023.03,React입문,left,blue;2024.06,프로젝트완성,right,green`

**차별점**: GitHub 데이터 독립적, 사용자 커스텀 스토리

**시각적 특징**:
- 세로형 타임라인 (모바일 친화적)
- 년도별 마일스톤 포인트
- 좌우 교대 배치로 시각적 균형
- 색상 테마로 카테고리 구분 (학습/경력/프로젝트 등)

### 2. 파도 애니메이션 배너 🌊  
**용도**: 동적 인트로 배너, 프로필 헤더

**파라미터**:
- `title`: 메인 타이틀
- `subtitle`: 서브타이틀  
- `theme`: ocean/sunset/aurora/dark

**기술적 특징**: 
- CSS 애니메이션 기반 파도 움직임
- 4가지 테마별 그라디언트 배경
- 반짝이는 파티클 효과

### 3. 네온 사인 텍스트 ✨
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

## SVG 스타일링 기술적 제약사항

### Tailwind CSS 불가
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

### SVG 필터 효과
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

## 사용자 플로우

1. **상점 접속**: `/shop` 페이지에서 컴포넌트 선택
2. **커스터마이징**: 실시간 폼으로 설정 변경
3. **미리보기**: 즉시 SVG 렌더링 확인
4. **마크다운 생성**: 자동 생성된 코드 복사
5. **README 임베드**: GitHub에 붙여넣기

## 컴포넌트 상점 네비게이션

**네비게이션 시스템**:
- 홈페이지(`/`)와 상점(`/shop`) 간 양방향 링크
- 공통 헤더 컴포넌트로 일관성 확보
- 현재 페이지 강조 표시

## 향후 확장 계획

### 차별화된 컴포넌트 아이디어
- 🌌 우주/별자리 패턴 (개인 성향 표현)
- 🎭 홀로그램 카드 (미래지향적 디자인)
- 🔥 불꽃 애니메이션 효과 (열정 표현)
- 🎨 커스텀 일러스트레이션 (개성 표현)
- 🌐 인터랙티브 월드맵 (글로벌 경험)

### 시스템 개선
- 컴포넌트 카테고리 분류 (애니메이션/장식/개성표현)
- 컴포넌트 조합 시뮬레이터
- 실시간 미리보기 최적화

## 기술적 결정사항

### renderToStaticMarkup vs renderToString
- **결정**: `renderToStaticMarkup` 사용
- **이유**: React 하이드레이션 속성 없는 깔끔한 SVG 출력
- **효과**: GitHub에서 렌더링 시 불필요한 속성 제거

### SVG 애니메이션 방식
- **결정**: CSS `@keyframes` + SVG `<animate>` 혼합 사용
- **이유**: 브라우저 호환성과 성능의 균형
- **제약**: GitHub README에서 애니메이션 지원 제한적

### 컴포넌트 모듈화 구조
- **결정**: 컴포넌트별 독립 폴더 + types.ts 분리
- **이유**: 유지보수성과 재사용성 향상
- **패턴**: `types.ts` → `component-svg.tsx` → `index.ts`