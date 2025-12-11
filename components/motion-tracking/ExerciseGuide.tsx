'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Play, Pause, SkipForward, RotateCcw, Volume2, VolumeX, ChevronLeft, ChevronRight, AlertCircle, CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button';

interface GuideStep {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  duration?: number; // seconds
  tips?: string[];
  warnings?: string[];
}

interface ExerciseGuideProps {
  exerciseName: string;
  targetMuscle: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  steps: GuideStep[];
  videoUrl?: string;
  thumbnailUrl?: string;
  onStart?: () => void;
  onComplete?: () => void;
  className?: string;
}

export default function ExerciseGuide({
  exerciseName,
  targetMuscle,
  difficulty,
  steps,
  videoUrl,
  thumbnailUrl,
  onStart,
  onComplete,
  className,
}: ExerciseGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showSteps, setShowSteps] = useState(true);

  const step = steps[currentStep];

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete?.();
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Video/Image Section */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-cyber-dark border border-white/10">
        {videoUrl || step?.videoUrl ? (
          <video
            src={videoUrl || step?.videoUrl}
            poster={thumbnailUrl || step?.imageUrl}
            className="w-full h-full object-cover"
            loop
            muted={isMuted}
            playsInline
            autoPlay={isPlaying}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {thumbnailUrl || step?.imageUrl ? (
              <img
                src={thumbnailUrl || step?.imageUrl}
                alt={exerciseName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-white/20 text-center">
                <Play size={48} className="mx-auto mb-2" />
                <p>영상 없음</p>
              </div>
            )}
          </div>
        )}

        {/* Video Controls Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
              >
                {isPlaying ? (
                  <Pause size={18} className="text-white" />
                ) : (
                  <Play size={18} className="text-white ml-0.5" fill="white" />
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMuted(!isMuted)}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
              >
                {isMuted ? (
                  <VolumeX size={18} className="text-white" />
                ) : (
                  <Volume2 size={18} className="text-white" />
                )}
              </motion.button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-white/80 text-sm">
                {currentStep + 1} / {steps.length}
              </span>
            </div>
          </div>
        </div>

        {/* Exercise Info Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm font-medium">
            {exerciseName}
          </span>
          <span className="px-2 py-1 rounded-full bg-electric-blue/20 backdrop-blur-sm text-electric-blue text-xs">
            {targetMuscle}
          </span>
        </div>
      </div>

      {/* Step Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={goToPrevStep}
          disabled={currentStep === 0}
        >
          <ChevronLeft size={18} />
          이전
        </Button>

        <div className="flex gap-1">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                index === currentStep
                  ? "bg-electric-blue w-6"
                  : index < currentStep
                    ? "bg-neon-green"
                    : "bg-white/20"
              )}
            />
          ))}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={goToNextStep}
        >
          {currentStep === steps.length - 1 ? '완료' : '다음'}
          <ChevronRight size={18} />
        </Button>
      </div>

      {/* Current Step Details */}
      <AnimatePresence mode="wait">
        {step && showSteps && (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* Step Title */}
            <div className="p-4 rounded-xl bg-cyber-mid border border-white/10">
              <h3 className="text-lg font-bold text-white mb-2">
                {currentStep + 1}. {step.title}
              </h3>
              <p className="text-white/70">{step.description}</p>
            </div>

            {/* Tips */}
            {step.tips && step.tips.length > 0 && (
              <div className="p-4 rounded-xl bg-neon-green/10 border border-neon-green/30">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle size={18} className="text-neon-green" />
                  <h4 className="font-semibold text-neon-green">팁</h4>
                </div>
                <ul className="space-y-1">
                  {step.tips.map((tip, index) => (
                    <li key={index} className="text-white/70 text-sm flex items-start gap-2">
                      <span className="text-neon-green">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Warnings */}
            {step.warnings && step.warnings.length > 0 && (
              <div className="p-4 rounded-xl bg-power-pink/10 border border-power-pink/30">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle size={18} className="text-power-pink" />
                  <h4 className="font-semibold text-power-pink">주의사항</h4>
                </div>
                <ul className="space-y-1">
                  {step.warnings.map((warning, index) => (
                    <li key={index} className="text-white/70 text-sm flex items-start gap-2">
                      <span className="text-power-pink">•</span>
                      {warning}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Steps Button */}
      <button
        onClick={() => setShowSteps(!showSteps)}
        className="w-full py-2 text-sm text-white/50 hover:text-white transition-colors"
      >
        {showSteps ? '가이드 접기' : '가이드 펼치기'}
      </button>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          variant="ghost"
          className="flex-1"
          onClick={() => setCurrentStep(0)}
        >
          <RotateCcw size={18} />
          처음부터
        </Button>
        <Button
          variant="energy"
          className="flex-1"
          onClick={onStart}
          shine
        >
          <Play size={18} fill="white" />
          운동 시작
        </Button>
      </div>
    </div>
  );
}

// Compact Exercise Guide (for inline usage)
interface ExerciseGuideCompactProps {
  exerciseName: string;
  description: string;
  tips?: string[];
  imageUrl?: string;
  className?: string;
}

export function ExerciseGuideCompact({
  exerciseName,
  description,
  tips,
  imageUrl,
  className,
}: ExerciseGuideCompactProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      className={cn(
        "rounded-xl bg-cyber-mid border border-white/10 overflow-hidden",
        className
      )}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center gap-4 text-left"
      >
        {imageUrl && (
          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <img src={imageUrl} alt={exerciseName} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-white">{exerciseName}</h4>
          <p className="text-sm text-white/60 line-clamp-1">{description}</p>
        </div>
        <ChevronRight
          size={20}
          className={cn(
            "text-white/40 transition-transform",
            isExpanded && "rotate-90"
          )}
        />
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-white/10"
          >
            <div className="p-4 space-y-3">
              <p className="text-white/70 text-sm">{description}</p>

              {tips && tips.length > 0 && (
                <div className="space-y-1">
                  <h5 className="text-xs font-semibold text-electric-blue">팁</h5>
                  {tips.map((tip, index) => (
                    <p key={index} className="text-xs text-white/50 flex items-start gap-2">
                      <CheckCircle size={12} className="text-neon-green flex-shrink-0 mt-0.5" />
                      {tip}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
