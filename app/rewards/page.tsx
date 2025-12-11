'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { MOCK_BADGES, MOCK_POINT_HISTORY, MOCK_REWARD_COUPONS } from '@/data/mock/rewards';
import { Trophy, Coins, Gift, Calendar, TrendingUp, Award, Lock } from 'lucide-react';
import {
  ModernCard,
  FeatureCard,
  PremiumCard,
  PageHeader,
  SectionTitle,
  PrimaryButton,
  SecondaryButton,
  Tag,
  ProgressBar,
  IconBox,
  GradientIconBox,
  TabBar,
} from '@/components/ui/ModernUI';

export default function RewardsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('points');

  const tabs = [
    { id: 'points', label: '포인트' },
    { id: 'badges', label: '배지' },
    { id: 'coupons', label: '쿠폰' },
  ];

  const totalPoints = MOCK_POINT_HISTORY
    .filter((h) => h.type === 'earn')
    .reduce((sum, h) => sum + h.amount, 0) -
    MOCK_POINT_HISTORY
      .filter((h) => h.type === 'use')
      .reduce((sum, h) => sum + h.amount, 0);

  const expiringPoints = MOCK_POINT_HISTORY
    .filter((h) => h.type === 'earn' && h.expiryDate)
    .filter((h) => {
      const expiryDate = new Date(h.expiryDate!);
      const now = new Date();
      const daysLeft = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return daysLeft <= 30 && daysLeft > 0;
    })
    .reduce((sum, h) => sum + h.amount, 0);

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      routine: <Trophy size={16} color="#FF6B35" />,
      gx: <Award size={16} color="#00D9FF" />,
      purchase: <Gift size={16} color="#FF006E" />,
      event: <TrendingUp size={16} color="#39FF14" />,
    };
    return icons[category] || <Coins size={16} color="#6B7280" />;
  };

  const getCouponStatus = (status: string) => {
    const statuses: { [key: string]: { color: 'green' | 'orange' | 'pink'; text: string } } = {
      available: { color: 'green', text: '사용가능' },
      used: { color: 'pink', text: '사용완료' },
      expired: { color: 'orange', text: '만료됨' },
    };
    return statuses[status] || { color: 'green', text: status };
  };

  const lockedBadges = [
    { icon: '🌟', name: '100일 연속', condition: '100일 연속 운동', progress: 45 },
    { icon: '💪', name: 'PT 마스터', condition: 'PT 50회 완료', progress: 24 },
    { icon: '🎯', name: 'GX 전문가', condition: 'GX 30회 참여', progress: 15 },
    { icon: '⚡', name: '챌린지 킹', condition: '챌린지 10회 완료', progress: 0 },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D12', paddingBottom: '100px' }}>
      <PageHeader title="보상" />

      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {/* Total Points */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FeatureCard gradient="linear-gradient(135deg, #FF6B35, #7209B7, #FF006E)">
            <div style={{ textAlign: 'center', padding: '10px 0', position: 'relative' }}>
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255, 107, 53, 0.2) 0%, transparent 70%)',
                }}
              />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '8px' }}>보유 포인트</div>
                <div style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '4px',
                }}>
                  {totalPoints.toLocaleString()}
                </div>
                <div style={{ fontSize: '14px', color: '#9CA3AF' }}>P</div>

                {expiringPoints > 0 && (
                  <div style={{
                    marginTop: '20px',
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#FF6B35' }}>
                      <Calendar size={16} />
                      <span style={{ fontSize: '13px' }}>
                        30일 내 소멸 예정: {expiringPoints.toLocaleString()}P
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </FeatureCard>
        </motion.section>

        {/* Quick Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {[
              { icon: <Trophy size={24} color="#FF6B35" />, value: MOCK_BADGES.length, label: '획득 배지', gradient: 'linear-gradient(135deg, #FF6B35, #FF006E)' },
              { icon: <Gift size={24} color="#39FF14" />, value: MOCK_REWARD_COUPONS.filter((c) => c.status === 'available').length, label: '사용가능 쿠폰', gradient: 'linear-gradient(135deg, #39FF14, #00D9FF)' },
              { icon: <Coins size={24} color="#00D9FF" />, value: MOCK_POINT_HISTORY.filter((h) => h.type === 'earn').length, label: '적립 횟수', gradient: 'linear-gradient(135deg, #7209B7, #FF006E)' },
            ].map((stat, i) => (
              <ModernCard key={i} style={{ padding: '16px', textAlign: 'center' }}>
                <div style={{ marginBottom: '10px' }}>{stat.icon}</div>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  marginBottom: '4px',
                  background: stat.gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '11px', color: '#6B7280' }}>{stat.label}</div>
              </ModernCard>
            ))}
          </div>
        </motion.section>

        {/* Tabs */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </motion.section>

        {/* Points Tab */}
        {activeTab === 'points' && (
          <motion.section
            key="points"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <SectionTitle
              title="포인트 내역"
              action="포인트 사용"
              onAction={() => router.push('/payment/checkout')}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {MOCK_POINT_HISTORY.map((history, index) => (
                <motion.div
                  key={history.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                >
                  <ModernCard style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <IconBox color={history.type === 'earn' ? 'green' : 'pink'} size={40}>
                          {getCategoryIcon(history.category)}
                        </IconBox>
                        <div>
                          <div style={{ fontWeight: 'bold', color: 'white', marginBottom: '4px', fontSize: '14px' }}>
                            {history.description}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#6B7280' }}>
                            <Calendar size={10} />
                            {new Date(history.createdAt).toLocaleDateString('ko-KR')}
                            {history.expiryDate && (
                              <>
                                <span>·</span>
                                만료: {new Date(history.expiryDate).toLocaleDateString('ko-KR')}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{
                          fontSize: '16px',
                          fontWeight: 'bold',
                          color: history.type === 'earn' ? '#39FF14' : '#FF006E',
                        }}>
                          {history.type === 'earn' ? '+' : '-'}{history.amount.toLocaleString()}
                        </div>
                        <div style={{ fontSize: '11px', color: '#6B7280' }}>P</div>
                      </div>
                    </div>
                  </ModernCard>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Badges Tab */}
        {activeTab === 'badges' && (
          <motion.section
            key="badges"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <SectionTitle title="획득한 배지" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {MOCK_BADGES.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <PremiumCard>
                    <div style={{ textAlign: 'center' }}>
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                        style={{
                          width: '72px',
                          height: '72px',
                          margin: '0 auto 12px',
                          borderRadius: '50%',
                          background: 'rgba(255,255,255,0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '36px',
                        }}
                      >
                        {badge.icon}
                      </motion.div>
                      <h4 style={{ fontWeight: 'bold', color: 'white', margin: '0 0 6px', fontSize: '14px' }}>{badge.name}</h4>
                      <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '0 0 10px' }}>{badge.description}</p>
                      <Tag color={badge.type === 'growth' ? 'green' : badge.type === 'energy' ? 'orange' : 'pink'} size="sm">
                        {badge.condition}
                      </Tag>
                      <div style={{ marginTop: '8px', fontSize: '10px', color: '#6B7280' }}>
                        {new Date(badge.earnedAt).toLocaleDateString('ko-KR')} 획득
                      </div>
                    </div>
                  </PremiumCard>
                </motion.div>
              ))}
            </div>

            {/* Locked Badges */}
            <div style={{ marginTop: '28px' }}>
              <SectionTitle title="획득 가능한 배지" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {lockedBadges.map((badge, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <ModernCard style={{ padding: '16px', opacity: 0.7 }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{
                          width: '72px',
                          height: '72px',
                          margin: '0 auto 12px',
                          borderRadius: '50%',
                          background: 'rgba(255,255,255,0.05)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '36px',
                          filter: 'grayscale(100%)',
                          position: 'relative',
                        }}>
                          {badge.icon}
                          <Lock size={16} color="#6B7280" style={{ position: 'absolute', bottom: 0, right: 0 }} />
                        </div>
                        <h4 style={{ fontWeight: 'bold', color: '#9CA3AF', margin: '0 0 6px', fontSize: '14px' }}>{badge.name}</h4>
                        <p style={{ fontSize: '11px', color: '#6B7280', margin: '0 0 10px' }}>{badge.condition}</p>
                        <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '8px' }}>
                          진행률: {badge.progress}%
                        </div>
                        <ProgressBar percentage={badge.progress} color="blue" height={4} />
                      </div>
                    </ModernCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Coupons Tab */}
        {activeTab === 'coupons' && (
          <motion.section
            key="coupons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <SectionTitle title="보유 쿠폰" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {MOCK_REWARD_COUPONS.map((coupon, index) => {
                const statusInfo = getCouponStatus(coupon.status);
                const daysLeft = Math.ceil(
                  (new Date(coupon.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                );
                const isAvailable = coupon.status === 'available';

                return (
                  <motion.div
                    key={coupon.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    {isAvailable ? (
                      <FeatureCard>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                              <h4 style={{ fontWeight: 'bold', color: 'white', margin: 0, fontSize: '15px' }}>{coupon.title}</h4>
                              <Tag color={statusInfo.color} size="sm">{statusInfo.text}</Tag>
                            </div>
                            <p style={{ fontSize: '13px', color: '#9CA3AF', margin: 0 }}>{coupon.description}</p>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                          <div>
                            <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>할인 금액</div>
                            <div style={{
                              fontSize: '24px',
                              fontWeight: 'bold',
                              background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                            }}>
                              {coupon.discountType === 'percentage'
                                ? `${coupon.discount}%`
                                : `${coupon.discount.toLocaleString()}원`}
                            </div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>사용 가능 횟수</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>
                              {coupon.maxUses - coupon.usedCount} / {coupon.maxUses}
                            </div>
                          </div>
                        </div>

                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingTop: '16px',
                          borderTop: '1px solid rgba(255,255,255,0.1)',
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                            <Calendar size={14} color="#6B7280" />
                            <span style={{ color: '#6B7280' }}>
                              {new Date(coupon.expiryDate).toLocaleDateString('ko-KR')} 까지
                            </span>
                            {daysLeft > 0 && daysLeft <= 7 && (
                              <Tag color="orange" size="sm">D-{daysLeft}</Tag>
                            )}
                          </div>
                          <SecondaryButton size="sm" onClick={() => router.push('/payment/checkout')}>
                            사용하기
                          </SecondaryButton>
                        </div>

                        <div style={{
                          marginTop: '12px',
                          padding: '10px 14px',
                          background: 'rgba(0,0,0,0.3)',
                          borderRadius: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                          <span style={{ fontSize: '11px', color: '#6B7280' }}>쿠폰 코드</span>
                          <span style={{ fontSize: '13px', fontFamily: 'monospace', fontWeight: 'bold', color: '#00D9FF' }}>
                            {coupon.code}
                          </span>
                        </div>
                      </FeatureCard>
                    ) : (
                      <ModernCard style={{ padding: '16px', opacity: 0.6 }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                              <h4 style={{ fontWeight: 'bold', color: '#9CA3AF', margin: 0, fontSize: '14px' }}>{coupon.title}</h4>
                              <Tag color={statusInfo.color} size="sm">{statusInfo.text}</Tag>
                            </div>
                            <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>{coupon.description}</p>
                          </div>
                        </div>
                        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#6B7280' }}>
                          {coupon.discountType === 'percentage'
                            ? `${coupon.discount}%`
                            : `${coupon.discount.toLocaleString()}원`}
                        </div>
                      </ModernCard>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
