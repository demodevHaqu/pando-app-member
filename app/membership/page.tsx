'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
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
    <div className="min-h-screen bg-cyber-dark pb-24">
      <Header title="회원권 정보" showBack={true} showNotification={false} />

      <div className="p-4 space-y-6">
        {/* 회원권 카드 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card
            variant="hologram"
            glow
            className="relative overflow-hidden bg-gradient-to-br from-tech-purple/30 via-electric-blue/20 to-neon-green/10"
          >
            {/* 배경 장식 */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-premium/20 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <Badge type="premium">
                    <Star size={12} className="mr-1" />
                    {MOCK_MEMBERSHIP.type}
                  </Badge>
                  <h2 className="text-2xl font-bold text-white mt-2">{MOCK_MEMBERSHIP.name}</h2>
                </div>
                <div className="text-right">
                  <CreditCard size={32} className="text-tech-purple mb-1" />
                </div>
              </div>

              {/* 기간 정보 */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">이용 기간</span>
                  <span className="text-white">
                    {formatDate(MOCK_MEMBERSHIP.startDate)} ~ {formatDate(MOCK_MEMBERSHIP.endDate)}
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">잔여 기간</span>
                    <span
                      className={`text-sm font-bold ${
                        isExpiringSoon ? 'text-power-pink' : 'text-neon-green'
                      }`}
                    >
                      {MOCK_MEMBERSHIP.daysRemaining}일 남음
                    </span>
                  </div>
                  <div className="h-2 bg-cyber-dark rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        isExpiringSoon ? 'bg-gradient-to-r from-power-pink to-energy-orange' : 'bg-gradient-growth'
                      }`}
                      style={{ width: `${100 - progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {isExpiringSoon && (
                <div className="p-3 bg-power-pink/10 border border-power-pink/30 rounded-lg flex items-center gap-2">
                  <AlertCircle size={18} className="text-power-pink flex-shrink-0" />
                  <p className="text-sm text-gray-300">
                    회원권 만료가 가까워졌습니다. 갱신 시 특별 할인을 받아보세요!
                  </p>
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* PT & GX 현황 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-3"
        >
          {/* PT */}
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Dumbbell size={18} className="text-energy-orange" />
              <h3 className="font-bold text-white">PT 세션</h3>
            </div>
            <div className="text-center mb-3">
              <span className="text-3xl font-bold text-gradient-energy">
                {MOCK_MEMBERSHIP.ptSessions.remaining}
              </span>
              <span className="text-gray-400">/{MOCK_MEMBERSHIP.ptSessions.total}회</span>
            </div>
            <div className="h-1.5 bg-cyber-mid rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-energy"
                style={{ width: `${100 - ptProgressPercent}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              {MOCK_MEMBERSHIP.ptSessions.used}회 사용
            </p>
          </Card>

          {/* GX */}
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Users size={18} className="text-neon-green" />
              <h3 className="font-bold text-white">GX 클래스</h3>
            </div>
            <div className="text-center mb-3">
              <span className="text-3xl font-bold text-gradient-growth">
                {MOCK_MEMBERSHIP.gxClasses.remaining}
              </span>
              <span className="text-gray-400">/{MOCK_MEMBERSHIP.gxClasses.total}회</span>
            </div>
            <div className="h-1.5 bg-cyber-mid rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-growth"
                style={{ width: `${100 - gxProgressPercent}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              {MOCK_MEMBERSHIP.gxClasses.used}회 사용
            </p>
          </Card>
        </motion.div>

        {/* 혜택 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <h3 className="font-bold text-white mb-4">포함된 혜택</h3>
            <div className="grid grid-cols-2 gap-3">
              {MOCK_MEMBERSHIP.benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 glass-dark rounded-lg"
                >
                  <div className="text-electric-blue">{benefit.icon}</div>
                  <span className="text-sm text-gray-300">{benefit.name}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* 결제 내역 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card onClick={() => setShowHistoryModal(true)}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyber-mid flex items-center justify-center">
                  <CreditCard size={20} className="text-electric-blue" />
                </div>
                <div>
                  <h3 className="font-bold text-white">결제 내역</h3>
                  <p className="text-sm text-gray-400">
                    최근 결제: {formatDate(MOCK_MEMBERSHIP.paymentHistory[0].date)}
                  </p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </Card>
        </motion.div>

        {/* 추가 서비스 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card variant="glass">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-premium/20 flex items-center justify-center">
                <Gift size={24} className="text-tech-purple" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white">PT 추가 구매</h3>
                <p className="text-sm text-gray-400">1회당 80,000원 (10% 할인 적용)</p>
              </div>
              <Button variant="ghost" size="sm">
                구매
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-16 left-0 right-0 max-w-[425px] mx-auto p-4 bg-gradient-to-t from-cyber-dark via-cyber-dark to-transparent">
        <Button
          variant="energy"
          size="lg"
          className="w-full"
          onClick={() => router.push('/payment/renewal')}
          glow
          shine
        >
          {isExpiringSoon ? '특별 할인으로 갱신하기' : '회원권 갱신하기'}
        </Button>
      </div>

      {/* 결제 내역 모달 */}
      <Modal
        isOpen={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
        title="결제 내역"
      >
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {MOCK_MEMBERSHIP.paymentHistory.map((payment) => (
            <div
              key={payment.id}
              className="p-4 bg-cyber-mid rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">{formatDate(payment.date)}</span>
                <Badge type="growth">
                  <CheckCircle size={12} className="mr-1" />
                  완료
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-white">
                    {payment.amount.toLocaleString()}원
                  </p>
                  <p className="text-xs text-gray-400">{payment.method}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push('/payment/success')}
                >
                  영수증
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
