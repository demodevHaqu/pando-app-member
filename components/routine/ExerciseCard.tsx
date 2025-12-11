'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check, Play, Clock, RotateCcw, ChevronRight, Dumbbell, AlertCircle } from 'lucide-react';
import Badge, { LevelBadge } from '@/components/ui/Badge';

interface ExerciseCardProps {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number; // seconds, for timed exercises
  restTime?: number; // seconds
  difficulty: 1 | 2 | 3 | 4 | 5;
  targetMuscle: string;
  thumbnailUrl?: string;
  status?: 'pending' | 'in_progress' | 'completed' | 'skipped';
  currentSet?: number;
  notes?: string;
  isSubstitutable?: boolean;
  onClick?: () => void;
  onStart?: () => void;
  onSubstitute?: () => void;
  className?: string;
}

export default function ExerciseCard({
  name,
  sets,
  reps,
  weight,
  duration,
  restTime,
  difficulty,
  targetMuscle,
  thumbnailUrl,
  status = 'pending',
  currentSet = 0,
  notes,
  isSubstitutable = false,
  onClick,
  onStart,
  onSubstitute,
  className,
}: ExerciseCardProps) {
  const statusConfig = {
    pending: { bg: 'bg-cyber-mid', border: 'border-white/10', icon: null },
    in_progress: { bg: 'bg-electric-blue/10', border: 'border-electric-blue/50', icon: Play },
    completed: { bg: 'bg-neon-green/10', border: 'border-neon-green/50', icon: Check },
    skipped: { bg: 'bg-white/5', border: 'border-white/10', icon: null },
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-xl border p-4 cursor-pointer transition-all duration-300",
        config.bg,
        config.border,
        status === 'skipped' && 'opacity-50',
        className
      )}
    >
      <div className="flex gap-4">
        {/* Thumbnail */}
        <div className="relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-cyber-light">
          {thumbnailUrl ? (
            <img src={thumbnailUrl} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Dumbbell size={32} className="text-white/20" />
            </div>
          )}

          {/* Status Overlay */}
          {StatusIcon && (
            <div className={cn(
              "absolute inset-0 flex items-center justify-center",
              status === 'completed' ? 'bg-neon-green/60' : 'bg-electric-blue/60'
            )}>
              <StatusIcon size={24} className="text-white" />
            </div>
          )}

          {/* Progress indicator for in_progress */}
          {status === 'in_progress' && currentSet > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50">
              <div
                className="h-full bg-electric-blue"
                style={{ width: `${(currentSet / sets) * 100}%` }}
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between mb-1">
            <div>
              <h4 className="font-bold text-white truncate">{name}</h4>
              <span className="text-xs text-white/50">{targetMuscle}</span>
            </div>
            <LevelBadge level={difficulty} />
          </div>

          {/* Sets/Reps/Weight */}
          <div className="flex items-center gap-3 mt-2 text-sm">
            <div className="flex items-center gap-1 text-electric-blue">
              <span className="font-bold">{sets}</span>
              <span className="text-white/50">세트</span>
            </div>
            <span className="text-white/20">×</span>
            {duration ? (
              <div className="flex items-center gap-1 text-neon-green">
                <Clock size={14} />
                <span className="font-bold">{duration}초</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-neon-green">
                <span className="font-bold">{reps}</span>
                <span className="text-white/50">회</span>
              </div>
            )}
            {weight && (
              <>
                <span className="text-white/20">@</span>
                <div className="flex items-center gap-1 text-energy-orange">
                  <span className="font-bold">{weight}</span>
                  <span className="text-white/50">kg</span>
                </div>
              </>
            )}
          </div>

          {/* Rest Time */}
          {restTime && (
            <div className="flex items-center gap-1 mt-1 text-xs text-white/40">
              <RotateCcw size={12} />
              <span>휴식 {restTime}초</span>
            </div>
          )}

          {/* Notes */}
          {notes && (
            <div className="flex items-start gap-1.5 mt-2 p-2 rounded-lg bg-cyber-yellow/10 border border-cyber-yellow/20">
              <AlertCircle size={14} className="text-cyber-yellow flex-shrink-0 mt-0.5" />
              <span className="text-xs text-cyber-yellow">{notes}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col items-end justify-between">
          {status === 'pending' && onStart && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onStart();
              }}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-energy-orange to-power-pink flex items-center justify-center shadow-glow-orange"
            >
              <Play size={16} fill="white" className="text-white ml-0.5" />
            </motion.button>
          )}

          {status === 'in_progress' && (
            <Badge variant="info" size="sm" pulse>
              {currentSet}/{sets} 세트
            </Badge>
          )}

          {isSubstitutable && status === 'pending' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSubstitute?.();
              }}
              className="text-xs text-white/40 hover:text-electric-blue transition-colors"
            >
              대체 운동
            </button>
          )}

          <ChevronRight size={18} className="text-white/30" />
        </div>
      </div>

      {/* Completed overlay glow */}
      {status === 'completed' && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-green/0 via-neon-green/5 to-neon-green/0" />
        </div>
      )}
    </motion.div>
  );
}

// Mini Exercise Card for lists
interface ExerciseCardMiniProps {
  name: string;
  sets: number;
  reps: number;
  isCompleted?: boolean;
  onClick?: () => void;
  className?: string;
}

export function ExerciseCardMini({
  name,
  sets,
  reps,
  isCompleted = false,
  onClick,
  className,
}: ExerciseCardMiniProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all",
        isCompleted
          ? "bg-neon-green/10 border border-neon-green/30"
          : "bg-cyber-light border border-white/5 hover:border-white/10",
        className
      )}
    >
      <div className={cn(
        "w-6 h-6 rounded-full flex items-center justify-center",
        isCompleted ? "bg-neon-green" : "bg-white/10"
      )}>
        {isCompleted ? (
          <Check size={14} className="text-cyber-dark" />
        ) : (
          <div className="w-2 h-2 rounded-full bg-white/40" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h5 className={cn(
          "font-medium truncate",
          isCompleted ? "text-white/60 line-through" : "text-white"
        )}>
          {name}
        </h5>
      </div>

      <span className="text-xs text-white/50">
        {sets}×{reps}
      </span>
    </motion.div>
  );
}
