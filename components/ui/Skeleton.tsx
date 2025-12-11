'use client';

import React from 'react';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  variant?: 'text' | 'circular' | 'rectangular';
  count?: number;
  className?: string;
}

export default function Skeleton({
  width = '100%',
  height = '20px',
  variant = 'rectangular',
  count = 1,
  className = '',
}: SkeletonProps) {
  const skeletons = Array.from({ length: count });

  const baseClasses = 'skeleton bg-gradient-to-r from-cyber-mid via-cyber-light to-cyber-mid';

  const variantClasses = {
    text: 'h-5 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const widthStyle = typeof width === 'string' ? width : `${width}px`;
  const heightStyle = typeof height === 'string' ? height : `${height}px`;

  return (
    <>
      {skeletons.map((_, index) => (
        <div
          key={index}
          className={`${baseClasses} ${variantClasses[variant]} ${className}`}
          style={{
            width: widthStyle,
            height: heightStyle,
          }}
        />
      ))}
    </>
  );
}

// Skeleton variants for common use cases
export function SkeletonCard() {
  return (
    <div className="p-4 rounded-xl bg-cyber-mid border border-white/10">
      <Skeleton height={24} width="70%" className="mb-3" />
      <Skeleton height={16} width="100%" className="mb-2" />
      <Skeleton height={16} width="90%" />
    </div>
  );
}

export function SkeletonAvatar() {
  return <Skeleton width={40} height={40} variant="circular" />;
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          width={i === lines - 1 ? '80%' : '100%'}
          height={16}
        />
      ))}
    </div>
  );
}
