'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Gift,
  Tag,
  Clock,
  CheckCircle,
  AlertCircle,
  Ticket,
  Coffee,
  ShoppingBag,
  Dumbbell,
} from 'lucide-react';
import {
  ModernCard,
  FeatureCard,
  PageHeader,
  SectionTitle,
  PrimaryButton,
  SecondaryButton,
  Tag as UITag,
  IconBox,
  GradientIconBox,
} from '@/components/ui/ModernUI';
import Modal from '@/components/ui/Modal';
import { showAlert } from '@/components/ui/AlertModal';

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
    icon: <Dumbbell size={24} color="#FF6B35" />,
    bgGradient: 'linear-gradient(135deg, rgba(255,107,53,0.2), rgba(255,0,110,0.2))',
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
    icon: <Tag size={24} color="#39FF14" />,
    bgGradient: 'linear-gradient(135deg, rgba(57,255,20,0.2), rgba(0,217,255,0.2))',
  },
  {
    id: 'coupon3',
    type: 'freebie',
    title: 'GX 1회 무료',
    description: '원하는 GX 클래스 1회 무료 이용',
    expiryDate: '2025-03-15',
    icon: <Ticket size={24} color="#00D9FF" />,
    bgGradient: 'linear-gradient(135deg, rgba(0,217,255,0.2), rgba(114,9,183,0.2))',
  },
  {
    id: 'coupon4',
    type: 'freebie',
    title: '프로틴 음료 교환권',
    description: '프론트에서 프로틴 음료 1잔 교환',
    expiryDate: '2025-02-15',
    icon: <Coffee size={24} color="#FFD60A" />,
    bgGradient: 'linear-gradient(135deg, rgba(255,214,10,0.2), rgba(255,107,53,0.2))',
  },
];

