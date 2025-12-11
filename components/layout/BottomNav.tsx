'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
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
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      {/* Gradient overlay for smooth transition */}
      <div className="absolute inset-x-0 -top-8 h-8 bg-gradient-to-t from-[#0D0D12] to-transparent pointer-events-none" />

      {/* Main nav container */}
      <div className="relative bg-[#0D0D12]/95 backdrop-blur-xl border-t border-white/[0.08]">
        <div className="flex items-center justify-around max-w-lg mx-auto px-2 py-2 pb-[calc(8px+env(safe-area-inset-bottom))]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <motion.button
                key={item.path}
                onClick={() => router.push(item.path)}
                className="relative flex flex-col items-center justify-center flex-1 py-2 px-3 rounded-2xl"
                whileTap={{ scale: 0.9 }}
              >
                {/* Active background */}
                {active && (
                  <motion.div
                    layoutId="navActive"
                    className="absolute inset-0 bg-gradient-to-b from-electric-blue/20 to-electric-blue/5 rounded-2xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                {/* Active indicator dot */}
                {active && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 w-1 h-1 rounded-full bg-electric-blue shadow-glow-blue"
                  />
                )}

                {/* Icon */}
                <div className="relative z-10">
                  <Icon
                    size={22}
                    strokeWidth={active ? 2.5 : 2}
                    className={`transition-all duration-300 ${
                      active
                        ? 'text-electric-blue drop-shadow-[0_0_8px_rgba(0,217,255,0.6)]'
                        : 'text-gray-500'
                    }`}
                  />
                </div>

                {/* Label */}
                <span
                  className={`relative z-10 text-[10px] mt-1 font-medium transition-colors duration-300 ${
                    active ? 'text-electric-blue' : 'text-gray-500'
                  }`}
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
