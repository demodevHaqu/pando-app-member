'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

interface QRScanResult {
  type: 'equipment' | 'stretching' | 'sauna' | 'recovery' | 'unknown';
  data: string;
  rawData: string;
  timestamp: Date;
}

interface UseQRScannerOptions {
  onScan?: (result: QRScanResult) => void;
  onError?: (error: string) => void;
  scanInterval?: number; // ms between scans
  autoStart?: boolean;
}

interface UseQRScannerReturn {
  isLoading: boolean;
  isScanning: boolean;
  error: string | null;
  lastScan: QRScanResult | null;
  hasFlash: boolean;
  flashOn: boolean;
  facingMode: 'user' | 'environment';
  videoRef: React.RefObject<HTMLVideoElement | null>;
  startScanning: () => Promise<void>;
  stopScanning: () => void;
  toggleFlash: () => Promise<void>;
  switchCamera: () => void;
  clearLastScan: () => void;
}

// Parse QR data to determine type
function parseQRData(rawData: string): QRScanResult['type'] {
  const lowerData = rawData.toLowerCase();

  // Check for specific prefixes or keywords
  if (lowerData.includes('eq-') || lowerData.includes('equipment')) {
    return 'equipment';
  }
  if (lowerData.includes('st-') || lowerData.includes('stretch')) {
    return 'stretching';
  }
  if (lowerData.includes('sa-') || lowerData.includes('sauna')) {
    return 'sauna';
  }
  if (lowerData.includes('rc-') || lowerData.includes('recovery')) {
    return 'recovery';
  }

  return 'unknown';
}

export default function useQRScanner(
  options: UseQRScannerOptions = {}
): UseQRScannerReturn {
  const {
    onScan,
    onError,
    scanInterval = 500,
    autoStart = false,
  } = options;

  const [isLoading, setIsLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastScan, setLastScan] = useState<QRScanResult | null>(null);
  const [hasFlash, setHasFlash] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialize canvas for QR processing
  useEffect(() => {
    canvasRef.current = document.createElement('canvas');
  }, []);

  // Start camera and scanning
  const startScanning = useCallback(async () => {
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

      setIsScanning(true);

      // Start scan interval (in production, use jsQR or similar library)
      scanIntervalRef.current = setInterval(() => {
        // Scan logic would go here with actual QR library
        // For demo, we skip actual scanning
      }, scanInterval);

    } catch (err) {
      const message = err instanceof Error ? err.message : '카메라 접근 실패';
      setError(message);
      onError?.(message);
    } finally {
      setIsLoading(false);
    }
  }, [facingMode, scanInterval, onError]);

  // Stop scanning
  const stopScanning = useCallback(() => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    setIsScanning(false);
    setFlashOn(false);
  }, []);

  // Toggle flash
  const toggleFlash = useCallback(async () => {
    if (!streamRef.current || !hasFlash) return;

    const track = streamRef.current.getVideoTracks()[0];
    const newFlashState = !flashOn;

    try {
      await track.applyConstraints({
        // @ts-ignore - torch is not in standard types
        advanced: [{ torch: newFlashState }],
      });
      setFlashOn(newFlashState);
    } catch (err) {
      console.error('Flash toggle failed:', err);
    }
  }, [flashOn, hasFlash]);

  // Switch camera
  const switchCamera = useCallback(() => {
    const wasScanning = isScanning;
    stopScanning();
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));

    // Restart if was scanning
    if (wasScanning) {
      // Small delay for camera switch
      setTimeout(() => {
        startScanning();
      }, 100);
    }
  }, [isScanning, stopScanning, startScanning]);

  // Clear last scan
  const clearLastScan = useCallback(() => {
    setLastScan(null);
  }, []);

  // Simulate scan (for development/demo)
  const simulateScan = useCallback((rawData: string) => {
    const result: QRScanResult = {
      type: parseQRData(rawData),
      data: rawData,
      rawData,
      timestamp: new Date(),
    };

    setLastScan(result);
    onScan?.(result);
  }, [onScan]);

  // Auto-start if enabled
  useEffect(() => {
    if (autoStart) {
      startScanning();
    }

    return () => {
      stopScanning();
    };
  }, [autoStart]); // Intentionally excluding startScanning/stopScanning to avoid loops

  return {
    isLoading,
    isScanning,
    error,
    lastScan,
    hasFlash,
    flashOn,
    facingMode,
    videoRef,
    startScanning,
    stopScanning,
    toggleFlash,
    switchCamera,
    clearLastScan,
  };
}

// Utility to get QR type display info
export function getQRTypeInfo(type: QRScanResult['type']) {
  const info = {
    equipment: {
      label: '운동 기구',
      color: 'energy-orange',
      icon: 'Dumbbell',
    },
    stretching: {
      label: '스트레칭존',
      color: 'electric-blue',
      icon: 'Sparkles',
    },
    sauna: {
      label: '사우나',
      color: 'power-pink',
      icon: 'Flame',
    },
    recovery: {
      label: '리커버리존',
      color: 'neon-green',
      icon: 'Heart',
    },
    unknown: {
      label: '알 수 없음',
      color: 'white',
      icon: 'HelpCircle',
    },
  };

  return info[type];
}
