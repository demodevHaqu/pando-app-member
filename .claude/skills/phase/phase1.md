🚀 PHASE 1: 프로젝트 초기 설정 및 디자인 시스템
Task 1.1: Next.js 프로젝트 생성
bash# pando 폴더 생성 및 이동
mkdir pando
cd pando

# Next.js 15.5.7 프로젝트 생성
npx create-next-app@15.5.7 . --typescript --tailwind --app --no-src-dir

# 선택사항:
# ✅ TypeScript
# ✅ ESLint
# ✅ Tailwind CSS
# ✅ App Router
# ❌ src/ directory
# ✅ Import alias (@/*)
Task 1.2: 패키지 설치
bash# 상태관리 & UI
npm install zustand lucide-react framer-motion

# 모션 트래킹
npm install @mediapipe/pose @mediapipe/camera_utils @mediapipe/drawing_utils

# 차트 라이브러리
npm install recharts

# 유틸리티
npm install date-fns clsx
Task 1.3: 폴더 구조 생성
bashmkdir -p components/ui components/layout components/motion-tracking
mkdir -p components/routine components/qr components/gx components/charts
mkdir -p hooks store types data/mock lib public/assets

Task 1.4: TailwindCSS 설정
파일: tailwind.config.ts
typescriptimport type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        energy: {
          orange: '#FF6B35',
          DEFAULT: '#FF6B35',
        },
        electric: {
          blue: '#00D9FF',
          DEFAULT: '#00D9FF',
        },
        neon: {
          green: '#39FF14',
          DEFAULT: '#39FF14',
        },
        power: {
          pink: '#FF006E',
          DEFAULT: '#FF006E',
        },
        tech: {
          purple: '#7209B7',
          DEFAULT: '#7209B7',
        },
        cyber: {
          yellow: '#FFD60A',
          dark: '#0D0D12',
          mid: '#1A1A24',
          light: '#252533',
          DEFAULT: '#0D0D12',
        },
        surface: '#2D2D3D',
      },
      backgroundImage: {
        'gradient-energy': 'linear-gradient(135deg, #FF6B35, #FF006E)',
        'gradient-growth': 'linear-gradient(135deg, #39FF14, #00D9FF)',
        'gradient-premium': 'linear-gradient(135deg, #7209B7, #00D9FF)',
      },
      boxShadow: {
        'glow-orange': '0 0 20px rgba(255, 107, 53, 0.5)',
        'glow-blue': '0 0 20px rgba(0, 217, 255, 0.5)',
        'glow-green': '0 0 20px rgba(57, 255, 20, 0.5)',
        'glow-pink': '0 0 20px rgba(255, 0, 110, 0.5)',
        'glow-purple': '0 0 20px rgba(114, 9, 183, 0.5)',
      },
      animation: {
        'energy-pulse': 'energy-pulse 2s ease-in-out infinite',
        'neon-glow': 'neon-glow 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s ease-out',
        'scale-pop': 'scale-pop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'energy-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 10px #FF6B35, 0 0 20px #FF6B35',
            transform: 'scale(1)',
          },
          '50%': {
            boxShadow: '0 0 20px #FF6B35, 0 0 40px #FF6B35',
            transform: 'scale(1.05)',
          },
        },
        'neon-glow': {
          '0%, 100%': {
            textShadow: '0 0 5px currentColor, 0 0 10px currentColor',
          },
          '50%': {
            textShadow: '0 0 10px currentColor, 0 0 20px currentColor',
          },
        },
        'slide-up': {
          'from': { opacity: '0', transform: 'translateY(30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-pop': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

Task 1.5: Global CSS
파일: app/globals.css
css@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --energy-orange: #FF6B35;
  --electric-blue: #00D9FF;
  --neon-green: #39FF14;
  --power-pink: #FF006E;
  --tech-purple: #7209B7;
  --cyber-yellow: #FFD60A;
  --bg-dark: #0D0D12;
  --bg-mid: #1A1A24;
  --bg-light: #252533;
  --surface: #2D2D3D;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: var(--bg-dark);
  color: #FFFFFF;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  overflow-x: hidden;
}

/* Hologram Grid */
.hologram-grid {
  background-image:
    linear-gradient(rgba(0, 217, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 217, 255, 0.05) 1px, transparent 1px);
  background-size: 30px 30px;
  position: relative;
}

.hologram-grid::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent, rgba(0, 217, 255, 0.1));
  pointer-events: none;
}

