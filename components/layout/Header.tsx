'use client';

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
    <header className="sticky top-0 left-0 right-0 w-full bg-cyber-dark/95 backdrop-blur-lg border-b border-white/10 z-30">
      <div className="flex items-center justify-between h-14 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
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