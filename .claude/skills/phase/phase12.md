🎯 PHASE 12: 리워드 시스템Task 12.1: 타입 정의 및 Mock 데이터파일: types/reward.tstypescriptexport interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt?: string;
  isEarned: boolean;
}

export interface PointHistory {
  id: string;
  type: 'earn' | 'use';
  amount: number;
  description: string;
  date: string;
}

export interface Coupon {
  id: string;
  name: string;
  discount: number;
  discountType: 'percentage' | 'fixed';
  minPurchase?: number;
  expiryDate: string;
  isUsed: boolean;
}파일: data/mock/rewards.tstypescriptimport { Badge, PointHistory, Coupon } from '@/types/reward';

export const MOCK_BADGES: Badge[] = [
  {
    id: 'badge1',
    name: '첫 운동',
    description: '첫 운동을 완료했습니다',
    icon: '🎯',
    earnedAt: '2025-01-05',
    isEarned: true,
  },
  {
    id: 'badge2',
    name: '3일 연속',
    description: '3일 연속 운동했습니다',
    icon: '🔥',
    earnedAt: '2025-01-15',
    isEarned: true,
  },
  {
    id: 'badge3',
    name: '루틴 완수',
    description: '운동 루틴을 완수했습니다',
    icon: '💪',
    earnedAt: '2025-01-10',
    isEarned: true,
  },
  {
    id: 'badge4',
    name: '7일 연속',
    description: '7일 연속 운동하기',
    icon: '⭐',
    isEarned: false,
  },
  {
    id: 'badge5',
    name: '30일 연속',
    description: '30일 연속 운동하기',
    icon: '👑',
    isEarned: false,
  },
  {
    id: 'badge6',
    name: 'PT 10회',
    description: 'PT 10회 달성',
    icon: '🎖️',
    isEarned: false,
  },
];

export const MOCK_POINT_HISTORY: PointHistory[] = [
  {
    id: 'point1',
    type: 'earn',
    amount: 50,
    description: '루틴 완료',
    date: '2025-01-15',
  },
  {
    id: 'point2',
    type: 'earn',
    amount: 100,
    description: '출석 체크',
    date: '2025-01-15',
  },
  {
    id: 'point3',
    type: 'use',
    amount: -500,
    description: '쿠폰 사용',
    date: '2025-01-14',
  },
  {
    id: 'point4',
    type: 'earn',
    amount: 50,
    description: '루틴 완료',
    date: '2025-01-14',
  },
  {
    id: 'point5',
    type: 'earn',
    amount: 200,
    description: 'PT 출석',
    date: '2025-01-13',
  },
];

export const MOCK_COUPONS: Coupon[] = [
  {
    id: 'coupon1',
    name: 'PT 10% 할인 쿠폰',
    discount: 10,
    discountType: 'percentage',
    minPurchase: 500000,
    expiryDate: '2025-02-28',
    isUsed: false,
  },
  {
    id: 'coupon2',
    name: '5,000원 할인 쿠폰',
    discount: 5000,
    discountType: 'fixed',
    expiryDate: '2025-01-31',
    isUsed: false,
  },
  {
    id: 'coupon3',
    name: '운동복 20% 할인',
    discount: 20,
    discountType: 'percentage',
    expiryDate: '2025-03-31',
    isUsed: true,
  },
];Task 12.2: 리워드 메인파일: app/rewards/page.tsxtypescript'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Tabs from '@/components/ui/Tabs';
import { TrendingUp, Award, Gift, Calendar, Plus, Minus } from 'lucide-react';
import { MOCK_BADGES, MOCK_POINT_HISTORY, MOCK_COUPONS } from '@/data/mock/rewards';
import { MOCK_MEMBER } from '@/data/mock/members';

