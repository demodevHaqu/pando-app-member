'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Bell, ChevronLeft, Home } from 'lucide-react';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showHome?: boolean;
  showLogo?: boolean;
  showNotification?: boolean;
  notificationCount?: number;
  rightAction?: React.ReactNode;
}

export default function Header({
  title,
  showBack = false,
  showHome = false,
  showLogo = false,
  showNotification = true,
  notificationCount = 0,
  rightAction
}: HeaderProps) {
  const router = useRouter();

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      background: 'rgba(13, 13, 18, 0.95)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      zIndex: 30,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '56px',
        padding: '0 16px',
        maxWidth: '672px',
        margin: '0 auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {showBack && (
            <button
              onClick={() => router.back()}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ChevronLeft size={24} />
            </button>
          )}
          {showHome && !showBack && (
            <button
              onClick={() => router.push('/')}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Home size={22} />
            </button>
          )}
          {showLogo && (
            <div
              onClick={() => router.push('/')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
              }}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #00D9FF, #7209B7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 10px rgba(0, 217, 255, 0.3)',
              }}>
                <span style={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}>FG</span>
              </div>
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '16px' }}>Fit Genie</span>
            </div>
          )}
          {title && (
            <h1 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: 'white',
              margin: 0,
            }}>{title}</h1>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {rightAction}
          {showNotification && (
            <button
              onClick={() => router.push('/notifications')}
              style={{
                position: 'relative',
                background: 'none',
                border: 'none',
                color: '#9CA3AF',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Bell size={24} />
              {notificationCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: '#FF006E',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
