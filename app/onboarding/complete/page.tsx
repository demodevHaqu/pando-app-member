'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Zap, Gift, ArrowRight } from 'lucide-react';
import {
  ModernCard,
  FeatureCard,
  PageHeader,
  PrimaryButton,
  SecondaryButton,
  Tag,
} from '@/components/ui/ModernUI';

export default function OnboardingCompletePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Confetti effect would go here
  }, []);

  const handleStartHome = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push('/');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D12', paddingBottom: '40px', overflow: 'hidden' }}>
      <PageHeader title="온보딩 완료" showBack={false} />

      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Success animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <div style={{
            position: 'relative',
            width: '120px',
            height: '120px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                inset: 0,
                border: '2px solid transparent',
                borderTopColor: '#00D9FF',
                borderRightColor: '#39FF14',
                borderRadius: '50%',
              }}
            />
            <CheckCircle size={56} color="#39FF14" />
          </div>
        </motion.div>

        {/* Welcome message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ textAlign: 'center' }}
        >
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #39FF14, #00D9FF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '8px',
          }}>
            환영합니다!
          </h1>
          <p style={{ fontSize: '14px', color: '#9CA3AF' }}>Fit Genie에 가입했습니다</p>
        </motion.div>

        {/* AI recommendations */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <FeatureCard>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '16px' }}>
              <Zap size={24} color="#FFD60A" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h2 style={{ fontSize: '17px', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>AI 맞춤 루틴 생성</h2>
                <p style={{ fontSize: '13px', color: '#9CA3AF' }}>입력하신 정보를 바탕으로</p>
              </div>
            </div>
            <div style={{ marginLeft: '38px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                '체중 감량에 최적화된 루틴',
                '허리 건강을 고려한 운동',
                '주 4회 운동 스케줄 추천',
              ].map((text, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00D9FF' }} />
                  <span style={{ fontSize: '13px', color: '#E5E7EB' }}>{text}</span>
                </div>
              ))}
            </div>
          </FeatureCard>
        </motion.section>

        {/* Benefits */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {[
              { icon: '🎯', label: '맞춤 루틴', value: '매일' },
              { icon: '📊', label: 'AI 분석', value: '정기' },
              { icon: '🏆', label: '뱃지 획득', value: '가능' },
              { icon: '⭐', label: '포인트', value: '5000P' },
            ].map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + idx * 0.1 }}
              >
                <ModernCard style={{ padding: '16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '28px', marginBottom: '8px' }}>{benefit.icon}</div>
                  <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>{benefit.label}</div>
                  <div style={{ fontWeight: 'bold', color: 'white', fontSize: '15px' }}>{benefit.value}</div>
                </ModernCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Welcome gifts */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <ModernCard style={{
            padding: '20px',
            border: '2px solid rgba(255, 214, 10, 0.3)',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <Gift size={24} color="#FFD60A" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontWeight: 'bold', color: 'white', marginBottom: '16px', fontSize: '16px' }}>가입 축하 혜택</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', color: '#9CA3AF' }}>신규 회원 보너스 포인트</span>
                    <Tag color="orange">+5,000P</Tag>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', color: '#9CA3AF' }}>첫 PT 패키지 할인</span>
                    <Tag color="green">20%</Tag>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', color: '#9CA3AF' }}>프리미엄 1개월 체험</span>
                    <Tag color="pink">무료</Tag>
                  </div>
                </div>
              </div>
            </div>
          </ModernCard>
        </motion.section>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
        >
          <PrimaryButton
            fullWidth
            size="lg"
            onClick={handleStartHome}
            disabled={loading}
            icon={!loading && <ArrowRight size={20} />}
          >
            {loading ? '처리 중...' : '홈으로 가기'}
          </PrimaryButton>
          <SecondaryButton fullWidth size="lg" onClick={() => router.push('/')}>
            나중에 설정하기
          </SecondaryButton>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          style={{ textAlign: 'center', fontSize: '12px', color: '#6B7280' }}
        >
          모든 정보는 마이페이지에서 수정할 수 있습니다
        </motion.p>
      </div>
    </div>
  );
}
