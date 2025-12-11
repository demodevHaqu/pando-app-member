'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Trophy, Flame, Clock, TrendingUp, Star, Zap } from 'lucide-react';
import {
  ModernCard,
  FeatureCard,
  PageHeader,
  PrimaryButton,
  SecondaryButton,
  ProgressBar,
} from '@/components/ui/ModernUI';

// Pre-computed confetti positions to avoid hydration mismatch
const CONFETTI_PARTICLES = [
  { left: 3.2, duration: 2.1, delay: 0.05, emoji: '🎉' },
  { left: 12.8, duration: 3.4, delay: 0.15, emoji: '⭐' },
  { left: 21.5, duration: 2.7, delay: 0.08, emoji: '💪' },
  { left: 28.3, duration: 3.9, delay: 0.32, emoji: '🔥' },
  { left: 35.7, duration: 2.3, delay: 0.22, emoji: '✨' },
  { left: 42.1, duration: 3.1, delay: 0.11, emoji: '🎉' },
  { left: 48.9, duration: 2.5, delay: 0.41, emoji: '⭐' },
  { left: 55.4, duration: 3.6, delay: 0.18, emoji: '💪' },
  { left: 62.2, duration: 2.9, delay: 0.27, emoji: '🔥' },
  { left: 68.8, duration: 3.3, delay: 0.03, emoji: '✨' },
  { left: 75.3, duration: 2.2, delay: 0.38, emoji: '🎉' },
  { left: 82.1, duration: 3.8, delay: 0.14, emoji: '⭐' },
  { left: 88.6, duration: 2.6, delay: 0.29, emoji: '💪' },
  { left: 94.2, duration: 3.2, delay: 0.06, emoji: '🔥' },
  { left: 7.5, duration: 2.8, delay: 0.45, emoji: '✨' },
  { left: 16.3, duration: 3.5, delay: 0.21, emoji: '🎉' },
  { left: 24.9, duration: 2.4, delay: 0.34, emoji: '⭐' },
  { left: 32.4, duration: 3.7, delay: 0.09, emoji: '💪' },
  { left: 39.8, duration: 2.1, delay: 0.47, emoji: '🔥' },
  { left: 46.5, duration: 3.0, delay: 0.16, emoji: '✨' },
  { left: 53.1, duration: 2.7, delay: 0.39, emoji: '🎉' },
  { left: 59.7, duration: 3.4, delay: 0.24, emoji: '⭐' },
  { left: 66.4, duration: 2.3, delay: 0.12, emoji: '💪' },
  { left: 73.0, duration: 3.9, delay: 0.31, emoji: '🔥' },
  { left: 79.6, duration: 2.5, delay: 0.42, emoji: '✨' },
  { left: 86.2, duration: 3.1, delay: 0.07, emoji: '🎉' },
  { left: 92.8, duration: 2.9, delay: 0.36, emoji: '⭐' },
  { left: 10.1, duration: 3.6, delay: 0.19, emoji: '💪' },
  { left: 50.5, duration: 2.2, delay: 0.28, emoji: '🔥' },
  { left: 70.9, duration: 3.3, delay: 0.44, emoji: '✨' },
];

