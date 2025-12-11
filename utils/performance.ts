// Image optimization
export const getOptimizedImageUrl = (url: string, width: number = 400): string => {
  // Unsplash image optimization
  if (url.includes('unsplash.com')) {
    return `${url}?w=${width}&q=80&fm=webp`;
  }
  return url;
};

// LocalStorage management
export const setLocalStorage = (key: string, value: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

export const getLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Failed to get from localStorage:', error);
    return defaultValue;
  }
};

// Date formatting with caching (memoization)
const dateFormatCache = new Map<string, string>();

export const formatDate = (date: string, format: string = 'ko-KR'): string => {
  const cacheKey = `${date}-${format}`;

  if (dateFormatCache.has(cacheKey)) {
    return dateFormatCache.get(cacheKey)!;
  }

  const formatted = new Date(date).toLocaleDateString(format);
  dateFormatCache.set(cacheKey, formatted);

  return formatted;
};

// Clear date format cache if needed
export const clearDateFormatCache = (): void => {
  dateFormatCache.clear();
};

// Debounce utility
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Throttle utility
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Intersection Observer for lazy loading
export const createLazyLoadObserver = (callback: (entries: IntersectionObserverEntry[]) => void) => {
  if (typeof window === 'undefined') return null;

  return new IntersectionObserver(callback, {
    threshold: 0.1,
    rootMargin: '50px',
  });
};

// Memory-efficient batch processing
export const processBatch = async <T, R>(
  items: T[],
  processor: (item: T) => Promise<R>,
  batchSize: number = 10
): Promise<R[]> => {
  const results: R[] = [];

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(processor));
    results.push(...batchResults);
  }

  return results;
};
