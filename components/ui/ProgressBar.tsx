'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  showPercentage?: boolean;
  color?: 'blue' | 'green' | 'orange' | 'pink' | 'purple' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  glow?: boolean;
  className?: string;
  label?: string;
}

export default function ProgressBar({
  value,
  max = 100,
  showLabel = false,
  showPercentage = false,
  color = 'blue',
  size = 'md',
  animated = true,
  glow = false,
  className = '',
  label
}: ProgressBarProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const percentage = Math.min((value / max) * 100, 100);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setAnimatedValue(percentage), 100);
      return () => clearTimeout(timer);
    } else {
      setAnimatedValue(percentage);
    }
  }, [percentage, animated]);

  const colorClasses = {
    blue: "from-electric-blue to-tech-purple",
    green: "from-neon-green to-electric-blue",
    orange: "from-energy-orange to-power-pink",
    pink: "from-power-pink to-tech-purple",
    purple: "from-tech-purple to-electric-blue",
    gradient: "from-energy-orange via-power-pink to-tech-purple"
  };

  const glowColors = {
    blue: "shadow-glow-blue",
    green: "shadow-glow-green",
    orange: "shadow-glow-orange",
    pink: "shadow-glow-pink",
    purple: "shadow-glow-purple",
    gradient: "shadow-glow-orange"
  };

  const sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3"
  };

  return (
    <div className={cn("w-full", className)}>
      {(showLabel || label) && (
        <div className="flex justify-between mb-2 text-sm">
          <span className="text-white/60">{label || '진행률'}</span>
          {showPercentage ? (
            <span className="text-white font-semibold">{Math.round(percentage)}%</span>
          ) : (
            <span className="text-white font-semibold">{value}/{max}</span>
          )}
        </div>
      )}

      <div className={cn(
        "w-full bg-white/10 rounded-full overflow-hidden relative",
        sizeClasses[size]
      )}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${animatedValue}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={cn(
            "h-full bg-gradient-to-r rounded-full relative",
            colorClasses[color],
            glow && glowColors[color]
          )}
        >
          {/* Animated shine effect */}
          {animated && (
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </div>
          )}

          {/* Glow dot at the end */}
          {glow && animatedValue > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-lg"
              style={{
                boxShadow: `0 0 10px currentColor, 0 0 20px currentColor`
              }}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}

// Circular Progress
interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: 'blue' | 'green' | 'orange' | 'pink' | 'purple';
  showValue?: boolean;
  label?: string;
  className?: string;
}

export function CircularProgress({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  color = 'blue',
  showValue = true,
  label,
  className
}: CircularProgressProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const colorValues = {
    blue: '#00D9FF',
    green: '#39FF14',
    orange: '#FF6B35',
    pink: '#FF006E',
    purple: '#7209B7'
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#gradient-${color})`}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            strokeDasharray: circumference,
            filter: `drop-shadow(0 0 6px ${colorValues[color]})`
          }}
        />
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colorValues[color]} />
            <stop offset="100%" stopColor={color === 'blue' ? '#7209B7' : colorValues[color]} />
          </linearGradient>
        </defs>
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showValue && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-2xl font-bold text-white"
          >
            {Math.round(percentage)}%
          </motion.span>
        )}
        {label && (
          <span className="text-xs text-white/60 mt-1">{label}</span>
        )}
      </div>
    </div>
  );
}

// Step Progress
interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
  color?: 'blue' | 'green' | 'orange';
  className?: string;
}

export function StepProgress({
  currentStep,
  totalSteps,
  labels,
  color = 'blue',
  className
}: StepProgressProps) {
  const colorClasses = {
    blue: { active: 'bg-electric-blue border-electric-blue', glow: 'shadow-glow-blue' },
    green: { active: 'bg-neon-green border-neon-green', glow: 'shadow-glow-green' },
    orange: { active: 'bg-energy-orange border-energy-orange', glow: 'shadow-glow-orange' }
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <React.Fragment key={index}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                index < currentStep
                  ? cn(colorClasses[color].active, colorClasses[color].glow)
                  : index === currentStep
                    ? "border-white/50 bg-white/10"
                    : "border-white/20 bg-transparent"
              )}
            >
              {index < currentStep ? (
                <svg className="w-4 h-4 text-cyber-dark" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <span className={cn(
                  "text-sm font-bold",
                  index === currentStep ? "text-white" : "text-white/40"
                )}>
                  {index + 1}
                </span>
              )}
            </motion.div>

            {index < totalSteps - 1 && (
              <div className="flex-1 h-0.5 mx-2 bg-white/10 relative overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: index < currentStep ? '100%' : '0%' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={cn("h-full", colorClasses[color].active)}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {labels && (
        <div className="flex justify-between mt-2">
          {labels.map((label, index) => (
            <span
              key={index}
              className={cn(
                "text-xs text-center",
                index <= currentStep ? "text-white" : "text-white/40"
              )}
              style={{ width: `${100 / totalSteps}%` }}
            >
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