export default function RoutineCompletePage() {
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setShowConfetti(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const stats = {
    duration: 47,
    calories: 395,
    exercises: 5,
    sets: 16,
  };

  const rewards = {
    points: 150,
    badges: [
      { id: 'badge1', name: '루틴 완수', icon: '🏆' },
      { id: 'badge2', name: '5일 연속', icon: '🔥' },
    ],
  };

  const recommendations = [
    { title: '사우나 이용', description: '근육 회복을 위해 15분간 사우나를 추천합니다' },
    { title: '단백질 섭취', description: '운동 후 30분 이내 단백질을 섭취하세요' },
    { title: '충분한 수분', description: '최소 500ml 이상의 물을 마시세요' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D12', paddingBottom: '40px' }}>
      <PageHeader title="운동 완료" showBack={false} />

      {mounted && showConfetti && (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 50, overflow: 'hidden' }}>
          {CONFETTI_PARTICLES.map((particle, i) => (
            <motion.div
              key={i}
              style={{ position: 'absolute', fontSize: '24px' }}
              initial={{
                top: -20,
                left: `${particle.left}%`,
                rotate: 0,
              }}
              animate={{
                top: '100vh',
                rotate: 360,
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
              }}
            >
              {particle.emoji}
            </motion.div>
          ))}
        </div>
      )}

      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Success Message */}
        <motion.section
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
        >
          <FeatureCard>
            <div style={{ textAlign: 'center' }}>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Trophy size={80} color="#FFD60A" style={{ margin: '0 auto 16px' }} />
              </motion.div>

              <h1 style={{
                fontSize: '28px',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '8px',
              }}>
                운동 완료!
              </h1>
              <p style={{ color: '#9CA3AF', marginBottom: '24px', fontSize: '14px' }}>
                오늘도 최고의 운동을 하셨습니다 👏
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                {[
                  { icon: <Clock size={18} color="#00D9FF" />, label: '시간', value: `${stats.duration}분` },
                  { icon: <Flame size={18} color="#FF6B35" />, label: '칼로리', value: stats.calories },
                  { icon: <TrendingUp size={18} color="#39FF14" />, label: '운동', value: `${stats.exercises}개` },
                  { icon: <Zap size={18} color="#7209B7" />, label: '세트', value: `${stats.sets}개` },
                ].map((stat, i) => (
                  <div key={i} style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    padding: '12px 8px',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '6px' }}>{stat.icon}</div>
                    <div style={{ fontSize: '10px', color: '#6B7280', marginBottom: '2px' }}>{stat.label}</div>
                    <div style={{ fontWeight: 'bold', color: 'white', fontSize: '14px' }}>{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </FeatureCard>
        </motion.section>

        {/* Rewards */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: 'white', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Star size={20} color="#FFD60A" />
            획득한 보상
          </h3>

          <FeatureCard>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h4 style={{ fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>포인트 적립</h4>
                <p style={{ fontSize: '13px', color: '#6B7280' }}>오늘의 운동 보상</p>
              </div>
              <div style={{
                fontSize: '28px',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                +{rewards.points} P
              </div>
            </div>

            {rewards.badges.length > 0 && (
              <>
                <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.1)', margin: '16px 0' }} />
                <h4 style={{ fontWeight: 'bold', color: 'white', marginBottom: '14px' }}>새 배지</h4>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {rewards.badges.map((badge, index) => (
                    <motion.div
                      key={badge.id}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '14px',
                        padding: '16px 20px',
                        textAlign: 'center',
                      }}
                    >
                      <div style={{ fontSize: '36px', marginBottom: '8px' }}>{badge.icon}</div>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: 'white' }}>{badge.name}</div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </FeatureCard>
        </motion.section>

        {/* Performance */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>운동 분석</h3>
          <ModernCard style={{ padding: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { label: '운동 강도', value: '높음', percentage: 85, color: 'orange' as const },
                { label: '자세 정확도', value: '92%', percentage: 92, color: 'green' as const },
                { label: '일관성', value: '우수', percentage: 88, color: 'pink' as const },
              ].map((item, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', color: '#6B7280' }}>{item.label}</span>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: 'white' }}>{item.value}</span>
                  </div>
                  <ProgressBar percentage={item.percentage} color={item.color} height={6} />
                </div>
              ))}
            </div>
          </ModernCard>
        </motion.section>

        {/* Recommendations */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>AI 추천</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recommendations.map((rec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <ModernCard style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ width: '8px', height: '8px', background: '#39FF14', borderRadius: '50%', marginTop: '6px', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontWeight: 'bold', color: 'white', marginBottom: '4px', fontSize: '14px' }}>{rec.title}</h4>
                      <p style={{ fontSize: '13px', color: '#6B7280' }}>{rec.description}</p>
                    </div>
                  </div>
                </ModernCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
        >
          <PrimaryButton fullWidth size="lg" onClick={() => router.push('/')}>
            홈으로 돌아가기
          </PrimaryButton>
          <SecondaryButton fullWidth size="lg" onClick={() => router.push('/report')}>
            상세 리포트 보기
          </SecondaryButton>
        </motion.div>
      </div>
    </div>
  );
}
