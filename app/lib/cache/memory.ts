/**
 * 메모리 캐시 시스템
 * GitHub API 응답을 24시간 동안 메모리에 캐싱하여 API 호출 최적화
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

class MemoryCache {
  private cache = new Map<string, CacheEntry<any>>();
  private readonly DEFAULT_TTL = 24 * 60 * 60 * 1000; // 24시간 (밀리초)

  /**
   * 캐시에서 데이터 조회
   * @param key 캐시 키
   * @returns 캐시된 데이터 또는 null
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    // 만료 확인
    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  /**
   * 캐시에 데이터 저장
   * @param key 캐시 키
   * @param data 저장할 데이터
   * @param ttl TTL (밀리초, 기본값: 24시간)
   */
  set<T>(key: string, data: T, ttl?: number): void {
    const actualTtl = ttl ?? this.DEFAULT_TTL;
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      expiry: Date.now() + actualTtl,
    };

    this.cache.set(key, entry);
  }

  /**
   * 특정 키의 캐시 삭제
   * @param key 삭제할 캐시 키
   */
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  /**
   * 만료된 캐시 항목들 정리
   */
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiry) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * 전체 캐시 클리어
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * 캐시 상태 정보 반환
   */
  getStats(): {
    size: number;
    keys: string[];
    memoryUsage: string;
  } {
    const keys = Array.from(this.cache.keys());
    return {
      size: this.cache.size,
      keys,
      memoryUsage: `${this.cache.size} entries`,
    };
  }

  /**
   * 캐시 키가 존재하고 유효한지 확인
   * @param key 확인할 캐시 키
   */
  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;
    
    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return false;
    }
    
    return true;
  }
}

// 전역 캐시 인스턴스
export const memoryCache = new MemoryCache();

// 정기적으로 만료된 캐시 정리 (10분마다)
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    memoryCache.cleanup();
  }, 10 * 60 * 1000);
}

/**
 * GitHub 사용자별 캐시 키 생성
 */
export function createGitHubCacheKey(username: string, dataType: string): string {
  return `github:${username}:${dataType}`;
}

/**
 * 캐시 상태 로깅 (개발 환경용)
 */
export function logCacheStats(): void {
  if (process.env.NODE_ENV === 'development') {
    const stats = memoryCache.getStats();
    console.log('[MemoryCache] Stats:', stats);
  }
}