'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

export interface PoseLandmark {
  x: number;
  y: number;
  z: number;
  visibility: number;
}

export interface PoseResults {
  poseLandmarks: PoseLandmark[];
  timestamp: number;
}

// MediaPipe Pose Landmark indices
export const POSE_LANDMARKS = {
  NOSE: 0,
  LEFT_EYE_INNER: 1,
  LEFT_EYE: 2,
  LEFT_EYE_OUTER: 3,
  RIGHT_EYE_INNER: 4,
  RIGHT_EYE: 5,
  RIGHT_EYE_OUTER: 6,
  LEFT_EAR: 7,
  RIGHT_EAR: 8,
  MOUTH_LEFT: 9,
  MOUTH_RIGHT: 10,
  LEFT_SHOULDER: 11,
  RIGHT_SHOULDER: 12,
  LEFT_ELBOW: 13,
  RIGHT_ELBOW: 14,
  LEFT_WRIST: 15,
  RIGHT_WRIST: 16,
  LEFT_PINKY: 17,
  RIGHT_PINKY: 18,
  LEFT_INDEX: 19,
  RIGHT_INDEX: 20,
  LEFT_THUMB: 21,
  RIGHT_THUMB: 22,
  LEFT_HIP: 23,
  RIGHT_HIP: 24,
  LEFT_KNEE: 25,
  RIGHT_KNEE: 26,
  LEFT_ANKLE: 27,
  RIGHT_ANKLE: 28,
  LEFT_HEEL: 29,
  RIGHT_HEEL: 30,
  LEFT_FOOT_INDEX: 31,
  RIGHT_FOOT_INDEX: 32,
} as const;

interface UsePoseTrackingOptions {
  onPoseDetected?: (results: PoseResults) => void;
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
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  startTracking: () => Promise<void>;
  stopTracking: () => void;
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
    onPoseDetected,
    onError,
    modelComplexity = 1,
    smoothLandmarks = true,
    minDetectionConfidence = 0.5,
    minTrackingConfidence = 0.5,
  } = options;

  const [isLoading, setIsLoading] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPose, setCurrentPose] = useState<PoseResults | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const poseRef = useRef<any>(null);

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

  // Process video frame (simplified - in production use MediaPipe)
  const processFrame = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || !isTracking) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Draw video frame
    ctx.drawImage(
      videoRef.current,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    // In production, MediaPipe would process here and return landmarks
    // For demo, we'll simulate pose detection
    if (Math.random() > 0.8) {
      // Simulate detected pose
      const mockPose: PoseResults = {
        poseLandmarks: Array(33)
          .fill(null)
          .map(() => ({
            x: Math.random(),
            y: Math.random(),
            z: Math.random() * 0.1,
            visibility: 0.9 + Math.random() * 0.1,
          })),
        timestamp: Date.now(),
      };

      setCurrentPose(mockPose);
      onPoseDetected?.(mockPose);
    }

    animationFrameRef.current = requestAnimationFrame(processFrame);
  }, [isTracking, onPoseDetected]);

  // Start tracking
  const startTracking = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

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
      animationFrameRef.current = requestAnimationFrame(processFrame);
    } catch (err) {
      const message = err instanceof Error ? err.message : '카메라 접근 실패';
      setError(message);
      onError?.(message);
    } finally {
      setIsLoading(false);
    }
  }, [processFrame, onError]);

  // Stop tracking
  const stopTracking = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    setIsTracking(false);
    setCurrentPose(null);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopTracking();
    };
  }, [stopTracking]);

  return {
    isLoading,
    isTracking,
    error,
    currentPose,
    videoRef,
    canvasRef,
    startTracking,
    stopTracking,
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
