'use client';

import React, { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, 'children'> {
  variant?: 'energy' | 'growth' | 'premium' | 'ghost' | 'outline' | 'glow';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  glow?: boolean;
  shine?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'energy',
  size = 'md',
  glow = false,
  shine = false,
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}, ref) => {
  const baseClasses = "font-semibold rounded-xl transition-all duration-300 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2";

  const variantClasses = {
    energy: "bg-gradient-to-r from-energy-orange to-power-pink text-white shadow-glow-orange hover:shadow-lg hover:shadow-energy-orange/50",
    growth: "bg-gradient-to-r from-neon-green to-electric-blue text-cyber-dark shadow-glow-green hover:shadow-lg hover:shadow-neon-green/50",
    premium: "bg-gradient-to-r from-tech-purple to-electric-blue text-white shadow-glow-purple hover:shadow-lg hover:shadow-tech-purple/50",
    ghost: "bg-transparent border border-white/20 text-white hover:bg-white/10 hover:border-electric-blue/50",
    outline: "bg-transparent border-2 border-electric-blue text-electric-blue hover:bg-electric-blue/10 hover:shadow-glow-blue",
    glow: "bg-cyber-mid border border-electric-blue/50 text-electric-blue hover:border-electric-blue hover:shadow-glow-blue"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    icon: "p-3"
  };

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        glow && "animate-energy-pulse",
        shine && "btn-shine",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {/* Shine Effect Overlay */}
      {shine && (
        <span className="absolute inset-0 overflow-hidden rounded-xl">
          <span className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </span>
      )}

      {/* Glow Border */}
      {glow && (
        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-energy-orange via-power-pink to-tech-purple opacity-75 blur-lg -z-10" />
      )}

      {/* Loading Spinner */}
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Loading...</span>
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;

// Icon Button variant
export const IconButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'size'>>(({
  children,
  className,
  ...props
}, ref) => (
  <Button
    ref={ref}
    size="icon"
    variant="ghost"
    className={cn("rounded-full", className)}
    {...props}
  >
    {children}
  </Button>
));

IconButton.displayName = 'IconButton';
