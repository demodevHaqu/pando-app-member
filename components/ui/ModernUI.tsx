'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

// ============ Modern Card ============
export const ModernCard = ({
  children,
  className = '',
  onClick,
  style = {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hover = true
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  hover?: boolean;
}) => (
  <div
    onClick={onClick}
    className={className}
    style={{
      background: 'linear-gradient(145deg, rgba(26, 26, 36, 0.95), rgba(13, 13, 18, 0.98))',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '20px',
      backdropFilter: 'blur(20px)',
      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
      cursor: onClick ? 'pointer' : 'default',
      transition: 'all 0.3s ease',
      ...style
    }}
  >
    {children}
  </div>
);

// ============ Feature Card with Gradient Border ============
export const FeatureCard = ({
  children,
  gradient = 'linear-gradient(135deg, #00D9FF, #7209B7, #FF006E)'
}: {
  children: React.ReactNode;
  gradient?: string;
}) => (
  <div
    style={{
      position: 'relative',
      borderRadius: '24px',
      padding: '2px',
      background: gradient,
    }}
  >
    <div
      style={{
        background: 'linear-gradient(145deg, #1A1A24, #0D0D12)',
        borderRadius: '22px',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '150px',
        height: '150px',
        background: 'radial-gradient(circle, rgba(0, 217, 255, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100px',
        height: '100px',
        background: 'radial-gradient(circle, rgba(255, 0, 110, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
      }} />
      <div style={{ position: 'relative', zIndex: 10 }}>
        {children}
      </div>
    </div>
  </div>
);

// ============ Premium Card ============
export const PremiumCard = ({
  children,
  onClick
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <div
    onClick={onClick}
    style={{
      background: 'linear-gradient(135deg, rgba(114, 9, 183, 0.2), rgba(255, 0, 110, 0.15))',
      border: '1px solid rgba(114, 9, 183, 0.4)',
      borderRadius: '20px',
      padding: '20px',
      cursor: onClick ? 'pointer' : 'default',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <div style={{
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
      animation: 'shine 3s infinite',
    }} />
    {children}
  </div>
);

// ============ Tag Component ============
export const Tag = ({
  children,
  color = 'blue',
  size = 'sm'
}: {
  children: React.ReactNode;
  color?: 'blue' | 'orange' | 'green' | 'pink' | 'purple' | 'yellow';
  size?: 'sm' | 'md';
}) => {
  const colors = {
    blue: { bg: 'rgba(0, 217, 255, 0.15)', text: '#00D9FF', border: 'rgba(0, 217, 255, 0.3)' },
    orange: { bg: 'rgba(255, 107, 53, 0.15)', text: '#FF6B35', border: 'rgba(255, 107, 53, 0.3)' },
    green: { bg: 'rgba(57, 255, 20, 0.15)', text: '#39FF14', border: 'rgba(57, 255, 20, 0.3)' },
    pink: { bg: 'rgba(255, 0, 110, 0.15)', text: '#FF006E', border: 'rgba(255, 0, 110, 0.3)' },
    purple: { bg: 'rgba(114, 9, 183, 0.15)', text: '#7209B7', border: 'rgba(114, 9, 183, 0.3)' },
    yellow: { bg: 'rgba(255, 214, 10, 0.15)', text: '#FFD60A', border: 'rgba(255, 214, 10, 0.3)' },
  };

  const sizes = {
    sm: { padding: '4px 10px', fontSize: '11px' },
    md: { padding: '6px 14px', fontSize: '13px' },
  };

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: sizes[size].padding,
      borderRadius: '20px',
      fontSize: sizes[size].fontSize,
      fontWeight: 600,
      background: colors[color].bg,
      color: colors[color].text,
      border: `1px solid ${colors[color].border}`,
    }}>
      {children}
    </span>
  );
};

// ============ Progress Bar ============
export const ProgressBar = ({
  percentage,
  color = 'green',
  height = 6,
  showGlow = true
}: {
  percentage: number;
  color?: 'green' | 'orange' | 'blue' | 'pink';
  height?: number;
  showGlow?: boolean;
}) => {
  const gradients = {
    green: 'linear-gradient(90deg, #39FF14, #00D9FF)',
    orange: 'linear-gradient(90deg, #FF6B35, #FF006E)',
    blue: 'linear-gradient(90deg, #00D9FF, #7209B7)',
    pink: 'linear-gradient(90deg, #FF006E, #7209B7)',
  };

  const glows = {
    green: '0 0 10px rgba(57, 255, 20, 0.5)',
    orange: '0 0 10px rgba(255, 107, 53, 0.5)',
    blue: '0 0 10px rgba(0, 217, 255, 0.5)',
    pink: '0 0 10px rgba(255, 0, 110, 0.5)',
  };

  return (
    <div style={{
      width: '100%',
      height: `${height}px`,
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: `${height / 2}px`,
      overflow: 'hidden',
    }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          height: '100%',
          borderRadius: `${height / 2}px`,
          background: gradients[color],
          boxShadow: showGlow ? glows[color] : 'none',
        }}
      />
    </div>
  );
};

