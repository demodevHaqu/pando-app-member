'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Badge from '@/components/ui/Badge';
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

// Card Component
const Card = ({
  children,
  variant = 'default',
  glow = false,
  style = {},
}: {
  children: React.ReactNode;
  variant?: 'default' | 'hologram' | 'glass';
  glow?: boolean;
  style?: React.CSSProperties;
}) => {
  const baseStyle: React.CSSProperties = {
    background: variant === 'hologram'
      ? 'linear-gradient(145deg, rgba(26, 26, 36, 0.95), rgba(13, 13, 18, 0.98))'
      : variant === 'glass'
      ? 'rgba(255, 255, 255, 0.05)'
      : 'linear-gradient(145deg, rgba(26, 26, 36, 0.95), rgba(13, 13, 18, 0.98))',
    border: variant === 'hologram'
      ? '1px solid rgba(0, 217, 255, 0.3)'
      : '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: '16px',
    backdropFilter: 'blur(20px)',
    boxShadow: glow
      ? '0 0 20px rgba(0, 217, 255, 0.2)'
      : '0 4px 24px rgba(0, 0, 0, 0.4)',
    ...style,
  };

  return <div style={baseStyle}>{children}</div>;
};

// Tabs Component
const Tabs = ({
  tabs,
  activeTab,
  onChange,
}: {
  tabs: { id: string; label: string; content: React.ReactNode }[];
  activeTab?: string;
  onChange?: (id: string) => void;
}) => {
  const [internalActive, setInternalActive] = useState(tabs[0]?.id || '');
  const currentTab = activeTab || internalActive;
  const handleChange = onChange || setInternalActive;

  return (
    <div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleChange(tab.id)}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '12px',
              border: 'none',
              background: currentTab === tab.id
                ? 'linear-gradient(135deg, #00D9FF, #7209B7)'
                : 'rgba(255, 255, 255, 0.05)',
              color: currentTab === tab.id ? 'white' : '#9CA3AF',
              fontWeight: 600,
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        {tabs.find((tab) => tab.id === currentTab)?.content}
      </div>
    </div>
  );
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
                  <div style={{ display: 'flex', gap: '16px' }}>
                    {/* 날짜 */}
                    <div style={{ flexShrink: 0, width: '56px', textAlign: 'center' }}>
                      <div style={{ fontSize: '14px', color: '#9CA3AF' }}>{month}월</div>
                      <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>{day}</div>
                      <div style={{ fontSize: '12px', color: '#6B7280' }}>{dayName}요일</div>
                    </div>

                    {/* 세부 정보 */}
                    <div style={{ flex: 1, borderLeft: '1px solid rgba(255, 255, 255, 0.1)', paddingLeft: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <Clock size={14} color="#00D9FF" />
                        <span style={{ color: 'white' }}>
                          {visit.checkIn} - {visit.checkOut}
                        </span>
                        <Badge type="growth">{formatDuration(visit.duration)}</Badge>
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {visit.activities.map((activity, i) => (
                          <span
                            key={i}
                            style={{
                              padding: '4px 8px',
                              background: '#1A1A24',
                              color: '#D1D5DB',
                              borderRadius: '4px',
                              fontSize: '12px',
                            }}
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* 월 선택 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button
              onClick={() => changeMonth(-1)}
              style={{
                padding: '8px',
                background: 'transparent',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              <ChevronLeft size={24} color="#9CA3AF" />
            </button>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>
              {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
            </h3>
            <button
              onClick={() => changeMonth(1)}
              style={{
                padding: '8px',
                background: 'transparent',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              <ChevronRight size={24} color="#9CA3AF" />
            </button>
          </div>

          {/* 캘린더 그리드 */}
          <Card>
            {/* 요일 헤더 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '8px' }}>
              {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                <div key={day} style={{ textAlign: 'center', fontSize: '12px', color: '#6B7280', padding: '8px' }}>
                  {day}
                </div>
              ))}
            </div>

            {/* 날짜 그리드 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
              {Array.from({ length: 35 }, (_, i) => {
                const dayNum = i - new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay() + 1;
                const isCurrentMonth = dayNum > 0 && dayNum <= new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
                const hasVisit = isCurrentMonth && [10, 12, 13, 14, 15].includes(dayNum);
                const isToday = isCurrentMonth && dayNum === new Date().getDate() && currentMonth.getMonth() === new Date().getMonth();

                return (
                  <div
                    key={i}
                    style={{
                      aspectRatio: '1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '8px',
                      fontSize: '14px',
                      color: isCurrentMonth ? 'white' : '#374151',
                      background: hasVisit ? 'linear-gradient(135deg, #FF6B35, #FF006E)' : 'transparent',
                      border: isToday && !hasVisit ? '2px solid #00D9FF' : 'none',
                    }}
                  >
                    {isCurrentMonth ? dayNum : ''}
                  </div>
                );
              })}
            </div>

            {/* 범례 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '16px', height: '16px', background: 'linear-gradient(135deg, #FF6B35, #FF006E)', borderRadius: '4px' }} />
                <span style={{ fontSize: '12px', color: '#9CA3AF' }}>운동한 날</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '16px', height: '16px', border: '2px solid #00D9FF', borderRadius: '4px' }} />
                <span style={{ fontSize: '12px', color: '#9CA3AF' }}>오늘</span>
              </div>
            </div>
          </Card>
        </div>
      ),
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D12', paddingBottom: '80px' }}>
      <Header title="방문 기록" showBack={true} showLogo={true} showNotification={false} />

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* 이번 달 통계 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card variant="hologram">
            <h3 style={{ fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>이번 달 운동 현황</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '16px' }}>
              <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', textAlign: 'center' }}>
                <Calendar size={24} color="#00D9FF" style={{ margin: '0 auto 8px' }} />
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>{MONTHLY_STATS.totalVisits}</div>
                <div style={{ fontSize: '12px', color: '#9CA3AF' }}>방문 횟수</div>
              </div>
              <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', textAlign: 'center' }}>
                <Clock size={24} color="#39FF14" style={{ margin: '0 auto 8px' }} />
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>
                  {Math.floor(MONTHLY_STATS.totalDuration / 60)}시간
                </div>
                <div style={{ fontSize: '12px', color: '#9CA3AF' }}>총 운동 시간</div>
              </div>
              <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', textAlign: 'center' }}>
                <TrendingUp size={24} color="#FF6B35" style={{ margin: '0 auto 8px' }} />
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>{MONTHLY_STATS.avgDuration}분</div>
                <div style={{ fontSize: '12px', color: '#9CA3AF' }}>평균 운동 시간</div>
              </div>
              <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', textAlign: 'center' }}>
                <Award size={24} color="#FFD60A" style={{ margin: '0 auto 8px' }} />
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>{MONTHLY_STATS.streak}일</div>
                <div style={{ fontSize: '12px', color: '#9CA3AF' }}>연속 출석</div>
              </div>
            </div>

            {/* 추가 정보 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: '#9CA3AF' }}>선호 시간대</span>
                <span style={{ color: 'white' }}>{MONTHLY_STATS.favoriteTime}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: '#9CA3AF' }}>가장 많이 한 운동</span>
                <span style={{ color: 'white' }}>{MONTHLY_STATS.mostActivity}</span>
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
