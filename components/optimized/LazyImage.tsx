'use client';

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
}
