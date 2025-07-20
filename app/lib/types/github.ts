export interface GitHubUserProfile {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  html_url: string;
  created_at: string;
  followers: number;
}

export interface GitHubRepository {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
}

export interface GitHubLanguageStats {
  [language: string]: number;
}

export interface ProcessedGitHubData {
  userProfile: GitHubUserProfile;
  topRepositories: GitHubRepository[];
  languageStats: GitHubLanguageStats;
  topLanguages: string[];
  mostStarredRepository: GitHubRepository | null;
}

// 기술 전문가형 템플릿을 위한 확장 데이터
export interface TechExpertData extends ProcessedGitHubData {
  languageExpertise: LanguageExpertise;
  codeQualityMetrics: CodeQualityMetrics;
  technicalDepth: TechnicalDepth;
  // 추가 기술 전문가 데이터
  commitActivity: CommitActivity;
  contributionStats: ContributionStats;
  issueContributions: IssueContributions;
  reviewActivity: ReviewActivity;
}

export interface LanguageExpertise {
  [language: string]: {
    proficiencyLevel: "Expert" | "Advanced" | "Intermediate" | "Beginner";
    repositoryCount: number;
    totalBytes: number;
    averageStars: number;
    recentActivity: boolean;
  };
}

export interface CodeQualityMetrics {
  documentationScore: number; // README, 설명 품질 점수
  projectMaturity: number; // 프로젝트 완성도 점수
  codeOrganization: number; // 코드 구성 점수
  communityEngagement: number; // 커뮤니티 참여 점수
}

export interface TechnicalDepth {
  primaryExpertise: string; // 주요 전문 분야
  secondarySkills: string[]; // 보조 기술들
  modernTechAdoption: boolean; // 최신 기술 채택 여부
  projectComplexity: "High" | "Medium" | "Low"; // 프로젝트 복잡도
}

// 추가 기술 전문가 데이터 타입들
export interface CommitActivity {
  totalCommits: number;
  weeklyPattern: number[]; // 월~일 커밋 패턴
  consistencyScore: number; // 일관성 점수 (0-100)
}

export interface ContributionStats {
  totalPRs: number;
  recentPRs: number; // 최근 6개월
  avgPRsPerMonth: number;
}

export interface IssueContributions {
  totalIssues: number;
  closedIssues: number;
  resolutionRate: number; // 해결률 (%)
}

export interface ReviewActivity {
  totalReviews: number;
  recentReviews: number;
}

export interface CodeQualityDetails {
  hasReadme: number;
  hasTests: number;
  hasDocs: number;
  hasLicense: number;
  hasCI: number;
}

// GitHub API 응답 타입들
export interface GitHubContributor {
  total: number;
  weeks: {
    w: number;
    a: number;
    d: number;
    c: number;
    days?: number[];
  }[];
}

export interface GitHubSearchResponse<T> {
  total_count: number;
  incomplete_results: boolean;
  items: T[];
}

export interface GitHubIssueOrPR {
  id: number;
  number: number;
  title: string;
  state: "open" | "closed";
  created_at: string;
  updated_at: string;
  body: string | null;
}

export interface GitHubFileContent {
  name: string;
  path: string;
  type: "file" | "dir";
  size: number;
  download_url: string | null;
}
