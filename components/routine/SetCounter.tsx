'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check, Minus, Plus, RotateCcw, Play, Pause, Timer } from 'lucide-react';
import Button from '@/components/ui/Button';

interface SetData {
  setNumber: number;
  targetReps: number;
  targetWeight?: number;
  actualReps?: number;
  actualWeight?: number;
  isCompleted: boolean;
  restTime?: number;
}

interface SetCounterProps {
  currentSet: number;
  totalSets: number;
  targetReps: number;
  targetWeight?: number;
  sets: SetData[];
  isResting?: boolean;
  restTimeRemaining?: number;
  onSetComplete: (setNumber: number, actualReps: number, actualWeight?: number) => void;
  onStartRest: () => void;
  onSkipRest: () => void;
  className?: string;
}

export default function SetCounter({
  currentSet,
  totalSets,
  targetReps,
  targetWeight,
  sets,
  isResting = false,
  restTimeRemaining = 0,
  onSetComplete,
  onStartRest,
  onSkipRest,
  className,
}: SetCounterProps) {
  const [reps, setReps] = useState(targetReps);
  const [weight, setWeight] = useState(targetWeight || 0);

  const handleComplete = () => {
    onSetComplete(currentSet, reps, weight || undefined);
    setReps(targetReps);
    if (targetWeight) setWeight(targetWeight);
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Set Progress Indicators */}
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: totalSets }).map((_, index) => {
          const set = sets[index];
          const isActive = index + 1 === currentSet;
          const isComplete = set?.isCompleted;

          return (
            <motion.div
              key={index}
              animate={{
                scale: isActive ? 1.2 : 1,
                opacity: isComplete ? 1 : isActive ? 1 : 0.5,
              }}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all",
                isComplete
                  ? "bg-neon-green text-cyber-dark shadow-glow-green"
                  : isActive
                    ? "bg-electric-blue text-white shadow-glow-blue"
                    : "bg-white/10 text-white/50"
              )}
            >
              {isComplete ? <Check size={18} /> : index + 1}
            </motion.div>
          );
        })}
      </div>

      {/* Rest Timer Overlay */}
      <AnimatePresence>
        {isResting && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-8"
          >
            <div className="inline-flex flex-col items-center gap-4 p-6 rounded-2xl bg-cyber-mid border border-electric-blue/30">
              <div className="flex items-center gap-2 text-electric-blue">
                <Timer size={24} />
                <span className="text-lg font-semibold">휴식 시간</span>
              </div>

              <motion.div
                key={restTimeRemaining}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-6xl font-bold text-white"
              >
                {restTimeRemaining}
              </motion.div>

              <p className="text-white/60">다음 세트까지</p>

              <Button
                variant="ghost"
                size="sm"
                onClick={onSkipRest}
                className="mt-2"
              >
                휴식 건너뛰기
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Counter Controls */}
      {!isResting && (
        <div className="space-y-6">
          {/* Current Set Info */}
          <div className="text-center">
            <p className="text-white/60 text-sm">현재 세트</p>
            <p className="text-3xl font-bold text-white">
              {currentSet} <span className="text-white/40">/ {totalSets}</span>
            </p>
          </div>

          {/* Reps Counter */}
          <div className="bg-cyber-mid rounded-2xl p-6 border border-white/10">
            <p className="text-center text-white/60 text-sm mb-4">반복 횟수</p>

            <div className="flex items-center justify-center gap-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setReps(Math.max(0, reps - 1))}
                className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Minus size={24} className="text-white" />
              </motion.button>

              <motion.div
                key={reps}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="w-24 text-center"
              >
                <span className="text-5xl font-bold text-white">{reps}</span>
                <p className="text-xs text-white/40 mt-1">목표: {targetReps}</p>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setReps(reps + 1)}
                className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Plus size={24} className="text-white" />
              </motion.button>
            </div>
          </div>

          {/* Weight Counter */}
          {targetWeight !== undefined && (
            <div className="bg-cyber-mid rounded-2xl p-6 border border-white/10">
              <p className="text-center text-white/60 text-sm mb-4">중량 (kg)</p>

              <div className="flex items-center justify-center gap-6">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setWeight(Math.max(0, weight - 2.5))}
                  className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Minus size={24} className="text-white" />
                </motion.button>

                <motion.div
                  key={weight}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="w-24 text-center"
                >
                  <span className="text-5xl font-bold text-energy-orange">{weight}</span>
                  <p className="text-xs text-white/40 mt-1">목표: {targetWeight}kg</p>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setWeight(weight + 2.5)}
                  className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Plus size={24} className="text-white" />
                </motion.button>
              </div>
            </div>
          )}

          {/* Complete Set Button */}
          <Button
            variant="energy"
            size="lg"
            className="w-full"
            glow
            shine
            onClick={handleComplete}
          >
            <Check size={20} />
            {currentSet < totalSets ? '세트 완료' : '운동 완료'}
          </Button>
        </div>
      )}

      {/* Set History */}
      {sets.some((s) => s.isCompleted) && (
        <div className="mt-6 pt-6 border-t border-white/10">
          <h4 className="text-sm font-semibold text-white/60 mb-3">완료한 세트</h4>
          <div className="space-y-2">
            {sets
              .filter((s) => s.isCompleted)
              .map((set) => (
                <div
                  key={set.setNumber}
                  className="flex items-center justify-between p-3 rounded-lg bg-cyber-light"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-neon-green/20 flex items-center justify-center">
                      <Check size={14} className="text-neon-green" />
                    </div>
                    <span className="text-white/80">{set.setNumber}세트</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-electric-blue">{set.actualReps}회</span>
                    {set.actualWeight && (
                      <span className="text-energy-orange">{set.actualWeight}kg</span>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Simple Rep Counter
interface RepCounterProps {
  count: number;
  target: number;
  onChange: (count: number) => void;
  label?: string;
  color?: 'blue' | 'green' | 'orange';
  className?: string;
}

export function RepCounter({
  count,
  target,
  onChange,
  label = '반복',
  color = 'blue',
  className,
}: RepCounterProps) {
  const colorClasses = {
    blue: 'text-electric-blue',
    green: 'text-neon-green',
    orange: 'text-energy-orange',
  };

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <span className="text-xs text-white/50">{label}</span>

      <div className="flex items-center gap-3">
        <button
          onClick={() => onChange(Math.max(0, count - 1))}
          className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
        >
          <Minus size={16} className="text-white" />
        </button>

        <div className="w-16 text-center">
          <span className={cn("text-3xl font-bold", colorClasses[color])}>{count}</span>
        </div>

        <button
          onClick={() => onChange(count + 1)}
          className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
        >
          <Plus size={16} className="text-white" />
        </button>
      </div>

      <span className="text-xs text-white/30">목표: {target}</span>
    </div>
  );
}

// Timer Counter for timed exercises
interface TimerCounterProps {
  duration: number; // target duration in seconds
  elapsed: number;
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  className?: string;
}

export function TimerCounter({
  duration,
  elapsed,
  isRunning,
  onStart,
  onPause,
  onReset,
  className,
}: TimerCounterProps) {
  const progress = Math.min((elapsed / duration) * 100, 100);
  const remaining = Math.max(duration - elapsed, 0);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {/* Circular Progress */}
      <div className="relative w-40 h-40">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r="70"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="8"
            fill="none"
          />
          <motion.circle
            cx="80"
            cy="80"
            r="70"
            stroke={progress >= 100 ? '#39FF14' : '#00D9FF'}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            initial={{ strokeDasharray: 440, strokeDashoffset: 440 }}
            animate={{ strokeDashoffset: 440 - (440 * progress) / 100 }}
            style={{
              filter: `drop-shadow(0 0 8px ${progress >= 100 ? '#39FF14' : '#00D9FF'})`,
            }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-white">{formatTime(remaining)}</span>
          <span className="text-xs text-white/50">남은 시간</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onReset}
          className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center"
        >
          <RotateCcw size={20} className="text-white" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={isRunning ? onPause : onStart}
          className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center",
            isRunning
              ? "bg-power-pink shadow-glow-pink"
              : "bg-electric-blue shadow-glow-blue"
          )}
        >
          {isRunning ? (
            <Pause size={28} className="text-white" />
          ) : (
            <Play size={28} className="text-white ml-1" fill="white" />
          )}
        </motion.button>

        <div className="w-12" /> {/* Spacer for alignment */}
      </div>
    </div>
  );
}
