'use client';

import React, { useEffect, useState } from 'react';
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
  Target,
  LogOut,
  User,
  Calendar,
  Clock,
  CreditCard,
  Gift,
  Receipt,
} from 'lucide-react';
import { MOCK_MEMBER } from '@/data/mock/members';
import { MOCK_ROUTINES, AI_RECOMMENDED_ROUTINES } from '@/data/mock/routines';
import { MOCK_GX_CLASSES } from '@/data/mock/gxClasses';
import { MOCK_NOTIFICATIONS } from '@/data/mock/notifications';
import {
  MOCK_PT_MEMBERSHIP,
  MOCK_TRAINERS,
  getNextPTSession,
  getPTRemainingSessions,
  hasPTMembership,
} from '@/data/mock/trainers';
import { getActiveEvents, EventBanner } from '@/data/mock/events';

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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const member = MOCK_MEMBER;
  const todayGX = MOCK_GX_CLASSES.slice(0, 3);
  const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.isRead).length;
  const activeEvents = getActiveEvents();

  // 로그인 상태 확인
  useEffect(() => {
    const authData = localStorage.getItem('fitgenie-auth');
    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        if (parsed.isLoggedIn) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          router.push('/login');
        }
      } catch {
        setIsAuthenticated(false);
        router.push('/login');
      }
    } else {
      setIsAuthenticated(false);
      router.push('/login');
    }
  }, [router]);

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem('fitgenie-auth');
    router.push('/login');
  };

  // 로딩 중일 때
  if (isAuthenticated === null) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#0D0D12',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #00D9FF, #7209B7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}>
            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '24px' }}>P</span>
          </div>
          <p style={{ color: '#9CA3AF', fontSize: '14px' }}>로딩중...</p>
        </div>
      </div>
    );
  }

  // 인증되지 않은 경우 (리다이렉트 중)
  if (!isAuthenticated) {
    return null;
  }

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
          <div
            onClick={() => router.push('/')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          >
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
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '16px' }}>FG</span>
            </div>
            <div>
              <h1 style={{ color: 'white', fontWeight: 'bold', fontSize: '18px', margin: 0 }}>Fit Genie</h1>
              <p style={{ color: '#6B7280', fontSize: '12px', margin: 0 }}>AI Fitness</p>
            </div>
          </div>

          {/* Right Side Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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

            {/* MyPage Button */}
            <button
              onClick={() => router.push('/mypage')}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '14px',
                background: 'rgba(114, 9, 183, 0.1)',
                border: '1px solid rgba(114, 9, 183, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <User size={20} color="#7209B7" />
            </button>

            {/* Logout Button */}
            <button
              onClick={() => setShowLogoutConfirm(true)}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '14px',
                background: 'rgba(255, 107, 53, 0.1)',
                border: '1px solid rgba(255, 107, 53, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <LogOut size={20} color="#FF6B35" />
            </button>
          </div>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div
          onClick={() => setShowLogoutConfirm(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '320px',
              background: 'linear-gradient(145deg, #1A1A24, #0D0D12)',
              borderRadius: '20px',
              padding: '24px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'rgba(255, 107, 53, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}>
                <LogOut size={28} color="#FF6B35" />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
                로그아웃
              </h3>
              <p style={{ fontSize: '14px', color: '#9CA3AF' }}>
                정말 로그아웃 하시겠습니까?
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                style={{
                  padding: '14px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                취소
              </button>
              <button
                onClick={handleLogout}
                style={{
                  padding: '14px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
                  border: 'none',
                  color: 'white',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(255, 107, 53, 0.3)',
                }}
              >
                로그아웃
              </button>
            </div>
          </motion.div>
        </div>
      )}

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

        {/* Event/Notice Banner Carousel */}
        {activeEvents.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <div style={{ position: 'relative' }}>
              {/* Banner */}
              <div
                onClick={() => router.push(activeEvents[currentEventIndex].link)}
                style={{
                  borderRadius: '20px',
                  background: activeEvents[currentEventIndex].bgGradient,
                  padding: '20px',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Shine effect */}
                <motion.div
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 3 }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '50%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                    zIndex: 1,
                  }}
                />

                <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                    flexShrink: 0,
                  }}>
                    {activeEvents[currentEventIndex].icon}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '10px',
                        background: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        fontSize: '10px',
                        fontWeight: 'bold',
                      }}>
                        {activeEvents[currentEventIndex].type === 'event' && '이벤트'}
                        {activeEvents[currentEventIndex].type === 'notice' && '공지'}
                        {activeEvents[currentEventIndex].type === 'promo' && '프로모션'}
                        {activeEvents[currentEventIndex].type === 'gx-special' && 'GX 특강'}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: 'white', margin: '0 0 4px' }}>
                      {activeEvents[currentEventIndex].title}
                    </h3>
                    <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.8)', margin: 0 }}>
                      {activeEvents[currentEventIndex].subtitle}
                    </p>
                  </div>

                  <ChevronRight size={24} color="rgba(255, 255, 255, 0.8)" />
                </div>
              </div>

              {/* Pagination Dots */}
              {activeEvents.length > 1 && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '6px',
                  marginTop: '12px',
                }}>
                  {activeEvents.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentEventIndex(index)}
                      style={{
                        width: currentEventIndex === index ? '20px' : '8px',
                        height: '8px',
                        borderRadius: '4px',
                        background: currentEventIndex === index
                          ? 'linear-gradient(135deg, #00D9FF, #7209B7)'
                          : 'rgba(255, 255, 255, 0.2)',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.section>
        )}

        {/* QR Scan Banner - 눈에 띄는 큰 배너 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div
            onClick={() => router.push('/qr-scan')}
            style={{
              position: 'relative',
              borderRadius: '24px',
              padding: '3px',
              background: 'linear-gradient(135deg, #00D9FF, #39FF14, #00D9FF)',
              cursor: 'pointer',
              overflow: 'hidden',
            }}
          >
            {/* Animated shine effect */}
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '50%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                zIndex: 10,
              }}
            />
            <div style={{
              background: 'linear-gradient(145deg, rgba(0, 217, 255, 0.15), #0D0D12)',
              borderRadius: '21px',
              padding: '24px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                {/* QR Icon */}
                <div style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #00D9FF, #39FF14)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 32px rgba(0, 217, 255, 0.4)',
                  flexShrink: 0,
                }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="3" height="3" />
                    <rect x="18" y="14" width="3" height="3" />
                    <rect x="14" y="18" width="3" height="3" />
                    <rect x="18" y="18" width="3" height="3" />
                  </svg>
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', margin: 0 }}>
                      QR 스캔
                    </h3>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '12px',
                      background: 'rgba(57, 255, 20, 0.2)',
                      color: '#39FF14',
                      fontSize: '11px',
                      fontWeight: 'bold',
                    }}>
                      AI 자세분석
                    </span>
                  </div>
                  <p style={{ fontSize: '14px', color: '#9CA3AF', margin: 0, lineHeight: 1.5 }}>
                    기구 QR을 스캔하고 AI가 자세를 분석해드려요
                  </p>
                </div>

                <ChevronRight size={28} color="#00D9FF" />
              </div>

              {/* Feature Tags */}
              <div style={{
                display: 'flex',
                gap: '8px',
                marginTop: '16px',
                paddingTop: '16px',
                borderTop: '1px solid rgba(0, 217, 255, 0.2)',
              }}>
                {[
                  { icon: '📹', text: '실시간 분석' },
                  { icon: '🎯', text: '자세 교정' },
                  { icon: '💪', text: '부상 예방' },
                ].map((feature, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '10px 8px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '10px',
                    }}
                  >
                    <span style={{ fontSize: '16px' }}>{feature.icon}</span>
                    <span style={{ fontSize: '12px', color: '#D1D5DB', fontWeight: 500 }}>{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Quick Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
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

        {/* AI Routine Cards - Horizontal Scroll */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Section Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #00D9FF, #7209B7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(0, 217, 255, 0.3)',
              }}>
                <Sparkles size={18} color="white" />
              </div>
              <span style={{ fontSize: '17px', fontWeight: 'bold', color: 'white' }}>
                오늘의 AI 루틴
              </span>
            </div>
            <button
              onClick={() => router.push('/routine')}
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

          {/* Horizontal Scroll Cards */}
          <div style={{
            display: 'flex',
            gap: '14px',
            overflowX: 'auto',
            paddingBottom: '8px',
            marginLeft: '-20px',
            marginRight: '-20px',
            paddingLeft: '20px',
            paddingRight: '20px',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}>
            {AI_RECOMMENDED_ROUTINES.slice(0, 7).map((routine, index) => {
              const colors = [
                { gradient: 'linear-gradient(135deg, #FF6B35, #FF006E)', shadow: 'rgba(255, 107, 53, 0.3)' },
                { gradient: 'linear-gradient(135deg, #00D9FF, #7209B7)', shadow: 'rgba(0, 217, 255, 0.3)' },
                { gradient: 'linear-gradient(135deg, #39FF14, #00D9FF)', shadow: 'rgba(57, 255, 20, 0.3)' },
                { gradient: 'linear-gradient(135deg, #7209B7, #FF006E)', shadow: 'rgba(114, 9, 183, 0.3)' },
                { gradient: 'linear-gradient(135deg, #FFD60A, #FF6B35)', shadow: 'rgba(255, 214, 10, 0.3)' },
                { gradient: 'linear-gradient(135deg, #FF006E, #7209B7)', shadow: 'rgba(255, 0, 110, 0.3)' },
                { gradient: 'linear-gradient(135deg, #00D9FF, #39FF14)', shadow: 'rgba(0, 217, 255, 0.3)' },
              ];
              const colorScheme = colors[index % colors.length];
              const difficultyLabels = ['', '입문', '초급', '중급', '고급', '전문가'];

              return (
                <motion.div
                  key={routine.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.08 }}
                  onClick={() => router.push(`/routine/${routine.id}`)}
                  style={{
                    minWidth: '260px',
                    maxWidth: '260px',
                    flexShrink: 0,
                    scrollSnapAlign: 'start',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{
                    position: 'relative',
                    borderRadius: '20px',
                    padding: '2px',
                    background: colorScheme.gradient,
                  }}>
                    <div style={{
                      background: 'linear-gradient(145deg, #1A1A24, #0D0D12)',
                      borderRadius: '18px',
                      padding: '18px',
                      position: 'relative',
                      overflow: 'hidden',
                    }}>
                      {/* Glow Effect */}
                      <div style={{
                        position: 'absolute',
                        top: '-20px',
                        right: '-20px',
                        width: '80px',
                        height: '80px',
                        background: `radial-gradient(circle, ${colorScheme.shadow} 0%, transparent 70%)`,
                        borderRadius: '50%',
                        filter: 'blur(20px)',
                      }} />

                      {/* Card Content */}
                      <div style={{ position: 'relative', zIndex: 10 }}>
                        {/* Title & Tag */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                          <h4 style={{
                            fontSize: '15px',
                            fontWeight: 'bold',
                            color: 'white',
                            margin: 0,
                            lineHeight: 1.3,
                          }}>
                            {routine.name}
                          </h4>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: '8px',
                            fontSize: '10px',
                            fontWeight: 600,
                            background: 'rgba(255, 255, 255, 0.1)',
                            color: '#E5E7EB',
                            whiteSpace: 'nowrap',
                          }}>
                            {difficultyLabels[routine.difficulty]}
                          </span>
                        </div>

                        {/* Stats Row */}
                        <div style={{
                          display: 'flex',
                          gap: '12px',
                          marginBottom: '14px',
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Zap size={14} color="#FFD60A" />
                            <span style={{ fontSize: '12px', color: '#9CA3AF' }}>
                              {routine.duration}분
                            </span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Flame size={14} color="#FF6B35" />
                            <span style={{ fontSize: '12px', color: '#9CA3AF' }}>
                              {routine.calories}kcal
                            </span>
                          </div>
                        </div>

                        {/* Exercise Preview */}
                        <div style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '6px',
                          marginBottom: '14px',
                        }}>
                          {routine.exercises.slice(0, 3).map((ex, i) => (
                            <span
                              key={i}
                              style={{
                                padding: '5px 10px',
                                background: 'rgba(255, 255, 255, 0.06)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                borderRadius: '8px',
                                fontSize: '11px',
                                color: '#D1D5DB',
                              }}
                            >
                              {ex.nameKo}
                            </span>
                          ))}
                          {routine.exercises.length > 3 && (
                            <span style={{
                              padding: '5px 10px',
                              background: 'rgba(255, 255, 255, 0.06)',
                              border: '1px solid rgba(255, 255, 255, 0.08)',
                              borderRadius: '8px',
                              fontSize: '11px',
                              color: '#6B7280',
                            }}>
                              +{routine.exercises.length - 3}
                            </span>
                          )}
                        </div>

                        {/* CTA Button */}
                        <button
                          style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '12px',
                            background: colorScheme.gradient,
                            border: 'none',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '13px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            cursor: 'pointer',
                            boxShadow: `0 4px 15px ${colorScheme.shadow}`,
                          }}
                        >
                          <Zap size={16} />
                          시작하기
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* PT 예약/현황 바로가기 배너 */}
        {/* 조건: PT 멤버십이 있고 (다음 예약이 없거나 잔여 회차가 있을 때) 노출 */}
        {(() => {
          const hasPT = hasPTMembership(member.id);
          const remainingSessions = getPTRemainingSessions(member.id);
          const nextSession = getNextPTSession(member.id);
          const trainer = MOCK_TRAINERS.find(t => t.id === MOCK_PT_MEMBERSHIP.trainerId);

          // PT 멤버십이 있고, (다음 예약이 없거나 잔여 회차가 있을 때) 노출
          const shouldShowBanner = hasPT && (remainingSessions > 0 || !nextSession);

          if (!shouldShowBanner) return null;

          return (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div
                style={{
                  position: 'relative',
                  borderRadius: '20px',
                  padding: '2px',
                  background: 'linear-gradient(135deg, #7209B7, #FF006E)',
                  overflow: 'hidden',
                }}
              >
                {/* Shine effect */}
                <motion.div
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 3 }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '50%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                    zIndex: 10,
                  }}
                />

                <div style={{
                  background: 'linear-gradient(145deg, rgba(114, 9, 183, 0.15), #0D0D12)',
                  borderRadius: '18px',
                  padding: '20px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    {/* PT Icon */}
                    <div style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '16px',
                      background: 'linear-gradient(135deg, #7209B7, #FF006E)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 20px rgba(114, 9, 183, 0.4)',
                      flexShrink: 0,
                    }}>
                      <Star size={28} color="white" />
                    </div>

                    <div style={{ flex: 1 }}>
                      {/* Title Row */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: 'white', margin: 0 }}>
                          PT 관리
                        </h3>
                        <span style={{
                          padding: '4px 10px',
                          borderRadius: '12px',
                          background: 'rgba(255, 0, 110, 0.2)',
                          color: '#FF006E',
                          fontSize: '12px',
                          fontWeight: 'bold',
                        }}>
                          {remainingSessions}회 남음
                        </span>
                      </div>

                      {/* Subtitle */}
                      <p style={{ fontSize: '13px', color: '#9CA3AF', margin: 0, lineHeight: 1.4 }}>
                        {nextSession
                          ? `다음 예약: ${nextSession.date} ${nextSession.startTime}`
                          : trainer
                            ? `${trainer.name} 트레이너와 함께하세요`
                            : 'PT 예약 및 현황을 확인하세요'
                        }
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '10px',
                    marginTop: '14px',
                    paddingTop: '14px',
                    borderTop: '1px solid rgba(114, 9, 183, 0.3)',
                  }}>
                    <button
                      onClick={() => router.push('/pt/booking')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '14px',
                        background: 'linear-gradient(135deg, #7209B7, #FF006E)',
                        border: 'none',
                        borderRadius: '12px',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(114, 9, 183, 0.3)',
                      }}
                    >
                      <Calendar size={18} />
                      예약하기
                    </button>
                    <button
                      onClick={() => router.push('/pt/status')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '14px',
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(114, 9, 183, 0.4)',
                        borderRadius: '12px',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                      }}
                    >
                      <Clock size={18} />
                      예약 현황
                    </button>
                  </div>

                  {/* Info Tags */}
                  <div style={{
                    display: 'flex',
                    gap: '8px',
                    marginTop: '12px',
                  }}>
                    <div style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '10px 8px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '10px',
                    }}>
                      <span style={{ fontSize: '12px', color: '#D1D5DB', fontWeight: 500 }}>
                        {MOCK_PT_MEMBERSHIP.usedSessions}/{MOCK_PT_MEMBERSHIP.totalSessions} 진행
                      </span>
                    </div>
                    <div style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '10px 8px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '10px',
                    }}>
                      <span style={{ fontSize: '12px', color: '#D1D5DB', fontWeight: 500 }}>
                        60분 세션
                      </span>
                    </div>
                    {trainer && (
                      <div style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        padding: '10px 8px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '10px',
                      }}>
                        <span style={{ fontSize: '12px', color: '#D1D5DB', fontWeight: 500 }}>
                          ⭐ {trainer.rating}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.section>
          );
        })()}

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
          <ModernCard onClick={() => router.push('/qr-scan/recovery')} style={{ padding: '20px' }}>
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

        {/* Payment & Membership Banner */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div style={{
            position: 'relative',
            borderRadius: '20px',
            padding: '2px',
            background: 'linear-gradient(135deg, #FFD60A, #FF6B35)',
            overflow: 'hidden',
          }}>
            {/* Shine effect */}
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 4 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '50%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                zIndex: 10,
              }}
            />

            <div style={{
              background: 'linear-gradient(145deg, rgba(255, 214, 10, 0.1), #0D0D12)',
              borderRadius: '18px',
              padding: '20px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                {/* Icon */}
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #FFD60A, #FF6B35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 20px rgba(255, 214, 10, 0.4)',
                  flexShrink: 0,
                }}>
                  <CreditCard size={28} color="white" />
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: 'white', margin: 0 }}>
                      멤버십 & 결제
                    </h3>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '12px',
                      background: 'rgba(255, 214, 10, 0.2)',
                      color: '#FFD60A',
                      fontSize: '11px',
                      fontWeight: 'bold',
                    }}>
                      {(() => {
                        const daysLeft = Math.ceil((new Date(member.membershipExpiry).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                        return daysLeft > 0 ? `${daysLeft}일 남음` : '갱신 필요';
                      })()}
                    </span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#9CA3AF', margin: 0 }}>
                    멤버십 갱신 및 결제 내역을 확인하세요
                  </p>
                </div>
              </div>

              {/* Payment Menu Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '10px',
              }}>
                <button
                  onClick={() => router.push('/payment/renewal')}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '16px 12px',
                    background: 'linear-gradient(135deg, rgba(255, 214, 10, 0.15), rgba(255, 107, 53, 0.1))',
                    border: '1px solid rgba(255, 214, 10, 0.3)',
                    borderRadius: '14px',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #FFD60A, #FF6B35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 15px rgba(255, 214, 10, 0.3)',
                  }}>
                    <Gift size={20} color="white" />
                  </div>
                  <span style={{ fontSize: '12px', color: 'white', fontWeight: 600 }}>멤버십 갱신</span>
                </button>

                <button
                  onClick={() => router.push('/payment/checkout')}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '16px 12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '14px',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <CreditCard size={20} color="#FFD60A" />
                  </div>
                  <span style={{ fontSize: '12px', color: '#D1D5DB', fontWeight: 600 }}>결제하기</span>
                </button>

                <button
                  onClick={() => router.push('/mypage/usage-history')}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '16px 12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '14px',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Receipt size={20} color="#9CA3AF" />
                  </div>
                  <span style={{ fontSize: '12px', color: '#D1D5DB', fontWeight: 600 }}>결제 내역</span>
                </button>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
