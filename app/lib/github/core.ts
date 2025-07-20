import type {
  GitHubUserProfile,
  GitHubRepository,
  GitHubLanguageStats,
  ProcessedGitHubData,
} from "../types/github";

const GITHUB_API_BASE_URL = "https://api.github.com";

export class GitHubApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "GitHubApiError";
  }
}

export async function fetchFromGitHubApi<T>(
  endpoint: string,
  token?: string
): Promise<T> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "GitHub-Profile-README-Generator",
  };

  // 토큰이 있는 경우에만 Authorization 헤더 추가
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${GITHUB_API_BASE_URL}${endpoint}`, {
    headers,
  });

  if (!response.ok) {
    // Rate limit 정보 로깅
    const rateLimitRemaining = response.headers.get("X-RateLimit-Remaining");
    const rateLimitReset = response.headers.get("X-RateLimit-Reset");

    console.log(
      `GitHub API Rate Limit - Remaining: ${rateLimitRemaining}, Reset: ${rateLimitReset}`
    );

    if (response.status === 404) {
      throw new GitHubApiError("GitHub 사용자를 찾을 수 없습니다.", 404);
    }
    if (response.status === 403) {
      const resetTime = rateLimitReset
        ? new Date(parseInt(rateLimitReset) * 1000).toLocaleTimeString()
        : "알 수 없음";
      throw new GitHubApiError(
        `GitHub API 요청 한도를 초과했습니다. 리셋 시간: ${resetTime}`,
        403
      );
    }

    throw new GitHubApiError(
      `GitHub API 요청 실패: ${response.statusText}`,
      response.status
    );
  }

  return response.json();
}

export async function fetchGitHubUserProfile(
  username: string,
  token?: string
): Promise<GitHubUserProfile> {
  return fetchFromGitHubApi<GitHubUserProfile>(`/users/${username}`, token);
}

export async function fetchUserRepositories(
  username: string,
  token?: string
): Promise<GitHubRepository[]> {
  const repositories = await fetchFromGitHubApi<GitHubRepository[]>(
    `/users/${username}/repos?sort=updated&per_page=100`,
    token
  );

  return repositories.filter(
    (repo) => !repo.name.startsWith(".") && repo.stargazers_count >= 0
  );
}

export async function fetchRepositoryLanguages(
  fullRepoName: string,
  token?: string
): Promise<GitHubLanguageStats> {
  return fetchFromGitHubApi<GitHubLanguageStats>(
    `/repos/${fullRepoName}/languages`,
    token
  );
}

export async function fetchCompleteGitHubData(
  username: string,
  token?: string
): Promise<ProcessedGitHubData> {
  try {
    // 병렬로 사용자 프로필과 저장소 정보 가져오기
    const [userProfile, repositories] = await Promise.all([
      fetchGitHubUserProfile(username, token),
      fetchUserRepositories(username, token),
    ]);

    const topRepositories = repositories
      .sort((repoA, repoB) => repoB.stargazers_count - repoA.stargazers_count)
      .slice(0, 3);

    // 저장소 메타데이터에서 언어 정보 추출 (추가 API 호출 없이)
    const topLanguages = calculateTopLanguagesFromRepos(repositories);
    const mostStarredRepository = findMostStarredRepository(repositories);

    return {
      userProfile,
      topRepositories,
      topLanguages,
      mostStarredRepository,
    };
  } catch (error) {
    if (error instanceof GitHubApiError) {
      throw error;
    }
    throw new GitHubApiError(
      `데이터 수집 중 오류가 발생했습니다: ${
        error instanceof Error ? error.message : "알 수 없는 오류"
      }`
    );
  }
}

function calculateTopLanguagesFromRepos(repositories: GitHubRepository[]): string[] {
  // 저장소의 주 언어를 카운트하여 상위 3개 추출
  const languageCount: Record<string, number> = {};
  
  repositories
    .filter(repo => repo.language) // 언어가 있는 저장소만
    .forEach(repo => {
      languageCount[repo.language!] = (languageCount[repo.language!] || 0) + 1;
    });

  return Object.entries(languageCount)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 3)
    .map(([language]) => language);
}

function findMostStarredRepository(
  repositories: GitHubRepository[]
): GitHubRepository | null {
  if (repositories.length === 0) return null;

  return repositories.reduce((mostStarred, currentRepo) =>
    currentRepo.stargazers_count > mostStarred.stargazers_count
      ? currentRepo
      : mostStarred
  );
}