// ============ Icon Box ============
export const IconBox = ({
  children,
  color = 'blue',
  size = 48
}: {
  children: React.ReactNode;
  color?: 'blue' | 'orange' | 'green' | 'pink' | 'purple';
  size?: number;
}) => {
  const colors = {
    blue: { bg: 'linear-gradient(135deg, rgba(0, 217, 255, 0.2), rgba(0, 217, 255, 0.1))', shadow: 'rgba(0, 217, 255, 0.3)' },
    orange: { bg: 'linear-gradient(135deg, rgba(255, 107, 53, 0.2), rgba(255, 107, 53, 0.1))', shadow: 'rgba(255, 107, 53, 0.3)' },
    green: { bg: 'linear-gradient(135deg, rgba(57, 255, 20, 0.2), rgba(57, 255, 20, 0.1))', shadow: 'rgba(57, 255, 20, 0.3)' },
    pink: { bg: 'linear-gradient(135deg, rgba(255, 0, 110, 0.2), rgba(255, 0, 110, 0.1))', shadow: 'rgba(255, 0, 110, 0.3)' },
    purple: { bg: 'linear-gradient(135deg, rgba(114, 9, 183, 0.2), rgba(114, 9, 183, 0.1))', shadow: 'rgba(114, 9, 183, 0.3)' },
  };

  return (
    <div style={{
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: `${size * 0.3}px`,
      background: colors[color].bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}>
      {children}
    </div>
  );
};

// ============ Gradient Icon Box ============
export const GradientIconBox = ({
  children,
  gradient = 'linear-gradient(135deg, #00D9FF, #7209B7)',
  size = 48,
  glow = true
}: {
  children: React.ReactNode;
  gradient?: string;
  size?: number;
  glow?: boolean;
}) => (
  <div style={{
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: `${size * 0.3}px`,
    background: gradient,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    boxShadow: glow ? '0 4px 15px rgba(0, 217, 255, 0.3)' : 'none',
  }}>
    {children}
  </div>
);

// ============ Page Header ============
export const PageHeader = ({
  title,
  subtitle,
  showBack = true,
  rightElement,
  transparent = false,
  onBack
}: {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  rightElement?: React.ReactNode;
  transparent?: boolean;
  onBack?: () => void;
}) => {
  const router = useRouter();
  const handleBack = onBack || (() => router.back());

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 40,
      background: transparent ? 'transparent' : 'rgba(13, 13, 18, 0.85)',
      backdropFilter: transparent ? 'none' : 'blur(20px)',
      borderBottom: transparent ? 'none' : '1px solid rgba(255, 255, 255, 0.05)',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        minHeight: '64px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {showBack && (
            <button
              onClick={handleBack}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ChevronLeft size={20} color="#9CA3AF" />
            </button>
          )}
          <div>
            <h1 style={{ color: 'white', fontWeight: 'bold', fontSize: '18px', margin: 0 }}>{title}</h1>
            {subtitle && (
              <p style={{ color: '#6B7280', fontSize: '12px', margin: 0 }}>{subtitle}</p>
            )}
          </div>
        </div>
        {rightElement}
      </div>
    </header>
  );
};

