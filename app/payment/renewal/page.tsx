'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Clock,
  Gift,
  CheckCircle,
  Sparkles,
  Calendar,
  TrendingUp,
  Percent,
} from 'lucide-react';
import { MOCK_MEMBER } from '@/data/mock/members';
import {
  ModernCard,
  FeatureCard,
  PageHeader,
  PrimaryButton,
  Tag,
} from '@/components/ui/ModernUI';

export default function MembershipRenewalPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string>('6month');

  // 회원권 만료일 계산
  const expiryDate = new Date(MOCK_MEMBER.membershipEndDate);
  const today = new Date();
  const daysLeft = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const isExpiringSoon = daysLeft <= 14;

  // 회원권 플랜 옵션
  const plans = [
    {
      id: '1month',
      name: '1개월',
      price: 150000,
      originalPrice: 150000,
      discount: 0,
      benefits: ['자유 이용권', '락커 이용'],
      recommended: false,
    },
    {
      id: '3month',
      name: '3개월',
      price: 400000,
      originalPrice: 450000,
      discount: 11,
      benefits: ['자유 이용권', '락커 이용', '운동복 대여'],
      recommended: false,
    },
    {
      id: '6month',
      name: '6개월',
      price: 720000,
      originalPrice: 900000,
      discount: 20,
      benefits: ['자유 이용권', '락커 이용', '운동복 대여', 'GX 무료'],
      recommended: true,
    },
    {
      id: '12month',
      name: '12개월',
      price: 1200000,
      originalPrice: 1800000,
      discount: 33,
      benefits: ['자유 이용권', '락커 이용', '운동복 대여', 'GX 무료', 'PT 2회 무료'],
      recommended: false,
    },
  ];

  const selectedPlanData = plans.find((p) => p.id === selectedPlan);

  const handleRenewal = () => {
    router.push(`/payment/checkout?type=membership&plan=${selectedPlan}`);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D12', paddingBottom: '180px' }}>
      <PageHeader title="회원권 갱신" />

      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* 현재 회원권 상태 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <FeatureCard>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontWeight: 'bold', color: 'white' }}>현재 회원권</h3>
              <Tag color={isExpiringSoon ? 'orange' : 'green'}>
                {isExpiringSoon ? '만료 예정' : '활성'}
              </Tag>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: isExpiringSoon
                  ? 'linear-gradient(135deg, #FF6B35, #FF006E)'
                  : 'linear-gradient(135deg, #7209B7, #FF006E)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Clock size={32} color="white" />
              </div>
              <div>
                <div style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '4px',
                }}>
                  {daysLeft > 0 ? `D-${daysLeft}` : '만료됨'}
                </div>
                <div style={{ fontSize: '14px', color: '#9CA3AF' }}>
                  만료일: {expiryDate.toLocaleDateString('ko-KR')}
                </div>
              </div>
            </div>

            {isExpiringSoon && (
              <div style={{
                padding: '12px',
                background: 'rgba(255, 107, 53, 0.1)',
                border: '1px solid rgba(255, 107, 53, 0.3)',
                borderRadius: '12px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FF6B35' }}>
                  <Sparkles size={16} />
                  <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
                    지금 갱신하면 추가 혜택을 받으실 수 있어요!
                  </span>
                </div>
              </div>
            )}
          </FeatureCard>
        </motion.div>

        {/* 갱신 혜택 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ModernCard style={{ padding: '20px' }}>
            <h3 style={{
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <Gift size={20} color="#FFD60A" />
              조기 갱신 혜택
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              <div style={{
                padding: '16px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '12px',
                textAlign: 'center',
              }}>
                <Percent size={24} color="#39FF14" style={{ margin: '0 auto 8px' }} />
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'white' }}>최대 33% 할인</div>
                <div style={{ fontSize: '12px', color: '#6B7280' }}>장기 등록 시</div>
              </div>
              <div style={{
                padding: '16px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '12px',
                textAlign: 'center',
              }}>
                <TrendingUp size={24} color="#00D9FF" style={{ margin: '0 auto 8px' }} />
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'white' }}>2,000P 적립</div>
                <div style={{ fontSize: '12px', color: '#6B7280' }}>갱신 보너스</div>
              </div>
            </div>
          </ModernCard>
        </motion.div>

        {/* 플랜 선택 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>
            기간 선택
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {plans.map((plan, idx) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
              >
                <ModernCard
                  onClick={() => setSelectedPlan(plan.id)}
                  style={{
                    padding: '16px',
                    cursor: 'pointer',
                    border: selectedPlan === plan.id
                      ? '2px solid #00D9FF'
                      : plan.recommended
                      ? '1px solid rgba(114, 9, 183, 0.5)'
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: selectedPlan === plan.id ? '0 0 20px rgba(0, 217, 255, 0.3)' : 'none',
                    background: plan.recommended
                      ? 'linear-gradient(145deg, rgba(114, 9, 183, 0.15), rgba(13, 13, 18, 0.95))'
                      : undefined,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        border: selectedPlan === plan.id ? 'none' : '2px solid #6B7280',
                        background: selectedPlan === plan.id ? '#00D9FF' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        {selectedPlan === plan.id && <CheckCircle size={14} color="white" />}
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>{plan.name}</span>
                          {plan.recommended && <Tag color="purple">추천</Tag>}
                          {plan.discount > 0 && <Tag color="orange">{plan.discount}% OFF</Tag>}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      {plan.discount > 0 && (
                        <div style={{ fontSize: '13px', color: '#6B7280', textDecoration: 'line-through' }}>
                          {plan.originalPrice.toLocaleString()}원
                        </div>
                      )}
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>
                        {plan.price.toLocaleString()}원
                      </div>
                    </div>
                  </div>

                  {/* 혜택 목록 */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {plan.benefits.map((benefit, i) => (
                      <span
                        key={i}
                        style={{
                          padding: '6px 10px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          color: '#D1D5DB',
                          borderRadius: '6px',
                          fontSize: '12px',
                        }}
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </ModernCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 안내사항 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <ModernCard style={{ padding: '20px' }}>
            <h4 style={{ fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>안내사항</h4>
            <ul style={{
              fontSize: '13px',
              color: '#9CA3AF',
              lineHeight: 1.8,
              margin: 0,
              paddingLeft: '16px',
            }}>
              <li>갱신 시 기존 회원권 잔여일에 새 기간이 추가됩니다</li>
              <li>결제 후 7일 이내 환불 가능 (이용 시 일할 계산)</li>
              <li>회원권 일시정지는 월 1회 가능합니다</li>
            </ul>
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div>
            <div style={{ fontSize: '13px', color: '#9CA3AF' }}>결제 금액</div>
            <div style={{
              fontSize: '26px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              {selectedPlanData?.price.toLocaleString()}원
            </div>
          </div>
          {selectedPlanData && selectedPlanData.discount > 0 && (
            <Tag color="orange" size="sm">
              {(selectedPlanData.originalPrice - selectedPlanData.price).toLocaleString()}원 할인
            </Tag>
          )}
        </div>
        <PrimaryButton
          fullWidth
          size="lg"
          onClick={handleRenewal}
          icon={<Calendar size={20} />}
        >
          회원권 갱신하기
        </PrimaryButton>
      </div>
    </div>
  );
}
