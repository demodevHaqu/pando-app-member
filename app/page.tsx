'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Zap,
  ChevronRight,
  Flame,
  Sparkles,
  Star,
  TrendingUp,
  Bell,
  Target
} from 'lucide-react';
import { MOCK_MEMBER } from '@/data/mock/members';
import { MOCK_ROUTINES } from '@/data/mock/routines';
import { MOCK_GX_CLASSES } from '@/data/mock/gxClasses';
import { MOCK_NOTIFICATIONS } from '@/data/mock/notifications';

// Modern Card Component
const ModernCard = ({
  children,
  className = '',
  onClick,
  style = {}
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}) => (
  <div
    onClick={onClick}
    className={className}
    style={{
      background: 'linear-gradient(145deg, rgba(26, 26, 36, 0.95), rgba(13, 13, 18, 0.98))',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '20px',
      backdropFilter: 'blur(20px)',
      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
      cursor: onClick ? 'pointer' : 'default',
      transition: 'all 0.3s ease',
      ...style
    }}
  >
    {children}
  </div>
);

// Feature Card with gradient border
const FeatureCard = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      position: 'relative',
      borderRadius: '24px',
      padding: '2px',
      background: 'linear-gradient(135deg, #00D9FF, #7209B7, #FF006E)',
    }}
  >
    <div
      style={{
        background: 'linear-gradient(145deg, #1A1A24, #0D0D12)',
        borderRadius: '22px',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decorations */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '150px',
        height: '150px',
        background: 'radial-gradient(circle, rgba(0, 217, 255, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100px',
        height: '100px',
        background: 'radial-gradient(circle, rgba(255, 0, 110, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
      }} />
      <div style={{ position: 'relative', zIndex: 10 }}>
        {children}
      </div>
    </div>
  </div>
);

// Premium Card
const PremiumCard = ({
  children,
  onClick
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <div
    onClick={onClick}
    style={{
      background: 'linear-gradient(135deg, rgba(114, 9, 183, 0.2), rgba(255, 0, 110, 0.15))',
      border: '1px solid rgba(114, 9, 183, 0.4)',
      borderRadius: '20px',
      padding: '20px',
      cursor: onClick ? 'pointer' : 'default',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <div style={{
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
      animation: 'shine 3s infinite',
    }} />
    {children}
  </div>
);

// Tag Component
const Tag = ({
  children,
  color = 'blue'
}: {
  children: React.ReactNode;
  color?: 'blue' | 'orange' | 'green' | 'pink';
}) => {
  const colors = {
    blue: { bg: 'rgba(0, 217, 255, 0.15)', text: '#00D9FF', border: 'rgba(0, 217, 255, 0.3)' },
    orange: { bg: 'rgba(255, 107, 53, 0.15)', text: '#FF6B35', border: 'rgba(255, 107, 53, 0.3)' },
    green: { bg: 'rgba(57, 255, 20, 0.15)', text: '#39FF14', border: 'rgba(57, 255, 20, 0.3)' },
    pink: { bg: 'rgba(255, 0, 110, 0.15)', text: '#FF006E', border: 'rgba(255, 0, 110, 0.3)' },
  };

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '4px 10px',
      borderRadius: '20px',
      fontSize: '11px',
      fontWeight: 600,
      background: colors[color].bg,
      color: colors[color].text,
      border: `1px solid ${colors[color].border}`,
    }}>
      {children}
    </span>
  );
};

// Progress Bar
const ProgressBar = ({
  percentage,
  color = 'green'
}: {
  percentage: number;
  color?: 'green' | 'orange';
}) => (
  <div style={{
    width: '100%',
    height: '6px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '3px',
    overflow: 'hidden',
  }}>
    <div style={{
      width: `${percentage}%`,
      height: '100%',
      borderRadius: '3px',
      background: color === 'green'
        ? 'linear-gradient(90deg, #39FF14, #00D9FF)'
        : 'linear-gradient(90deg, #FF6B35, #FF006E)',
      boxShadow: color === 'green'
        ? '0 0 10px rgba(57, 255, 20, 0.5)'
        : '0 0 10px rgba(255, 107, 53, 0.5)',
      transition: 'width 0.5s ease',
    }} />
  </div>
);

