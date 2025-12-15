'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Share, Plus } from 'lucide-react';
import { PrimaryButton, SecondaryButton } from '@/components/ui/ModernUI';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstall() {
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

  if (isStandalone || !showInstall) return null;

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
            zIndex: 50,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
          onClick={handleDismiss}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            style={{
              width: '100%',
              maxWidth: '425px',
              background: '#1A1A24',
              borderRadius: '24px 24px 0 0',
              padding: '24px',
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
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <X size={24} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Step 1 */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(0, 217, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ color: '#00D9FF', fontWeight: 'bold' }}>1</span>
                </div>
                <div>
                  <p style={{ color: 'white', fontWeight: '500', marginBottom: '8px' }}>
                    Safari 하단의 공유 버튼을 탭하세요
                  </p>
                  <div style={{
                    background: '#0D0D12',
                    padding: '12px',
                    borderRadius: '8px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    <Share size={24} color="#00D9FF" />
                    <span style={{ fontSize: '14px', color: '#9CA3AF' }}>공유</span>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(0, 217, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ color: '#00D9FF', fontWeight: 'bold' }}>2</span>
                </div>
                <div>
                  <p style={{ color: 'white', fontWeight: '500', marginBottom: '8px' }}>
                    스크롤하여 &quot;홈 화면에 추가&quot;를 선택하세요
                  </p>
                  <div style={{
                    background: '#0D0D12',
                    padding: '12px',
                    borderRadius: '8px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    <Plus size={24} color="#00D9FF" />
                    <span style={{ fontSize: '14px', color: '#9CA3AF' }}>홈 화면에 추가</span>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(0, 217, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ color: '#00D9FF', fontWeight: 'bold' }}>3</span>
                </div>
                <div>
                  <p style={{ color: 'white', fontWeight: '500' }}>
                    우측 상단의 &quot;추가&quot; 버튼을 탭하세요
                  </p>
                </div>
              </div>
            </div>

            <div style={{
              marginTop: '32px',
              paddingTop: '16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
              <p style={{ fontSize: '14px', color: '#9CA3AF', textAlign: 'center' }}>
                앱처럼 전체 화면으로 Fit Genie를 이용할 수 있어요
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Install Prompt Banner */}
      {showInstall && !showIOSGuide && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          style={{
            position: 'fixed',
            bottom: '80px',
            left: '16px',
            right: '16px',
            zIndex: 50,
            maxWidth: '425px',
            margin: '0 auto',
          }}
        >
          <div style={{
            background: 'linear-gradient(135deg, #FF6B35, #00D9FF)',
            padding: '16px',
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <Download size={24} color="white" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>앱 설치하기</h3>
                <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '12px' }}>
                  {isIOS
                    ? '홈 화면에 추가하고 앱처럼 사용하세요!'
                    : '홈 화면에 추가하고 더 빠르게 이용하세요!'}
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {isIOS ? (
                    <button
                      onClick={() => setShowIOSGuide(true)}
                      style={{
                        flex: 1,
                        padding: '10px 16px',
                        background: 'white',
                        color: '#FF6B35',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        borderRadius: '10px',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      설치 방법 보기
                    </button>
                  ) : (
                    <button
                      onClick={handleInstall}
                      style={{
                        flex: 1,
                        padding: '10px 16px',
                        background: 'white',
                        color: '#FF6B35',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        borderRadius: '10px',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      설치
                    </button>
                  )}
                  <button
                    onClick={handleDismiss}
                    style={{
                      padding: '8px 12px',
                      color: 'white',
                      background: 'rgba(255, 255, 255, 0.2)',
                      border: 'none',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