// ============ Section Title ============
export const SectionTitle = ({
  title,
  action,
  onAction
}: {
  title: string;
  action?: string;
  onAction?: () => void;
}) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',
  }}>
    <span style={{ fontSize: '17px', fontWeight: 'bold', color: 'white' }}>
      {title}
    </span>
    {action && (
      <button
        onClick={onAction}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '13px',
          color: '#00D9FF',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {action} <ChevronRight size={16} />
      </button>
    )}
  </div>
);

// ============ Primary Button ============
export const PrimaryButton = ({
  children,
  onClick,
  icon,
  fullWidth = false,
  size = 'md',
  gradient = 'linear-gradient(135deg, #FF6B35, #FF006E)',
  disabled = false
}: {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  gradient?: string;
  disabled?: boolean;
}) => {
  const sizes = {
    sm: { padding: '10px 20px', fontSize: '13px' },
    md: { padding: '14px 28px', fontSize: '15px' },
    lg: { padding: '18px 36px', fontSize: '16px' },
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: fullWidth ? '100%' : 'auto',
        padding: sizes[size].padding,
        borderRadius: '16px',
        background: disabled ? '#333' : gradient,
        border: 'none',
        color: 'white',
        fontWeight: 'bold',
        fontSize: sizes[size].fontSize,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        boxShadow: disabled ? 'none' : '0 4px 20px rgba(255, 107, 53, 0.4)',
        opacity: disabled ? 0.5 : 1,
      }}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
    >
      {icon}
      {children}
    </motion.button>
  );
};

// ============ Secondary Button ============
export const SecondaryButton = ({
  children,
  onClick,
  icon,
  fullWidth = false,
  size = 'md',
  disabled = false
}: {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}) => {
  const sizes = {
    sm: { padding: '10px 20px', fontSize: '13px' },
    md: { padding: '14px 28px', fontSize: '15px' },
    lg: { padding: '18px 36px', fontSize: '16px' },
  };

  return (
    <motion.button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        width: fullWidth ? '100%' : 'auto',
        padding: sizes[size].padding,
        borderRadius: '16px',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        color: disabled ? '#6B7280' : 'white',
        fontWeight: '600',
        fontSize: sizes[size].fontSize,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
      }}
      whileHover={disabled ? {} : { scale: 1.02, background: 'rgba(255, 255, 255, 0.08)' }}
      whileTap={disabled ? {} : { scale: 0.98 }}
    >
      {icon}
      {children}
    </motion.button>
  );
};

// ============ List Item ============
export const ListItem = ({
  children,
  onClick,
  leftElement,
  rightElement
}: {
  children: React.ReactNode;
  onClick?: () => void;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}) => (
  <div
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      padding: '16px',
      background: 'rgba(26, 26, 36, 0.6)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      borderRadius: '16px',
      cursor: onClick ? 'pointer' : 'default',
      transition: 'all 0.2s ease',
    }}
  >
    {leftElement}
    <div style={{ flex: 1 }}>{children}</div>
    {rightElement || (onClick && <ChevronRight size={20} color="#6B7280" />)}
  </div>
);

// ============ Stat Card ============
export const StatCard = ({
  label,
  value,
  icon,
  color = 'blue',
  trend,
  trendValue
}: {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: 'blue' | 'orange' | 'green' | 'pink' | 'purple';
  trend?: 'up' | 'down';
  trendValue?: string;
}) => {
  const colors = {
    blue: '#00D9FF',
    orange: '#FF6B35',
    green: '#39FF14',
    pink: '#FF006E',
    purple: '#7209B7',
  };

  return (
    <ModernCard style={{ padding: '16px', textAlign: 'center' }}>
      {icon && (
        <IconBox color={color} size={40}>
          {icon}
        </IconBox>
      )}
      <p style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: colors[color],
        margin: icon ? '10px 0 4px' : '0 0 4px',
      }}>
        {value}
      </p>
      <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>{label}</p>
      {trend && trendValue && (
        <p style={{
          fontSize: '11px',
          color: trend === 'up' ? '#39FF14' : '#FF006E',
          margin: '4px 0 0',
        }}>
          {trend === 'up' ? '↑' : '↓'} {trendValue}
        </p>
      )}
    </ModernCard>
  );
};

