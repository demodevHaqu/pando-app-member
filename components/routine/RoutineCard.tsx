'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Clock, Dumbbell, Flame, ChevronRight, Play, Zap } from 'lucide-react';
import Badge from '@/components/ui/Badge';

interface RoutineCardProps {
  id: string;
  title: string;
  duration: number; // minutes
  exerciseCount: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  targetMuscles?: string[];
  estimatedCalories?: number;
  isRecommended?: boolean;
  isCompleted?: boolean;
  progress?: number; // 0-100
  onClick?: () => void;
  onStart?: () => void;
  className?: string;
}

const difficultyConfig = {
  beginner: { label: '초급', color: 'text-neon-green', bg: 'bg-neon-green/20' },
  intermediate: { label: '중급', color: 'text-cyber-yellow', bg: 'bg-cyber-yellow/20' },
  advanced: { label: '고급', color: 'text-power-pink', bg: 'bg-power-pink/20' },
};

export default function RoutineCard({
  title,
  duration,
  exerciseCount,
  difficulty,
  targetMuscles = [],
  estimatedCalories,
  isRecommended = false,
  isCompleted = false,
  progress,
  onClick,
  onStart,
  className,
}: RoutineCardProps) {
  const diffConfig = difficultyConfig[difficulty];

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-xl border p-4 cursor-pointer transition-all duration-300",
        isCompleted
          ? "bg-neon-green/10 border-neon-green/30"
          : "bg-cyber-mid border-white/10 hover:border-electric-blue/50",
        className
      )}
    >
      {/* AI Recommended Badge */}
      {isRecommended && (
        <div className="absolute -right-8 top-3 rotate-45">
          <div className="bg-gradient-to-r from-energy-orange to-power-pink px-8 py-1 text-[10px] font-bold text-white">
            AI 추천
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 pr-4">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-white text-lg">{title}</h3>
            {isCompleted && (
              <Badge variant="success" size="sm">완료</Badge>
            )}
          </div>

          {/* Difficulty & Target Muscles */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className={cn("text-xs px-2 py-0.5 rounded-full", diffConfig.bg, diffConfig.color)}>
              {diffConfig.label}
            </span>
            {targetMuscles.slice(0, 3).map((muscle) => (
              <span key={muscle} className="text-xs text-white/50">
                #{muscle}
              </span>
            ))}
          </div>
        </div>

        {/* Start Button */}
        {onStart && !isCompleted && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onStart();
            }}
            className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-energy-orange to-power-pink flex items-center justify-center shadow-glow-orange"
          >
            <Play size={20} fill="white" className="text-white ml-1" />
          </motion.button>
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 text-sm text-white/60 mb-3">
        <div className="flex items-center gap-1.5">
          <Clock size={14} className="text-electric-blue" />
          <span>{duration}분</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Dumbbell size={14} className="text-tech-purple" />
          <span>{exerciseCount}개 운동</span>
        </div>
        {estimatedCalories && (
          <div className="flex items-center gap-1.5">
            <Flame size={14} className="text-energy-orange" />
            <span>{estimatedCalories}kcal</span>
          </div>
        )}
      </div>

      {/* Progress Bar (if in progress) */}
      {progress !== undefined && progress > 0 && progress < 100 && (
        <div className="mb-2">
          <div className="flex justify-between text-xs text-white/60 mb-1">
            <span>진행률</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-electric-blue to-tech-purple rounded-full"
            />
          </div>
        </div>
      )}

      {/* Bottom Action */}
      <div className="flex items-center justify-between pt-2 border-t border-white/5">
        <div className="flex items-center gap-1 text-xs text-electric-blue">
          <Zap size={12} />
          <span>루틴 상세 보기</span>
        </div>
        <ChevronRight size={16} className="text-white/40" />
      </div>

      {/* Spotlight Effect on Hover */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 pointer-events-none transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 to-transparent" />
      </div>
    </motion.div>
  );
}

// Compact version for lists
interface RoutineCardCompactProps {
  title: string;
  duration: number;
  exerciseCount: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export function RoutineCardCompact({
  title,
  duration,
  exerciseCount,
  difficulty,
  isActive = false,
  onClick,
  className,
}: RoutineCardCompactProps) {
  const diffConfig = difficultyConfig[difficulty];

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300",
        isActive
          ? "bg-electric-blue/20 border border-electric-blue/50"
          : "bg-cyber-mid border border-white/10 hover:border-white/20",
        className
      )}
    >
      <div className={cn(
        "w-10 h-10 rounded-lg flex items-center justify-center",
        diffConfig.bg
      )}>
        <Dumbbell size={20} className={diffConfig.color} />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-white truncate">{title}</h4>
        <div className="flex items-center gap-2 text-xs text-white/50">
          <span>{duration}분</span>
          <span>•</span>
          <span>{exerciseCount}개</span>
          <span>•</span>
          <span className={diffConfig.color}>{diffConfig.label}</span>
        </div>
      </div>

      <ChevronRight size={18} className="text-white/40" />
    </motion.div>
  );
}
