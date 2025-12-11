🎯 PHASE 18: PWA 설정Task 18.1: Manifest 파일파일: public/manifest.jsonjson{
  "name": "PANDO Fitness",
  "short_name": "PANDO",
  "description": "AI 기반 스마트 피트니스 센터",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0D0D12",
  "theme_color": "#00D9FF",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "categories": ["health", "fitness", "lifestyle"],
  "screenshots": [
    {
      "src": "/screenshots/home.png",
      "sizes": "1170x2532",
      "type": "image/png"
    },
    {
      "src": "/screenshots/workout.png",
      "sizes": "1170x2532",
      "type": "image/png"
    }
  ]
}Task 18.2: Service Worker파일: public/sw.jsjavascriptconst CACHE_NAME = 'pando-fitness-v1';
const urlsToCache = [
  '/',
  '/offline',
  '/manifest.json',
];

// 설치
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// 활성화
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // 캐시에 있으면 반환
      if (response) {
        return response;
      }

      return fetch(event.request).then((response) => {
        // 유효한 응답이 아니면 그대로 반환
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // 응답을 복제하여 캐시에 저장
        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    }).catch(() => {
      // 네트워크 오류 시 오프라인 페이지 반환
      return caches.match('/offline');
    })
  );
});

// Push 알림
self.addEventListener('push', (event) => {
  const data = event.data.json();
  
  const options = {
    body: data.body,
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      url: data.url,
    },
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// 알림 클릭
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});Task 18.3: PWA 등록파일: app/layout.tsx (수정)typescriptimport { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PANDO Fitness - AI 스마트 피트니스',
  description: 'AI 기반 개인 맞춤 운동 루틴과 전문 트레이너 매칭',
  manifest: '/manifest.json',
  themeColor: '#00D9FF',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'PANDO Fitness',
  },
  icons: {
    icon: '/icons/icon-192x192.png',
    apple: '/icons/icon-192x192.png',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={inter.className}>
        {children}
        <Toast />
      </body>
    </html>
  );
}파일: components/PWAInstall.tsx (새 파일)typescript'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import { Download, X } from 'lucide-react';

export default function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  useEffect(() => {
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

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('PWA installed');
    }

    setDeferredPrompt(null);
    setShowInstall(false);
  };

  return (
    <AnimatePresence>
      {showInstall && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-20 left-4 right-4 z-50 max-w-[425px] mx-auto"
        >
          <div className="bg-gradient-to-r from-energy-orange to-electric-blue p-4 rounded-xl shadow-lg backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <Download size={24} className="text-white flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-bold text-white mb-1">앱 설치하기</h3>
                <p className="text-sm text-white/80 mb-3">
                  홈 화면에 추가하고 더 빠르게 이용하세요!
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleInstall}
                    className="flex-1 bg-white text-energy-orange hover:bg-white/90"
                  >
                    설치
                  </Button>
                  <button
                    onClick={() => setShowInstall(false)}
                    className="px-3 text-white hover:bg-white/20 rounded-lg transition-colors"
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
}파일: app/layout.tsx (PWAInstall 추가)typescriptimport PWAInstall from '@/components/PWAInstall';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      {/* ... */}
      <body className={inter.className}>
        {children}
        <Toast />
        <PWAInstall />
      </body>
    </html>
  );
}Task 18.4: 오프라인 페이지파일: app/offline/page.tsxtypescript'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { WifiOff, RefreshCw } from 'lucide-react';

export default function OfflinePage() {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-cyber-dark flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <Card variant="hologram" className="text-center">
          <WifiOff size={64} className="text-gray-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">오프라인 상태</h1>
          <p className="text-gray-400 mb-6">
            인터넷 연결을 확인해주세요.
            <br />
            일부 기능은 오프라인에서도 사용 가능합니다.
          </p>
          <Button variant="energy" size="lg" className="w-full" onClick={handleRetry} glow>
            <RefreshCw size={20} className="mr-2" />
            다시 시도
          </Button>
        </Card>
      </motion.div>
    </div>
  );
}📦 최종 패키지 설정파일: package.json (최종)json{
  "name": "pando-fitness",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "analyze": "ANALYZE=true next build"
  },
  "dependencies": {
    "next": "15.5.7",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "framer-motion": "^11.0.0",
    "zustand": "^4.5.0",
    "lucide-react": "^0.300.0",
    "recharts": "^2.10.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.0.1",
    "postcss": "^8",
    "tailwindcss": "^3.3.0",
    "typescript": "^5"
  }
}🎉 프로젝트 완성!최종 체크리스트✅ PHASE 16: Zustand 상태 관리

 Auth Store (로그인/로그아웃)
 Workout Store (운동 진행 상태)
 Notification Store (토스트 알림)
 UI Store (모달, 로딩, 사이드바)
 Toast 컴포넌트
✅ PHASE 17: 성능 최적화

 React.memo 적용
 LazyImage 컴포넌트
 useIntersectionObserver 훅
 useDebounce 훅
 이미지 최적화 유틸
 Next.js 설정 최적화
✅ PHASE 18: PWA 설정

 manifest.json
 Service Worker (sw.js)
 PWA 설치 프롬프트
 오프라인 페이지
 푸시 알림 설정
 아이콘 세트


 