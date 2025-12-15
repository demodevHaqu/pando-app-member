'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { PoseDetectionResult, PoseLandmark, POSE_LANDMARKS } from '@/types/pose-tracking';
import {
  analyzePose,
  PoseAnalysisResult,
  EXERCISE_FORMS,
} from '@/lib/pose-analyzer';

export { POSE_LANDMARKS };
export type { PoseLandmark };

// MediaPipe types
interface MediaPipePoseResults {
  poseLandmarks?: Array<{
    x: number;
    y: number;
    z: number;
    visibility: number;
  }>;
  poseWorldLandmarks?: Array<{
    x: number;
    y: number;
    z: number;
    visibility: number;
  }>;
}

interface MediaPipePose {
  setOptions: (options: {
    modelComplexity?: number;
    smoothLandmarks?: boolean;
    enableSegmentation?: boolean;
    smoothSegmentation?: boolean;
    minDetectionConfidence?: number;
    minTrackingConfidence?: number;
  }) => void;
  onResults: (callback: (results: MediaPipePoseResults) => void) => void;
  initialize: () => Promise<void>;
  send: (input: { image: HTMLVideoElement }) => Promise<void>;
  close: () => void;
}

export interface PoseResults {
  poseLandmarks: PoseLandmark[];
  timestamp: number;
}

interface UsePoseTrackingOptions {
  exerciseName?: string;
  onPoseDetected?: (results: PoseResults) => void;
  onAnalysisResult?: (result: PoseAnalysisResult) => void;
  onRepComplete?: (repCount: number) => void;
  onError?: (error: string) => void;
  modelComplexity?: 0 | 1 | 2;
  smoothLandmarks?: boolean;
  minDetectionConfidence?: number;
  minTrackingConfidence?: number;
}

interface UsePoseTrackingReturn {
  isLoading: boolean;
  isTracking: boolean;
  error: string | null;
  currentPose: PoseResults | null;
  analysisResult: PoseAnalysisResult | null;
  repCount: number;
  formScore: number;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  startTracking: () => Promise<void>;
  stopTracking: () => void;
  resetRepCount: () => void;
  setExercise: (name: string) => void;
  calculateAngle: (
    landmark1: PoseLandmark,
    landmark2: PoseLandmark,
    landmark3: PoseLandmark
  ) => number;
  getLandmark: (index: number) => PoseLandmark | null;
}

