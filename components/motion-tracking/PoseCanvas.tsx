'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, CameraOff, RefreshCw, Maximize, Minimize } from 'lucide-react';
import { PoseLandmark, PoseDetectionResult } from '@/types/pose-tracking';

// MediaPipe types
interface MediaPipeLandmark {
  x: number;
  y: number;
  z?: number;
  visibility?: number;
}

interface MediaPipePoseResults {
  poseLandmarks?: MediaPipeLandmark[];
  poseWorldLandmarks?: MediaPipeLandmark[];
}

interface MediaPipePoseOptions {
  modelComplexity?: number;
  smoothLandmarks?: boolean;
  enableSegmentation?: boolean;
  smoothSegmentation?: boolean;
  minDetectionConfidence?: number;
  minTrackingConfidence?: number;
}

interface MediaPipePose {
  setOptions: (options: MediaPipePoseOptions) => void;
  onResults: (callback: (results: MediaPipePoseResults) => void) => void;
  send: (input: { image: HTMLVideoElement }) => Promise<void>;
}

interface MediaPipePoseConstructor {
  new (config: { locateFile: (file: string) => string }): MediaPipePose;
}

interface MediaPipeCamera {
  start: () => Promise<void>;
  stop: () => void;
}

interface MediaPipeCameraConstructor {
  new (
    video: HTMLVideoElement,
    options: {
      onFrame: () => Promise<void>;
      width: number;
      height: number;
    }
  ): MediaPipeCamera;
}

declare global {
  interface Window {
    Pose: MediaPipePoseConstructor;
    Camera: MediaPipeCameraConstructor;
  }
}

