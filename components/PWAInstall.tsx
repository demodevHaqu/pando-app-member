'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import { Download, X, Share, Plus } from 'lucide-react';

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
          className="fixed inset-0 z-50 bg-black/80 flex items-end justify-center"
          onClick={handleDismiss}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="w-full max-w-[425px] bg-cyber-mid rounded-t-3xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">홈 화면에 추가하기</h3>
              <button
                onClick={handleDismiss}
                className="p-2 text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-electric-blue/20 flex items-center justify-center shrink-0">
                  <span className="text-electric-blue font-bold">1</span>
                </div>
                <div>
                  <p className="text-white font-medium mb-2">
                    Safari 하단의 공유 버튼을 탭하세요
                  </p>
                  <div className="bg-cyber-dark p-3 rounded-lg inline-flex items-center gap-2">
                    <Share size={24} className="text-electric-blue" />
                    <span className="text-sm text-gray-400">공유</span>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-electric-blue/20 flex items-center justify-center shrink-0">
                  <span className="text-electric-blue font-bold">2</span>
                </div>
                <div>
                  <p className="text-white font-medium mb-2">
                    스크롤하여 &quot;홈 화면에 추가&quot;를 선택하세요
                  </p>
                  <div className="bg-cyber-dark p-3 rounded-lg inline-flex items-center gap-2">
                    <Plus size={24} className="text-electric-blue" />
                    <span className="text-sm text-gray-400">홈 화면에 추가</span>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-electric-blue/20 flex items-center justify-center shrink-0">
                  <span className="text-electric-blue font-bold">3</span>
                </div>
                <div>
                  <p className="text-white font-medium">
                    우측 상단의 &quot;추가&quot; 버튼을 탭하세요
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10">
              <p className="text-sm text-gray-400 text-center">
                앱처럼 전체 화면으로 PANDO를 이용할 수 있어요
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
          className="fixed bottom-20 left-4 right-4 z-50 max-w-[425px] mx-auto"
        >
          <div className="bg-gradient-to-r from-energy-orange to-electric-blue p-4 rounded-xl shadow-lg backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <Download size={24} className="text-white shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-bold text-white mb-1">앱 설치하기</h3>
                <p className="text-sm text-white/90 mb-3">
                  {isIOS
                    ? '홈 화면에 추가하고 앱처럼 사용하세요!'
                    : '홈 화면에 추가하고 더 빠르게 이용하세요!'}
                </p>
                <div className="flex gap-2">
                  {isIOS ? (
                    <Button
                      variant="energy"
                      size="sm"
                      onClick={() => setShowIOSGuide(true)}
                      className="flex-1 bg-white text-energy-orange hover:bg-white/90"
                    >
                      설치 방법 보기
                    </Button>
                  ) : (
                    <Button
                      variant="energy"
                      size="sm"
                      onClick={handleInstall}
                      className="flex-1 bg-white text-energy-orange hover:bg-white/90"
                    >
                      설치
                    </Button>
                  )}
                  <button
                    onClick={handleDismiss}
                    className="px-3 py-2 text-white hover:bg-white/20 rounded-lg transition-colors text-sm"
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
