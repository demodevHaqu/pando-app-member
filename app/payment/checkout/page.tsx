'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import { MOCK_COUPONS } from '@/data/mock/payment';
import { CreditCard, Smartphone, Tag, Gift, CheckCircle } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'kakao' | 'naver'>('card');
  const [selectedCoupon, setSelectedCoupon] = useState<string | null>(null);
  const [usePoints, setUsePoints] = useState(false);
  const [pointsToUse, setPointsToUse] = useState(0);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const orderInfo = {
    itemName: 'AI 추천 플랜 (PT 16회)',
    itemPrice: 1200000,
    tax: 120000,
  };

  const availablePoints = 1600;
  const maxPoints = Math.min(availablePoints, orderInfo.itemPrice * 0.1); // Max 10% of order

  const activeCoupons = MOCK_COUPONS.filter((c) => c.isActive);
  const selectedCouponData = activeCoupons.find((c) => c.id === selectedCoupon);

  const calculateDiscount = () => {
    if (!selectedCouponData) return 0;
    if (selectedCouponData.discountType === 'percentage') {
      return Math.floor(orderInfo.itemPrice * (selectedCouponData.discountValue / 100));
    }
    return selectedCouponData.discountValue;
  };

  const discount = calculateDiscount();
  const pointDiscount = usePoints ? pointsToUse : 0;
  const finalAmount = orderInfo.itemPrice - discount - pointDiscount;

  const handlePayment = () => {
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      router.push('/payment/history');
    }, 2000);
  };

  const paymentMethods = [
    {
      id: 'card' as const,
      name: '신용/체크카드',
      icon: <CreditCard size={24} />,
      color: 'electric-blue',
    },
    {
      id: 'kakao' as const,
      name: '카카오페이',
      icon: <Smartphone size={24} />,
      color: 'energy-orange',
    },
    {
      id: 'naver' as const,
      name: '네이버페이',
      icon: <Smartphone size={24} />,
      color: 'neon-green',
    },
  ];

  return (
    <div className="min-h-screen bg-cyber-dark">
      <Header title="결제" showBack={true} />

      <div className="px-4 sm:px-6 lg:px-8 py-4 space-y-6 pb-32 max-w-2xl mx-auto">
        {/* Order Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="font-bold text-white text-lg mb-3">주문 정보</h3>
          <Card variant="hologram" glow>
            <div className="space-y-3">
              <div>
                <h4 className="font-bold text-white text-lg mb-1">
                  {orderInfo.itemName}
                </h4>
                <p className="text-sm text-gray-400">
                  강동원 트레이너 · 60분 세션
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">상품 금액</span>
                  <span className="text-white font-medium">
                    {orderInfo.itemPrice.toLocaleString()}원
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">부가세</span>
                  <span className="text-white font-medium">
                    {orderInfo.tax.toLocaleString()}원
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Coupon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
            <Tag size={20} className="text-energy-orange" />
            할인 쿠폰
          </h3>
          <Card glow onClick={() => setShowCouponModal(true)}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 glass rounded-lg flex items-center justify-center">
                  <Tag size={20} className="text-energy-orange" />
                </div>
                <div>
                  {selectedCouponData ? (
                    <>
                      <div className="font-bold text-white">
                        {selectedCouponData.description}
                      </div>
                      <div className="text-sm text-neon-green">
                        -{discount.toLocaleString()}원 할인
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="font-bold text-white">쿠폰 선택</div>
                      <div className="text-sm text-gray-400">
                        사용 가능 쿠폰 {activeCoupons.length}개
                      </div>
                    </>
                  )}
                </div>
              </div>
              <Button variant="ghost" size="sm">
                {selectedCouponData ? '변경' : '선택'}
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
            <Gift size={20} className="text-neon-green" />
            포인트 사용
          </h3>
          <Card>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-white mb-1">포인트 사용</div>
                  <div className="text-sm text-gray-400">
                    보유: {availablePoints.toLocaleString()}P (최대 {maxPoints.toLocaleString()}P)
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={usePoints}
                    onChange={(e) => {
                      setUsePoints(e.target.checked);
                      if (e.target.checked) {
                        setPointsToUse(maxPoints);
                      } else {
                        setPointsToUse(0);
                      }
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-energy"></div>
                </label>
              </div>

              {usePoints && (
                <div>
                  <Input
                    type="number"
                    value={pointsToUse}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      setPointsToUse(Math.min(Math.max(0, value), maxPoints));
                    }}
                    placeholder="사용할 포인트"
                  />
                  <div className="flex gap-2 mt-2">
                    {[1000, 5000, 10000, maxPoints].map((amount) => (
                      <Button
                        key={amount}
                        variant="ghost"
                        size="sm"
                        onClick={() => setPointsToUse(Math.min(amount, maxPoints))}
                        className="flex-1 text-xs"
                      >
                        {amount >= maxPoints ? '최대' : `${(amount / 1000).toFixed(0)}천`}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Payment Method */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-bold text-white text-lg mb-3">결제 수단</h3>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <Card
                key={method.id}
                glow={paymentMethod === method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={
                  paymentMethod === method.id ? 'ring-2 ring-electric-blue' : ''
                }
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 glass rounded-lg flex items-center justify-center text-${method.color}`}
                  >
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white">{method.name}</div>
                  </div>
                  {paymentMethod === method.id && (
                    <CheckCircle size={24} className="text-neon-green" />
                  )}
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Final Amount */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card variant="hologram" glow className="animate-energy-pulse">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">상품 금액</span>
                <span className="text-white">{orderInfo.itemPrice.toLocaleString()}원</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">쿠폰 할인</span>
                  <span className="text-neon-green">-{discount.toLocaleString()}원</span>
                </div>
              )}
              {pointDiscount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">포인트 사용</span>
                  <span className="text-neon-green">-{pointDiscount.toLocaleString()}원</span>
                </div>
              )}
              <div className="pt-3 border-t border-white/10 flex justify-between">
                <span className="text-lg font-bold text-white">최종 결제 금액</span>
                <span className="text-2xl font-bold text-gradient-energy">
                  {finalAmount.toLocaleString()}원
                </span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 w-full p-4 bg-cyber-dark/95 backdrop-blur-lg border-t border-white/10">
        <Button
          variant="energy"
          size="lg"
          glow
          shine
          className="w-full max-w-2xl mx-auto block"
          onClick={handlePayment}
        >
          {finalAmount.toLocaleString()}원 결제하기
        </Button>
      </div>

      {/* Coupon Modal */}
      <Modal
        isOpen={showCouponModal}
        onClose={() => setShowCouponModal(false)}
        title="쿠폰 선택"
      >
        <div className="space-y-3 max-h-96 overflow-y-auto">
          <div
            onClick={() => {
              setSelectedCoupon(null);
              setShowCouponModal(false);
            }}
            className="p-3 rounded-lg border border-white/10 hover:bg-white/5 cursor-pointer"
          >
            <div className="font-bold text-white">쿠폰 사용 안 함</div>
          </div>

          {activeCoupons.map((coupon) => {
            const canUse = orderInfo.itemPrice >= (coupon.minAmount || 0);

            return (
              <div
                key={coupon.id}
                onClick={() => {
                  if (canUse) {
                    setSelectedCoupon(coupon.id);
                    setShowCouponModal(false);
                  }
                }}
                className={`p-3 rounded-lg border ${
                  canUse
                    ? 'border-electric-blue/30 hover:bg-electric-blue/5 cursor-pointer'
                    : 'border-white/10 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="font-bold text-white">{coupon.description}</div>
                  {selectedCoupon === coupon.id && (
                    <CheckCircle size={20} className="text-neon-green" />
                  )}
                </div>
                <div className="text-sm text-neon-green mb-1">
                  {coupon.discountType === 'percentage'
                    ? `${coupon.discountValue}% 할인`
                    : `${coupon.discountValue.toLocaleString()}원 할인`}
                </div>
                <div className="text-xs text-gray-400">
                  {coupon.minAmount && `${coupon.minAmount.toLocaleString()}원 이상 구매 시 · `}
                  {new Date(coupon.expiryDate).toLocaleDateString('ko-KR')} 까지
                </div>
                {!canUse && (
                  <div className="text-xs text-energy-orange mt-1">
                    최소 주문 금액 미달
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Modal>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => {}}
        title=""
      >
        <div className="text-center py-8">
          <div className="text-6xl mb-4 animate-scale-pop">✅</div>
          <h3 className="text-2xl font-bold text-gradient-energy mb-2">
            결제 완료!
          </h3>
          <p className="text-gray-400">
            결제가 성공적으로 완료되었습니다
          </p>
        </div>
      </Modal>
    </div>
  );
}
