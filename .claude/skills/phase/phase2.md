🚀 PHASE 2: 레이아웃 및 네비게이션
Task 2.1: Root Layout
파일: app/layout.tsx
typescriptimport type { Metadata } from "next";
import "./globals.css";
import BottomNav from "@/components/layout/BottomNav";

export const metadata: Metadata = {
  title: "PANDO Fitness",
  description: "AI 기반 스마트 피트니스 회원 앱",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: "#0D0D12",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <div className="max-w-[425px] mx-auto min-h-screen bg-cyber-dark relative">
          <main className="pb-16">
            {children}
          </main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}

Task 2.2: Bottom Navigation
파일: components/layout/BottomNav.tsx
typescript'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Home, QrCode, Dumbbell, BarChart3, User } from 'lucide-react';

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { path: '/', icon: Home, label: '홈' },
    { path: '/qr-scan', icon: QrCode, label: 'QR' },
    { path: '/routine', icon: Dumbbell, label: '루틴' },
    { path: '/report', icon: BarChart3, label: '리포트' },
    { path: '/mypage', icon: User, label: '마이' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-[425px] mx-auto bg-cyber-mid border-t border-white/10 z-40">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-all ${
                active ? 'text-electric-blue' : 'text-gray-400'
              }`}
            >
              <Icon 
                size={24} 
                className={active ? 'icon-glow mb-1' : 'mb-1'} 
              />
              <span className={`text-xs ${active ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
              {active && (
                <div className="absolute bottom-0 w-10 h-0.5 bg-electric-blue shadow-glow-blue rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

Task 2.3: Header Component
파일: components/layout/Header.tsx
typescript'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Bell, ChevronLeft } from 'lucide-react';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showNotification?: boolean;
  notificationCount?: number;
}

export default function Header({ 
  title, 
  showBack = false, 
  showNotification = true,
  notificationCount = 0 
}: HeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 left-0 right-0 max-w-[425px] mx-auto bg-cyber-dark/95 backdrop-blur-lg border-b border-white/10 z-30">
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-2">
          {showBack && (
            <button
              onClick={() => router.back()}
              className="text-white hover:text-electric-blue transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          {title && (
            <h1 className="text-lg font-bold text-white">{title}</h1>
          )}
        </div>

        {showNotification && (
          <button
            onClick={() => router.push('/notifications')}
            className="relative text-gray-400 hover:text-white transition-colors"
          >
            <Bell size={24} />
            {notificationCount > 0 && (
              <div className="absolute -top-1 -right-1 notification-dot" />
            )}
          </button>
        )}
      </div>
    </header>
  );
}

✅ PHASE 2 완료 체크리스트:

 Root Layout 구현
 Bottom Navigation 구현 (5개 메뉴)
 Header 컴포넌트 구현 (Back, Title, Notification)