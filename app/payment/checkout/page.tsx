'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CreditCard, Smartphone, Tag, Gift, CheckCircle } from 'lucide-react';
import { MOCK_COUPONS } from '@/data/mock/payment';
import {
  ModernCard,
  FeatureCard,
  PageHeader,
  SectionTitle,
  PrimaryButton,
  SecondaryButton,
  Tag as UITag,
  IconBox,
} from '@/components/ui/ModernUI';
import Modal from '@/components/ui/Modal';

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
  const maxPoints = Math.min(availablePoints, orderInfo.itemPrice * 0.1);

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
      icon: <CreditCard size={24} color="#00D9FF" />,
      color: 'blue' as const,
    },
    {
      id: 'kakao' as const,
      name: '카카오페이',
      icon: <Smartphone size={24} color="#FEE500" />,
      color: 'orange' as const,
    },
    {
      id: 'naver' as const,
      name: '네이버페이',
      icon: <Smartphone size={24} color="#39FF14" />,
      color: 'green' as const,
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D12', paddingBottom: '120px' }}>
      <PageHeader title="결제" showBack={true} />

      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Order Info */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <SectionTitle title="주문 정보" />
          <FeatureCard>
            <div>
              <h4 style={{ fontWeight: 'bold', color: 'white', fontSize: '18px', margin: '0 0 8px' }}>
                {orderInfo.itemName}
              </h4>
              <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>
                강동원 트레이너 · 60분 세션
              </p>
            </div>

            <div style={{
              marginTop: '16px',
              paddingTop: '16px',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: '#6B7280' }}>상품 금액</span>
                <span style={{ color: 'white', fontWeight: '500' }}>
                  {orderInfo.itemPrice.toLocaleString()}원
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: '#6B7280' }}>부가세</span>
                <span style={{ color: 'white', fontWeight: '500' }}>
                  {orderInfo.tax.toLocaleString()}원
                </span>
              </div>
            </div>
          </FeatureCard>
        </motion.section>

        {/* Coupon */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <SectionTitle title="할인 쿠폰" />
          <ModernCard onClick={() => setShowCouponModal(true)} style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <IconBox color="orange" size={44}>
                  <Tag size={22} color="#FF6B35" />
                </IconBox>
                <div>
                  {selectedCouponData ? (
                    <>
                      <div style={{ fontWeight: 'bold', color: 'white', fontSize: '15px' }}>
                        {selectedCouponData.description}
                      </div>
                      <div style={{ fontSize: '13px', color: '#39FF14' }}>
                        -{discount.toLocaleString()}원 할인
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ fontWeight: 'bold', color: 'white', fontSize: '15px' }}>쿠폰 선택</div>
                      <div style={{ fontSize: '13px', color: '#6B7280' }}>
                        사용 가능 쿠폰 {activeCoupons.length}개
                      </div>
                    </>
                  )}
                </div>
              </div>
              <SecondaryButton size="sm">
                {selectedCouponData ? '변경' : '선택'}
              </SecondaryButton>
            </div>
          </ModernCard>
        </motion.section>

        {/* Points */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <SectionTitle title="포인트 사용" />
          <ModernCard style={{ padding: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <IconBox color="green" size={44}>
                    <Gift size={22} color="#39FF14" />
                  </IconBox>
                  <div>
                    <div style={{ fontWeight: 'bold', color: 'white', fontSize: '15px', marginBottom: '4px' }}>포인트 사용</div>
                    <div style={{ fontSize: '13px', color: '#6B7280' }}>
                      보유: {availablePoints.toLocaleString()}P (최대 {maxPoints.toLocaleString()}P)
                    </div>
                  </div>
                </div>
                <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
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
                    style={{ display: 'none' }}
                  />
                  <div style={{
                    width: '48px',
                    height: '26px',
                    borderRadius: '13px',
                    background: usePoints ? 'linear-gradient(135deg, #FF6B35, #FF006E)' : '#374151',
                    transition: 'background 0.3s',
                    position: 'relative',
                  }}>
                    <div style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      background: 'white',
                      position: 'absolute',
                      top: '2px',
                      left: usePoints ? '24px' : '2px',
                      transition: 'left 0.3s',
                    }} />
                  </div>
                </label>
              </div>

              {usePoints && (
                <div>
                  <input
                    type="number"
                    value={pointsToUse}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      setPointsToUse(Math.min(Math.max(0, value), maxPoints));
                    }}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      background: 'rgba(255,255,255,0.05)',
                      color: 'white',
                      fontSize: '15px',
                      outline: 'none',
                    }}
                    placeholder="사용할 포인트"
                  />
                  <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                    {[1000, 5000, 10000, maxPoints].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setPointsToUse(Math.min(amount, maxPoints))}
                        style={{
                          flex: 1,
                          padding: '10px',
                          borderRadius: '10px',
                          border: '1px solid rgba(255,255,255,0.1)',
                          background: 'rgba(255,255,255,0.05)',
                          color: '#9CA3AF',
                          fontSize: '12px',
                          cursor: 'pointer',
                        }}
                      >
                        {amount >= maxPoints ? '최대' : `${(amount / 1000).toFixed(0)}천`}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ModernCard>
        </motion.section>

        {/* Payment Method */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <SectionTitle title="결제 수단" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {paymentMethods.map((method) => (
              <ModernCard
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                style={{
                  padding: '16px',
                  border: paymentMethod === method.id ? '2px solid #00D9FF' : '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <IconBox color={method.color} size={44}>
                    {method.icon}
                  </IconBox>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', color: 'white', fontSize: '15px' }}>{method.name}</div>
                  </div>
                  {paymentMethod === method.id && (
                    <CheckCircle size={24} color="#39FF14" />
                  )}
                </div>
              </ModernCard>
            ))}
          </div>
        </motion.section>

        {/* Final Amount */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <FeatureCard gradient="linear-gradient(135deg, #FF6B35, #7209B7, #FF006E)">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: '#9CA3AF' }}>상품 금액</span>
                <span style={{ color: 'white' }}>{orderInfo.itemPrice.toLocaleString()}원</span>
              </div>
              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: '#9CA3AF' }}>쿠폰 할인</span>
                  <span style={{ color: '#39FF14' }}>-{discount.toLocaleString()}원</span>
                </div>
              )}
              {pointDiscount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: '#9CA3AF' }}>포인트 사용</span>
                  <span style={{ color: '#39FF14' }}>-{pointDiscount.toLocaleString()}원</span>
                </div>
              )}
              <div style={{
                paddingTop: '16px',
                marginTop: '6px',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <span style={{ fontSize: '16px', fontWeight: 'bold', color: 'white' }}>최종 결제 금액</span>
                <span style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  {finalAmount.toLocaleString()}원
                </span>
              </div>
            </div>
          </FeatureCard>
        </motion.section>
      </div>

      {/* Fixed Bottom Button */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '16px 20px',
        paddingBottom: 'calc(16px + env(safe-area-inset-bottom))',
        background: 'linear-gradient(180deg, rgba(13,13,18,0) 0%, rgba(13,13,18,1) 20%)',
      }}>
        <PrimaryButton fullWidth size="lg" onClick={handlePayment}>
          {finalAmount.toLocaleString()}원 결제하기
        </PrimaryButton>
      </div>

      {/* Coupon Modal */}
      <Modal
        isOpen={showCouponModal}
        onClose={() => setShowCouponModal(false)}
        title="쿠폰 선택"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '400px', overflowY: 'auto' }}>
          <div
            onClick={() => {
              setSelectedCoupon(null);
              setShowCouponModal(false);
            }}
            style={{
              padding: '14px',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer',
              background: 'rgba(255,255,255,0.02)',
            }}
          >
            <div style={{ fontWeight: 'bold', color: 'white' }}>쿠폰 사용 안 함</div>
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
                style={{
                  padding: '14px',
                  borderRadius: '12px',
                  border: canUse ? '1px solid rgba(0,217,255,0.3)' : '1px solid rgba(255,255,255,0.1)',
                  cursor: canUse ? 'pointer' : 'not-allowed',
                  opacity: canUse ? 1 : 0.5,
                  background: 'rgba(255,255,255,0.02)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ fontWeight: 'bold', color: 'white' }}>{coupon.description}</div>
                  {selectedCoupon === coupon.id && (
                    <CheckCircle size={20} color="#39FF14" />
                  )}
                </div>
                <div style={{ fontSize: '14px', color: '#39FF14', marginBottom: '6px' }}>
                  {coupon.discountType === 'percentage'
                    ? `${coupon.discountValue}% 할인`
                    : `${coupon.discountValue.toLocaleString()}원 할인`}
                </div>
                <div style={{ fontSize: '12px', color: '#6B7280' }}>
                  {coupon.minAmount && `${coupon.minAmount.toLocaleString()}원 이상 구매 시 · `}
                  {new Date(coupon.expiryDate).toLocaleDateString('ko-KR')} 까지
                </div>
                {!canUse && (
                  <div style={{ fontSize: '12px', color: '#FF6B35', marginTop: '6px' }}>
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
        <div style={{ textAlign: 'center', padding: '32px 0' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>✅</div>
          <h3 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '8px',
            background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            결제 완료!
          </h3>
          <p style={{ color: '#6B7280', margin: 0 }}>
            결제가 성공적으로 완료되었습니다
          </p>
        </div>
      </Modal>
    </div>
  );
}
