'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, QrCode, Dumbbell, Video, BarChart3, User } from 'lucide-react';

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { path: '/', icon: Home, label: '홈' },
    { path: '/qr-scan', icon: QrCode, label: 'QR' },
    { path: '/routine', icon: Dumbbell, label: '루틴' },
    { path: '/ugc', icon: Video, label: 'UGC' },
    { path: '/report', icon: BarChart3, label: '리포트' },
    { path: '/mypage', icon: User, label: '마이' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 50,
    }}>
      {/* Gradient overlay for smooth transition */}
      <div style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: '-32px',
        height: '32px',
        background: 'linear-gradient(to top, #0D0D12, transparent)',
        pointerEvents: 'none',
      }} />

      {/* Main nav container */}
      <div style={{
        position: 'relative',
        background: 'rgba(13, 13, 18, 0.95)',
        backdropFilter: 'blur(24px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          maxWidth: '512px',
          margin: '0 auto',
          padding: '8px 8px calc(8px + env(safe-area-inset-bottom))',
        }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <motion.button
                key={item.path}
                onClick={() => router.push(item.path)}
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                  padding: '8px 4px',
                  borderRadius: '16px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
                whileTap={{ scale: 0.9 }}
              >
                {/* Active background */}
                {active && (
                  <motion.div
                    layoutId="navActive"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to bottom, rgba(0, 217, 255, 0.2), rgba(0, 217, 255, 0.05))',
                      borderRadius: '16px',
                    }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                {/* Active indicator dot */}
                {active && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{
                      position: 'absolute',
                      top: '-4px',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: '#00D9FF',
                      boxShadow: '0 0 8px rgba(0, 217, 255, 0.8)',
                    }}
                  />
                )}

                {/* Icon */}
                <div style={{ position: 'relative', zIndex: 10 }}>
                  <Icon
                    size={20}
                    strokeWidth={active ? 2.5 : 2}
                    style={{
                      color: active ? '#00D9FF' : '#6B7280',
                      filter: active ? 'drop-shadow(0 0 8px rgba(0, 217, 255, 0.6))' : 'none',
                      transition: 'all 0.3s',
                    }}
                  />
                </div>

                {/* Label */}
                <span
                  style={{
                    position: 'relative',
                    zIndex: 10,
                    fontSize: '10px',
                    marginTop: '4px',
                    fontWeight: 500,
                    color: active ? '#00D9FF' : '#6B7280',
                    transition: 'color 0.3s',
                  }}
                >
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
