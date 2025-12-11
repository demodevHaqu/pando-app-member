'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CheckCircle, AlertTriangle, XCircle, ArrowUp, ArrowDown, RotateCw, Info } from 'lucide-react';

type FeedbackType = 'success' | 'warning' | 'error' | 'info';
type BodyPart = 'head' | 'shoulders' | 'back' | 'hips' | 'knees' | 'feet' | 'arms' | 'core';

interface FeedbackItem {
  id: string;
  type: FeedbackType;
  bodyPart: BodyPart;
  message: string;
  suggestion?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'rotate';
}

interface FormFeedbackProps {
  feedbacks: FeedbackItem[];
  overallScore?: number; // 0-100
  showDetails?: boolean;
  onFeedbackClick?: (feedback: FeedbackItem) => void;
  className?: string;
}

const feedbackConfig = {
  success: {
    icon: CheckCircle,
    color: 'text-neon-green',
    bg: 'bg-neon-green/10',
    border: 'border-neon-green/30',
    glow: 'shadow-glow-green',
  },
  warning: {
    icon: AlertTriangle,
    color: 'text-cyber-yellow',
    bg: 'bg-cyber-yellow/10',
    border: 'border-cyber-yellow/30',
    glow: '',
  },
  error: {
    icon: XCircle,
    color: 'text-power-pink',
    bg: 'bg-power-pink/10',
    border: 'border-power-pink/30',
    glow: 'shadow-glow-pink',
  },
  info: {
    icon: Info,
    color: 'text-electric-blue',
    bg: 'bg-electric-blue/10',
    border: 'border-electric-blue/30',
    glow: '',
  },
};

const bodyPartLabels: Record<BodyPart, string> = {
  head: '머리',
  shoulders: '어깨',
  back: '등/허리',
  hips: '골반',
  knees: '무릎',
  feet: '발',
  arms: '팔',
  core: '코어',
};

const directionIcons = {
  up: ArrowUp,
  down: ArrowDown,
  left: ArrowUp, // rotated via CSS
  right: ArrowUp, // rotated via CSS
  rotate: RotateCw,
};

