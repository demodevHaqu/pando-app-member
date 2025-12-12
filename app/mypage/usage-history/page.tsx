'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Tabs from '@/components/ui/Tabs';
import {
  Dumbbell,
  Users,
  Droplets,
  Timer,
  Calendar,
  TrendingUp,
  Clock,
  ChevronRight,
} from 'lucide-react';

// Mock 이용 내역 데이터
const MOCK_USAGE_HISTORY = {
  pt: [
    {
      id: 'pt1',
      date: '2025-01-15',
      trainer: '강동원',
      duration: 60,
      exercises: ['스쿼트', '벤치프레스', '데드리프트'],
      calories: 450,
    },
    {
      id: 'pt2',
      date: '2025-01-12',
      trainer: '강동원',
      duration: 60,
      exercises: ['풀업', '랫풀다운', '바벨로우'],
      calories: 380,
    },
    {
      id: 'pt3',
      date: '2025-01-08',
      trainer: '강동원',
      duration: 60,
      exercises: ['어깨프레스', '레터럴레이즈', '페이스풀'],
      calories: 320,
    },
  ],
  gx: [
    {
      id: 'gx1',
      date: '2025-01-14',
      className: '파워 요가',
      instructor: '박지연',
      duration: 50,
      calories: 280,
    },
    {
      id: 'gx2',
      date: '2025-01-11',
      className: '스피닝',
      instructor: '김민수',
      duration: 45,
      calories: 520,
    },
    {
      id: 'gx3',
      date: '2025-01-07',
      className: '필라테스',
      instructor: '이수진',
      duration: 50,
      calories: 200,
    },
  ],
  facilities: [
    {
      id: 'fac1',
      date: '2025-01-15',
      type: '사우나',
      duration: 30,
      time: '20:30',
    },
    {
      id: 'fac2',
      date: '2025-01-13',
      type: '샤워실',
      duration: 15,
      time: '19:45',
    },
    {
      id: 'fac3',
      date: '2025-01-10',
      type: '사우나',
      duration: 25,
      time: '21:00',
    },
    {
      id: 'fac4',
      date: '2025-01-08',
      type: '락커',
      duration: 120,
      time: '18:00',
    },
  ],
};

// 월간 요약
const MONTHLY_SUMMARY = {
  totalPT: 4,
  totalGX: 6,
  totalCalories: 3250,
  totalTime: 890, // 분
  mostUsedFacility: '사우나',
  favoriteGX: '스피닝',
};

export default function UsageHistoryPage() {
  const router = useRouter();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric',
      weekday: 'short',
    });
  };

  const tabContent = [
    {
      id: 'pt',
      label: 'PT',
      content: (
        <div className="space-y-3">
          {MOCK_USAGE_HISTORY.pt.map((session, idx) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-energy/20 flex items-center justify-center flex-shrink-0">
                    <Dumbbell size={24} className="text-energy-orange" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-white">{session.trainer} 트레이너</h4>
                      <span className="text-xs text-gray-400">{formatDate(session.date)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-400 mb-2">
                      <span className="flex items-center gap-1">
                        <Timer size={14} />
                        {session.duration}분
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp size={14} />
                        {session.calories}kcal
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {session.exercises.map((ex, i) => (
                        <Badge key={i} type="status">
                          {ex}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ),
    },
    {
      id: 'gx',
      label: 'GX',
      content: (
        <div className="space-y-3">
          {MOCK_USAGE_HISTORY.gx.map((session, idx) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-growth/20 flex items-center justify-center flex-shrink-0">
                    <Users size={24} className="text-neon-green" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-white">{session.className}</h4>
                      <span className="text-xs text-gray-400">{formatDate(session.date)}</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">{session.instructor} 강사</p>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="flex items-center gap-1 text-electric-blue">
                        <Timer size={14} />
                        {session.duration}분
                      </span>
                      <span className="flex items-center gap-1 text-energy-orange">
                        <TrendingUp size={14} />
                        {session.calories}kcal
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ),
    },
    {
      id: 'facilities',
      label: '시설',
      content: (
        <div className="space-y-3">
          {MOCK_USAGE_HISTORY.facilities.map((usage, idx) => (
            <motion.div
              key={usage.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-premium/20 flex items-center justify-center flex-shrink-0">
                    <Droplets size={24} className="text-tech-purple" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-white">{usage.type}</h4>
                      <span className="text-xs text-gray-400">{formatDate(usage.date)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {usage.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Timer size={14} />
                        {usage.duration}분 이용
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-cyber-dark pb-20">
      <Header title="이용 내역" showBack={true} showNotification={false} />

      <div className="p-4 space-y-6">
        {/* 월간 요약 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card variant="hologram" glow>
            <h3 className="font-bold text-white mb-4">이번 달 이용 현황</h3>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 glass-dark rounded-lg text-center">
                <Dumbbell size={24} className="text-energy-orange mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{MONTHLY_SUMMARY.totalPT}회</div>
                <div className="text-xs text-gray-400">PT 세션</div>
              </div>
              <div className="p-3 glass-dark rounded-lg text-center">
                <Users size={24} className="text-neon-green mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{MONTHLY_SUMMARY.totalGX}회</div>
                <div className="text-xs text-gray-400">GX 클래스</div>
              </div>
              <div className="p-3 glass-dark rounded-lg text-center">
                <TrendingUp size={24} className="text-electric-blue mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  {MONTHLY_SUMMARY.totalCalories.toLocaleString()}
                </div>
                <div className="text-xs text-gray-400">소모 칼로리</div>
              </div>
              <div className="p-3 glass-dark rounded-lg text-center">
                <Timer size={24} className="text-tech-purple mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  {Math.round(MONTHLY_SUMMARY.totalTime / 60)}시간
                </div>
                <div className="text-xs text-gray-400">총 운동 시간</div>
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-white/10">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">자주 이용한 시설</span>
                <span className="text-white">{MONTHLY_SUMMARY.mostUsedFacility}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">인기 GX 클래스</span>
                <span className="text-white">{MONTHLY_SUMMARY.favoriteGX}</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* 상세 내역 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs tabs={tabContent} />
        </motion.div>
      </div>
    </div>
  );
}
