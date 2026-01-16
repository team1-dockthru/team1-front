import { useState, useEffect } from 'react';

/**
 * 특정 값의 변경을 지연시켜 반환하는 커스텀 훅
 * @param {any} value - 디바운스 처리할 값
 * @param {number} delay - 지연 시간 (ms)
 * @returns {any} - 지연된 값
 */
export default function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
