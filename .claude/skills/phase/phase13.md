🎯 PHASE 13: 결제 시스템
Task 13.1: 타입 정의 및 Mock 데이터
파일: types/payment.ts
typescriptexport interface PaymentMethod {
  id: string;
  type: 'card' | 'account' | 'kakao' | 'naver';
  name: string;
  lastFourDigits?: string;
  isDefault: boolean;
}

export interface Payment {
  id: string;
  memberId: string;
  amount: number;
  type: 'pt' | 'membership' | 'product';
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  paymentMethod: string;
  date: string;
  description: string;
}
파일: data/mock/payments.ts
typescriptimport { PaymentMethod, Payment } from '@/types/payment';

export const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'method1',
    type: 'card',
    name: '신한카드',
    lastFourDigits: '1234',
    isDefault: true,
  },
  {
    id: 'method2',
    type: 'kakao',
    name: '카카오페이',
    isDefault: false,
  },
];

export const MOCK_PAYMENTS: Payment[] = [
  {
    id: 'payment1',
    memberId: 'member1',
    amount: 1200000,
    type: 'pt',
    status: 'completed',
    paymentMethod: 'card',
    date: '2025-01-05',
    description: 'PT 16회 패키지',
  },
  {
    id: 'payment2',
    memberId: 'member1',
    amount: 150000,
    type: 'membership',
    status: 'completed',
    paymentMethod: 'kakao',
    date: '2024-12-01',
    description: '프리미엄 회원권 (1개월)',
  },
];

Task 13.2: 결제하기
파일: app/payment/checkout/page.tsx
typescript'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import { CreditCard, Smartphone, CheckCircle, AlertCircle } from 'lucide-react';
import { MOCK_PAYMENT_METHODS } from '@/data/mock/payments';

export default function CheckoutPage() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState('method1');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Mock 주문 정보
  const orderInfo = {
    item: 'PT 16회 패키지',
    price: 1200000,
    discount: 120000,
    finalPrice: 1080000,
  };

  const handlePayment = () => {
    if (!agreeTerms) {
      alert('결제 약관에 동의해주세요');
      return;
    }
    // 결제 처리
    setTimeout(() => {
      setShowSuccessModal(true);
    }, 1000);
  };

  const paymentMethods = [
    { id: 'card', icon: CreditCard, label: '신용/체크카드' },
    { id: 'kakao', icon: Smartphone, label: '카카오페이' },
    { id: 'naver', icon: Smartphone, label: '네이버페이' },
  ];

  return (
    <div className="min-h-screen bg-cyber-dark pb-24">
      <Header title="결제하기" showBack={true} showNotification={false} />

      <div className="p-4 space-y-6">
        {/* 주문 정보 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card variant="hologram">
            <h3 className="font-bold text-white mb-4">주문 정보</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">상품명</span>
                <span className="text-white font-bold">{orderInfo.item}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">정가</span>
                <span className="text-white">{orderInfo.price.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">할인</span>
                <span className="text-power-pink">-{orderInfo.discount.toLocaleString()}원</span>
              </div>
              <div className="pt-3 border-t border-white/10">
                <div className="flex justify-between">
                  <span className="text-white font-bold">최종 결제금액</span>
                  <span className="text-2xl font-bold text-gradient-energy">
                    {orderInfo.finalPrice.toLocaleString()}원
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* 결제 수단 선택 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-lg font-bold text-white mb-3">결제 수단</h3>
          <div className="space-y-2">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <Card
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`cursor-pointer transition-all ${
                    selectedMethod === method.id ? 'ring-2 ring-electric-blue' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          selectedMethod === method.id ? 'bg-gradient-energy' : 'bg-cyber-mid'
                        }`}
                      >
                        <Icon size={24} className="text-white" />
                      </div>
                      <span className="font-bold text-white">{method.label}</span>
                    </div>
                    {selectedMethod === method.id && (
                      <CheckCircle size={24} className="text-electric-blue" />
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </motion.div>

        {/* 쿠폰/포인트 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <h3 className="font-bold text-white mb-3">할인 혜택</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-3 glass-dark rounded-lg">
                <span className="text-gray-300">쿠폰 사용</span>
                <span className="text-electric-blue">1장 보유 →</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 glass-dark rounded-lg">
                <span className="text-gray-300">포인트 사용</span>
                <span className="text-neon-green">3,450P 보유 →</span>
              </button>
            </div>
          </Card>
        </motion.div>

        {/* 약관 동의 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-gray-600 bg-cyber-mid text-electric-blue focus:ring-electric-blue"
              />
              <div className="flex-1">
                <div className="text-white font-bold mb-1">결제 약관 전체 동의</div>
                <div className="text-sm text-gray-400">
                  개인정보 수집 및 이용, 결제대행 서비스 이용약관에 모두 동의합니다.
                </div>
              </div>
            </label>
          </Card>
        </motion.div>

        {/* 안내사항 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card variant="glass">
            <div className="flex gap-3">
              <AlertCircle size={24} className="text-electric-blue flex-shrink-0" />
              <div>
                <div className="font-bold text-white mb-1">결제 안내</div>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• 결제 후 7일 이내 환불 가능합니다</li>
                  <li>• 서비스 이용 시작 후 환불 금액이 차감됩니다</li>
                  <li>• 문의사항은 고객센터로 연락주세요</li>
                </ul>
              </div>
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
          onClick={handlePayment}
          disabled={!agreeTerms}
          glow
          shine
        >
          {orderInfo.finalPrice.toLocaleString()}원 결제하기
        </Button>
      </div>

      {/* 결제 완료 모달 */}
      <Modal isOpen={showSuccessModal} onClose={() => {}} title="결제 완료">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-growth rounded-full flex items-center justify-center mx-auto">
            <CheckCircle size={48} className="text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">결제가 완료되었습니다!</h3>
            <p className="text-gray-400">PT 예약 페이지로 이동합니다</p>
          </div>
          <Button
            variant="energy"
            size="lg"
            className="w-full"
            onClick={() => router.push('/pt/booking')}
            glow
            shine
          >
            PT 예약하러 가기
          </Button>
        </div>
      </Modal>
    </div>
  );
}

