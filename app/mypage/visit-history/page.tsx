'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Tabs from '@/components/ui/Tabs';
import { Calendar, Clock, MapPin, TrendingUp, Award, ChevronLeft, ChevronRight } from 'lucide-react';

// Mock 방문 기록 데이터
const MOCK_VISIT_HISTORY = [
  {
    id: 'visit1',
    date: '2025-01-15',
    checkIn: '09:30',
    checkOut: '11:45',
    duration: 135,
    activities: ['웨이트 트레이닝', 'GX 요가'],
  },
  {
    id: 'visit2',
    date: '2025-01-14',
    checkIn: '18:00',
    checkOut: '20:30',
    duration: 150,
    activities: ['웨이트 트레이닝', '러닝'],
  },
  {
    id: 'visit3',
    date: '2025-01-13',
    checkIn: '07:00',
    checkOut: '08:30',
    duration: 90,
    activities: ['러닝', '스트레칭'],
  },
  {
    id: 'visit4',
    date: '2025-01-12',
    checkIn: '14:00',
    checkOut: '16:00',
    duration: 120,
    activities: ['PT', '웨이트 트레이닝'],
  },
  {
    id: 'visit5',
    date: '2025-01-10',
    checkIn: '19:00',
    checkOut: '21:00',
    duration: 120,
    activities: ['GX 스피닝', '사우나'],
  },
];

// 이번 달 통계
const MONTHLY_STATS = {
  totalVisits: 15,
  totalDuration: 1800, // 분
  avgDuration: 120,
  streak: 5,
  favoriteTime: '저녁 (18-21시)',
  mostActivity: '웨이트 트레이닝',
};

export default function VisitHistoryPage() {
  const router = useRouter();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // 날짜 포맷
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return {
      month: date.getMonth() + 1,
      day: date.getDate(),
      dayName: days[date.getDay()],
    };
  };

  // 시간 포맷 (분 -> 시간:분)
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}시간 ${mins}분` : `${mins}분`;
  };

  // 월 변경
  const changeMonth = (delta: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + delta);
    setCurrentMonth(newMonth);
  };

  const tabContent = [
    {
      id: 'history',
      label: '방문 기록',
      content: (
        <div className="space-y-3">
          {MOCK_VISIT_HISTORY.map((visit, idx) => {
            const { month, day, dayName } = formatDate(visit.date);
            return (
              <motion.div
                key={visit.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card>
                  <div className="flex gap-4">
                    {/* 날짜 */}
                    <div className="flex-shrink-0 w-14 text-center">
                      <div className="text-sm text-gray-400">{month}월</div>
                      <div className="text-2xl font-bold text-white">{day}</div>
                      <div className="text-xs text-gray-500">{dayName}요일</div>
                    </div>

                    {/* 세부 정보 */}
                    <div className="flex-1 border-l border-white/10 pl-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock size={14} className="text-electric-blue" />
                        <span className="text-white">
                          {visit.checkIn} - {visit.checkOut}
                        </span>
                        <Badge type="growth">{formatDuration(visit.duration)}</Badge>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {visit.activities.map((activity, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-cyber-mid text-gray-300 rounded text-xs"
                          >
                            {activity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      ),
    },
    {
      id: 'calendar',
      label: '캘린더',
      content: (
        <div className="space-y-4">
          {/* 월 선택 */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => changeMonth(-1)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronLeft size={24} className="text-gray-400" />
            </button>
            <h3 className="text-xl font-bold text-white">
              {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
            </h3>
            <button
              onClick={() => changeMonth(1)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronRight size={24} className="text-gray-400" />
            </button>
          </div>

          {/* 캘린더 그리드 */}
          <Card>
            {/* 요일 헤더 */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                <div key={day} className="text-center text-xs text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* 날짜 그리드 (간단한 표시) */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 35 }, (_, i) => {
                const dayNum = i - new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay() + 1;
                const isCurrentMonth = dayNum > 0 && dayNum <= new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
                const hasVisit = isCurrentMonth && [10, 12, 13, 14, 15].includes(dayNum);
                const isToday = isCurrentMonth && dayNum === new Date().getDate() && currentMonth.getMonth() === new Date().getMonth();

                return (
                  <div
                    key={i}
                    className={`aspect-square flex items-center justify-center rounded-lg text-sm ${
                      isCurrentMonth ? 'text-white' : 'text-gray-700'
                    } ${hasVisit ? 'bg-gradient-energy' : ''} ${
                      isToday && !hasVisit ? 'ring-2 ring-electric-blue' : ''
                    }`}
                  >
                    {isCurrentMonth ? dayNum : ''}
                  </div>
                );
              })}
            </div>

            {/* 범례 */}
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-energy rounded" />
                <span className="text-xs text-gray-400">운동한 날</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-electric-blue rounded" />
                <span className="text-xs text-gray-400">오늘</span>
              </div>
            </div>
          </Card>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-cyber-dark pb-20">
      <Header title="방문 기록" showBack={true} showNotification={false} />

      <div className="p-4 space-y-6">
        {/* 이번 달 통계 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card variant="hologram">
            <h3 className="font-bold text-white mb-4">이번 달 운동 현황</h3>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 glass-dark rounded-lg text-center">
                <Calendar size={24} className="text-electric-blue mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{MONTHLY_STATS.totalVisits}</div>
                <div className="text-xs text-gray-400">방문 횟수</div>
              </div>
              <div className="p-3 glass-dark rounded-lg text-center">
                <Clock size={24} className="text-neon-green mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  {Math.floor(MONTHLY_STATS.totalDuration / 60)}시간
                </div>
                <div className="text-xs text-gray-400">총 운동 시간</div>
              </div>
              <div className="p-3 glass-dark rounded-lg text-center">
                <TrendingUp size={24} className="text-energy-orange mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{MONTHLY_STATS.avgDuration}분</div>
                <div className="text-xs text-gray-400">평균 운동 시간</div>
              </div>
              <div className="p-3 glass-dark rounded-lg text-center">
                <Award size={24} className="text-cyber-yellow mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{MONTHLY_STATS.streak}일</div>
                <div className="text-xs text-gray-400">연속 출석</div>
              </div>
            </div>

            {/* 추가 정보 */}
            <div className="space-y-2 pt-3 border-t border-white/10">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">선호 시간대</span>
                <span className="text-white">{MONTHLY_STATS.favoriteTime}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">가장 많이 한 운동</span>
                <span className="text-white">{MONTHLY_STATS.mostActivity}</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* 탭 콘텐츠 */}
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
