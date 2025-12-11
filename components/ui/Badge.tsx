'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'energy' | 'growth' | 'premium' | 'info' | 'warning' | 'success' | 'outline';
  /** @deprecated Use 'variant' instead */
  type?: 'energy' | 'growth' | 'premium' | 'info' | 'warning' | 'success' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
  pulse?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function Badge({
  variant,
  type,
  size = 'md',
  glow = false,
  pulse = false,
  icon,
  children,
  className = ''
}: BadgeProps) {
  // Support both 'variant' and 'type' props for backwards compatibility
  const resolvedVariant = variant || type || 'energy';
  const baseClasses = "inline-flex items-center justify-center gap-1.5 rounded-full font-semibold uppercase tracking-wider";

  const variantClasses = {
    energy: "bg-gradient-to-r from-energy-orange to-power-pink text-white",
    growth: "bg-gradient-to-r from-neon-green to-electric-blue text-cyber-dark",
    premium: "bg-gradient-to-r from-tech-purple to-electric-blue text-white",
    info: "bg-electric-blue/20 text-electric-blue border border-electric-blue/30",
    warning: "bg-cyber-yellow/20 text-cyber-yellow border border-cyber-yellow/30",
    success: "bg-neon-green/20 text-neon-green border border-neon-green/30",
    outline: "bg-transparent border border-white/20 text-white/80"
  };

  const glowClasses = {
    energy: "shadow-glow-orange",
    growth: "shadow-glow-green",
    premium: "shadow-glow-purple",
    info: "shadow-glow-blue",
    warning: "",
    success: "shadow-glow-green",
    outline: ""
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-3 py-1 text-xs",
    lg: "px-4 py-1.5 text-sm"
  };

  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        baseClasses,
        variantClasses[resolvedVariant],
        sizeClasses[size],
        glow && glowClasses[resolvedVariant],
        pulse && "animate-energy-pulse",
        className
      )}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </motion.span>
  );
}

// Status Badge with dot indicator
interface StatusBadgeProps {
  status: 'online' | 'offline' | 'busy' | 'away';
  label?: string;
  showDot?: boolean;
  className?: string;
}

export function StatusBadge({
  status,
  label,
  showDot = true,
  className
}: StatusBadgeProps) {
  const statusConfig = {
    online: { color: 'bg-neon-green', text: '온라인', glow: 'shadow-glow-green' },
    offline: { color: 'bg-white/40', text: '오프라인', glow: '' },
    busy: { color: 'bg-power-pink', text: '운동 중', glow: 'shadow-glow-pink' },
    away: { color: 'bg-cyber-yellow', text: '자리 비움', glow: '' }
  };

  const config = statusConfig[status];

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      {showDot && (
        <span className={cn(
          "w-2 h-2 rounded-full",
          config.color,
          config.glow,
          status === 'online' && "animate-pulse"
        )} />
      )}
      <span className="text-sm text-white/80">{label || config.text}</span>
    </div>
  );
}

// Count Badge (for notifications, etc.)
interface CountBadgeProps {
  count: number;
  max?: number;
  color?: 'orange' | 'blue' | 'pink' | 'green';
  className?: string;
}

export function CountBadge({
  count,
  max = 99,
  color = 'pink',
  className
}: CountBadgeProps) {
  const displayCount = count > max ? `${max}+` : count;

  const colorClasses = {
    orange: 'bg-energy-orange shadow-glow-orange',
    blue: 'bg-electric-blue shadow-glow-blue',
    pink: 'bg-power-pink shadow-glow-pink',
    green: 'bg-neon-green shadow-glow-green text-cyber-dark'
  };

  if (count <= 0) return null;

  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={cn(
        "inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold rounded-full text-white",
        colorClasses[color],
        className
      )}
    >
      {displayCount}
    </motion.span>
  );
}

// Level Badge (for fitness levels)
interface LevelBadgeProps {
  level: number;
  maxLevel?: number;
  label?: string;
  className?: string;
}

export function LevelBadge({
  level,
  maxLevel = 5,
  label,
  className
}: LevelBadgeProps) {
  const getColor = () => {
    const ratio = level / maxLevel;
    if (ratio <= 0.3) return 'from-neon-green to-electric-blue';
    if (ratio <= 0.6) return 'from-cyber-yellow to-energy-orange';
    return 'from-energy-orange to-power-pink';
  };

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <div className="flex gap-0.5">
        {Array.from({ length: maxLevel }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              "w-2 h-4 rounded-sm",
              i < level
                ? `bg-gradient-to-t ${getColor()}`
                : "bg-white/10"
            )}
          />
        ))}
      </div>
      {label && <span className="text-xs text-white/60">{label}</span>}
    </div>
  );
}

// Achievement Badge
interface AchievementBadgeProps {
  icon: React.ReactNode;
  name: string;
  unlocked?: boolean;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  className?: string;
}

export function AchievementBadge({
  icon,
  name,
  unlocked = false,
  rarity = 'common',
  className
}: AchievementBadgeProps) {
  const rarityConfig = {
    common: { bg: 'from-white/20 to-white/10', border: 'border-white/20', glow: '' },
    rare: { bg: 'from-electric-blue/30 to-tech-purple/30', border: 'border-electric-blue/50', glow: 'shadow-glow-blue' },
    epic: { bg: 'from-tech-purple/30 to-power-pink/30', border: 'border-tech-purple/50', glow: 'shadow-glow-purple' },
    legendary: { bg: 'from-energy-orange/30 to-power-pink/30', border: 'border-energy-orange/50', glow: 'shadow-glow-orange' }
  };

  const config = rarityConfig[rarity];

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={cn(
        "relative flex flex-col items-center gap-2 p-3 rounded-xl border",
        unlocked ? `bg-gradient-to-b ${config.bg} ${config.border} ${config.glow}` : 'bg-white/5 border-white/10',
        !unlocked && 'opacity-50 grayscale',
        className
      )}
    >
      <div className={cn(
        "text-2xl",
        unlocked && rarity === 'legendary' && 'animate-float'
      )}>
        {icon}
      </div>
      <span className="text-xs font-medium text-white/80 text-center">{name}</span>
      {!unlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
          <span className="text-white/60 text-xs">잠김</span>
        </div>
      )}
    </motion.div>
  );
}
