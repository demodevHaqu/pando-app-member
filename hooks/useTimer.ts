'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

type TimerMode = 'countdown' | 'stopwatch';
type TimerStatus = 'idle' | 'running' | 'paused' | 'completed';

interface UseTimerOptions {
  mode?: TimerMode;
  initialTime?: number; // seconds
  autoStart?: boolean;
  onTick?: (time: number) => void;
  onComplete?: () => void;
  onMilestone?: (time: number, milestone: number) => void;
  milestones?: number[]; // seconds
}

interface UseTimerReturn {
  time: number;
  displayTime: string;
  status: TimerStatus;
  progress: number;
  mode: TimerMode;
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  setTime: (seconds: number) => void;
  addTime: (seconds: number) => void;
  subtractTime: (seconds: number) => void;
  toggleMode: () => void;
}

// Format seconds to MM:SS or HH:MM:SS
function formatTime(seconds: number, showHours = false): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const pad = (n: number) => n.toString().padStart(2, '0');

  if (showHours || hrs > 0) {
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  }
  return `${pad(mins)}:${pad(secs)}`;
}

export default function useTimer(
  options: UseTimerOptions = {}
): UseTimerReturn {
  const {
    mode: initialMode = 'countdown',
    initialTime = 60,
    autoStart = false,
    onTick,
    onComplete,
    onMilestone,
    milestones = [],
  } = options;

  const [time, setTimeState] = useState(initialMode === 'countdown' ? initialTime : 0);
  const [status, setStatus] = useState<TimerStatus>('idle');
  const [mode, setMode] = useState<TimerMode>(initialMode);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(initialTime);
  const passedMilestonesRef = useRef<Set<number>>(new Set());

  // Calculate progress (for countdown mode)
  const progress = mode === 'countdown' && startTimeRef.current > 0
    ? ((startTimeRef.current - time) / startTimeRef.current) * 100
    : 0;

  // Format display time
  const displayTime = formatTime(time, time >= 3600);

  // Tick function
  const tick = useCallback(() => {
    setTimeState((prevTime) => {
      const newTime = mode === 'countdown' ? prevTime - 1 : prevTime + 1;

      // Call onTick
      onTick?.(newTime);

      // Check milestones
      if (milestones.length > 0) {
        const checkTime = mode === 'countdown' ? newTime : newTime;
        if (milestones.includes(checkTime) && !passedMilestonesRef.current.has(checkTime)) {
          passedMilestonesRef.current.add(checkTime);
          onMilestone?.(newTime, checkTime);
        }
      }

      // Check completion
      if (mode === 'countdown' && newTime <= 0) {
        setStatus('completed');
        onComplete?.();
        return 0;
      }

      return newTime;
    });
  }, [mode, onTick, onComplete, onMilestone, milestones]);

  // Start timer
  const start = useCallback(() => {
    if (status === 'running') return;

    // Reset milestones tracking
    passedMilestonesRef.current.clear();

    setStatus('running');
    intervalRef.current = setInterval(tick, 1000);
  }, [status, tick]);

  // Pause timer
  const pause = useCallback(() => {
    if (status !== 'running') return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setStatus('paused');
  }, [status]);

  // Resume timer
  const resume = useCallback(() => {
    if (status !== 'paused') return;

    setStatus('running');
    intervalRef.current = setInterval(tick, 1000);
  }, [status, tick]);

  // Reset timer
  const reset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTimeState(mode === 'countdown' ? startTimeRef.current : 0);
    setStatus('idle');
    passedMilestonesRef.current.clear();
  }, [mode]);

  // Set time
  const setTime = useCallback((seconds: number) => {
    const newTime = Math.max(0, seconds);
    setTimeState(newTime);
    if (mode === 'countdown') {
      startTimeRef.current = newTime;
    }
  }, [mode]);

  // Add time
  const addTime = useCallback((seconds: number) => {
    setTimeState((prev) => {
      const newTime = prev + seconds;
      if (mode === 'countdown') {
        startTimeRef.current = Math.max(startTimeRef.current, newTime);
      }
      return newTime;
    });
  }, [mode]);

  // Subtract time
  const subtractTime = useCallback((seconds: number) => {
    setTimeState((prev) => Math.max(0, prev - seconds));
  }, []);

  // Toggle mode
  const toggleMode = useCallback(() => {
    const wasRunning = status === 'running';
    if (wasRunning) {
      pause();
    }

    setMode((prev) => {
      const newMode = prev === 'countdown' ? 'stopwatch' : 'countdown';
      setTimeState(newMode === 'countdown' ? startTimeRef.current : 0);
      return newMode;
    });

    setStatus('idle');
    passedMilestonesRef.current.clear();
  }, [status, pause]);

  // Auto-start
  useEffect(() => {
    if (autoStart) {
      start();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []); // Intentionally empty to run once

  // Update start time reference when initialTime changes
  useEffect(() => {
    if (status === 'idle' && mode === 'countdown') {
      startTimeRef.current = initialTime;
      setTimeState(initialTime);
    }
  }, [initialTime, status, mode]);

  return {
    time,
    displayTime,
    status,
    progress,
    mode,
    start,
    pause,
    resume,
    reset,
    setTime,
    addTime,
    subtractTime,
    toggleMode,
  };
}

// Preset timer configurations
export const TIMER_PRESETS = {
  rest30: { mode: 'countdown' as TimerMode, initialTime: 30 },
  rest60: { mode: 'countdown' as TimerMode, initialTime: 60 },
  rest90: { mode: 'countdown' as TimerMode, initialTime: 90 },
  rest120: { mode: 'countdown' as TimerMode, initialTime: 120 },
  tabata: { mode: 'countdown' as TimerMode, initialTime: 20, milestones: [10, 5, 3, 2, 1] },
  hiit30: { mode: 'countdown' as TimerMode, initialTime: 30, milestones: [10, 5] },
  hiit45: { mode: 'countdown' as TimerMode, initialTime: 45, milestones: [15, 10, 5] },
  workout: { mode: 'stopwatch' as TimerMode },
};

// Utility to format time for display
export function formatTimerDisplay(seconds: number): {
  minutes: string;
  seconds: string;
  total: string
} {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return {
    minutes: mins.toString().padStart(2, '0'),
    seconds: secs.toString().padStart(2, '0'),
    total: formatTime(seconds),
  };
}