// ============ Empty State ============
export const EmptyState = ({
  icon,
  title,
  description,
  action,
  onAction
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: string;
  onAction?: () => void;
}) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    textAlign: 'center',
  }}>
    <div style={{
      width: '80px',
      height: '80px',
      borderRadius: '24px',
      background: 'rgba(255, 255, 255, 0.05)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '20px',
    }}>
      {icon}
    </div>
    <h3 style={{ color: 'white', fontSize: '18px', fontWeight: 'bold', margin: '0 0 8px' }}>
      {title}
    </h3>
    {description && (
      <p style={{ color: '#6B7280', fontSize: '14px', margin: '0 0 20px', maxWidth: '280px' }}>
        {description}
      </p>
    )}
    {action && onAction && (
      <PrimaryButton onClick={onAction} size="sm">
        {action}
      </PrimaryButton>
    )}
  </div>
);

// ============ Divider ============
export const Divider = ({ margin = 20 }: { margin?: number }) => (
  <div style={{
    height: '1px',
    background: 'rgba(255, 255, 255, 0.08)',
    margin: `${margin}px 0`,
  }} />
);

// ============ Avatar ============
export const Avatar = ({
  src,
  name,
  size = 48,
  showBorder = true
}: {
  src?: string;
  name: string;
  size?: number;
  showBorder?: boolean;
}) => (
  <div style={{
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    background: src ? `url(${src}) center/cover` : 'linear-gradient(135deg, #00D9FF, #7209B7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: `${size * 0.4}px`,
    color: 'white',
    border: showBorder ? '2px solid rgba(255, 255, 255, 0.1)' : 'none',
    flexShrink: 0,
  }}>
    {!src && name.charAt(0).toUpperCase()}
  </div>
);

// ============ Badge Count ============
export const BadgeCount = ({
  count,
  max = 99
}: {
  count: number;
  max?: number;
}) => {
  if (count <= 0) return null;

  return (
    <span style={{
      minWidth: '20px',
      height: '20px',
      padding: '0 6px',
      borderRadius: '10px',
      background: '#FF006E',
      color: 'white',
      fontSize: '11px',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 0 10px rgba(255, 0, 110, 0.5)',
    }}>
      {count > max ? `${max}+` : count}
    </span>
  );
};

// ============ Tabs ============
export const TabBar = ({
  tabs,
  activeTab,
  onTabChange
}: {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onTabChange: (id: string) => void;
}) => (
  <div style={{
    display: 'flex',
    gap: '8px',
    padding: '4px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '14px',
  }}>
    {tabs.map(tab => (
      <button
        key={tab.id}
        onClick={() => onTabChange(tab.id)}
        style={{
          flex: 1,
          padding: '10px 16px',
          borderRadius: '10px',
          background: activeTab === tab.id ? 'rgba(0, 217, 255, 0.2)' : 'transparent',
          border: 'none',
          color: activeTab === tab.id ? '#00D9FF' : '#6B7280',
          fontSize: '14px',
          fontWeight: activeTab === tab.id ? '600' : '500',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

// ============ Page Container ============
export const PageContainer = ({
  children,
  noPadding = false
}: {
  children: React.ReactNode;
  noPadding?: boolean;
}) => (
  <div style={{
    minHeight: '100vh',
    background: '#0D0D12',
    paddingBottom: '100px',
  }}>
    <div style={{
      padding: noPadding ? 0 : '24px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
    }}>
      {children}
    </div>
  </div>
);