// Mock 포인트 상품
const MOCK_POINT_ITEMS = [
  { id: 'item1', name: '운동 장갑', points: 5000, image: '🧤', category: '용품' },
  { id: 'item2', name: '쉐이커 보틀', points: 3000, image: '🥤', category: '용품' },
  { id: 'item3', name: '프로틴 바 5개', points: 2000, image: '🍫', category: '식품' },
  { id: 'item4', name: 'PT 1회 이용권', points: 15000, image: '💪', category: '서비스' },
  { id: 'item5', name: '스포츠 타월', points: 4000, image: '🧺', category: '용품' },
  { id: 'item6', name: 'GX 1회 이용권', points: 8000, image: '🧘', category: '서비스' },
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
      showAlert('포인트가 부족합니다', { type: 'warning' });
      return;
    }
    setSelectedItem(itemId);
    setShowExchangeModal(true);
  };

  const confirmUseCoupon = () => {
    showAlert('쿠폰이 사용되었습니다!', { type: 'success' });
    setShowUseModal(false);
    setSelectedCoupon(null);
  };

  const confirmExchange = () => {
    showAlert('교환이 완료되었습니다!\n프론트에서 수령해주세요.', { type: 'success' });
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
    <div style={{ minHeight: '100vh', background: '#0D0D12', paddingBottom: '100px' }}>
      <PageHeader title="리워드 사용" showBack={true} />

      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* 포인트 요약 */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <FeatureCard gradient="linear-gradient(135deg, #FF6B35, #7209B7, #FF006E)">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '13px', color: '#9CA3AF', margin: '0 0 8px' }}>사용 가능 포인트</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{
                    fontSize: '36px',
                    fontWeight: 'bold',
                    background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                    {userPoints.toLocaleString()}
                  </span>
                  <span style={{ color: '#9CA3AF', fontSize: '16px' }}>P</span>
                </div>
              </div>
              <GradientIconBox gradient="linear-gradient(135deg, #FF6B35, #FF006E)" size={56}>
                <Gift size={28} color="white" />
              </GradientIconBox>
            </div>
          </FeatureCard>
        </motion.section>

        {/* 탭 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setActiveTab('coupon')}
              style={{
                flex: 1,
                padding: '14px',
                borderRadius: '14px',
                border: 'none',
                fontWeight: 'bold',
                fontSize: '15px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.3s',
                background: activeTab === 'coupon' ? 'linear-gradient(135deg, #FF6B35, #FF006E)' : '#1A1A24',
                color: activeTab === 'coupon' ? 'white' : '#6B7280',
              }}
            >
              <Tag size={18} />
              쿠폰 ({MOCK_AVAILABLE_COUPONS.length})
            </button>
            <button
              onClick={() => setActiveTab('point')}
              style={{
                flex: 1,
                padding: '14px',
                borderRadius: '14px',
                border: 'none',
                fontWeight: 'bold',
                fontSize: '15px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.3s',
                background: activeTab === 'point' ? 'linear-gradient(135deg, #FF6B35, #FF006E)' : '#1A1A24',
                color: activeTab === 'point' ? 'white' : '#6B7280',
              }}
            >
              <ShoppingBag size={18} />
              포인트샵
            </button>
          </div>
        </motion.section>

        {/* 쿠폰 탭 */}
        {activeTab === 'coupon' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
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
                  <ModernCard
                    style={{
                      padding: '16px',
                      background: coupon.bgGradient,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* 쿠폰 절취선 효과 */}
                    <div style={{
                      position: 'absolute',
                      right: '80px',
                      top: 0,
                      bottom: 0,
                      borderLeft: '2px dashed rgba(255,255,255,0.2)',
                    }} />

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <IconBox color="orange" size={48}>
                        {coupon.icon}
                      </IconBox>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h3 style={{ fontWeight: 'bold', color: 'white', margin: '0 0 6px', fontSize: '15px' }}>
                          {coupon.title}
                        </h3>
                        <p style={{ fontSize: '12px', color: '#9CA3AF', margin: '0 0 8px' }}>
                          {coupon.description}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Clock size={12} color={isExpiringSoon ? '#FF006E' : '#6B7280'} />
                          <span style={{
                            fontSize: '12px',
                            color: isExpiringSoon ? '#FF006E' : '#6B7280',
                          }}>
                            {daysRemaining}일 남음
                          </span>
                          {isExpiringSoon && (
                            <UITag color="pink" size="sm">곧 만료</UITag>
                          )}
                        </div>
                      </div>

                      <PrimaryButton size="sm" onClick={() => handleUseCoupon(coupon.id)}>
                        사용
                      </PrimaryButton>
                    </div>
                  </ModernCard>
                </motion.div>
              );
            })}

            {MOCK_AVAILABLE_COUPONS.length === 0 && (
              <ModernCard style={{ padding: '40px 20px', textAlign: 'center' }}>
                <Tag size={48} color="#374151" style={{ margin: '0 auto 12px' }} />
                <p style={{ color: '#6B7280', margin: 0 }}>사용 가능한 쿠폰이 없습니다</p>
              </ModernCard>
            )}
          </motion.section>
        )}

        {/* 포인트샵 탭 */}
        {activeTab === 'point' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px',
            }}>
              {MOCK_POINT_ITEMS.map((item, idx) => {
                const canAfford = userPoints >= item.points;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <ModernCard
                      onClick={() => canAfford && handleExchangeItem(item.id)}
                      style={{
                        padding: '20px 16px',
                        textAlign: 'center',
                        opacity: canAfford ? 1 : 0.5,
                        cursor: canAfford ? 'pointer' : 'not-allowed',
                      }}
                    >
                      <div style={{ fontSize: '40px', marginBottom: '10px' }}>{item.image}</div>
                      <h4 style={{ fontWeight: 'bold', color: 'white', fontSize: '14px', margin: '0 0 6px' }}>
                        {item.name}
                      </h4>
                      <UITag color="blue" size="sm">{item.category}</UITag>
                      <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                        <span style={{
                          fontWeight: 'bold',
                          fontSize: '16px',
                          color: canAfford ? '#FF6B35' : '#6B7280',
                        }}>
                          {item.points.toLocaleString()}
                        </span>
                        <span style={{ fontSize: '12px', color: '#6B7280' }}>P</span>
                      </div>
                      {!canAfford && (
                        <p style={{ fontSize: '11px', color: '#FF006E', margin: '6px 0 0' }}>포인트 부족</p>
                      )}
                    </ModernCard>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        )}
      </div>

      {/* 쿠폰 사용 모달 */}
      <Modal
        isOpen={showUseModal}
        onClose={() => setShowUseModal(false)}
        title="쿠폰 사용"
      >
        {selectedCouponData && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ margin: '0 auto 16px', width: 'fit-content' }}>
                <IconBox color="orange" size={64}>
                  {selectedCouponData.icon}
                </IconBox>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', margin: '0 0 8px' }}>
                {selectedCouponData.title}
              </h3>
              <p style={{ color: '#9CA3AF', margin: 0 }}>{selectedCouponData.description}</p>
            </div>

            {selectedCouponData.minAmount && (
              <div style={{
                padding: '12px 16px',
                background: '#1A1A24',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}>
                <AlertCircle size={18} color="#FFD60A" />
                <span style={{ fontSize: '13px', color: '#9CA3AF' }}>
                  {selectedCouponData.minAmount.toLocaleString()}원 이상 결제 시 사용 가능
                </span>
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px' }}>
              <SecondaryButton fullWidth size="lg" onClick={() => setShowUseModal(false)}>
                취소
              </SecondaryButton>
              <PrimaryButton fullWidth size="lg" onClick={confirmUseCoupon}>
                사용하기
              </PrimaryButton>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>{selectedItemData.image}</div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', margin: '0 0 8px' }}>
                {selectedItemData.name}
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <span style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#FF6B35',
                }}>
                  {selectedItemData.points.toLocaleString()}
                </span>
                <span style={{ color: '#9CA3AF' }}>P</span>
              </div>
            </div>

            <div style={{
              padding: '16px',
              background: '#1A1A24',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: '#6B7280' }}>현재 포인트</span>
                <span style={{ color: 'white' }}>{userPoints.toLocaleString()}P</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: '#6B7280' }}>차감 포인트</span>
                <span style={{ color: '#FF006E' }}>-{selectedItemData.points.toLocaleString()}P</span>
              </div>
              <div style={{
                paddingTop: '10px',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                justifyContent: 'space-between',
              }}>
                <span style={{ color: '#6B7280' }}>교환 후 잔여</span>
                <span style={{ fontWeight: 'bold', color: '#39FF14' }}>
                  {(userPoints - selectedItemData.points).toLocaleString()}P
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <SecondaryButton fullWidth size="lg" onClick={() => setShowExchangeModal(false)}>
                취소
              </SecondaryButton>
              <PrimaryButton fullWidth size="lg" onClick={confirmExchange}>
                교환하기
              </PrimaryButton>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
