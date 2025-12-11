'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

interface RepState {
  position: 'up' | 'down' | 'neutral';
  lastPosition: 'up' | 'down' | 'neutral';
  angle: number;
}

interface UseRepCounterOptions {
  exercise: 'squat' | 'pushup' | 'curl' | 'deadlift' | 'lunge' | 'custom';
  targetReps?: number;
  upThreshold?: number;
  downThreshold?: number;
  onRepComplete?: (repCount: number) => void;
  onSetComplete?: (totalReps: number) => void;
  onFormWarning?: (warning: string) => void;
}

interface UseRepCounterReturn {
  repCount: number;
  currentPosition: RepState['position'];
  currentAngle: number;
  progress: number;
  formScore: number;
  lastWarning: string | null;
  isCountingDown: boolean;
  countdownValue: number;
  updateAngle: (angle: number) => void;
  reset: () => void;
  startCountdown: (seconds?: number) => void;
  addRep: () => void;
  subtractRep: () => void;
}

// Exercise-specific thresholds
const exerciseThresholds = {
  squat: { up: 160, down: 90 },
  pushup: { up: 160, down: 90 },
  curl: { up: 160, down: 50 },
  deadlift: { up: 170, down: 100 },
  lunge: { up: 160, down: 90 },
  custom: { up: 160, down: 90 },
};

export default function useRepCounter(
  options: UseRepCounterOptions
): UseRepCounterReturn {
  const {
    exercise,
    targetReps = 0,
    upThreshold = exerciseThresholds[exercise]?.up || 160,
    downThreshold = exerciseThresholds[exercise]?.down || 90,
    onRepComplete,
    onSetComplete,
    onFormWarning,
  } = options;

  const [repCount, setRepCount] = useState(0);
  const [formScore, setFormScore] = useState(100);
  const [lastWarning, setLastWarning] = useState<string | null>(null);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [countdownValue, setCountdownValue] = useState(0);

  const stateRef = useRef<RepState>({
    position: 'neutral',
    lastPosition: 'neutral',
    angle: 180,
  });

  const formHistoryRef = useRef<number[]>([]);
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate form score based on angle history
  const calculateFormScore = useCallback(() => {
    const history = formHistoryRef.current;
    if (history.length === 0) return 100;

    // Check for consistency in rep execution
    const variations = history
      .slice(-10)
      .reduce((acc, val, i, arr) => {
        if (i === 0) return acc;
        return acc + Math.abs(val - arr[i - 1]);
      }, 0);

    const consistency = Math.max(0, 100 - variations);
    return Math.round(consistency);
  }, []);

  // Check form and generate warnings
  const checkForm = useCallback(
    (angle: number, position: RepState['position']) => {
      let warning: string | null = null;

      switch (exercise) {
        case 'squat':
          if (position === 'down' && angle > downThreshold + 20) {
            warning = '더 깊이 스쿼트하세요';
          }
          break;
        case 'pushup':
          if (position === 'down' && angle > downThreshold + 15) {
            warning = '팔꿈치를 더 굽히세요';
          }
          break;
        case 'curl':
          if (position === 'up' && angle < upThreshold - 10) {
            warning = '팔을 완전히 펴세요';
          }
          break;
        case 'deadlift':
          if (position === 'up' && angle < upThreshold - 5) {
            warning = '허리를 완전히 펴세요';
          }
          break;
      }

      if (warning) {
        setLastWarning(warning);
        onFormWarning?.(warning);
        setTimeout(() => setLastWarning(null), 2000);
      }
    },
    [exercise, downThreshold, upThreshold, onFormWarning]
  );

  // Update angle and detect reps
  const updateAngle = useCallback(
    (angle: number) => {
      const state = stateRef.current;
      state.angle = angle;
      formHistoryRef.current.push(angle);

      // Keep only last 100 angles
      if (formHistoryRef.current.length > 100) {
        formHistoryRef.current.shift();
      }

      // Determine position based on angle
      let newPosition: RepState['position'] = 'neutral';
      if (angle >= upThreshold) {
        newPosition = 'up';
      } else if (angle <= downThreshold) {
        newPosition = 'down';
      }

      // Detect rep completion (down -> up transition)
      if (state.lastPosition === 'down' && newPosition === 'up') {
        const newRepCount = repCount + 1;
        setRepCount(newRepCount);
        onRepComplete?.(newRepCount);

        // Check if set is complete
        if (targetReps > 0 && newRepCount >= targetReps) {
          onSetComplete?.(newRepCount);
        }

        // Update form score
        setFormScore(calculateFormScore());
      }

      // Check form
      if (newPosition !== 'neutral') {
        checkForm(angle, newPosition);
      }

      state.lastPosition = state.position;
      state.position = newPosition;
    },
    [
      repCount,
      upThreshold,
      downThreshold,
      targetReps,
      onRepComplete,
      onSetComplete,
      calculateFormScore,
      checkForm,
    ]
  );

  // Reset counter
  const reset = useCallback(() => {
    setRepCount(0);
    setFormScore(100);
    setLastWarning(null);
    formHistoryRef.current = [];
    stateRef.current = {
      position: 'neutral',
      lastPosition: 'neutral',
      angle: 180,
    };
  }, []);

  // Start countdown before tracking
  const startCountdown = useCallback((seconds = 3) => {
    setIsCountingDown(true);
    setCountdownValue(seconds);

    const tick = () => {
      setCountdownValue((prev) => {
        if (prev <= 1) {
          setIsCountingDown(false);
          return 0;
        }
        countdownTimerRef.current = setTimeout(tick, 1000);
        return prev - 1;
      });
    };

    countdownTimerRef.current = setTimeout(tick, 1000);
  }, []);

  // Manual rep adjustment
  const addRep = useCallback(() => {
    const newCount = repCount + 1;
    setRepCount(newCount);
    onRepComplete?.(newCount);
  }, [repCount, onRepComplete]);

  const subtractRep = useCallback(() => {
    setRepCount((prev) => Math.max(0, prev - 1));
  }, []);

  // Cleanup countdown timer
  useEffect(() => {
    return () => {
      if (countdownTimerRef.current) {
        clearTimeout(countdownTimerRef.current);
      }
    };
  }, []);

  // Calculate progress
  const progress = targetReps > 0 ? (repCount / targetReps) * 100 : 0;

  return {
    repCount,
    currentPosition: stateRef.current.position,
    currentAngle: stateRef.current.angle,
    progress,
    formScore,
    lastWarning,
    isCountingDown,
    countdownValue,
    updateAngle,
    reset,
    startCountdown,
    addRep,
    subtractRep,
  };
}

// Utility to get exercise display name
export function getExerciseDisplayName(
  exercise: UseRepCounterOptions['exercise']
): string {
  const names: Record<UseRepCounterOptions['exercise'], string> = {
    squat: '스쿼트',
    pushup: '푸시업',
    curl: '덤벨 컬',
    deadlift: '데드리프트',
    lunge: '런지',
    custom: '커스텀',
  };
  return names[exercise];
}