interface PoseCanvasProps {
  onPoseDetected?: (pose: PoseDetectionResult) => void;
  onError?: (error: string) => void;
  showSkeleton?: boolean;
  showVideo?: boolean;
  mirrorMode?: boolean;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

// MediaPipe Pose landmark indices
const POSE_LANDMARKS = {
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
};

// Body skeleton connections
const POSE_CONNECTIONS = [
  // Face
  [POSE_LANDMARKS.LEFT_EAR, POSE_LANDMARKS.LEFT_EYE],
  [POSE_LANDMARKS.LEFT_EYE, POSE_LANDMARKS.NOSE],
  [POSE_LANDMARKS.NOSE, POSE_LANDMARKS.RIGHT_EYE],
  [POSE_LANDMARKS.RIGHT_EYE, POSE_LANDMARKS.RIGHT_EAR],
  // Upper body
  [POSE_LANDMARKS.LEFT_SHOULDER, POSE_LANDMARKS.RIGHT_SHOULDER],
  [POSE_LANDMARKS.LEFT_SHOULDER, POSE_LANDMARKS.LEFT_ELBOW],
  [POSE_LANDMARKS.LEFT_ELBOW, POSE_LANDMARKS.LEFT_WRIST],
  [POSE_LANDMARKS.RIGHT_SHOULDER, POSE_LANDMARKS.RIGHT_ELBOW],
  [POSE_LANDMARKS.RIGHT_ELBOW, POSE_LANDMARKS.RIGHT_WRIST],
  // Hands
  [POSE_LANDMARKS.LEFT_WRIST, POSE_LANDMARKS.LEFT_PINKY],
  [POSE_LANDMARKS.LEFT_WRIST, POSE_LANDMARKS.LEFT_INDEX],
  [POSE_LANDMARKS.LEFT_WRIST, POSE_LANDMARKS.LEFT_THUMB],
  [POSE_LANDMARKS.LEFT_PINKY, POSE_LANDMARKS.LEFT_INDEX],
  [POSE_LANDMARKS.RIGHT_WRIST, POSE_LANDMARKS.RIGHT_PINKY],
  [POSE_LANDMARKS.RIGHT_WRIST, POSE_LANDMARKS.RIGHT_INDEX],
  [POSE_LANDMARKS.RIGHT_WRIST, POSE_LANDMARKS.RIGHT_THUMB],
  [POSE_LANDMARKS.RIGHT_PINKY, POSE_LANDMARKS.RIGHT_INDEX],
  // Torso
  [POSE_LANDMARKS.LEFT_SHOULDER, POSE_LANDMARKS.LEFT_HIP],
  [POSE_LANDMARKS.RIGHT_SHOULDER, POSE_LANDMARKS.RIGHT_HIP],
  [POSE_LANDMARKS.LEFT_HIP, POSE_LANDMARKS.RIGHT_HIP],
  // Legs
  [POSE_LANDMARKS.LEFT_HIP, POSE_LANDMARKS.LEFT_KNEE],
  [POSE_LANDMARKS.LEFT_KNEE, POSE_LANDMARKS.LEFT_ANKLE],
  [POSE_LANDMARKS.RIGHT_HIP, POSE_LANDMARKS.RIGHT_KNEE],
  [POSE_LANDMARKS.RIGHT_KNEE, POSE_LANDMARKS.RIGHT_ANKLE],
  // Feet
  [POSE_LANDMARKS.LEFT_ANKLE, POSE_LANDMARKS.LEFT_HEEL],
  [POSE_LANDMARKS.LEFT_ANKLE, POSE_LANDMARKS.LEFT_FOOT_INDEX],
  [POSE_LANDMARKS.LEFT_HEEL, POSE_LANDMARKS.LEFT_FOOT_INDEX],
  [POSE_LANDMARKS.RIGHT_ANKLE, POSE_LANDMARKS.RIGHT_HEEL],
  [POSE_LANDMARKS.RIGHT_ANKLE, POSE_LANDMARKS.RIGHT_FOOT_INDEX],
  [POSE_LANDMARKS.RIGHT_HEEL, POSE_LANDMARKS.RIGHT_FOOT_INDEX],
];

// Colors for different body parts
const getLineColor = (startIdx: number, endIdx: number): string => {
  // Face - cyan
  if (startIdx <= 10 && endIdx <= 10) return '#00D9FF';
  // Left side - orange
  if ([11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31].includes(startIdx)) return '#FF6B35';
  // Right side - green
  if ([12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32].includes(startIdx)) return '#39FF14';
  // Center (shoulders, hips) - pink
  return '#FF006E';
};

const getPointColor = (idx: number): string => {
  // Face - cyan
  if (idx <= 10) return '#00D9FF';
  // Left side - orange
  if ([11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31].includes(idx)) return '#FF6B35';
  // Right side - green
  if ([12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32].includes(idx)) return '#39FF14';
  return '#FFFFFF';
};

export default function PoseCanvas({
  onPoseDetected,
  onError,
  showSkeleton = true,
  showVideo = true,
  mirrorMode = true,
  width = 640,
  height = 480,
  style = {},
}: PoseCanvasProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const poseRef = useRef<MediaPipePose | null>(null);
  const cameraRef = useRef<MediaPipeCamera | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [poseDetected, setPoseDetected] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState('');

  // Draw pose landmarks
  const drawPoseLandmarks = useCallback((
    ctx: CanvasRenderingContext2D,
    landmarks: MediaPipeLandmark[],
    canvasWidth: number,
    canvasHeight: number
  ) => {
    if (!showSkeleton) return;

    // Draw connections
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    POSE_CONNECTIONS.forEach(([startIdx, endIdx]) => {
      const start = landmarks[startIdx];
      const end = landmarks[endIdx];

      if (start && end && (start.visibility ?? 0) > 0.5 && (end.visibility ?? 0) > 0.5) {
        const color = getLineColor(startIdx, endIdx);

        ctx.strokeStyle = color;
        ctx.lineWidth = 4;
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;

        ctx.beginPath();
        ctx.moveTo(start.x * canvasWidth, start.y * canvasHeight);
        ctx.lineTo(end.x * canvasWidth, end.y * canvasHeight);
        ctx.stroke();
      }
    });

    ctx.shadowBlur = 0;

    // Draw landmarks
    landmarks.forEach((landmark, idx) => {
      if ((landmark.visibility ?? 0) > 0.5) {
        const x = landmark.x * canvasWidth;
        const y = landmark.y * canvasHeight;
        const color = getPointColor(idx);

        // Major joints are bigger
        const isMajorJoint = [
          POSE_LANDMARKS.NOSE,
          POSE_LANDMARKS.LEFT_SHOULDER, POSE_LANDMARKS.RIGHT_SHOULDER,
          POSE_LANDMARKS.LEFT_ELBOW, POSE_LANDMARKS.RIGHT_ELBOW,
          POSE_LANDMARKS.LEFT_WRIST, POSE_LANDMARKS.RIGHT_WRIST,
          POSE_LANDMARKS.LEFT_HIP, POSE_LANDMARKS.RIGHT_HIP,
          POSE_LANDMARKS.LEFT_KNEE, POSE_LANDMARKS.RIGHT_KNEE,
          POSE_LANDMARKS.LEFT_ANKLE, POSE_LANDMARKS.RIGHT_ANKLE,
        ].includes(idx);

        const radius = isMajorJoint ? 8 : 4;

        // Colored dot with glow
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 12;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();

        ctx.shadowBlur = 0;

        // White center for major joints
        if (isMajorJoint) {
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
    });

    // Draw body part labels for key joints
    const labelPositions = [
      { idx: POSE_LANDMARKS.NOSE, label: '머리' },
      { idx: POSE_LANDMARKS.LEFT_SHOULDER, label: '왼어깨' },
      { idx: POSE_LANDMARKS.RIGHT_SHOULDER, label: '오른어깨' },
      { idx: POSE_LANDMARKS.LEFT_HIP, label: '왼엉덩이' },
      { idx: POSE_LANDMARKS.RIGHT_HIP, label: '오른엉덩이' },
    ];

    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';

    labelPositions.forEach(({ idx, label }) => {
      const landmark = landmarks[idx];
      if (landmark && (landmark.visibility ?? 0) > 0.7) {
        const x = landmark.x * canvasWidth;
        const y = landmark.y * canvasHeight;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.fillRect(x - 25, y - 22, 50, 14);

        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(label, x, y - 12);
      }
    });
  }, [showSkeleton]);

  // Handle MediaPipe results
  const onResults = useCallback((results: MediaPipePoseResults) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (results.poseLandmarks && results.poseLandmarks.length > 0) {
      setPoseDetected(true);
      drawPoseLandmarks(ctx, results.poseLandmarks, canvas.width, canvas.height);

      // Callback with landmarks
      const poseLandmarks: PoseLandmark[] = results.poseLandmarks.map((lm: MediaPipeLandmark) => ({
        x: lm.x,
        y: lm.y,
        z: lm.z || 0,
        visibility: lm.visibility || 0,
      }));

      const worldLandmarks: PoseLandmark[] = results.poseWorldLandmarks
        ? results.poseWorldLandmarks.map((lm: MediaPipeLandmark) => ({
            x: lm.x,
            y: lm.y,
            z: lm.z || 0,
            visibility: lm.visibility || 0,
          }))
        : poseLandmarks;

      onPoseDetected?.({
        landmarks: poseLandmarks,
        worldLandmarks,
      });
    } else {
      setPoseDetected(false);
    }

    ctx.restore();
    setIsLoading(false);
  }, [drawPoseLandmarks, onPoseDetected]);

  // Load scripts
  const loadScripts = useCallback((): Promise<void> => {
    return new Promise((resolve) => {
      if (window.Pose && window.Camera) {
        resolve();
        return;
      }

      let scriptsLoaded = 0;
      const checkLoaded = () => {
        scriptsLoaded++;
        if (scriptsLoaded === 2) {
          resolve();
        }
      };

      // Load camera utils
      if (!document.querySelector('script[src*="camera_utils"]')) {
        const cameraScript = document.createElement('script');
        cameraScript.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js';
        cameraScript.crossOrigin = 'anonymous';
        cameraScript.onload = checkLoaded;
        document.head.appendChild(cameraScript);
      } else {
        checkLoaded();
      }

      // Load pose
      if (!document.querySelector('script[src*="mediapipe/pose"]')) {
        const poseScript = document.createElement('script');
        poseScript.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose.js';
        poseScript.crossOrigin = 'anonymous';
        poseScript.onload = checkLoaded;
        document.head.appendChild(poseScript);
      } else {
        checkLoaded();
      }
    });
  }, []);

  // Initialize pose tracking
  const initCamera = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;

    try {
      setIsLoading(true);
      setError(null);
      setLoadingStatus('스크립트 로딩 중...');

      await loadScripts();
      await new Promise(resolve => setTimeout(resolve, 500));

      if (!window.Pose || !window.Camera) {
        throw new Error('MediaPipe 로딩 실패');
      }

      setLoadingStatus('AI 모델 초기화 중...');

      const pose = new window.Pose({
        locateFile: (file: string) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
        },
      });

      pose.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        smoothSegmentation: false,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      pose.onResults(onResults);
      poseRef.current = pose;

      setLoadingStatus('카메라 연결 중...');

      const camera = new window.Camera(videoRef.current, {
        onFrame: async () => {
          if (poseRef.current && videoRef.current) {
            await poseRef.current.send({ image: videoRef.current });
          }
        },
        width: width,
        height: height,
      });

      cameraRef.current = camera;
      await camera.start();

      setIsEnabled(true);
      setIsLoading(false);
      setLoadingStatus('');

    } catch (err) {
      console.error('Pose tracking initialization failed:', err);
      const message = err instanceof Error ? err.message : '초기화 실패';
      setError(message);
      onError?.(message);
      setIsLoading(false);
      setLoadingStatus('');
    }
  }, [width, height, loadScripts, onResults, onError]);

  // Stop tracking
  const stopTracking = useCallback(() => {
    setIsEnabled(false);

    if (cameraRef.current) {
      cameraRef.current.stop();
      cameraRef.current = null;
    }

    poseRef.current = null;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      if (cameraRef.current) {
        cameraRef.current.stop();
      }
    };
  }, []);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const containerStyle: React.CSSProperties = {
    position: isFullscreen ? 'fixed' : 'relative',
    inset: isFullscreen ? '16px' : undefined,
    zIndex: isFullscreen ? 50 : undefined,
    overflow: 'hidden',
    borderRadius: '16px',
    background: '#0D0D12',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    aspectRatio: `${width}/${height}`,
    ...style,
  };

  const videoStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transform: mirrorMode ? 'scaleX(-1)' : undefined,
    opacity: showVideo ? 1 : 0,
  };

  const canvasStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    transform: mirrorMode ? 'scaleX(-1)' : undefined,
    pointerEvents: 'none',
  };

  return (
    <motion.div layout style={containerStyle}>
      <video
        ref={videoRef}
        style={videoStyle}
        playsInline
        muted
      />

      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={canvasStyle}
      />

      {/* Loading State */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(13, 13, 18, 0.9)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <RefreshCw size={32} color="#00D9FF" />
              </motion.div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500 }}>
                  {loadingStatus || 'AI 모델 로딩 중...'}
                </p>
                <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '12px', marginTop: '4px' }}>
                  처음 로딩은 시간이 걸릴 수 있습니다
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error State */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(13, 13, 18, 0.9)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '24px', textAlign: 'center' }}>
              <CameraOff size={48} color="#FF006E" />
              <p style={{ color: 'white', fontWeight: 600 }}>초기화 실패</p>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px', maxWidth: '250px' }}>{error}</p>
              <button
                onClick={() => {
                  setError(null);
                  initCamera();
                }}
                style={{
                  padding: '12px 24px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                다시 시도
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Initial State */}
      {!isEnabled && !isLoading && !error && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0D0D12',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '24px', textAlign: 'center' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(0, 217, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Camera size={40} color="#00D9FF" />
            </div>
            <p style={{ color: 'white', fontWeight: 600, fontSize: '16px' }}>AI 전신 트래킹</p>
            <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px' }}>
              카메라를 활성화하여<br/>전신 자세를 분석합니다
            </p>
            <button
              onClick={initCamera}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
                border: 'none',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '15px',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(255, 107, 53, 0.4)',
              }}
            >
              <Camera size={18} />
              카메라 켜기
            </button>
          </div>
        </div>
      )}

      {/* Controls */}
      {isEnabled && (
        <div style={{
          position: 'absolute',
          bottom: '16px',
          left: '16px',
          right: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <button
            onClick={stopTracking}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 16px',
              borderRadius: '10px',
              background: 'rgba(0, 0, 0, 0.5)',
              border: 'none',
              color: 'white',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
            }}
          >
            <CameraOff size={16} />
            끄기
          </button>

          <button
            onClick={toggleFullscreen}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 16px',
              borderRadius: '10px',
              background: 'rgba(0, 0, 0, 0.5)',
              border: 'none',
              color: 'white',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
            }}
          >
            {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
          </button>
        </div>
      )}

      {/* Status indicator */}
      {isEnabled && (
        <div style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 12px',
          borderRadius: '20px',
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(10px)',
        }}>
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: poseDetected ? '#39FF14' : '#FFD60A',
            }}
          />
          <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.8)' }}>
            {poseDetected ? '자세 감지됨' : '카메라를 향해 서세요'}
          </span>
        </div>
      )}

      {/* AI Badge */}
      {isEnabled && (
        <div style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.3), rgba(255, 0, 110, 0.3))',
          border: '1px solid rgba(255, 107, 53, 0.5)',
        }}>
          <span style={{ fontSize: '12px', color: '#FF6B35', fontWeight: 600 }}>🤖 AI Body Tracking</span>
        </div>
      )}

      {/* Legend */}
      {isEnabled && poseDetected && (
        <div style={{
          position: 'absolute',
          bottom: '60px',
          left: '16px',
          display: 'flex',
          gap: '12px',
          padding: '8px 12px',
          borderRadius: '10px',
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(10px)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF6B35' }} />
            <span style={{ fontSize: '10px', color: '#FF6B35' }}>왼쪽</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#39FF14' }} />
            <span style={{ fontSize: '10px', color: '#39FF14' }}>오른쪽</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#00D9FF' }} />
            <span style={{ fontSize: '10px', color: '#00D9FF' }}>얼굴</span>
          </div>
        </div>
      )}

      {/* Instructions overlay */}
      {isEnabled && !poseDetected && (
        <div style={{
          position: 'absolute',
          bottom: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '12px 20px',
          borderRadius: '12px',
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(10px)',
          textAlign: 'center',
        }}>
          <p style={{ color: 'white', fontSize: '14px', fontWeight: 500 }}>
            🧍 카메라를 향해 서세요
          </p>
        </div>
      )}
    </motion.div>
  );
}
