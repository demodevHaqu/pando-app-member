'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Clock, Gift, CheckCircle, Sparkles, Calendar, TrendingUp, Percent } from 'lucide-react';
import { MOCK_MEMBER } from '@/data/mock/members';

export default function MembershipRenewalPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string>('6month');

  // 회원권 만료일 계산
  const expiryDate = new Date(MOCK_MEMBER.membershipExpiry);
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
    <div className="min-h-screen bg-cyber-dark pb-24">
      <Header title="회원권 갱신" showBack={true} showNotification={false} />

      <div className="p-4 space-y-6">
        {/* 현재 회원권 상태 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card variant={isExpiringSoon ? 'hologram' : 'default'}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-white">현재 회원권</h3>
              <Badge type={isExpiringSoon ? 'energy' : 'growth'}>
                {isExpiringSoon ? '만료 예정' : '활성'}
              </Badge>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  isExpiringSoon ? 'bg-gradient-energy' : 'bg-gradient-premium'
                }`}
              >
                <Clock size={32} className="text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">
                  {daysLeft > 0 ? `D-${daysLeft}` : '만료됨'}
                </div>
                <div className="text-sm text-gray-400">
                  만료일: {expiryDate.toLocaleDateString('ko-KR')}
                </div>
              </div>
            </div>

            {isExpiringSoon && (
              <div className="p-3 bg-energy-orange/10 border border-energy-orange/30 rounded-lg">
                <div className="flex items-center gap-2 text-energy-orange">
                  <Sparkles size={16} />
                  <span className="text-sm font-bold">
                    지금 갱신하면 추가 혜택을 받으실 수 있어요!
                  </span>
                </div>
              </div>
            )}
          </Card>
        </motion.div>

        {/* 갱신 혜택 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card variant="glass">
            <h3 className="font-bold text-white mb-3 flex items-center gap-2">
              <Gift size={20} className="text-cyber-yellow" />
              조기 갱신 혜택
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 glass-dark rounded-lg text-center">
                <Percent size={24} className="text-neon-green mx-auto mb-2" />
                <div className="text-sm font-bold text-white">최대 33% 할인</div>
                <div className="text-xs text-gray-400">장기 등록 시</div>
              </div>
              <div className="p-3 glass-dark rounded-lg text-center">
                <TrendingUp size={24} className="text-electric-blue mx-auto mb-2" />
                <div className="text-sm font-bold text-white">2,000P 적립</div>
                <div className="text-xs text-gray-400">갱신 보너스</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* 플랜 선택 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-bold text-white mb-3">기간 선택</h3>
          <div className="space-y-3">
            {plans.map((plan, idx) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
              >
                <Card
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`cursor-pointer transition-all ${
                    selectedPlan === plan.id
                      ? 'ring-2 ring-electric-blue shadow-glow-blue'
                      : 'hover:bg-white/5'
                  }`}
                  variant={plan.recommended ? 'hologram' : 'default'}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedPlan === plan.id
                            ? 'border-electric-blue bg-electric-blue'
                            : 'border-gray-500'
                        }`}
                      >
                        {selectedPlan === plan.id && (
                          <CheckCircle size={14} className="text-white" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-lg">{plan.name}</span>
                          {plan.recommended && (
                            <Badge type="premium">추천</Badge>
                          )}
                          {plan.discount > 0 && (
                            <Badge type="energy">{plan.discount}% OFF</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {plan.discount > 0 && (
                        <div className="text-sm text-gray-500 line-through">
                          {plan.originalPrice.toLocaleString()}원
                        </div>
                      )}
                      <div className="text-xl font-bold text-white">
                        {plan.price.toLocaleString()}원
                      </div>
                    </div>
                  </div>

                  {/* 혜택 목록 */}
                  <div className="flex flex-wrap gap-2">
                    {plan.benefits.map((benefit, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-cyber-mid text-gray-300 rounded text-xs"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </Card>
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
          <Card variant="glass">
            <h4 className="font-bold text-white mb-2">안내사항</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>- 갱신 시 기존 회원권 잔여일에 새 기간이 추가됩니다</li>
              <li>- 결제 후 7일 이내 환불 가능 (이용 시 일할 계산)</li>
              <li>- 회원권 일시정지는 월 1회 가능합니다</li>
            </ul>
          </Card>
        </motion.div>
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-16 left-0 right-0 max-w-[425px] mx-auto p-4 bg-gradient-to-t from-cyber-dark via-cyber-dark to-transparent">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-sm text-gray-400">결제 금액</div>
            <div className="text-2xl font-bold text-gradient-energy">
              {selectedPlanData?.price.toLocaleString()}원
            </div>
          </div>
          {selectedPlanData && selectedPlanData.discount > 0 && (
            <Badge type="energy" className="text-lg">
              {(selectedPlanData.originalPrice - selectedPlanData.price).toLocaleString()}원 할인
            </Badge>
          )}
        </div>
        <Button
          variant="energy"
          size="lg"
          className="w-full"
          onClick={handleRenewal}
          glow
          shine
        >
          <Calendar size={20} className="mr-2" />
          회원권 갱신하기
        </Button>
      </div>
    </div>
  );
}
