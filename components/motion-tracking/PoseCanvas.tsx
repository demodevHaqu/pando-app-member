'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Camera, CameraOff, RefreshCw, Maximize, Minimize } from 'lucide-react';
import Button from '@/components/ui/Button';

interface PosePoint {
  x: number;
  y: number;
  z?: number;
  visibility?: number;
}

interface PoseData {
  landmarks: PosePoint[];
  worldLandmarks?: PosePoint[];
}

interface PoseCanvasProps {
  onPoseDetected?: (pose: PoseData) => void;
  onError?: (error: string) => void;
  showSkeleton?: boolean;
  showVideo?: boolean;
  mirrorMode?: boolean;
  width?: number;
  height?: number;
  className?: string;
}

// Pose landmark connections for drawing skeleton
const POSE_CONNECTIONS = [
  [11, 12], // shoulders
  [11, 13], [13, 15], // left arm
  [12, 14], [14, 16], // right arm
  [11, 23], [12, 24], // torso
  [23, 24], // hips
  [23, 25], [25, 27], // left leg
  [24, 26], [26, 28], // right leg
];

export default function PoseCanvas({
  onPoseDetected,
  onError,
  showSkeleton = true,
  showVideo = true,
  mirrorMode = true,
  width = 640,
  height = 480,
  className,
}: PoseCanvasProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnabled, setIsEnabled] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const animationRef = useRef<number | null>(null);

  // Initialize camera
  const initCamera = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: width },
          height: { ideal: height },
          facingMode: 'user',
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setIsEnabled(true);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : '카메라 접근 실패';
      setError(message);
      onError?.(message);
    } finally {
      setIsLoading(false);
    }
  }, [width, height, onError]);

  // Stop camera
  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsEnabled(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  // Draw pose skeleton
  const drawPose = useCallback((pose: PoseData) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!showSkeleton) return;

    const { landmarks } = pose;

    // Draw connections
    ctx.strokeStyle = '#00D9FF';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    POSE_CONNECTIONS.forEach(([start, end]) => {
      const startPoint = landmarks[start];
      const endPoint = landmarks[end];

      if (startPoint && endPoint &&
          (startPoint.visibility ?? 1) > 0.5 &&
          (endPoint.visibility ?? 1) > 0.5) {
        ctx.beginPath();
        ctx.moveTo(startPoint.x * canvas.width, startPoint.y * canvas.height);
        ctx.lineTo(endPoint.x * canvas.width, endPoint.y * canvas.height);
        ctx.stroke();
      }
    });

    // Draw points
    landmarks.forEach((point, index) => {
      if ((point.visibility ?? 1) > 0.5) {
        // Determine color based on body part
        let color = '#00D9FF';
        if (index >= 11 && index <= 16) color = '#FF6B35'; // Arms - orange
        if (index >= 23 && index <= 28) color = '#39FF14'; // Legs - green

        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;

        ctx.beginPath();
        ctx.arc(
          point.x * canvas.width,
          point.y * canvas.height,
          6,
          0,
          2 * Math.PI
        );
        ctx.fill();

        ctx.shadowBlur = 0;
      }
    });
  }, [showSkeleton]);

  // Simulate pose detection (in production, use MediaPipe)
  const detectPose = useCallback(() => {
    if (!isEnabled || !videoRef.current) return;

    // Simulated pose data for demo
    // In production, this would use MediaPipe Pose
    const simulatedPose: PoseData = {
      landmarks: Array(33).fill(null).map((_, i) => ({
        x: 0.3 + Math.random() * 0.4,
        y: 0.2 + Math.random() * 0.6,
        z: 0,
        visibility: 0.9,
      })),
    };

    drawPose(simulatedPose);
    onPoseDetected?.(simulatedPose);

    animationRef.current = requestAnimationFrame(detectPose);
  }, [isEnabled, drawPose, onPoseDetected]);

  useEffect(() => {
    if (isEnabled) {
      detectPose();
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isEnabled, detectPose]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <motion.div
      layout
      className={cn(
        "relative overflow-hidden rounded-xl bg-cyber-dark border border-white/10",
        isFullscreen && "fixed inset-4 z-50",
        className
      )}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className={cn(
          "w-full h-full object-cover",
          mirrorMode && "scale-x-[-1]",
          !showVideo && "opacity-0"
        )}
        playsInline
        muted
      />

      {/* Canvas Overlay */}
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className={cn(
          "absolute inset-0 w-full h-full",
          mirrorMode && "scale-x-[-1]"
        )}
      />

      {/* Loading State */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-cyber-dark/80"
          >
            <div className="flex flex-col items-center gap-4">
              <RefreshCw size={32} className="text-electric-blue animate-spin" />
              <p className="text-white/60">카메라 초기화 중...</p>
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
            className="absolute inset-0 flex items-center justify-center bg-cyber-dark/80"
          >
            <div className="flex flex-col items-center gap-4 p-6 text-center">
              <CameraOff size={48} className="text-power-pink" />
              <p className="text-white font-semibold">카메라 접근 실패</p>
              <p className="text-white/60 text-sm">{error}</p>
              <Button variant="outline" onClick={initCamera}>
                다시 시도
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Initial State */}
      {!isEnabled && !isLoading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-cyber-dark">
          <div className="flex flex-col items-center gap-4 p-6 text-center">
            <div className="w-20 h-20 rounded-full bg-electric-blue/20 flex items-center justify-center">
              <Camera size={40} className="text-electric-blue" />
            </div>
            <p className="text-white font-semibold">모션 트래킹 시작</p>
            <p className="text-white/60 text-sm">카메라를 활성화하여 자세를 분석합니다</p>
            <Button variant="energy" onClick={initCamera} shine>
              카메라 켜기
            </Button>
          </div>
        </div>
      )}

      {/* Controls */}
      {isEnabled && (
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={stopCamera}
            className="bg-black/50"
          >
            <CameraOff size={16} />
            끄기
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFullscreen}
            className="bg-black/50"
          >
            {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
          </Button>
        </div>
      )}

      {/* Active indicator */}
      {isEnabled && (
        <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50">
          <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
          <span className="text-xs text-white/80">분석 중</span>
        </div>
      )}
    </motion.div>
  );
}