/* Glass Morphism */
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.glass-dark {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

/* Card Glow */
.card-glow {
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.card-glow::before {
  content: "";
  position: absolute;
  inset: -2px;
  background: linear-gradient(135deg, var(--electric-blue), var(--power-pink));
  border-radius: inherit;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
  filter: blur(10px);
}

.card-glow:hover::before {
  opacity: 0.6;
}

.card-glow:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 217, 255, 0.4);
}

/* Button Shine */
.btn-shine {
  position: relative;
  overflow: hidden;
}

.btn-shine::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.btn-shine:hover::before {
  left: 100%;
}

.btn-shine:active {
  transform: scale(0.95);
}

/* Text Gradients */
.text-gradient-energy {
  background: linear-gradient(135deg, var(--energy-orange), var(--power-pink));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-gradient-growth {
  background: linear-gradient(135deg, var(--neon-green), var(--electric-blue));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-glow-blue {
  color: var(--electric-blue);
  text-shadow: 0 0 10px var(--electric-blue);
}

.text-glow-green {
  color: var(--neon-green);
  text-shadow: 0 0 10px var(--neon-green);
}

.text-glow-orange {
  color: var(--energy-orange);
  text-shadow: 0 0 10px var(--energy-orange);
}

/* Icon Glow */
.icon-glow {
  filter: drop-shadow(0 0 8px currentColor);
  transition: filter 0.3s ease;
}

.icon-glow:hover {
  filter: drop-shadow(0 0 16px currentColor);
}

/* Gradient Border */
.gradient-border {
  position: relative;
  background: var(--bg-mid);
}

.gradient-border::before {
  content: "";
  position: absolute;
  inset: 0;
  padding: 2px;
  background: linear-gradient(135deg, var(--electric-blue), var(--power-pink));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  border-radius: inherit;
}

/* Notification Dot */
.notification-dot {
  width: 8px;
  height: 8px;
  background: var(--power-pink);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--power-pink);
  animation: energy-pulse 2s infinite;
}

/* Skeleton */
.skeleton {
  background: linear-gradient(
    90deg,
    var(--bg-mid) 0%,
    var(--bg-light) 50%,
    var(--bg-mid) 100%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 0.5rem;
}

@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: var(--bg-mid);
}

::-webkit-scrollbar-thumb {
  background: var(--electric-blue);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--neon-green);
}

/* Hide scrollbar */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

Task 1.6: Next.js 설정
파일: next.config.ts
typescriptimport type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'recharts'],
  },
};

export default nextConfig;
파일: vercel.json
json{
  "buildCommand": "next build",
  "framework": "nextjs",
  "regions": ["icn1"]
}
파일: .env.local
envNEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_MEDIAPIPE_CDN=https://cdn.jsdelivr.net/npm/@mediapipe

Task 1.7: UI 컴포넌트 라이브러리
Button Component
파일: components/ui/Button.tsx
typescript'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'energy' | 'growth' | 'premium' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
  shine?: boolean;
  children: React.ReactNode;
}

