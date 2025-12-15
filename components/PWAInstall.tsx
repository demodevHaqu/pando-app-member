'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Share, Plus, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstall() {
  const pathname = usePathname();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstall, setShowInstall] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already installed (standalone mode)
    const standalone = window.matchMedia('(display-mode: standalone)').matches ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window.navigator as any).standalone === true;
    setIsStandalone(standalone);

    if (standalone) return; // Don't show install prompt if already installed

    // Check if device is iOS
    const isIOSDevice =
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      !(window as unknown as { MSStream?: unknown }).MSStream;
    setIsIOS(isIOSDevice);

    // Check if already dismissed
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed) {
      const dismissedDate = new Date(dismissed);
      const now = new Date();
      const daysDiff = (now.getTime() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24);
      if (daysDiff < 7) return; // Don't show for 7 days after dismissal
    }

    // For iOS, show install prompt after a delay
    if (isIOSDevice) {
      const timer = setTimeout(() => {
        setShowInstall(true);
      }, 3000);
      return () => clearTimeout(timer);
    }

    // Handle beforeinstallprompt event for Android/Chrome
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  useEffect(() => {
    // Register Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });
    }
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        console.log('PWA installed');
      }

      setDeferredPrompt(null);
      setShowInstall(false);
    } catch (error) {
      console.error('Installation failed:', error);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem('pwa-install-dismissed', new Date().toISOString());
    setShowInstall(false);
    setShowIOSGuide(false);
  };

  // 메인 페이지('/')에서만 표시
  const isMainPage = pathname === '/';

  if (isStandalone || !showInstall || !isMainPage) return null;

  return (
    <AnimatePresence>
      {/* iOS Installation Guide Modal */}
      {showIOSGuide && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={handleDismiss}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            style={{
              width: '100%',
              maxWidth: '380px',
              background: 'linear-gradient(145deg, #1A1A24, #0D0D12)',
              borderRadius: '24px',
              padding: '28px',
              border: '1px solid rgba(0, 217, 255, 0.2)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 217, 255, 0.1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>홈 화면에 추가하기</h3>
              <button
                onClick={handleDismiss}
                style={{
                  padding: '8px',
                  color: '#9CA3AF',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Step 1 */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #00D9FF, #7209B7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}>1</span>
                </div>
                <div>
                  <p style={{ color: 'white', fontWeight: '500', marginBottom: '8px', fontSize: '15px' }}>
                    Safari 하단의 공유 버튼을 탭하세요
                  </p>
                  <div style={{
                    background: 'rgba(0, 217, 255, 0.1)',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    border: '1px solid rgba(0, 217, 255, 0.2)',
                  }}>
                    <Share size={20} color="#00D9FF" />
                    <span style={{ fontSize: '13px', color: '#00D9FF' }}>공유</span>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #00D9FF, #7209B7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}>2</span>
                </div>
                <div>
                  <p style={{ color: 'white', fontWeight: '500', marginBottom: '8px', fontSize: '15px' }}>
                    &quot;홈 화면에 추가&quot;를 선택하세요
                  </p>
                  <div style={{
                    background: 'rgba(0, 217, 255, 0.1)',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    border: '1px solid rgba(0, 217, 255, 0.2)',
                  }}>
                    <Plus size={20} color="#00D9FF" />
                    <span style={{ fontSize: '13px', color: '#00D9FF' }}>홈 화면에 추가</span>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #00D9FF, #7209B7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}>3</span>
                </div>
                <div>
                  <p style={{ color: 'white', fontWeight: '500', fontSize: '15px' }}>
                    우측 상단의 &quot;추가&quot; 버튼을 탭하세요
                  </p>
                </div>
              </div>
            </div>

            <div style={{
              marginTop: '24px',
              paddingTop: '16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
              <p style={{ fontSize: '13px', color: '#9CA3AF', textAlign: 'center' }}>
                앱처럼 전체 화면으로 Fit Genie를 이용할 수 있어요
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Install Prompt Modal - 화면 중앙에 표시 */}
      {showInstall && !showIOSGuide && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={handleDismiss}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
            style={{
              width: '100%',
              maxWidth: '360px',
              background: 'linear-gradient(145deg, #1A1A24, #0D0D12)',
              borderRadius: '24px',
              padding: '32px 24px',
              textAlign: 'center',
              border: '1px solid rgba(255, 107, 53, 0.2)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(255, 107, 53, 0.1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleDismiss}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                padding: '8px',
                color: '#9CA3AF',
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
              }}
            >
              <X size={18} />
            </button>

            {/* Icon */}
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #FF6B35, #00D9FF)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              boxShadow: '0 8px 30px rgba(255, 107, 53, 0.3)',
            }}>
              <Smartphone size={40} color="white" />
            </div>

            {/* Title */}
            <h3 style={{
              fontSize: '22px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '12px',
            }}>
              앱 설치하기
            </h3>

            {/* Description */}
            <p style={{
              fontSize: '15px',
              color: '#9CA3AF',
              marginBottom: '28px',
              lineHeight: 1.5,
            }}>
              {isIOS
                ? '홈 화면에 추가하고\n앱처럼 사용하세요!'
                : '홈 화면에 추가하고\n더 빠르게 이용하세요!'}
            </p>

            {/* Benefits */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '14px',
              padding: '16px',
              marginBottom: '24px',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#39FF14',
                  }} />
                  <span style={{ fontSize: '14px', color: '#D1D5DB' }}>빠른 실행</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#39FF14',
                  }} />
                  <span style={{ fontSize: '14px', color: '#D1D5DB' }}>전체 화면 모드</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#39FF14',
                  }} />
                  <span style={{ fontSize: '14px', color: '#D1D5DB' }}>오프라인 접속 지원</span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {isIOS ? (
                <button
                  onClick={() => setShowIOSGuide(true)}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    borderRadius: '14px',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(255, 107, 53, 0.4)',
                  }}
                >
                  설치 방법 보기
                </button>
              ) : (
                <button
                  onClick={handleInstall}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    borderRadius: '14px',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 20px rgba(255, 107, 53, 0.4)',
                  }}
                >
                  <Download size={20} />
                  앱 설치하기
                </button>
              )}
              <button
                onClick={handleDismiss}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: 'transparent',
                  color: '#9CA3AF',
                  fontWeight: '500',
                  fontSize: '14px',
                  borderRadius: '14px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  cursor: 'pointer',
                }}
              >
                나중에 하기
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
