"use client";

import React, { useId, useMemo } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

type SparklesProps = {
  className?: string;
  size?: number;
  minSize?: number | null;
  density?: number;
  speed?: number;
  minSpeed?: number | null;
  opacity?: number;
  direction?: "top" | "left" | "right" | "bottom" | "none";
  opacitySpeed?: number;
  minOpacity?: number | null;
  color?: string;
  hover?: boolean;
  background?: string;
  children?: React.ReactNode;
};

export function SparklesCore({
  className,
  size = 1.2,
  minSize = null,
  density = 800,
  speed = 1.5,
  minSpeed = null,
  opacity = 1,
  direction = "none",
  opacitySpeed = 3,
  minOpacity = null,
  color = "#FFF",
  hover = false,
  background = "transparent",
  children,
}: SparklesProps) {
  const id = useId();

  const sparkles = useMemo(() => {
    const getRandomValue = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    return Array.from({ length: density }, (_, i) => ({
      id: i,
      x: getRandomValue(0, 100),
      y: getRandomValue(0, 100),
      size: minSize ? getRandomValue(minSize, size) : size,
      opacity: minOpacity ? getRandomValue(minOpacity, opacity) : opacity,
      delay: getRandomValue(0, 2),
      duration: minSpeed ? getRandomValue(minSpeed, speed) : speed,
    }));
  }, [density, minOpacity, minSize, minSpeed, opacity, size, speed]);

  return (
    <div
      className={cn("relative h-full w-full", className)}
      style={{ background }}
    >
      <svg className="absolute h-full w-full" aria-hidden="true">
        <defs>
          <filter id={`sparkle-blur-${id}`}>
            <feGaussianBlur stdDeviation="0.5" />
          </filter>
        </defs>
        {sparkles.map((sparkle) => (
          <motion.circle
            key={sparkle.id}
            cx={`${sparkle.x}%`}
            cy={`${sparkle.y}%`}
            r={sparkle.size}
            fill={color}
            filter={`url(#sparkle-blur-${id})`}
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: [0, sparkle.opacity, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: sparkle.duration * opacitySpeed,
              repeat: Infinity,
              delay: sparkle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
      {children}
    </div>
  );
}

export function Sparkles({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <SparklesCore
        className="absolute inset-0"
        density={100}
        color="#00D9FF"
        size={1}
        speed={2}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
