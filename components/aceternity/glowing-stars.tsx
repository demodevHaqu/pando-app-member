"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const GlowingStarsBackgroundCard = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  const [mouseEnter, setMouseEnter] = useState(false);

  return (
    <div
      onMouseEnter={() => setMouseEnter(true)}
      onMouseLeave={() => setMouseEnter(false)}
      className={cn(
        "h-full w-full rounded-xl border border-white/[0.08] bg-cyber-mid p-4",
        className
      )}
    >
      <div className="flex h-full w-full flex-col items-center justify-center">
        <Illustration mouseEnter={mouseEnter} />
        {children}
      </div>
    </div>
  );
};

export const GlowingStarsDescription = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <p className={cn("max-w-[16rem] text-center text-sm text-white/70", className)}>
      {children}
    </p>
  );
};

export const GlowingStarsTitle = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <h2 className={cn("text-center text-2xl font-bold text-white", className)}>
      {children}
    </h2>
  );
};

export const Illustration = ({ mouseEnter }: { mouseEnter: boolean }) => {
  const stars = 108;
  const columns = 18;

  const [glowingStars, setGlowingStars] = useState<number[]>([]);

  const highlightedStars = useRef<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      highlightedStars.current = Array.from({ length: 5 }, () =>
        Math.floor(Math.random() * stars)
      );
      setGlowingStars([...highlightedStars.current]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="h-48 w-full p-1"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `1px`,
      }}
    >
      {[...Array(stars)].map((_, starIdx) => {
        const isGlowing = glowingStars.includes(starIdx);
        const delay = (starIdx % 10) * 0.1;
        const staticDelay = starIdx * 0.01;
        return (
          <div
            key={`matrix-col-${starIdx}`}
            className="relative flex items-center justify-center"
          >
            <Star
              isGlowing={mouseEnter ? true : isGlowing}
              delay={mouseEnter ? staticDelay : delay}
            />
            {mouseEnter && <Glow delay={staticDelay} />}
            <AnimatePresence mode="wait">
              {isGlowing && <Glow delay={delay} />}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

const Star = ({ isGlowing, delay }: { isGlowing: boolean; delay: number }) => {
  return (
    <motion.div
      key={delay}
      initial={{ scale: 1 }}
      animate={{
        scale: isGlowing ? [1, 1.2, 2.5, 2.2, 1.5] : 1,
        background: isGlowing ? "#fff" : "#666",
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        delay: delay,
      }}
      className={cn("relative z-20 h-[1px] w-[1px] rounded-full bg-[#666]")}
    />
  );
};

const Glow = ({ delay }: { delay: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        delay: delay,
      }}
      exit={{ opacity: 0 }}
      className="absolute left-1/2 z-10 h-[4px] w-[4px] -translate-x-1/2 rounded-full bg-electric-blue shadow-2xl shadow-electric-blue blur-[1px]"
    />
  );
};

// Pre-computed star positions to avoid hydration mismatch
const STAR_POSITIONS = [
  { x: 12, y: 8 }, { x: 45, y: 23 }, { x: 78, y: 15 }, { x: 23, y: 67 },
  { x: 89, y: 45 }, { x: 34, y: 89 }, { x: 67, y: 34 }, { x: 5, y: 56 },
  { x: 92, y: 78 }, { x: 56, y: 12 }, { x: 18, y: 45 }, { x: 73, y: 67 },
  { x: 41, y: 91 }, { x: 85, y: 23 }, { x: 29, y: 34 }, { x: 62, y: 56 },
  { x: 8, y: 78 }, { x: 95, y: 12 }, { x: 37, y: 45 }, { x: 51, y: 89 },
];

// Simplified GlowingStars component for inline use
export const GlowingStars = ({ className }: { className?: string }) => {
  const [glowingStars, setGlowingStars] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      const highlighted = Array.from({ length: 3 }, () =>
        Math.floor(Math.random() * STAR_POSITIONS.length)
      );
      setGlowingStars(highlighted);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)} />;
  }

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {STAR_POSITIONS.map((pos, i) => {
        const isGlowing = glowingStars.includes(i);

        return (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            animate={{
              scale: isGlowing ? [1, 1.5, 1] : 1,
              opacity: isGlowing ? [0.3, 1, 0.3] : 0.2,
              backgroundColor: isGlowing ? "#00D9FF" : "#666",
            }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        );
      })}
    </div>
  );
};
