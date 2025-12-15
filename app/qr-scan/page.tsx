'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, Camera, Dumbbell, Wind, Droplets, Sparkles, ChevronRight, Video, X, AlertCircle } from 'lucide-react';
import { MOCK_SCANNED_ITEMS } from '@/data/mock/equipment';

export default function QRScanPage() {
  const router = useRouter();
  const [isScanning, setIsScanning] = useState(false);
  const [scannerReady, setScannerReady] = useState(false);
  const [scannedItems] = useState(MOCK_SCANNED_ITEMS);
  const [error, setError] = useState<string | null>(null);
  const html5QrCodeRef = useRef<{ stop: () => Promise<void>; clear: () => void } | null>(null);
  const initializingRef = useRef(false);

  const quickAccessZones = [
    {
      id: 'equipment',
      name: '기구 운동',
      icon: Dumbbell,
      iconColor: '#00D9FF',
      bgColor: 'rgba(0, 217, 255, 0.15)',
      description: 'QR 코드 스캔',
      action: () => {
        setIsScanning(true);
        setError(null);
      },
    },
    {
      id: 'stretching',
      name: '스트레칭 존',
      icon: Wind,
      iconColor: '#39FF14',
      bgColor: 'rgba(57, 255, 20, 0.15)',
      description: '회복 스트레칭',
      action: () => router.push('/qr-scan/stretching'),
    },
    {
      id: 'sauna',
      name: '사우나',
      icon: Droplets,
      iconColor: '#FF6B35',
      bgColor: 'rgba(255, 107, 53, 0.15)',
      description: '체크인/아웃',
      action: () => router.push('/qr-scan/sauna'),
    },
    {
      id: 'recovery',
      name: '리커버리 존',
      icon: Sparkles,
      iconColor: '#7209B7',
      bgColor: 'rgba(114, 9, 183, 0.15)',
      description: 'AI 추천',
      action: () => router.push('/qr-scan/recovery'),
    },
  ];

  // QR 스캐너 초기화 함수
  const initializeScanner = async () => {
    if (initializingRef.current || html5QrCodeRef.current) return;

    // DOM 요소가 실제로 존재하는지 확인
    const element = document.getElementById('qr-reader');
    if (!element) {
      console.log('QR reader element not found yet, retrying...');
      return;
    }

    initializingRef.current = true;

    try {
      const { Html5Qrcode } = await import('html5-qrcode');

      const html5QrCode = new Html5Qrcode('qr-reader');

      const qrCodeSuccessCallback = (decodedText: string) => {
        console.log('QR 스캔 성공:', decodedText);
        stopScanning();

        if (decodedText.includes('equipment')) {
          const equipmentId = decodedText.split('/').pop() || 'eq1';
          router.push(`/qr-scan/equipment/${equipmentId}`);
        } else if (decodedText.includes('eq')) {
          router.push(`/qr-scan/equipment/${decodedText}`);
        } else {
          router.push('/qr-scan/equipment/eq1');
        }
      };

      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
      };

      await html5QrCode.start(
        { facingMode: 'environment' },
        config,
        qrCodeSuccessCallback,
        () => {}
      );

      html5QrCodeRef.current = html5QrCode;
      setScannerReady(true);
      initializingRef.current = false;

    } catch (err) {
      console.error('QR 스캔 에러:', err);
      setError('카메라 접근 권한이 필요합니다. 브라우저 설정에서 카메라 권한을 허용해주세요.');
      setIsScanning(false);
      initializingRef.current = false;
    }
  };

  // isScanning이 true가 되면 일정 시간 후 스캐너 초기화 (AnimatePresence 애니메이션 완료 대기)
  useEffect(() => {
    let isCancelled = false;
    let timeoutId: NodeJS.Timeout | null = null;

    if (isScanning && !html5QrCodeRef.current && !initializingRef.current) {
      let retryCount = 0;
      const maxRetries = 10;

      const tryInitialize = () => {
        if (isCancelled) return;

        if (retryCount >= maxRetries) {
          console.error('QR reader element not found after max retries');
          setError('QR 스캐너를 초기화할 수 없습니다. 페이지를 새로고침해주세요.');
          setIsScanning(false);
          return;
        }

        const element = document.getElementById('qr-reader');
        if (element) {
          initializeScanner();
        } else {
          retryCount++;
          timeoutId = setTimeout(tryInitialize, 100);
        }
      };

      // AnimatePresence 애니메이션이 완료될 때까지 대기 후 초기화 시도
      timeoutId = setTimeout(tryInitialize, 300);
    }

    return () => {
      isCancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isScanning]);

  // QR 스캔 시작 버튼 핸들러
  const startScanning = () => {
    setIsScanning(true);
    setError(null);
  };

  // QR 스캔 중지
  const stopScanning = async () => {
    if (html5QrCodeRef.current) {
      try {
        await html5QrCodeRef.current.stop();
        html5QrCodeRef.current.clear();
      } catch (err) {
        console.error('스캔 중지 에러:', err);
      }
      html5QrCodeRef.current = null;
    }
    setIsScanning(false);
    setScannerReady(false);
  };

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current.stop().catch(() => {});
      }
    };
  }, []);

  // 데모용 수동 이동
  const handleDemoScan = () => {
    stopScanning();
    router.push('/qr-scan/equipment/eq1');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D12', paddingBottom: '100px' }}>
      {/* Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: 'rgba(13, 13, 18, 0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        padding: '16px 20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', margin: 0 }}>QR 스캔</h1>
        </div>
      </header>

      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {/* QR Scanner Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{
            position: 'relative',
            borderRadius: '24px',
            padding: '2px',
            background: 'linear-gradient(135deg, #00D9FF, #7209B7, #FF006E)',
          }}>
            <div style={{
              background: 'linear-gradient(145deg, #1A1A24, #0D0D12)',
              borderRadius: '22px',
              padding: '24px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Background glow */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '150px',
                height: '150px',
                background: 'radial-gradient(circle, rgba(0, 217, 255, 0.15) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(40px)',
              }} />

              <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '20px 0' }}>
                <AnimatePresence mode="wait">
                  {!isScanning ? (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ marginBottom: '20px' }}
                      >
                        <QrCode size={80} color="#00D9FF" style={{ margin: '0 auto' }} />
                      </motion.div>
                      <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
                        기구 QR 코드를 스캔하세요
                      </h2>
                      <p style={{ color: '#9CA3AF', marginBottom: '24px', fontSize: '14px' }}>
                        기구별 운동 영상과 기록을 확인할 수 있습니다
                      </p>

                      {error && (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '12px 16px',
                          background: 'rgba(255, 0, 110, 0.15)',
                          border: '1px solid rgba(255, 0, 110, 0.3)',
                          borderRadius: '12px',
                          marginBottom: '16px',
                        }}>
                          <AlertCircle size={18} color="#FF006E" />
                          <p style={{ color: '#FF006E', fontSize: '13px', margin: 0, textAlign: 'left' }}>{error}</p>
                        </div>
                      )}

                      <button
                        onClick={startScanning}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          padding: '16px',
                          borderRadius: '14px',
                          background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
                          border: 'none',
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '16px',
                          cursor: 'pointer',
                          boxShadow: '0 4px 20px rgba(255, 107, 53, 0.4)',
                        }}
                      >
                        <Camera size={20} />
                        카메라로 스캔하기
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="scanning"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {/* QR Scanner Container */}
                      <div style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '300px',
                        margin: '0 auto 20px',
                      }}>
                        {/* Scanner Frame */}
                        <div style={{
                          position: 'relative',
                          width: '100%',
                          aspectRatio: '1',
                          borderRadius: '20px',
                          overflow: 'hidden',
                          border: '3px solid #00D9FF',
                          boxShadow: '0 0 30px rgba(0, 217, 255, 0.4)',
                        }}>
                          {/* QR Reader Element */}
                          <div
                            id="qr-reader"
                            style={{
                              width: '100%',
                              height: '100%',
                            }}
                          />

                          {/* Scanning animation overlay */}
                          <motion.div
                            animate={{ top: ['0%', '100%', '0%'] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            style={{
                              position: 'absolute',
                              left: 0,
                              right: 0,
                              height: '3px',
                              background: 'linear-gradient(90deg, transparent, #00D9FF, transparent)',
                              boxShadow: '0 0 20px #00D9FF',
                              pointerEvents: 'none',
                            }}
                          />

                          {/* Corner decorations */}
                          {[
                            { top: 0, left: 0, borderTop: '4px solid #00D9FF', borderLeft: '4px solid #00D9FF' },
                            { top: 0, right: 0, borderTop: '4px solid #00D9FF', borderRight: '4px solid #00D9FF' },
                            { bottom: 0, left: 0, borderBottom: '4px solid #00D9FF', borderLeft: '4px solid #00D9FF' },
                            { bottom: 0, right: 0, borderBottom: '4px solid #00D9FF', borderRight: '4px solid #00D9FF' },
                          ].map((cornerStyle, i) => (
                            <div
                              key={i}
                              style={{
                                position: 'absolute',
                                width: '30px',
                                height: '30px',
                                ...cornerStyle,
                                borderRadius: '4px',
                                pointerEvents: 'none',
                              } as React.CSSProperties}
                            />
                          ))}
                        </div>

                        {/* Close button */}
                        <button
                          onClick={stopScanning}
                          style={{
                            position: 'absolute',
                            top: '-12px',
                            right: '-12px',
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #FF006E, #FF6B35)',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 4px 15px rgba(255, 0, 110, 0.5)',
                            zIndex: 20,
                          }}
                        >
                          <X size={20} color="white" />
                        </button>
                      </div>

                      <motion.p
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{ color: '#00D9FF', fontWeight: '600', marginBottom: '16px' }}
                      >
                        {scannerReady ? 'QR 코드를 카메라에 비춰주세요' : '카메라 로딩 중...'}
                      </motion.p>

                      {/* Demo button */}
                      <button
                        onClick={handleDemoScan}
                        style={{
                          padding: '12px 24px',
                          borderRadius: '10px',
                          background: 'rgba(255, 255, 255, 0.1)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          color: '#9CA3AF',
                          fontSize: '13px',
                          cursor: 'pointer',
                        }}
                      >
                        QR 없이 데모 체험하기
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* AI 자세 검증 배너 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <div
            onClick={() => router.push('/qr-scan/equipment/eq1/form-guide')}
            style={{
              position: 'relative',
              borderRadius: '20px',
              padding: '2px',
              background: 'linear-gradient(135deg, #39FF14, #00D9FF)',
              cursor: 'pointer',
              overflow: 'hidden',
            }}
          >
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '50%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                zIndex: 10,
              }}
            />
            <div style={{
              background: 'linear-gradient(145deg, rgba(57, 255, 20, 0.1), #0D0D12)',
              borderRadius: '18px',
              padding: '20px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '18px',
                  background: 'linear-gradient(135deg, #39FF14, #00D9FF)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 20px rgba(57, 255, 20, 0.5)',
                }}>
                  <Video size={32} color="white" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', margin: 0 }}>
                      AI 자세 분석
                    </h3>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '12px',
                      background: 'rgba(57, 255, 20, 0.2)',
                      color: '#39FF14',
                      fontSize: '11px',
                      fontWeight: 'bold',
                    }}>
                      실시간
                    </span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#9CA3AF', margin: 0, lineHeight: 1.4 }}>
                    MediaPipe로 운동 자세를 실시간 분석
                  </p>
                </div>
                <ChevronRight size={24} color="#39FF14" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Access Zones */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>빠른 이동</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {quickAccessZones.map((zone, index) => {
              const Icon = zone.icon;
              return (
                <motion.div
                  key={zone.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <div
                    onClick={zone.action}
                    style={{
                      background: 'linear-gradient(145deg, rgba(26, 26, 36, 0.95), rgba(13, 13, 18, 0.98))',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '16px',
                      padding: '20px',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '14px',
                      background: zone.bgColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <Icon size={24} color={zone.iconColor} />
                    </div>
                    <h4 style={{ fontWeight: 'bold', color: 'white', margin: '12px 0 4px', fontSize: '15px' }}>
                      {zone.name}
                    </h4>
                    <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>{zone.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Recent Scans */}
        {scannedItems.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>최근 스캔</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {scannedItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <div
                    onClick={() => router.push(`/qr-scan/equipment/${item.equipmentId}`)}
                    style={{
                      background: 'linear-gradient(145deg, rgba(26, 26, 36, 0.95), rgba(13, 13, 18, 0.98))',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '16px',
                      padding: '16px',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '14px',
                        background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <Dumbbell size={24} color="white" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontWeight: 'bold', color: 'white', margin: 0, fontSize: '15px' }}>
                          {item.equipmentName}
                        </h4>
                        <p style={{ fontSize: '13px', color: '#6B7280', margin: '4px 0 0' }}>
                          {item.location}
                        </p>
                      </div>
                      <span style={{ fontSize: '12px', color: '#6B7280' }}>
                        {new Date(item.scannedAt).toLocaleTimeString('ko-KR', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
