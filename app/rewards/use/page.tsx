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
  Gift,
  Tag,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Ticket,
  Coffee,
  ShoppingBag,
  Dumbbell,
} from 'lucide-react';

// Mock 쿠폰 데이터
const MOCK_AVAILABLE_COUPONS = [
  {
    id: 'coupon1',
    type: 'discount',
    title: 'PT 20% 할인',
    description: 'PT 패키지 결제 시 20% 할인',
    discountType: 'percentage',
    discountValue: 20,
    minAmount: 500000,
    expiryDate: '2025-02-28',
    icon: <Dumbbell size={24} className="text-energy-orange" />,
    bgGradient: 'from-energy-orange/20 to-power-pink/20',
  },
  {
    id: 'coupon2',
    type: 'discount',
    title: '50,000원 할인',
    description: '회원권 결제 시 사용 가능',
    discountType: 'fixed',
    discountValue: 50000,
    minAmount: 300000,
    expiryDate: '2025-01-31',
    icon: <Tag size={24} className="text-neon-green" />,
    bgGradient: 'from-neon-green/20 to-electric-blue/20',
  },
  {
    id: 'coupon3',
    type: 'freebie',
    title: 'GX 1회 무료',
    description: '원하는 GX 클래스 1회 무료 이용',
    expiryDate: '2025-03-15',
    icon: <Ticket size={24} className="text-electric-blue" />,
    bgGradient: 'from-electric-blue/20 to-tech-purple/20',
  },
  {
    id: 'coupon4',
    type: 'freebie',
    title: '프로틴 음료 교환권',
    description: '프론트에서 프로틴 음료 1잔 교환',
    expiryDate: '2025-02-15',
    icon: <Coffee size={24} className="text-cyber-yellow" />,
    bgGradient: 'from-cyber-yellow/20 to-energy-orange/20',
  },
];

// Mock 포인트 상품
const MOCK_POINT_ITEMS = [
  {
    id: 'item1',
    name: '운동 장갑',
    points: 5000,
    image: '🧤',
    category: '용품',
  },
  {
    id: 'item2',
    name: '쉐이커 보틀',
    points: 3000,
    image: '🥤',
    category: '용품',
  },
  {
    id: 'item3',
    name: '프로틴 바 5개',
    points: 2000,
    image: '🍫',
    category: '식품',
  },
  {
    id: 'item4',
    name: 'PT 1회 이용권',
    points: 15000,
    image: '💪',
    category: '서비스',
  },
  {
    id: 'item5',
    name: '스포츠 타월',
    points: 4000,
    image: '🧺',
    category: '용품',
  },
  {
    id: 'item6',
    name: 'GX 1회 이용권',
    points: 8000,
    image: '🧘',
    category: '서비스',
  },
];

