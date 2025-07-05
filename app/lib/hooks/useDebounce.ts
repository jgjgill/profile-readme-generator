import { useState, useEffect } from "react";

/**
 * 값이 변경된 후 일정 시간이 지나야 업데이트되는 debounced 값을 반환합니다.
 * API 호출 최적화에 유용합니다.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}