export default function FormFeedback({
  feedbacks,
  overallScore,
  showDetails = true,
  onFeedbackClick,
  className,
}: FormFeedbackProps) {
  // Group feedbacks by type for summary
  const errorCount = feedbacks.filter((f) => f.type === 'error').length;
  const warningCount = feedbacks.filter((f) => f.type === 'warning').length;
  const successCount = feedbacks.filter((f) => f.type === 'success').length;

  // Determine overall status
  const overallStatus = errorCount > 0 ? 'error' : warningCount > 0 ? 'warning' : 'success';

  return (
    <div className={cn("space-y-4", className)}>
      {/* Overall Score */}
      {overallScore !== undefined && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-center gap-6 p-4 rounded-xl bg-cyber-mid border border-white/10"
        >
          <div className="relative w-24 h-24">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="8"
                fill="none"
              />
              <motion.circle
                cx="48"
                cy="48"
                r="40"
                stroke={
                  overallScore >= 80
                    ? '#39FF14'
                    : overallScore >= 60
                      ? '#FFD60A'
                      : '#FF006E'
                }
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                initial={{ strokeDasharray: 251, strokeDashoffset: 251 }}
                animate={{
                  strokeDashoffset: 251 - (251 * overallScore) / 100,
                }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-white">{overallScore}</span>
              <span className="text-xs text-white/50">점</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-white text-lg">
              {overallScore >= 80
                ? '훌륭한 자세!'
                : overallScore >= 60
                  ? '조금만 더!'
                  : '자세 교정 필요'}
            </h3>
            <div className="flex items-center gap-3 text-sm">
              {successCount > 0 && (
                <span className="flex items-center gap-1 text-neon-green">
                  <CheckCircle size={14} /> {successCount}
                </span>
              )}
              {warningCount > 0 && (
                <span className="flex items-center gap-1 text-cyber-yellow">
                  <AlertTriangle size={14} /> {warningCount}
                </span>
              )}
              {errorCount > 0 && (
                <span className="flex items-center gap-1 text-power-pink">
                  <XCircle size={14} /> {errorCount}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Quick Status Bar */}
      {!overallScore && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "flex items-center justify-between p-3 rounded-xl border",
            feedbackConfig[overallStatus].bg,
            feedbackConfig[overallStatus].border
          )}
        >
          <div className="flex items-center gap-2">
            {React.createElement(feedbackConfig[overallStatus].icon, {
              size: 20,
              className: feedbackConfig[overallStatus].color,
            })}
            <span className={cn("font-semibold", feedbackConfig[overallStatus].color)}>
              {overallStatus === 'success'
                ? '자세가 좋습니다!'
                : overallStatus === 'warning'
                  ? '자세를 확인하세요'
                  : '자세 교정이 필요합니다'}
            </span>
          </div>
          <span className="text-white/60 text-sm">
            {feedbacks.length}개 피드백
          </span>
        </motion.div>
      )}

      {/* Detailed Feedback List */}
      {showDetails && feedbacks.length > 0 && (
        <div className="space-y-2">
          <AnimatePresence>
            {feedbacks.map((feedback, index) => {
              const config = feedbackConfig[feedback.type];
              const Icon = config.icon;
              const DirectionIcon = feedback.direction
                ? directionIcons[feedback.direction]
                : null;

              return (
                <motion.div
                  key={feedback.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => onFeedbackClick?.(feedback)}
                  className={cn(
                    "p-3 rounded-xl border cursor-pointer transition-all hover:scale-[1.02]",
                    config.bg,
                    config.border
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn("p-1.5 rounded-lg", config.bg)}>
                      <Icon size={18} className={config.color} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-white/50 px-2 py-0.5 rounded bg-white/5">
                          {bodyPartLabels[feedback.bodyPart]}
                        </span>
                        {DirectionIcon && (
                          <DirectionIcon
                            size={14}
                            className={cn(
                              config.color,
                              feedback.direction === 'left' && '-rotate-90',
                              feedback.direction === 'right' && 'rotate-90'
                            )}
                          />
                        )}
                      </div>

                      <p className="text-white text-sm font-medium">
                        {feedback.message}
                      </p>

                      {feedback.suggestion && (
                        <p className="text-white/50 text-xs mt-1">
                          💡 {feedback.suggestion}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Empty State */}
      {feedbacks.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8 text-white/50"
        >
          <Info size={32} className="mx-auto mb-2 opacity-50" />
          <p>자세 분석을 시작하면 피드백이 표시됩니다</p>
        </motion.div>
      )}
    </div>
  );
}

// Single Feedback Toast (for real-time alerts)
interface FeedbackToastProps {
  feedback: FeedbackItem;
  onDismiss?: () => void;
  autoHide?: boolean;
  duration?: number;
}

export function FeedbackToast({
  feedback,
  onDismiss,
  autoHide = true,
  duration = 3000,
}: FeedbackToastProps) {
  const config = feedbackConfig[feedback.type];
  const Icon = config.icon;

  React.useEffect(() => {
    if (autoHide && onDismiss) {
      const timer = setTimeout(onDismiss, duration);
      return () => clearTimeout(timer);
    }
  }, [autoHide, duration, onDismiss]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      className={cn(
        "flex items-center gap-3 p-4 rounded-xl border backdrop-blur-lg",
        config.bg,
        config.border,
        config.glow
      )}
    >
      <Icon size={24} className={config.color} />
      <div className="flex-1">
        <p className="text-white font-medium">{feedback.message}</p>
        {feedback.suggestion && (
          <p className="text-white/60 text-sm">{feedback.suggestion}</p>
        )}
      </div>
    </motion.div>
  );
}