export default function usePoseTracking(
  options: UsePoseTrackingOptions = {}
): UsePoseTrackingReturn {
  const {
    exerciseName = 'squat',
    onPoseDetected,
    onAnalysisResult,
    onRepComplete,
    onError,
  } = options;

  const [isLoading, setIsLoading] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPose, setCurrentPose] = useState<PoseResults | null>(null);
  const [analysisResult, setAnalysisResult] = useState<PoseAnalysisResult | null>(null);
  const [repCount, setRepCount] = useState(0);
  const [formScore, setFormScore] = useState(100);
  const [currentExercise, setCurrentExercise] = useState(exerciseName);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const poseRef = useRef<MediaPipePose | null>(null);
  const previousPhaseRef = useRef<'idle' | 'descending' | 'bottom' | 'ascending'>('idle');
  const scoreHistoryRef = useRef<number[]>([]);

  // Calculate angle between three points
  const calculateAngle = useCallback(
    (
      landmark1: PoseLandmark,
      landmark2: PoseLandmark,
      landmark3: PoseLandmark
    ): number => {
      const radians =
        Math.atan2(landmark3.y - landmark2.y, landmark3.x - landmark2.x) -
        Math.atan2(landmark1.y - landmark2.y, landmark1.x - landmark2.x);

      let angle = Math.abs((radians * 180) / Math.PI);

      if (angle > 180) {
        angle = 360 - angle;
      }

      return angle;
    },
    []
  );

  // Get landmark by index
  const getLandmark = useCallback(
    (index: number): PoseLandmark | null => {
      if (!currentPose?.poseLandmarks) return null;
      return currentPose.poseLandmarks[index] || null;
    },
    [currentPose]
  );

  // Handle pose detection result
  const handlePoseDetected = useCallback(
    (pose: PoseDetectionResult) => {
      const poseResults: PoseResults = {
        poseLandmarks: pose.landmarks,
        timestamp: Date.now(),
      };

      setCurrentPose(poseResults);
      onPoseDetected?.(poseResults);

      // Get exercise form requirements
      const exerciseForm = EXERCISE_FORMS[currentExercise.toLowerCase()];
      if (!exerciseForm) return;

      // Analyze pose
      const result = analyzePose(pose, exerciseForm, previousPhaseRef.current);
      setAnalysisResult(result);
      onAnalysisResult?.(result);

      // Track score
      scoreHistoryRef.current.push(result.score);
      if (scoreHistoryRef.current.length > 30) {
        scoreHistoryRef.current.shift();
      }

      // Calculate average score
      const avgScore = Math.round(
        scoreHistoryRef.current.reduce((a, b) => a + b, 0) / scoreHistoryRef.current.length
      );
      setFormScore(avgScore);

      // Track rep completion
      if (result.repCompleted) {
        setRepCount((prev) => {
          const newCount = prev + 1;
          onRepComplete?.(newCount);
          return newCount;
        });
      }

      // Update phase
      previousPhaseRef.current = result.phase;
    },
    [currentExercise, onPoseDetected, onAnalysisResult, onRepComplete]
  );

  // Load MediaPipe
  const loadMediaPipe = useCallback(async () => {
    try {
      const { Pose } = await import('@mediapipe/pose');

      const pose = new Pose({
        locateFile: (file: string) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
        },
      }) as unknown as MediaPipePose;

      pose.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        smoothSegmentation: false,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      pose.onResults((results: MediaPipePoseResults) => {
        if (results.poseLandmarks) {
          const landmarks: PoseLandmark[] = results.poseLandmarks.map((lm) => ({
            x: lm.x,
            y: lm.y,
            z: lm.z,
            visibility: lm.visibility,
          }));

          const worldLandmarks = results.poseWorldLandmarks?.map((lm) => ({
            x: lm.x,
            y: lm.y,
            z: lm.z,
            visibility: lm.visibility,
          }));

          handlePoseDetected({
            landmarks,
            worldLandmarks,
          });
        }
      });

      await pose.initialize();
      poseRef.current = pose;
      return pose;
    } catch (err) {
      console.error('MediaPipe 로딩 실패:', err);
      throw new Error('모션 분석 모델을 로드할 수 없습니다');
    }
  }, [handlePoseDetected]);

  // Process video frame
  const processFrame = useCallback(async () => {
    if (!poseRef.current || !videoRef.current || !isTracking) return;

    try {
      await poseRef.current.send({ image: videoRef.current });
    } catch (err) {
      console.error('프레임 처리 오류:', err);
    }

    if (isTracking) {
      requestAnimationFrame(processFrame);
    }
  }, [isTracking]);

  // Start tracking
  const startTracking = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Load MediaPipe if not loaded
      if (!poseRef.current) {
        await loadMediaPipe();
      }

      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();

        // Set canvas size to match video
        if (canvasRef.current) {
          canvasRef.current.width = videoRef.current.videoWidth;
          canvasRef.current.height = videoRef.current.videoHeight;
        }
      }

      setIsTracking(true);

      // Start processing frames
      requestAnimationFrame(processFrame);
    } catch (err) {
      const message = err instanceof Error ? err.message : '카메라 접근 실패';
      setError(message);
      onError?.(message);
    } finally {
      setIsLoading(false);
    }
  }, [loadMediaPipe, processFrame, onError]);

  // Stop tracking
  const stopTracking = useCallback(() => {
    setIsTracking(false);

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    setCurrentPose(null);
  }, []);

  // Reset rep count
  const resetRepCount = useCallback(() => {
    setRepCount(0);
    previousPhaseRef.current = 'idle';
    scoreHistoryRef.current = [];
    setFormScore(100);
  }, []);

  // Set exercise
  const setExercise = useCallback((name: string) => {
    setCurrentExercise(name);
    resetRepCount();
  }, [resetRepCount]);

  // Start frame processing when tracking
  useEffect(() => {
    if (isTracking && poseRef.current) {
      processFrame();
    }
  }, [isTracking, processFrame]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopTracking();
      if (poseRef.current) {
        poseRef.current.close();
      }
    };
  }, [stopTracking]);

  return {
    isLoading,
    isTracking,
    error,
    currentPose,
    analysisResult,
    repCount,
    formScore,
    videoRef,
    canvasRef,
    startTracking,
    stopTracking,
    resetRepCount,
    setExercise,
    calculateAngle,
    getLandmark,
  };
}

// Utility functions for pose analysis
export function isLandmarkVisible(
  landmark: PoseLandmark | null,
  threshold = 0.5
): boolean {
  return landmark !== null && landmark.visibility >= threshold;
}

export function calculateDistance(
  landmark1: PoseLandmark,
  landmark2: PoseLandmark
): number {
  const dx = landmark1.x - landmark2.x;
  const dy = landmark1.y - landmark2.y;
  const dz = landmark1.z - landmark2.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

export function getMidpoint(
  landmark1: PoseLandmark,
  landmark2: PoseLandmark
): PoseLandmark {
  return {
    x: (landmark1.x + landmark2.x) / 2,
    y: (landmark1.y + landmark2.y) / 2,
    z: (landmark1.z + landmark2.z) / 2,
    visibility: Math.min(landmark1.visibility, landmark2.visibility),
  };
}
