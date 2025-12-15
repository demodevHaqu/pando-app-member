'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface BadgeProps {
  variant?: 'energy' | 'growth' | 'premium' | 'info' | 'warning' | 'success' | 'outline';
  /** @deprecated Use 'variant' instead */
  type?: 'energy' | 'growth' | 'premium' | 'info' | 'warning' | 'success' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
  pulse?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export default function Badge({
  variant,
  type,
  size = 'md',
  glow = false,
  pulse = false,
  icon,
  children,
}: BadgeProps) {
  // Support both 'variant' and 'type' props for backwards compatibility
  const resolvedVariant = variant || type || 'energy';

  const getVariantStyle = (): React.CSSProperties => {
    switch (resolvedVariant) {
      case 'energy':
        return {
          background: 'linear-gradient(to right, #FF6B35, #FF006E)',
          color: 'white',
        };
      case 'growth':
        return {
          background: 'linear-gradient(to right, #39FF14, #00D9FF)',
          color: '#0D0D12',
        };
      case 'premium':
        return {
          background: 'linear-gradient(to right, #7209B7, #00D9FF)',
          color: 'white',
        };
      case 'info':
        return {
          background: 'rgba(0, 217, 255, 0.2)',
          color: '#00D9FF',
          border: '1px solid rgba(0, 217, 255, 0.3)',
        };
      case 'warning':
        return {
          background: 'rgba(255, 214, 10, 0.2)',
          color: '#FFD60A',
          border: '1px solid rgba(255, 214, 10, 0.3)',
        };
      case 'success':
        return {
          background: 'rgba(57, 255, 20, 0.2)',
          color: '#39FF14',
          border: '1px solid rgba(57, 255, 20, 0.3)',
        };
      case 'outline':
        return {
          background: 'transparent',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: 'rgba(255, 255, 255, 0.8)',
        };
      default:
        return {};
    }
  };

  const getGlowStyle = (): React.CSSProperties => {
    if (!glow) return {};
    switch (resolvedVariant) {
      case 'energy':
        return { boxShadow: '0 0 15px rgba(255, 107, 53, 0.5)' };
      case 'growth':
      case 'success':
        return { boxShadow: '0 0 15px rgba(57, 255, 20, 0.5)' };
      case 'premium':
        return { boxShadow: '0 0 15px rgba(114, 9, 183, 0.5)' };
      case 'info':
        return { boxShadow: '0 0 15px rgba(0, 217, 255, 0.5)' };
      default:
        return {};
    }
  };

  const getSizeStyle = (): React.CSSProperties => {
    switch (size) {
      case 'sm':
        return { padding: '2px 8px', fontSize: '10px' };
      case 'md':
        return { padding: '4px 12px', fontSize: '12px' };
      case 'lg':
        return { padding: '6px 16px', fontSize: '14px' };
      default:
        return {};
    }
  };

  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        borderRadius: '9999px',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        ...getVariantStyle(),
        ...getSizeStyle(),
        ...getGlowStyle(),
        ...(pulse ? { animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' } : {}),
      }}
    >
      {icon && <span style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {children}
    </motion.span>
  );
}

// Status Badge with dot indicator
interface StatusBadgeProps {
  status: 'online' | 'offline' | 'busy' | 'away';
  label?: string;
  showDot?: boolean;
}

export function StatusBadge({
  status,
  label,
  showDot = true,
}: StatusBadgeProps) {
  const statusConfig = {
    online: { color: '#39FF14', text: '온라인', glow: '0 0 10px rgba(57, 255, 20, 0.5)' },
    offline: { color: 'rgba(255, 255, 255, 0.4)', text: '오프라인', glow: '' },
    busy: { color: '#FF006E', text: '운동 중', glow: '0 0 10px rgba(255, 0, 110, 0.5)' },
    away: { color: '#FFD60A', text: '자리 비움', glow: '' }
  };

  const config = statusConfig[status];

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
      {showDot && (
        <span style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: config.color,
          boxShadow: config.glow,
          ...(status === 'online' ? { animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' } : {}),
        }} />
      )}
      <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)' }}>
        {label || config.text}
      </span>
    </div>
  );
}