export default function Button({ 
  variant = 'energy', 
  size = 'md', 
  glow = false,
  shine = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = "font-semibold rounded-lg transition-all duration-300 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    energy: "bg-gradient-energy text-white shadow-glow-orange hover:shadow-glow-orange",
    growth: "bg-gradient-growth text-white shadow-glow-green hover:shadow-glow-green",
    premium: "bg-gradient-premium text-white shadow-glow-purple hover:shadow-glow-purple",
    ghost: "bg-transparent border-2 border-electric-blue text-electric-blue hover:bg-electric-blue/10"
  };
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };
  
  const glowClass = glow ? "animate-energy-pulse" : "";
  const shineClass = shine ? "btn-shine" : "";
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${glowClass} ${shineClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
Card Component
파일: components/ui/Card.tsx
typescript'use client';

import React from 'react';

interface CardProps {
  variant?: 'default' | 'hologram' | 'glass';
  glow?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Card({ 
  variant = 'default', 
  glow = false,
  children,
  className = "",
  onClick
}: CardProps) {
  const baseClasses = "rounded-xl p-4 transition-all duration-300";
  
  const variantClasses = {
    default: "bg-cyber-mid border border-white/10",
    hologram: "hologram-grid bg-cyber-mid/50 border border-electric-blue/30",
    glass: "glass"
  };
  
  const glowClass = glow ? "card-glow cursor-pointer" : "";
  const clickClass = onClick ? "cursor-pointer hover:scale-[1.02]" : "";
  
  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${glowClass} ${clickClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
Badge Component
파일: components/ui/Badge.tsx
typescript'use client';

import React from 'react';

interface BadgeProps {
  type: 'energy' | 'growth' | 'premium';
  children: React.ReactNode;
  glow?: boolean;
  className?: string;
}

export default function Badge({ type, children, glow = true, className = '' }: BadgeProps) {
  const baseClasses = "inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider";
  
  const typeClasses = {
    energy: "bg-gradient-energy text-white shadow-glow-orange",
    growth: "bg-gradient-growth text-white shadow-glow-green",
    premium: "bg-gradient-premium text-white shadow-glow-purple"
  };
  
  const glowClass = glow ? "animate-neon-glow" : "";
  
  return (
    <span className={`${baseClasses} ${typeClasses[type]} ${glowClass} ${className}`}>
      {children}
    </span>
  );
}
ProgressBar Component
파일: components/ui/ProgressBar.tsx
typescript'use client';

import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  color?: 'blue' | 'green' | 'orange';
  className?: string;
}

export default function ProgressBar({ 
  value, 
  max = 100, 
  showLabel = false,
  color = 'blue',
  className = ''
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  
  const colorClasses = {
    blue: "from-electric-blue to-tech-purple",
    green: "from-neon-green to-electric-blue",
    orange: "from-energy-orange to-power-pink"
  };
  
  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between mb-2 text-sm">
          <span className="text-gray-400">진행률</span>
          <span className="text-white font-semibold">{value}/{max}</span>
        </div>
      )}
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r ${colorClasses[color]} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
Input Component
파일: components/ui/Input.tsx
typescript'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 bg-cyber-mid border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-electric-blue transition-colors ${error ? 'border-power-pink' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-power-pink">{error}</p>
      )}
    </div>
  );
}
Modal Component
파일: components/ui/Modal.tsx
typescript'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export default function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`bg-cyber-mid border border-white/10 rounded-xl shadow-2xl ${sizeClasses[size]} w-full max-h-[90vh] overflow-y-auto`}
            >
              {title && (
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                  <h3 className="text-lg font-bold text-white">{title}</h3>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              )}
              <div className="p-4">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
Tabs Component
파일: components/ui/Tabs.tsx
typescript'use client';

import React, { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
}

export default function Tabs({ tabs, defaultTab }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  return (
    <div className="w-full">
      <div className="flex gap-2 border-b border-white/10 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium transition-all ${
              activeTab === tab.id
                ? 'text-electric-blue border-b-2 border-electric-blue'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}
Skeleton Component
파일: components/ui/Skeleton.tsx
typescript'use client';

import React from 'react';

interface SkeletonProps {
  className?: string;
  count?: number;
}

export default function Skeleton({ className = '', count = 1 }: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`skeleton ${className}`}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </>
  );
}

✅ PHASE 1 완료 체크리스트:

 Next.js 15.5.7 프로젝트 생성
 패키지 설치
 TailwindCSS Cyber-Fitness 테마 설정
 globals.css 작성
 UI 컴포넌트 8개 구현 (Button, Card, Badge, ProgressBar, Input, Modal, Tabs, Skeleton)
 Next.js 설정 파일 작성