export default function RewardsPage() {
  const router = useRouter();

  const earnedBadges = MOCK_BADGES.filter((b) => b.isEarned);
  const lockedBadges = MOCK_BADGES.filter((b) => !b.isEarned);
  const availableCoupons = MOCK_COUPONS.filter((c) => !c.isUsed);

  const tabContent = [
    {
      id: 'badges',
      label: '뱃지',
      content: (
        <div className="space-y-6">
          {/* 획득한 뱃지 */}
          <div>
            <h4 className="font-bold text-white mb-3">획득한 뱃지 ({earnedBadges.length})</h4>
            <div className="grid grid-cols-3 gap-3">
              {earnedBadges.map((badge, idx) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card className="text-center">
                    <div className="text-4xl mb-2">{badge.icon}</div>
                    <div className="text-sm font-bold text-white mb-1">{badge.name}</div>
                    <div className="text-xs text-gray-400">{badge.description}</div>
                    {badge.earnedAt && (
                      <div className="text-xs text-gray-500 mt-2">
                        {new Date(badge.earnedAt).toLocaleDateString('ko-KR')}
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 잠긴 뱃지 */}
          <div>
            <h4 className="font-bold text-white mb-3">잠긴 뱃지 ({lockedBadges.length})</h4>
            <div className="grid grid-cols-3 gap-3">
              {lockedBadges.map((badge, idx) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card className="text-center opacity-50">
                    <div className="text-4xl mb-2 grayscale">{badge.icon}</div>
                    <div className="text-sm font-bold text-gray-400 mb-1">{badge.name}</div>
                    <div className="text-xs text-gray-500">{badge.description}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'points',
      label: '포인트',
      content: (
        <div className="space-y-4">
          {/* 포인트 요약 */}
          <Card variant="hologram">
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-2">보유 포인트</div>
              <div className="text-5xl font-bold text-gradient-energy mb-2">
                {MOCK_MEMBER.points.toLocaleString()}
              </div>
              <div className="text-gray-400">P</div>
            </div>
          </Card>

          {/* 포인트 적립 안내 */}
          <Card>
            <h4 className="font-bold text-white mb-3">포인트 적립 방법</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 glass-dark rounded">
                <span className="text-gray-400">출석 체크</span>
                <span className="text-neon-green font-bold">+100P</span>
              </div>
              <div className="flex justify-between p-2 glass-dark rounded">
                <span className="text-gray-400">루틴 완료</span>
                <span className="text-neon-green font-bold">+50P</span>
              </div>
              <div className="flex justify-between p-2 glass-dark rounded">
                <span className="text-gray-400">PT/GX 출석</span>
                <span className="text-neon-green font-bold">+200P</span>
              </div>
              <div className="flex justify-between p-2 glass-dark rounded">
                <span className="text-gray-400">운동 인증</span>
                <span className="text-neon-green font-bold">+30P</span>
              </div>
            </div>
          </Card>

          {/* 포인트 내역 */}
          <Card>
            <h4 className="font-bold text-white mb-3">포인트 내역</h4>
            <div className="space-y-2">
              {MOCK_POINT_HISTORY.map((history) => (
                <div
                  key={history.id}
                  className="flex items-center justify-between p-3 glass-dark rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        history.type === 'earn' ? 'bg-neon-green/20' : 'bg-power-pink/20'
                      }`}
                    >
                      {history.type === 'earn' ? (
                        <Plus size={16} className="text-neon-green" />
                      ) : (
                        <Minus size={16} className="text-power-pink" />
                      )}
                    </div>
                    <div>
                      <div className="text-white font-bold">{history.description}</div>
                      <div className="text-xs text-gray-400">
                        {new Date(history.date).toLocaleDateString('ko-KR')}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`font-bold ${
                      history.type === 'earn' ? 'text-neon-green' : 'text-power-pink'
                    }`}
                  >
                    {history.amount > 0 ? '+' : ''}
                    {history.amount}P
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      ),
    },
    {
      id: 'coupons',
      label: '쿠폰',
      content: (
        <div className="space-y-4">
          {/* 사용 가능한 쿠폰 */}
          <div>
            <h4 className="font-bold text-white mb-3">
              사용 가능한 쿠폰 ({availableCoupons.length})
            </h4>
            <div className="space-y-3">
              {availableCoupons.map((coupon) => {
                const daysLeft = Math.ceil(
                  (new Date(coupon.expiryDate).getTime() - new Date().getTime()) /
                    (1000 * 60 * 60 * 24)
                );

                return (
                  <Card key={coupon.id} variant="hologram">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h5 className="font-bold text-white mb-1">{coupon.name}</h5>
                        <div className="text-3xl font-bold text-gradient-premium mb-2">
                          {coupon.discountType === 'percentage'
                            ? `${coupon.discount}%`
                            : `${(coupon.discount / 1000).toFixed(0)}천원`}
                        </div>
                        {coupon.minPurchase && (
                          <div className="text-xs text-gray-400">
                            {(coupon.minPurchase / 10000).toFixed(0)}만원 이상 구매 시
                          </div>
                        )}
                      </div>
                      <Gift size={32} className="text-tech-purple" />
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                      <div className="text-xs text-gray-400">
                        {daysLeft}일 남음 · {new Date(coupon.expiryDate).toLocaleDateString('ko-KR')}
                      </div>
                      <Button variant="premium" size="sm">
                        사용하기
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* 사용한 쿠폰 */}
          {MOCK_COUPONS.filter((c) => c.isUsed).length > 0 && (
            <div>
              <h4 className="font-bold text-white mb-3">사용한 쿠폰</h4>
              <div className="space-y-2">
                {MOCK_COUPONS.filter((c) => c.isUsed).map((coupon) => (
                  <Card key={coupon.id} className="opacity-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white mb-1">{coupon.name}</div>
                        <div className="text-sm text-gray-400">사용 완료</div>
                      </div>
                      <Badge type="premium">사용됨</Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-cyber-dark">
      <Header title="리워드" showBack={false} showNotification={true} />

      <div className="p-4 space-y-6">
        {/* 포인트/뱃지 요약 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card variant="hologram">
            <div className="grid grid-cols-2 gap-4">
              <div
                className="text-center cursor-pointer"
                onClick={() => document.getElementById('points-tab')?.click()}
              >
                <TrendingUp size={32} className="text-energy-orange mx-auto mb-2" />
                <div className="text-2xl font-bold text-white mb-1">
                  {MOCK_MEMBER.points.toLocaleString()}
                </div>
                <div className="text-sm text-gray-400">포인트</div>
              </div>
              <div
                className="text-center cursor-pointer"
                onClick={() => document.getElementById('badges-tab')?.click()}
              >
                <Award size={32} className="text-cyber-yellow mx-auto mb-2" />
                <div className="text-2xl font-bold text-white mb-1">{earnedBadges.length}</div>
                <div className="text-sm text-gray-400">뱃지</div>
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