'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstall, setShowInstall] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if device is iOS
    const isIOSDevice =
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      !(window as unknown as { MSStream?: unknown }).MSStream;

    setIsIOS(isIOSDevice);

    // Handle beforeinstallprompt event
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

  const handleIOSInstall = () => {
    setShowInstall(false);
    // Show instructions for iOS manual install
  };

  if (!showInstall) return null;

  return (
    <AnimatePresence>
      {showInstall && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-20 left-4 right-4 z-50 max-w-[425px] mx-auto"
        >
          <div className="bg-linear-to-r from-energy-orange to-electric-blue p-4 rounded-xl shadow-lg backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <Download size={24} className="text-white shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-bold text-white mb-1">앱 설치하기</h3>
                <p className="text-sm text-white/90 mb-3">
                  {isIOS
                    ? 'Safari의 공유 버튼을 탭하고 "홈 화면에 추가"를 선택하세요'
                    : '홈 화면에 추가하고 더 빠르게 이용하세요!'}
                </p>
                <div className="flex gap-2">
                  {!isIOS && (
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
                    onClick={() => setShowInstall(false)}
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
