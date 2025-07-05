import type { TechExpertData } from './types/github';
import { mockGitHubData } from './mock-data';

export const mockTechExpertData: TechExpertData = {
  ...mockGitHubData,
  
  // 언어별 전문성 분석
  languageExpertise: {
    'TypeScript': {
      proficiencyLevel: 'Expert',
      repositoryCount: 8,
      totalBytes: 125000,
      averageStars: 18.8,
      recentActivity: true,
    },
    'JavaScript': {
      proficiencyLevel: 'Advanced',
      repositoryCount: 12,
      totalBytes: 98000,
      averageStars: 12.3,
      recentActivity: true,
    },
    'Python': {
      proficiencyLevel: 'Advanced',
      repositoryCount: 6,
      totalBytes: 75000,
      averageStars: 15.2,
      recentActivity: false,
    },
    'Java': {
      proficiencyLevel: 'Intermediate',
      repositoryCount: 3,
      totalBytes: 45000,
      averageStars: 8.7,
      recentActivity: false,
    },
  },

  // 코드 품질 지표
  codeQualityMetrics: {
    documentationScore: 85,
    projectMaturity: 78,
    codeOrganization: 92,
    communityEngagement: 68,
  },

  // 기술적 깊이
  technicalDepth: {
    primaryExpertise: 'TypeScript',
    secondarySkills: ['JavaScript', 'Python'],
    modernTechAdoption: true,
    projectComplexity: 'High',
  },

  // 커밋 활동 패턴
  commitActivity: {
    totalCommits: 1247,
    weeklyPattern: [45, 52, 48, 39, 41, 23, 18], // 월-일
    consistencyScore: 78,
  },

  // 기여 통계
  contributionStats: {
    totalPRs: 156,
    recentPRs: 23,
    avgPRsPerMonth: 3.8,
  },

  // 이슈 기여도
  issueContributions: {
    totalIssues: 89,
    closedIssues: 74,
    resolutionRate: 83,
  },

  // 코드 리뷰 활동
  reviewActivity: {
    totalReviews: 134,
    recentReviews: 18,
  },
};