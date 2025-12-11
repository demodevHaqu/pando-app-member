🎯 PHASE 17: 성능 최적화Task 17.1: React 최적화파일: components/ui/Card.tsx (최적화)typescript'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'hologram';
  className?: string;
  glow?: boolean;
  onClick?: () => void;
}

const Card = memo(function Card({
  children,
  variant = 'default',
  className = '',
  glow = false,
  onClick,
}: CardProps) {
  const baseClasses = 'rounded-xl p-4 backdrop-blur-sm transition-all';

  const variantClasses = {
    default: 'bg-cyber-mid/80 border border-white/10',
    glass: 'glass border border-white/5',
    hologram: 'hologram-card border border-electric-blue/30',
  };

  const glowClass = glow ? 'shadow-glow-blue' : '';
  const clickableClass = onClick ? 'cursor-pointer hover:scale-[1.02]' : '';

  return (
    <motion.div
      className={`${baseClasses} ${variantClasses[variant]} ${glowClass} ${clickableClass} ${className}`}
      onClick={onClick}
      whileTap={onClick ? { scale: 0.98 } : undefined}
    >
      {children}
    </motion.div>
  );
});

export default Card;파일: hooks/useIntersectionObserver.ts (새 파일)typescriptimport { useEffect, useRef, useState } from 'react';

export function useIntersectionObserver(options?: IntersectionObserverInit) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [options]);

  return { targetRef, isIntersecting };
}파일: components/optimized/LazyImage.tsx (새 파일)typescript'use client';

import React, { useState } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import Image from 'next/image';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function LazyImage({ src, alt, className, width, height }: LazyImageProps) {
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px',
  });
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div ref={targetRef} className={`relative ${className}`}>
      {isIntersecting && (
        <>
          {!isLoaded && (
            <div className="absolute inset-0 bg-cyber-mid animate-pulse rounded-lg" />
          )}
          <Image
            src={src}
            alt={alt}
            width={width || 400}
            height={height || 300}
            className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoadingComplete={() => setIsLoaded(true)}
            loading="lazy"
          />
        </>
      )}
    </div>
  );
}파일: hooks/useDebounce.ts (새 파일)typescriptimport { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}파일: utils/performance.ts (새 파일)typescript// 이미지 최적화
export const getOptimizedImageUrl = (url: string, width: number = 400): string => {
  // Unsplash 이미지 최적화
  if (url.includes('unsplash.com')) {
    return `${url}&w=${width}&q=80&fm=webp`;
  }
  return url;
};

// 로컬 스토리지 관리
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

// 날짜 포맷팅 (메모이제이션)
const dateFormatCache = new Map<string, string>();

export const formatDate = (date: string, format: string = 'ko-KR'): string => {
  const cacheKey = `${date}-${format}`;
  
  if (dateFormatCache.has(cacheKey)) {
    return dateFormatCache.get(cacheKey)!;
  }

  const formatted = new Date(date).toLocaleDateString(format);
  dateFormatCache.set(cacheKey, formatted);
  
  return formatted;
};Task 17.2: Next.js 설정 최적화파일: next.config.js (수정)javascript/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'i.pravatar.cc'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // 압축 활성화
  compress: true,
  
  // React Strict Mode
  reactStrictMode: true,
  
  // SWC 컴파일러 최적화
  swcMinify: true,
  
  // 실험적 기능
  experimental: {
    optimizeCss: true,
  },
  
  // 헤더 설정
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;