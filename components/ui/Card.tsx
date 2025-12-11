'use client';

import React, { memo, useRef, useState, useCallback } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps {
  variant?: 'default' | 'hologram' | 'glass' | 'spotlight' | 'glow' | 'gradient';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
  spotlightColor?: string;
  glow?: boolean;
}

const Card = memo(function Card({
  variant = 'default',
  children,
  className = "",
  onClick,
  hoverEffect = true,
  spotlightColor = "rgba(0, 217, 255, 0.15)",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  glow = false,
}: CardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || variant !== 'spotlight') return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    if (variant === 'spotlight') setOpacity(1);
  };

  const handleMouseLeave = () => {
    if (variant === 'spotlight') setOpacity(0);
  };

  const baseClasses = "rounded-xl p-4 transition-all duration-300 relative overflow-hidden";

  const variantClasses = {
    default: "bg-cyber-mid border border-white/10",
    hologram: "hologram-grid bg-cyber-mid/50 border border-electric-blue/30",
    glass: "glass backdrop-blur-xl",
    spotlight: "bg-cyber-mid border border-white/10",
    glow: "bg-cyber-mid border border-white/10 card-glow",
    gradient: "bg-gradient-to-br from-cyber-mid to-cyber-light border border-white/10"
  };

  const clickClass = onClick ? "cursor-pointer" : "";

  if (variant === 'spotlight') {
    return (
      <motion.div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        whileHover={hoverEffect ? { scale: 1.02, y: -4 } : undefined}
        whileTap={onClick ? { scale: 0.98 } : undefined}
        className={cn(baseClasses, variantClasses[variant], clickClass, className)}
      >
        {/* Spotlight effect */}
        <div
          className="pointer-events-none absolute -inset-px rounded-xl transition duration-300"
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
          }}
        />
        {/* Gradient border on hover */}
        <div
          className="pointer-events-none absolute -inset-px rounded-xl transition duration-300"
          style={{
            opacity: opacity * 0.5,
            background: `linear-gradient(135deg, rgba(0, 217, 255, 0.3), rgba(114, 9, 183, 0.3))`,
            mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
            WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
            maskComposite: 'xor',
            WebkitMaskComposite: 'xor',
            padding: '1px',
          }}
        />
        <div className="relative z-10">{children}</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={divRef}
      onClick={onClick}
      whileHover={hoverEffect ? { scale: 1.02, y: -4 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      className={cn(baseClasses, variantClasses[variant], clickClass, className)}
    >
      {variant === 'glow' && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-electric-blue/20 via-power-pink/20 to-tech-purple/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
      {children}
    </motion.div>
  );
});

export default Card;

// Feature Card with icon
interface FeatureCardProps extends CardProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  badge?: string;
}

export const FeatureCard = memo(function FeatureCard({
  icon,
  title,
  description,
  badge,
  className,
  ...props
}: FeatureCardProps) {
  return (
    <Card variant="spotlight" className={cn("group", className)} {...props}>
      <div className="flex items-start gap-4">
        {icon && (
          <div className="flex-shrink-0 rounded-lg bg-gradient-to-br from-energy-orange/20 to-power-pink/20 p-3 text-energy-orange group-hover:shadow-glow-orange transition-shadow">
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-white truncate">{title}</h3>
            {badge && (
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-electric-blue/20 text-electric-blue">
                {badge}
              </span>
            )}
          </div>
          {description && (
            <p className="mt-1 text-sm text-white/60 line-clamp-2">{description}</p>
          )}
        </div>
      </div>
    </Card>
  );
});

// Stats Card
interface StatsCardProps extends CardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: { value: number; positive: boolean };
  color?: 'orange' | 'blue' | 'green' | 'pink' | 'purple';
}

export const StatsCard = memo(function StatsCard({
  label,
  value,
  icon,
  trend,
  color = 'blue',
  className,
  ...props
}: StatsCardProps) {
  const colorClasses = {
    orange: 'text-energy-orange shadow-glow-orange',
    blue: 'text-electric-blue shadow-glow-blue',
    green: 'text-neon-green shadow-glow-green',
    pink: 'text-power-pink shadow-glow-pink',
    purple: 'text-tech-purple shadow-glow-purple',
  };

  return (
    <Card variant="glass" className={cn("group", className)} {...props}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-white/60">{label}</p>
          <p className={cn("text-2xl font-bold mt-1", colorClasses[color])}>{value}</p>
          {trend && (
            <p className={cn("text-xs mt-1", trend.positive ? "text-neon-green" : "text-power-pink")}>
              {trend.positive ? "↑" : "↓"} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        {icon && (
          <div className={cn("p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors", colorClasses[color])}>
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
});
