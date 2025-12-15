'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Badge from '@/components/ui/Badge';
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {MOCK_USAGE_HISTORY.pt.map((session, idx) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'rgba(255, 107, 53, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Dumbbell size={24} color="#FF6B35" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <h4 style={{ fontWeight: 'bold', color: 'white' }}>{session.trainer} 트레이너</h4>
                      <span style={{ fontSize: '12px', color: '#9CA3AF' }}>{formatDate(session.date)}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#9CA3AF', marginBottom: '8px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Timer size={14} />
                        {session.duration}분
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <TrendingUp size={14} />
                        {session.calories}kcal
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {session.exercises.map((ex, i) => (
                        <Badge key={i} type="info">
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {MOCK_USAGE_HISTORY.gx.map((session, idx) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'rgba(57, 255, 20, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Users size={24} color="#39FF14" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <h4 style={{ fontWeight: 'bold', color: 'white' }}>{session.className}</h4>
                      <span style={{ fontSize: '12px', color: '#9CA3AF' }}>{formatDate(session.date)}</span>
                    </div>
                    <p style={{ fontSize: '14px', color: '#9CA3AF', marginBottom: '8px' }}>{session.instructor} 강사</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#00D9FF' }}>
                        <Timer size={14} />
                        {session.duration}분
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#FF6B35' }}>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {MOCK_USAGE_HISTORY.facilities.map((usage, idx) => (
            <motion.div
              key={usage.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'rgba(114, 9, 183, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Droplets size={24} color="#7209B7" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <h4 style={{ fontWeight: 'bold', color: 'white' }}>{usage.type}</h4>
                      <span style={{ fontSize: '12px', color: '#9CA3AF' }}>{formatDate(usage.date)}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#9CA3AF' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={14} />
                        {usage.time}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
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
    <div style={{ minHeight: '100vh', background: '#0D0D12', paddingBottom: '80px' }}>
      <Header title="이용 내역" showBack={true} showLogo={true} showNotification={false} />

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* 월간 요약 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card variant="hologram" glow>
            <h3 style={{ fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>이번 달 이용 현황</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '16px' }}>
              <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', textAlign: 'center' }}>
                <Dumbbell size={24} color="#FF6B35" style={{ margin: '0 auto 8px' }} />
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>{MONTHLY_SUMMARY.totalPT}회</div>
                <div style={{ fontSize: '12px', color: '#9CA3AF' }}>PT 세션</div>
              </div>
              <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', textAlign: 'center' }}>
                <Users size={24} color="#39FF14" style={{ margin: '0 auto 8px' }} />
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>{MONTHLY_SUMMARY.totalGX}회</div>
                <div style={{ fontSize: '12px', color: '#9CA3AF' }}>GX 클래스</div>
              </div>
              <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', textAlign: 'center' }}>
                <TrendingUp size={24} color="#00D9FF" style={{ margin: '0 auto 8px' }} />
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>
                  {MONTHLY_SUMMARY.totalCalories.toLocaleString()}
                </div>
                <div style={{ fontSize: '12px', color: '#9CA3AF' }}>소모 칼로리</div>
              </div>
              <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', textAlign: 'center' }}>
                <Timer size={24} color="#7209B7" style={{ margin: '0 auto 8px' }} />
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>
                  {Math.round(MONTHLY_SUMMARY.totalTime / 60)}시간
                </div>
                <div style={{ fontSize: '12px', color: '#9CA3AF' }}>총 운동 시간</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: '#9CA3AF' }}>자주 이용한 시설</span>
                <span style={{ color: 'white' }}>{MONTHLY_SUMMARY.mostUsedFacility}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: '#9CA3AF' }}>인기 GX 클래스</span>
                <span style={{ color: 'white' }}>{MONTHLY_SUMMARY.favoriteGX}</span>
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