export default function HomePage() {
  const router = useRouter();
  const member = MOCK_MEMBER;
  const todayRoutine = MOCK_ROUTINES[0];
  const todayGX = MOCK_GX_CLASSES.slice(0, 3);
  const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.isRead).length;

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D12' }}>
      {/* Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: 'rgba(13, 13, 18, 0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Logo */}
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #00D9FF, #7209B7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(0, 217, 255, 0.3)',
            }}>
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '20px' }}>P</span>
            </div>
            <div>
              <h1 style={{ color: 'white', fontWeight: 'bold', fontSize: '18px', margin: 0 }}>PANDO</h1>
              <p style={{ color: '#6B7280', fontSize: '12px', margin: 0 }}>AI Fitness</p>
            </div>
          </div>

          {/* Notification */}
          <button
            onClick={() => router.push('/notifications')}
            style={{
              position: 'relative',
              width: '44px',
              height: '44px',
              borderRadius: '14px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <Bell size={20} color="#9CA3AF" />
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: '#FF006E',
                color: 'white',
                fontSize: '11px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 10px rgba(255, 0, 110, 0.5)',
              }}>
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <div style={{ padding: '24px 20px 120px 20px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {/* Greeting Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              boxShadow: '0 4px 20px rgba(255, 107, 53, 0.4)',
            }}>
              👋
            </div>
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: 'white', margin: 0 }}>
                안녕하세요, <span style={{
                  background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>{member.name}</span>님
              </h2>
              <p style={{ color: '#9CA3AF', marginTop: '4px', fontSize: '14px' }}>
                오늘도 목표를 향해 달려볼까요?
              </p>
            </div>
          </div>
        </motion.section>

        {/* Quick Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}
        >
          {[
            { icon: <Flame size={20} color="#FF6B35" />, value: '12', label: '연속 출석', color: '#FF6B35' },
            { icon: <Target size={20} color="#00D9FF" />, value: '85%', label: '목표 달성', color: '#00D9FF' },
            { icon: <TrendingUp size={20} color="#39FF14" />, value: '+15%', label: '이번 주', color: '#39FF14' },
          ].map((stat, i) => (
            <ModernCard key={i} style={{ padding: '16px', textAlign: 'center' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: `${stat.color}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 10px',
              }}>
                {stat.icon}
              </div>
              <p style={{ fontSize: '22px', fontWeight: 'bold', color: 'white', margin: 0 }}>{stat.value}</p>
              <p style={{ fontSize: '11px', color: '#6B7280', margin: '4px 0 0' }}>{stat.label}</p>
            </ModernCard>
          ))}
        </motion.section>

        {/* AI Routine Card - Featured */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FeatureCard>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #00D9FF, #7209B7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(0, 217, 255, 0.4)',
              }}>
                <Sparkles size={24} color="white" />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: 'white', margin: 0 }}>
                    오늘의 AI 루틴
                  </h3>
                  <Tag color="blue">추천</Tag>
                </div>
                <p style={{ fontSize: '13px', color: '#9CA3AF', margin: '4px 0 0' }}>
                  {todayRoutine.exercises.length}개 운동 · {todayRoutine.duration}분
                </p>
              </div>
            </div>

            {/* Exercise Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
              {todayRoutine.exercises.slice(0, 4).map((exercise, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  style={{
                    padding: '10px 14px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    fontSize: '13px',
                    color: '#E5E7EB',
                  }}
                >
                  {exercise.nameKo}
                </motion.div>
              ))}
              {todayRoutine.exercises.length > 4 && (
                <div style={{
                  padding: '10px 14px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  fontSize: '13px',
                  color: '#9CA3AF',
                }}>
                  +{todayRoutine.exercises.length - 4}
                </div>
              )}
            </div>

            {/* CTA Button */}
            <motion.button
              onClick={() => router.push('/routine/today')}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
                border: 'none',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(255, 107, 53, 0.4)',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Zap size={20} />
              루틴 시작하기
            </motion.button>
          </FeatureCard>
        </motion.section>

        {/* PT Session Card */}
        {member.membershipType !== 'basic' && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <PremiumCard onClick={() => router.push('/pt')}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, #7209B7, #FF006E)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Star size={24} color="white" />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h3 style={{ fontWeight: 'bold', color: 'white', margin: 0, fontSize: '15px' }}>PT 세션</h3>
                      <Tag color="pink">4회 남음</Tag>
                    </div>
                    <p style={{ fontSize: '13px', color: '#9CA3AF', margin: '4px 0 0' }}>
                      다음 예약을 잡아보세요
                    </p>
                  </div>
                </div>
                <ChevronRight size={20} color="#6B7280" />
              </div>
            </PremiumCard>
          </motion.section>
        )}

        {/* GX Classes */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
          }}>
            <span style={{ fontSize: '17px', fontWeight: 'bold', color: 'white' }}>
              오늘의 GX 클래스
            </span>
            <button
              onClick={() => router.push('/gx')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '13px',
                color: '#00D9FF',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              전체보기 <ChevronRight size={16} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {todayGX.map((gx, index) => {
              const percentage = (gx.enrolled / gx.capacity) * 100;
              const isFull = gx.enrolled >= gx.capacity;
              const isAlmostFull = percentage > 80;

              return (
                <motion.div
                  key={gx.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <ModernCard onClick={() => router.push(`/gx/${gx.id}`)} style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      {/* Time */}
                      <div style={{ width: '56px', textAlign: 'center' }}>
                        <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#00D9FF', margin: 0 }}>
                          {gx.startTime}
                        </p>
                        <p style={{ fontSize: '11px', color: '#6B7280', margin: '2px 0 0' }}>
                          {gx.duration}분
                        </p>
                      </div>

                      {/* Divider */}
                      <div style={{ width: '1px', height: '48px', background: 'rgba(255, 255, 255, 0.1)' }} />

                      {/* Info */}
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <h4 style={{ fontWeight: 'bold', color: 'white', margin: 0, fontSize: '14px' }}>
                            {gx.name}
                          </h4>
                          {isFull && <Tag color="orange">마감</Tag>}
                        </div>
                        <p style={{ fontSize: '12px', color: '#9CA3AF', margin: '0 0 8px' }}>
                          {gx.instructor.name} · {gx.location}
                        </p>

                        {/* Progress Bar */}
                        <ProgressBar percentage={percentage} color={isAlmostFull ? 'orange' : 'green'} />
                        <p style={{ fontSize: '11px', color: '#6B7280', margin: '6px 0 0' }}>
                          {gx.enrolled}/{gx.capacity}명
                        </p>
                      </div>
                    </div>
                  </ModernCard>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Recovery Recommendation */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <ModernCard onClick={() => router.push('/qr-scan/stretching')} style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(57, 255, 20, 0.15), rgba(0, 217, 255, 0.1))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
              }}>
                🧘‍♂️
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <h3 style={{ fontWeight: 'bold', color: 'white', margin: 0, fontSize: '15px' }}>
                    AI 추천: 리커버리 데이
                  </h3>
                  <Tag color="green">추천</Tag>
                </div>
                <p style={{ fontSize: '13px', color: '#9CA3AF', margin: 0, lineHeight: 1.4 }}>
                  최근 3일간 고강도 운동을 하셨네요. 오늘은 회복에 집중하세요!
                </p>
              </div>
              <ChevronRight size={20} color="#6B7280" />
            </div>
          </ModernCard>
        </motion.section>

        {/* Points & Badges */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <ModernCard onClick={() => router.push('/rewards')} style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '13px', color: '#9CA3AF', margin: '0 0 4px' }}>보유 포인트</p>
                <p style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  margin: 0,
                  background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  {member.points.toLocaleString()} <span style={{ fontSize: '16px' }}>P</span>
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {member.badges.slice(0, 3).map((badge, i) => (
                  <motion.div
                    key={badge.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.1, type: 'spring' }}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                    }}
                  >
                    {badge.icon}
                  </motion.div>
                ))}
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <ChevronRight size={18} color="#6B7280" />
                </div>
              </div>
            </div>
          </ModernCard>
        </motion.section>
      </div>
    </div>
  );
}