export default function RewardUsePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'coupon' | 'point'>('coupon');
  const [selectedCoupon, setSelectedCoupon] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [showUseModal, setShowUseModal] = useState(false);
  const [showExchangeModal, setShowExchangeModal] = useState(false);

  const userPoints = 12500;

  const handleUseCoupon = (couponId: string) => {
    setSelectedCoupon(couponId);
    setShowUseModal(true);
  };

  const handleExchangeItem = (itemId: string) => {
    const item = MOCK_POINT_ITEMS.find((i) => i.id === itemId);
    if (item && item.points > userPoints) {
      alert('포인트가 부족합니다');
      return;
    }
    setSelectedItem(itemId);
    setShowExchangeModal(true);
  };

  const confirmUseCoupon = () => {
    alert('쿠폰이 사용되었습니다!');
    setShowUseModal(false);
    setSelectedCoupon(null);
  };

  const confirmExchange = () => {
    alert('교환이 완료되었습니다! 프론트에서 수령해주세요.');
    setShowExchangeModal(false);
    setSelectedItem(null);
  };

  const selectedCouponData = MOCK_AVAILABLE_COUPONS.find((c) => c.id === selectedCoupon);
  const selectedItemData = MOCK_POINT_ITEMS.find((i) => i.id === selectedItem);

  const getDaysRemaining = (dateStr: string) => {
    const today = new Date();
    const expiry = new Date(dateStr);
    const diff = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className="min-h-screen bg-cyber-dark pb-20">
      <Header title="리워드 사용" showBack={true} showNotification={false} />

      <div className="p-4 space-y-6">
        {/* 포인트 요약 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card variant="hologram" glow>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">사용 가능 포인트</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-gradient-energy">
                    {userPoints.toLocaleString()}
                  </span>
                  <span className="text-gray-400">P</span>
                </div>
              </div>
              <div className="w-14 h-14 rounded-full bg-gradient-energy/20 flex items-center justify-center">
                <Gift size={28} className="text-energy-orange" />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* 탭 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('coupon')}
              className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                activeTab === 'coupon'
                  ? 'bg-gradient-energy text-white'
                  : 'bg-cyber-mid text-gray-400'
              }`}
            >
              <Tag size={18} className="inline mr-2" />
              쿠폰 ({MOCK_AVAILABLE_COUPONS.length})
            </button>
            <button
              onClick={() => setActiveTab('point')}
              className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                activeTab === 'point'
                  ? 'bg-gradient-energy text-white'
                  : 'bg-cyber-mid text-gray-400'
              }`}
            >
              <ShoppingBag size={18} className="inline mr-2" />
              포인트샵
            </button>
          </div>
        </motion.div>

        {/* 쿠폰 탭 */}
        {activeTab === 'coupon' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            {MOCK_AVAILABLE_COUPONS.map((coupon, idx) => {
              const daysRemaining = getDaysRemaining(coupon.expiryDate);
              const isExpiringSoon = daysRemaining <= 7;

              return (
                <motion.div
                  key={coupon.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card
                    className={`relative overflow-hidden bg-gradient-to-r ${coupon.bgGradient}`}
                  >
                    {/* 쿠폰 절취선 효과 */}
                    <div className="absolute right-20 top-0 bottom-0 border-l-2 border-dashed border-white/20" />

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl glass flex items-center justify-center">
                        {coupon.icon}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-white mb-1">{coupon.title}</h3>
                        <p className="text-xs text-gray-400 mb-2">{coupon.description}</p>
                        <div className="flex items-center gap-2">
                          <Clock size={12} className={isExpiringSoon ? 'text-power-pink' : 'text-gray-500'} />
                          <span className={`text-xs ${isExpiringSoon ? 'text-power-pink' : 'text-gray-500'}`}>
                            {daysRemaining}일 남음
                          </span>
                          {isExpiringSoon && (
                            <Badge type="energy">곧 만료</Badge>
                          )}
                        </div>
                      </div>

                      <Button
                        variant="energy"
                        size="sm"
                        onClick={() => handleUseCoupon(coupon.id)}
                      >
                        사용
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}

            {MOCK_AVAILABLE_COUPONS.length === 0 && (
              <Card variant="glass">
                <div className="text-center py-8">
                  <Tag size={48} className="mx-auto mb-3 text-gray-600" />
                  <p className="text-gray-400">사용 가능한 쿠폰이 없습니다</p>
                </div>
              </Card>
            )}
          </motion.div>
        )}

        {/* 포인트샵 탭 */}
        {activeTab === 'point' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-3">
              {MOCK_POINT_ITEMS.map((item, idx) => {
                const canAfford = userPoints >= item.points;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Card
                      className={`text-center ${!canAfford ? 'opacity-50' : ''}`}
                      onClick={() => canAfford && handleExchangeItem(item.id)}
                    >
                      <div className="text-4xl mb-2">{item.image}</div>
                      <h4 className="font-bold text-white text-sm mb-1">{item.name}</h4>
                      <Badge type="status">{item.category}</Badge>
                      <div className="mt-2 flex items-center justify-center gap-1">
                        <span className={`font-bold ${canAfford ? 'text-energy-orange' : 'text-gray-500'}`}>
                          {item.points.toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-400">P</span>
                      </div>
                      {!canAfford && (
                        <p className="text-xs text-power-pink mt-1">포인트 부족</p>
                      )}
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>

      {/* 쿠폰 사용 모달 */}
      <Modal
        isOpen={showUseModal}
        onClose={() => setShowUseModal(false)}
        title="쿠폰 사용"
      >
        {selectedCouponData && (
          <div className="space-y-4">
            <div className="text-center py-4">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl glass flex items-center justify-center">
                {selectedCouponData.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{selectedCouponData.title}</h3>
              <p className="text-gray-400">{selectedCouponData.description}</p>
            </div>

            {selectedCouponData.minAmount && (
              <div className="p-3 bg-cyber-mid rounded-lg flex items-center gap-2">
                <AlertCircle size={16} className="text-cyber-yellow" />
                <span className="text-sm text-gray-300">
                  {selectedCouponData.minAmount.toLocaleString()}원 이상 결제 시 사용 가능
                </span>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                variant="ghost"
                size="lg"
                className="flex-1"
                onClick={() => setShowUseModal(false)}
              >
                취소
              </Button>
              <Button
                variant="energy"
                size="lg"
                className="flex-1"
                onClick={confirmUseCoupon}
                glow
              >
                사용하기
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* 포인트 교환 모달 */}
      <Modal
        isOpen={showExchangeModal}
        onClose={() => setShowExchangeModal(false)}
        title="포인트 교환"
      >
        {selectedItemData && (
          <div className="space-y-4">
            <div className="text-center py-4">
              <div className="text-6xl mb-4">{selectedItemData.image}</div>
              <h3 className="text-xl font-bold text-white mb-2">{selectedItemData.name}</h3>
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl font-bold text-energy-orange">
                  {selectedItemData.points.toLocaleString()}
                </span>
                <span className="text-gray-400">P</span>
              </div>
            </div>

            <div className="p-3 bg-cyber-mid rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">현재 포인트</span>
                <span className="text-white">{userPoints.toLocaleString()}P</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">차감 포인트</span>
                <span className="text-power-pink">-{selectedItemData.points.toLocaleString()}P</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between">
                <span className="text-gray-400">교환 후 잔여</span>
                <span className="text-neon-green font-bold">
                  {(userPoints - selectedItemData.points).toLocaleString()}P
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="ghost"
                size="lg"
                className="flex-1"
                onClick={() => setShowExchangeModal(false)}
              >
                취소
              </Button>
              <Button
                variant="energy"
                size="lg"
                className="flex-1"
                onClick={confirmExchange}
                glow
              >
                교환하기
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