Task 13.3: 결제 내역
파일: app/payment/history/page.tsx
typescript'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Tabs from '@/components/ui/Tabs';
import { CreditCard, Download, RefreshCw } from 'lucide-react';
import { MOCK_PAYMENTS } from '@/data/mock/payments';

export default function PaymentHistoryPage() {
  const router = useRouter();

  const statusLabels = {
    completed: { label: '완료', color: 'growth' },
    pending: { label: '대기', color: 'energy' },
    failed: { label: '실패', color: 'premium' },
    refunded: { label: '환불', color: 'energy' },
  };

  const typeLabels = {
    pt: 'PT 패키지',
    membership: '회원권',
    product: '상품',
  };

  const tabContent = [
    {
      id: 'all',
      label: '전체',
      content: (
        <div className="space-y-3">
          {MOCK_PAYMENTS.map((payment, idx) => {
            const status = statusLabels[payment.status];
            return (
              <motion.div
                key={payment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-bold text-white">{payment.description}</h4>
                        <Badge type={status.color as any}>{status.label}</Badge>
                      </div>
                      <div className="text-sm text-gray-400 mb-1">
                        {new Date(payment.date).toLocaleDateString('ko-KR')}
                      </div>
                      <div className="text-xs text-gray-500">{typeLabels[payment.type]}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">
                        {payment.amount.toLocaleString()}원
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-3 border-t border-white/10">
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Download size={16} className="mr-1" />
                      영수증
                    </Button>
                    {payment.status === 'completed' && (
                      <Button variant="ghost" size="sm" className="flex-1">
                        <RefreshCw size={16} className="mr-1" />
                        환불 신청
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      ),
    },
    {
      id: 'pt',
      label: 'PT',
      content: (
        <div className="space-y-3">
          {MOCK_PAYMENTS.filter((p) => p.type === 'pt').map((payment) => {
            const status = statusLabels[payment.status];
            return (
              <Card key={payment.id}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-bold text-white">{payment.description}</h4>
                      <Badge type={status.color as any}>{status.label}</Badge>
                    </div>
                    <div className="text-sm text-gray-400">
                      {new Date(payment.date).toLocaleDateString('ko-KR')}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {payment.amount.toLocaleString()}원
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ),
    },
    {
      id: 'membership',
      label: '회원권',
      content: (
        <div className="space-y-3">
          {MOCK_PAYMENTS.filter((p) => p.type === 'membership').map((payment) => {
            const status = statusLabels[payment.status];
            return (
              <Card key={payment.id}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-bold text-white">{payment.description}</h4>
                      <Badge type={status.color as any}>{status.label}</Badge>
                    </div>
                    <div className="text-sm text-gray-400">
                      {new Date(payment.date).toLocaleDateString('ko-KR')}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {payment.amount.toLocaleString()}원
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-cyber-dark">
      <Header title="결제 내역" showBack={true} showNotification={false} />

      <div className="p-4 space-y-6">
        {/* 결제 요약 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card variant="hologram">
            <div className="text-center">
              <CreditCard size={32} className="text-electric-blue mx-auto mb-3" />
              <div className="text-sm text-gray-400 mb-2">총 결제금액</div>
              <div className="text-3xl font-bold text-gradient-energy">
                {MOCK_PAYMENTS.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}원
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
