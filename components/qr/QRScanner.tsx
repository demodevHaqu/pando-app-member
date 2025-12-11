'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Camera, CameraOff, Flashlight, FlashlightOff, SwitchCamera, QrCode, CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button';

interface QRScanResult {
  type: 'equipment' | 'stretching' | 'sauna' | 'recovery' | 'unknown';
  data: string;
  timestamp: Date;
}

interface QRScannerProps {
  onScan: (result: QRScanResult) => void;
  onError?: (error: string) => void;
  className?: string;
}

export default function QRScanner({
  onScan,
  onError,
  className,
}: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasFlash, setHasFlash] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [lastScan, setLastScan] = useState<QRScanResult | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Start camera
  const startCamera = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      // Check for flash support
      const track = stream.getVideoTracks()[0];
      const capabilities = track.getCapabilities?.() as { torch?: boolean } | undefined;
      setHasFlash(!!capabilities?.torch);

      setIsActive(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : '카메라 접근 실패';
      setError(message);
      onError?.(message);
    } finally {
      setIsLoading(false);
    }
  }, [facingMode, onError]);

  // Stop camera
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsActive(false);
    setFlashOn(false);
  }, []);

  // Toggle flash
  const toggleFlash = useCallback(async () => {
    if (!streamRef.current || !hasFlash) return;

    const track = streamRef.current.getVideoTracks()[0];
    const newFlashState = !flashOn;

    try {
      await track.applyConstraints({
        // @ts-expect-error - torch is not in the standard types
        advanced: [{ torch: newFlashState }],
      });
      setFlashOn(newFlashState);
    } catch (err) {
      console.error('Flash toggle failed:', err);
    }
  }, [flashOn, hasFlash]);

  // Switch camera
  const switchCamera = useCallback(() => {
    stopCamera();
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  }, [stopCamera]);

  // Parse QR code type from data
  const parseQRType = (data: string): QRScanResult['type'] => {
    if (data.includes('equipment') || data.includes('EQ-')) return 'equipment';
    if (data.includes('stretch') || data.includes('ST-')) return 'stretching';
    if (data.includes('sauna') || data.includes('SA-')) return 'sauna';
    if (data.includes('recovery') || data.includes('RC-')) return 'recovery';
    return 'unknown';
  };

  // Simulate QR scan (in production, use a QR library like jsQR)
  const simulateScan = useCallback(() => {
    // Demo: simulate a scan after 3 seconds
    const types: QRScanResult['type'][] = ['equipment', 'stretching', 'sauna', 'recovery'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const result: QRScanResult = {
      type: randomType,
      data: `${randomType.toUpperCase()}-${Math.random().toString(36).substr(2, 8)}`,
      timestamp: new Date(),
    };

    setLastScan(result);
    onScan(result);

    // Reset after showing success
    setTimeout(() => setLastScan(null), 2000);
  }, [onScan]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  // Restart camera when facing mode changes
  useEffect(() => {
    if (isActive) {
      startCamera();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facingMode]);

  return (
    <div className={cn("relative overflow-hidden rounded-xl bg-cyber-dark", className)}>
      {/* Video Feed */}
      <div className="relative aspect-square">
        <video
          ref={videoRef}
          className={cn(
            "w-full h-full object-cover",
            facingMode === 'user' && "scale-x-[-1]"
          )}
          playsInline
          muted
        />

        {/* Scanning overlay */}
        {isActive && !lastScan && (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Corner markers */}
            <div className="relative w-64 h-64">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-electric-blue rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-electric-blue rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-electric-blue rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-electric-blue rounded-br-lg" />

              {/* Scanning line animation */}
              <motion.div
                initial={{ top: 0 }}
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-electric-blue to-transparent shadow-glow-blue"
              />
            </div>
          </div>
        )}

        {/* Success overlay */}
        <AnimatePresence>
          {lastScan && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 flex items-center justify-center bg-black/60"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.5 }}
                  className="w-20 h-20 mx-auto mb-4 rounded-full bg-neon-green/20 flex items-center justify-center shadow-glow-green"
                >
                  <CheckCircle size={40} className="text-neon-green" />
                </motion.div>
                <p className="text-white font-bold">스캔 완료!</p>
                <p className="text-white/60 text-sm mt-1">
                  {lastScan.type === 'equipment' && '운동 기구'}
                  {lastScan.type === 'stretching' && '스트레칭존'}
                  {lastScan.type === 'sauna' && '사우나'}
                  {lastScan.type === 'recovery' && '리커버리존'}
                  {lastScan.type === 'unknown' && '알 수 없음'}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-cyber-dark/80">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 border-4 border-electric-blue/20 border-t-electric-blue rounded-full animate-spin" />
              <p className="text-white/60">카메라 초기화 중...</p>
            </div>
          </div>
        )}

        {/* Error overlay */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-cyber-dark/80">
            <div className="text-center p-6">
              <CameraOff size={48} className="mx-auto mb-4 text-power-pink" />
              <p className="text-white font-semibold">카메라 오류</p>
              <p className="text-white/60 text-sm mt-2">{error}</p>
              <Button variant="outline" onClick={startCamera} className="mt-4">
                다시 시도
              </Button>
            </div>
          </div>
        )}

        {/* Initial state */}
        {!isActive && !isLoading && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-cyber-dark">
            <div className="text-center p-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-electric-blue/20 flex items-center justify-center">
                <QrCode size={40} className="text-electric-blue" />
              </div>
              <p className="text-white font-semibold">QR 코드 스캔</p>
              <p className="text-white/60 text-sm mt-2">
                기구, 스트레칭존, 사우나의 QR 코드를 스캔하세요
              </p>
              <Button variant="energy" onClick={startCamera} className="mt-4" shine>
                <Camera size={18} />
                스캔 시작
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      {isActive && (
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <div className="flex gap-2">
            {hasFlash && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleFlash}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                  flashOn ? "bg-cyber-yellow text-cyber-dark" : "bg-white/20 text-white"
                )}
              >
                {flashOn ? <FlashlightOff size={18} /> : <Flashlight size={18} />}
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={switchCamera}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white"
            >
              <SwitchCamera size={18} />
            </motion.button>
          </div>

          <Button variant="ghost" size="sm" onClick={stopCamera}>
            <CameraOff size={16} />
            닫기
          </Button>
        </div>
      )}

      {/* Demo scan button (for development) */}
      {isActive && process.env.NODE_ENV === 'development' && (
        <Button
          variant="outline"
          size="sm"
          onClick={simulateScan}
          className="absolute top-4 right-4"
        >
          Demo 스캔
        </Button>
      )}

      {/* Canvas for QR processing (hidden) */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
