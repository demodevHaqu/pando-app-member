'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ModernCard,
  FeatureCard,
  PageHeader,
  PrimaryButton,
  SecondaryButton,
  Tag,
  ProgressBar,
} from '@/components/ui/ModernUI';
import Modal from '@/components/ui/Modal';
import {
  CreditCard,
  Calendar,
  Clock,
  Gift,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Star,
  Zap,
  Shield,
  Users,
  Dumbbell,
  Droplets,
} from 'lucide-react';

// Mock 회원권 데이터
const MOCK_MEMBERSHIP = {
  type: 'PREMIUM',
  name: '프리미엄 회원권',
  startDate: '2024-12-01',
  endDate: '2025-02-28',
  daysRemaining: 44,
  totalDays: 90,
  ptSessions: {
    total: 16,
    used: 7,
    remaining: 9,
  },
  gxClasses: {
    total: 30,
    used: 12,
    remaining: 18,
  },
  benefits: [
    { icon: <Dumbbell size={18} />, name: '헬스장 무제한 이용' },
    { icon: <Users size={18} />, name: 'GX 클래스 30회' },
    { icon: <Droplets size={18} />, name: '사우나/샤워실 이용' },
    { icon: <Star size={18} />, name: '락커 무료 제공' },
    { icon: <Zap size={18} />, name: 'AI 코칭 서비스' },
    { icon: <Shield size={18} />, name: '운동 보험 적용' },
  ],
  paymentHistory: [
    {
      id: 'pay1',
      date: '2024-12-01',
      amount: 1200000,
      method: '신용카드',
      status: 'completed',
    },
    {
      id: 'pay2',
      date: '2024-09-01',
      amount: 990000,
      method: '카카오페이',
      status: 'completed',
    },
  ],
};

