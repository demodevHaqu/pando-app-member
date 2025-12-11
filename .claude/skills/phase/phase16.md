🎯 PHASE 16: Zustand 상태 관리Task 16.1: Zustand 설치 및 Store 구조설치:
bashnpm install zustand파일: store/authStore.tstypescriptimport { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  tier: 'basic' | 'premium' | 'vip';
  points: number;
  badges: string[];
  membershipExpiry: string;
}

interface AuthState {
  isAuthenticated: boolean;
  member: Member | null;
  login: (member: Member) => void;
  logout: () => void;
  updateMember: (member: Partial<Member>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      member: null,
      login: (member) => set({ isAuthenticated: true, member }),
      logout: () => set({ isAuthenticated: false, member: null }),
      updateMember: (updatedMember) =>
        set((state) => ({
          member: state.member ? { ...state.member, ...updatedMember } : null,
        })),
    }),
    {
      name: 'auth-storage',
    }
  )
);파일: store/workoutStore.tstypescriptimport { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Exercise {
  id: string;
  name: string;
  sets: number[];
  completedSets: number[];
  notes?: string;
}

interface WorkoutState {
  currentRoutine: string | null;
  currentExercise: number;
  exercises: Exercise[];
  startTime: Date | null;
  isActive: boolean;
  
  startRoutine: (routineId: string, exercises: Exercise[]) => void;
  completeSet: (exerciseIndex: number, setIndex: number) => void;
  nextExercise: () => void;
  completeRoutine: () => void;
  pauseWorkout: () => void;
  resumeWorkout: () => void;
  resetWorkout: () => void;
}

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set, get) => ({
      currentRoutine: null,
      currentExercise: 0,
      exercises: [],
      startTime: null,
      isActive: false,

      startRoutine: (routineId, exercises) =>
        set({
          currentRoutine: routineId,
          currentExercise: 0,
          exercises,
          startTime: new Date(),
          isActive: true,
        }),

      completeSet: (exerciseIndex, setIndex) =>
        set((state) => {
          const newExercises = [...state.exercises];
          if (!newExercises[exerciseIndex].completedSets.includes(setIndex)) {
            newExercises[exerciseIndex].completedSets.push(setIndex);
          }
          return { exercises: newExercises };
        }),

      nextExercise: () =>
        set((state) => ({
          currentExercise: Math.min(state.currentExercise + 1, state.exercises.length - 1),
        })),

      completeRoutine: () =>
        set({
          currentRoutine: null,
          currentExercise: 0,
          exercises: [],
          startTime: null,
          isActive: false,
        }),

      pauseWorkout: () => set({ isActive: false }),
      resumeWorkout: () => set({ isActive: true }),
      resetWorkout: () =>
        set({
          currentRoutine: null,
          currentExercise: 0,
          exercises: [],
          startTime: null,
          isActive: false,
        }),
    }),
    {
      name: 'workout-storage',
    }
  )
);파일: store/notificationStore.tstypescriptimport { create } from 'zustand';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface NotificationState {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  
  addNotification: (notification) => {
    const id = Date.now().toString();
    const newNotification = { ...notification, id };
    
    set((state) => ({
      notifications: [...state.notifications, newNotification],
    }));

    // Auto remove after duration
    if (notification.duration !== 0) {
      setTimeout(() => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      }, notification.duration || 3000);
    }
  },

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  clearAll: () => set({ notifications: [] }),
}));파일: store/uiStore.tstypescriptimport { create } from 'zustand';

interface UIState {
  isSidebarOpen: boolean;
  isLoading: boolean;
  activeModal: string | null;
  bottomNavVisible: boolean;
  
  toggleSidebar: () => void;
  setLoading: (isLoading: boolean) => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
  setBottomNavVisible: (visible: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: false,
  isLoading: false,
  activeModal: null,
  bottomNavVisible: true,

  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setLoading: (isLoading) => set({ isLoading }),
  openModal: (modalId) => set({ activeModal: modalId }),
  closeModal: () => set({ activeModal: null }),
  setBottomNavVisible: (visible) => set({ bottomNavVisible: visible }),
}));Task 16.2: Store 사용 예시파일: app/login/page.tsx (수정)typescript'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useNotificationStore } from '@/store/notificationStore';
import { MOCK_MEMBER } from '@/data/mock/members';

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const addNotification = useNotificationStore((state) => state.addNotification);
  
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Mock login
    login(MOCK_MEMBER);
    addNotification({
      title: '로그인 성공',
      message: `${MOCK_MEMBER.name}님 환영합니다!`,
      type: 'success',
    });
    router.push('/');
  };

  // ... rest of component
}파일: components/layout/BottomNav.tsx (수정)typescript'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Calendar, QrCode, Users, User } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const bottomNavVisible = useUIStore((state) => state.bottomNavVisible);

  if (!bottomNavVisible) return null;

  // ... rest of component
}파일: components/ui/Toast.tsx (새 파일)typescript'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotificationStore } from '@/store/notificationStore';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const { notifications, removeNotification } = useNotificationStore();

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} className="text-neon-green" />;
      case 'error':
        return <AlertCircle size={20} className="text-power-pink" />;
      case 'warning':
        return <AlertCircle size={20} className="text-cyber-yellow" />;
      case 'info':
        return <Info size={20} className="text-electric-blue" />;
      default:
        return <Info size={20} />;
    }
  };

  const getBackground = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-neon-green/10 border-neon-green/50';
      case 'error':
        return 'bg-power-pink/10 border-power-pink/50';
      case 'warning':
        return 'bg-cyber-yellow/10 border-cyber-yellow/50';
      case 'info':
        return 'bg-electric-blue/10 border-electric-blue/50';
      default:
        return 'bg-cyber-mid border-white/10';
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className={`p-4 rounded-lg backdrop-blur-sm border ${getBackground(
              notification.type
            )} shadow-lg`}
          >
            <div className="flex items-start gap-3">
              {getIcon(notification.type)}
              <div className="flex-1 min-w-0">
                <div className="font-bold text-white mb-1">{notification.title}</div>
                <div className="text-sm text-gray-300">{notification.message}</div>
              </div>
              <button
                onClick={() => removeNotification(notification.id)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}파일: app/layout.tsx (Toast 추가)typescriptimport Toast from '@/components/ui/Toast';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        {children}
        <Toast />
      </body>
    </html>
  );
}