// Count Badge (for notifications, etc.)
interface CountBadgeProps {
  count: number;
  max?: number;
  color?: 'orange' | 'blue' | 'pink' | 'green';
}

export function CountBadge({
  count,
  max = 99,
  color = 'pink',
}: CountBadgeProps) {
  const displayCount = count > max ? `${max}+` : count;

  const colorStyles: Record<string, React.CSSProperties> = {
    orange: { background: '#FF6B35', boxShadow: '0 0 15px rgba(255, 107, 53, 0.5)' },
    blue: { background: '#00D9FF', boxShadow: '0 0 15px rgba(0, 217, 255, 0.5)' },
    pink: { background: '#FF006E', boxShadow: '0 0 15px rgba(255, 0, 110, 0.5)' },
    green: { background: '#39FF14', boxShadow: '0 0 15px rgba(57, 255, 20, 0.5)', color: '#0D0D12' },
  };

  if (count <= 0) return null;

  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '20px',
        height: '20px',
        padding: '0 6px',
        fontSize: '12px',
        fontWeight: 'bold',
        borderRadius: '9999px',
        color: 'white',
        ...colorStyles[color],
      }}
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
}

export function LevelBadge({
  level,
  maxLevel = 5,
  label,
}: LevelBadgeProps) {
  const getColor = () => {
    const ratio = level / maxLevel;
    if (ratio <= 0.3) return 'linear-gradient(to top, #39FF14, #00D9FF)';
    if (ratio <= 0.6) return 'linear-gradient(to top, #FFD60A, #FF6B35)';
    return 'linear-gradient(to top, #FF6B35, #FF006E)';
  };

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ display: 'flex', gap: '2px' }}>
        {Array.from({ length: maxLevel }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.1 }}
            style={{
              width: '8px',
              height: '16px',
              borderRadius: '2px',
              background: i < level ? getColor() : 'rgba(255, 255, 255, 0.1)',
            }}
          />
        ))}
      </div>
      {label && <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>{label}</span>}
    </div>
  );
}

// Achievement Badge
interface AchievementBadgeProps {
  icon: React.ReactNode;
  name: string;
  unlocked?: boolean;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
}

export function AchievementBadge({
  icon,
  name,
  unlocked = false,
  rarity = 'common',
}: AchievementBadgeProps) {
  const rarityConfig = {
    common: {
      bg: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      glow: '',
    },
    rare: {
      bg: 'linear-gradient(to bottom, rgba(0, 217, 255, 0.3), rgba(114, 9, 183, 0.3))',
      border: '1px solid rgba(0, 217, 255, 0.5)',
      glow: '0 0 20px rgba(0, 217, 255, 0.3)',
    },
    epic: {
      bg: 'linear-gradient(to bottom, rgba(114, 9, 183, 0.3), rgba(255, 0, 110, 0.3))',
      border: '1px solid rgba(114, 9, 183, 0.5)',
      glow: '0 0 20px rgba(114, 9, 183, 0.3)',
    },
    legendary: {
      bg: 'linear-gradient(to bottom, rgba(255, 107, 53, 0.3), rgba(255, 0, 110, 0.3))',
      border: '1px solid rgba(255, 107, 53, 0.5)',
      glow: '0 0 20px rgba(255, 107, 53, 0.3)',
    },
  };

  const config = rarityConfig[rarity];

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        padding: '12px',
        borderRadius: '12px',
        background: unlocked ? config.bg : 'rgba(255, 255, 255, 0.05)',
        border: unlocked ? config.border : '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: unlocked ? config.glow : 'none',
        opacity: unlocked ? 1 : 0.5,
        filter: unlocked ? 'none' : 'grayscale(1)',
      }}
    >
      <div style={{
        fontSize: '24px',
        ...(unlocked && rarity === 'legendary' ? { animation: 'float 3s ease-in-out infinite' } : {}),
      }}>
        {icon}
      </div>
      <span style={{
        fontSize: '12px',
        fontWeight: 500,
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
      }}>
        {name}
      </span>
      {!unlocked && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0, 0, 0, 0.5)',
          borderRadius: '12px',
        }}>
          <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>잠김</span>
        </div>
      )}
    </motion.div>
  );
}
