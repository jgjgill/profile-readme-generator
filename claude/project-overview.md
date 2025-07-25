# 프로젝트 개요: GitHub 프로필 README 생성기

## 핵심 미션

**GitHub 프로필 README 템플릿 제공 서비스**

- GitHub 사용자 정보를 활용해 전문적인 README 템플릿 생성
- 취준생/이직자가 즉시 사용할 수 있는 완성도 높은 템플릿

## MVP 범위

1. **템플릿 생성**: GitHub 데이터 기반 README 템플릿 자동 생성
2. **템플릿 품질**: 채용담당자에게 어필할 수 있는 전문적인 구성
3. **즉시 사용**: 생성된 템플릿을 바로 복사해서 GitHub에 적용 가능

## 핵심 개발 원칙

- **기술적 복잡성보다 템플릿 품질**: 템플릿이 서비스의 전부
- **사용자 맞춤형 템플릿**: 강점 유형별 다양한 템플릿 제공
- **컴포넌트 상점**: README 구성 요소를 독립적으로 선택/복사 가능
- **채용담당자 중심**: 채용 담당자가 보고 싶어하는 내용
- **3초 룰**: 3초 내에 핵심 역량을 파악할 수 있어야 함
- **즉시 가치 제공**: 사용자가 바로 활용할 수 있는 결과

## 최종 목표

**"채용담당자가 생성된 README를 보고 3초 내에 지원자 역량을 평가할 수 있어야 함"**

템플릿 품질이 서비스 성공을 결정합니다. 기술적 구현은 템플릿을 위해 존재하며, 그 반대가 아닙니다.

## 성공 기준

- ✅ GitHub 사용자명 입력으로 전문적인 README 생성
- ✅ 템플릿이 프로필 조회수/채용담당자 관심 증가
- ✅ 즉시 GitHub에 복사-붙여넣기 가능
- ✅ 모바일 기기에서 작동
- ✅ 5초 이내 로딩 시간

## 품질 기준

- **가독성 있는 코드**: 영리함보다 명확성 우선
- **에러 처리**: 도움이 되는 메시지와 함께 우아한 실패
- **타입 안전성**: 포괄적인 TypeScript 정의
- **성능**: 빠른 로딩, 효율적인 API 호출
- **유지보수성**: 간단한 구조, 확장하기 쉬움