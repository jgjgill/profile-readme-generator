// 기존 템플릿 함수들을 새로운 구조로 export
export {
  generateStandardTemplate as generateReadmeTemplate,
  generateImpactTemplate,
  generateTechExpertTemplate,
} from "./generators";

// 개별 섹션 생성 함수들
export * from "./sections";

// 유틸리티 함수들
export * from "./helpers";