export default function MembershipPage() {
  const router = useRouter();
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const progressPercent =
    ((MOCK_MEMBERSHIP.totalDays - MOCK_MEMBERSHIP.daysRemaining) / MOCK_MEMBERSHIP.totalDays) *
    100;

  const ptProgressPercent =
    (MOCK_MEMBERSHIP.ptSessions.used / MOCK_MEMBERSHIP.ptSessions.total) * 100;
  const gxProgressPercent =
    (MOCK_MEMBERSHIP.gxClasses.used / MOCK_MEMBERSHIP.gxClasses.total) * 100;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const isExpiringSoon = MOCK_MEMBERSHIP.daysRemaining <= 30;

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D12', paddingBottom: '140px' }}>
      <PageHeader title="회원권 정보" showBack />

      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* 회원권 카드 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <FeatureCard>
            <div style={{ position: 'relative' }}>
              {/* 배경 장식 */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '160px',
                height: '160px',
                background: 'linear-gradient(135deg, rgba(114, 9, 183, 0.2), rgba(0, 217, 255, 0.1))',
                borderRadius: '50%',
                filter: 'blur(40px)',
              }} />

              <div style={{ position: 'relative', zIndex: 10 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <div>
                    <Tag color="purple">
                      <Star size={12} style={{ marginRight: '4px' }} />
                      {MOCK_MEMBERSHIP.type}
                    </Tag>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginTop: '8px' }}>
                      {MOCK_MEMBERSHIP.name}
                    </h2>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <CreditCard size={32} style={{ color: '#7209B7', marginBottom: '4px' }} />
                  </div>
                </div>

                {/* 기간 정보 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: '#9CA3AF' }}>이용 기간</span>
                    <span style={{ color: 'white' }}>
                      {formatDate(MOCK_MEMBERSHIP.startDate)} ~ {formatDate(MOCK_MEMBERSHIP.endDate)}
                    </span>
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '14px', color: '#9CA3AF' }}>잔여 기간</span>
                      <span style={{
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: isExpiringSoon ? '#FF006E' : '#39FF14',
                      }}>
                        {MOCK_MEMBERSHIP.daysRemaining}일 남음
                      </span>
                    </div>
                    <ProgressBar
                      percentage={100 - progressPercent}
                      color={isExpiringSoon ? 'orange' : 'green'}
                    />
                  </div>
                </div>

                {isExpiringSoon && (
                  <div style={{
                    padding: '12px',
                    background: 'rgba(255, 0, 110, 0.1)',
                    border: '1px solid rgba(255, 0, 110, 0.3)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    <AlertCircle size={18} style={{ color: '#FF006E', flexShrink: 0 }} />
                    <p style={{ fontSize: '14px', color: '#D1D5DB' }}>
                      회원권 만료가 가까워졌습니다. 갱신 시 특별 할인을 받아보세요!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </FeatureCard>
        </motion.div>

        {/* PT & GX 현황 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}
        >
          {/* PT */}
          <ModernCard>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Dumbbell size={18} style={{ color: '#FF6B35' }} />
              <h3 style={{ fontWeight: 'bold', color: 'white' }}>PT 세션</h3>
            </div>
            <div style={{ textAlign: 'center', marginBottom: '12px' }}>
              <span style={{
                fontSize: '30px',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                {MOCK_MEMBERSHIP.ptSessions.remaining}
              </span>
              <span style={{ color: '#9CA3AF' }}>/{MOCK_MEMBERSHIP.ptSessions.total}회</span>
            </div>
            <ProgressBar percentage={100 - ptProgressPercent} color="orange" />
            <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '8px', textAlign: 'center' }}>
              {MOCK_MEMBERSHIP.ptSessions.used}회 사용
            </p>
          </ModernCard>

          {/* GX */}
          <ModernCard>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Users size={18} style={{ color: '#39FF14' }} />
              <h3 style={{ fontWeight: 'bold', color: 'white' }}>GX 클래스</h3>
            </div>
            <div style={{ textAlign: 'center', marginBottom: '12px' }}>
              <span style={{
                fontSize: '30px',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #39FF14, #00D9FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                {MOCK_MEMBERSHIP.gxClasses.remaining}
              </span>
              <span style={{ color: '#9CA3AF' }}>/{MOCK_MEMBERSHIP.gxClasses.total}회</span>
            </div>
            <ProgressBar percentage={100 - gxProgressPercent} color="green" />
            <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '8px', textAlign: 'center' }}>
              {MOCK_MEMBERSHIP.gxClasses.used}회 사용
            </p>
          </ModernCard>
        </motion.div>

        {/* 혜택 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ModernCard>
            <h3 style={{ fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>포함된 혜택</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {MOCK_MEMBERSHIP.benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '8px',
                  }}
                >
                  <div style={{ color: '#00D9FF' }}>{benefit.icon}</div>
                  <span style={{ fontSize: '14px', color: '#D1D5DB' }}>{benefit.name}</span>
                </div>
              ))}
            </div>
          </ModernCard>
        </motion.div>

        {/* 결제 내역 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ModernCard onClick={() => setShowHistoryModal(true)} style={{ cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  background: '#1A1A24',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <CreditCard size={20} style={{ color: '#00D9FF' }} />
                </div>
                <div>
                  <h3 style={{ fontWeight: 'bold', color: 'white' }}>결제 내역</h3>
                  <p style={{ fontSize: '14px', color: '#9CA3AF' }}>
                    최근 결제: {formatDate(MOCK_MEMBERSHIP.paymentHistory[0].date)}
                  </p>
                </div>
              </div>
              <ChevronRight size={20} style={{ color: '#9CA3AF' }} />
            </div>
          </ModernCard>
        </motion.div>

        {/* 추가 서비스 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <ModernCard>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(114, 9, 183, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Gift size={24} style={{ color: '#7209B7' }} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontWeight: 'bold', color: 'white' }}>PT 추가 구매</h3>
                <p style={{ fontSize: '14px', color: '#9CA3AF' }}>1회당 80,000원 (10% 할인 적용)</p>
              </div>
              <SecondaryButton size="sm">
                구매
              </SecondaryButton>
            </div>
          </ModernCard>
        </motion.div>
      </div>

      {/* 하단 고정 버튼 */}
      <div style={{
        position: 'fixed',
        bottom: '80px',
        left: 0,
        right: 0,
        maxWidth: '425px',
        margin: '0 auto',
        padding: '16px 20px',
        background: 'linear-gradient(to top, #0D0D12 70%, transparent)',
      }}>
        <PrimaryButton
          fullWidth
          size="lg"
          onClick={() => router.push('/payment/renewal')}
          icon={<Calendar size={20} />}
        >
          {isExpiringSoon ? '특별 할인으로 갱신하기' : '회원권 갱신하기'}
        </PrimaryButton>
      </div>

      {/* 결제 내역 모달 */}
      <Modal
        isOpen={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
        title="결제 내역"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '384px', overflowY: 'auto' }}>
          {MOCK_MEMBERSHIP.paymentHistory.map((payment) => (
            <div
              key={payment.id}
              style={{
                padding: '16px',
                background: '#1A1A24',
                borderRadius: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', color: '#9CA3AF' }}>{formatDate(payment.date)}</span>
                <Tag color="green">
                  <CheckCircle size={12} style={{ marginRight: '4px' }} />
                  완료
                </Tag>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontWeight: 'bold', color: 'white' }}>
                    {payment.amount.toLocaleString()}원
                  </p>
                  <p style={{ fontSize: '12px', color: '#9CA3AF' }}>{payment.method}</p>
                </div>
                <SecondaryButton
                  size="sm"
                  onClick={() => router.push('/payment/success')}
                >
                  영수증
                </SecondaryButton>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
