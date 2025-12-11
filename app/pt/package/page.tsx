'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ModernCard,
  PageHeader,
  PrimaryButton,
  SecondaryButton,
  Tag,
} from '@/components/ui/ModernUI';
import { MOCK_PT_PACKAGES } from '@/data/mock/trainers';
import { Check, X, Star, TrendingUp, Zap } from 'lucide-react';

export default function PTPackagePage() {
  const router = useRouter();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const packages = [
    {
      id: 'pkg-4',
      name: '체험형',
      sessions: 4,
      price: 400000,
      pricePerSession: 100000,
      duration: 60,
      type: 'trial',
      icon: '🎯',
      color: 'tech-purple',
      gradient: 'gradient-premium',
      benefits: ['PT 시작 체험', '기본 자세 교정', '운동 루틴 구성'],
      notIncluded: ['식단 관리', 'InBody 측정'],
    },
    {
      id: 'pkg-8',
      name: '균형형',
      sessions: 8,
      price: 640000,
      pricePerSession: 80000,
      duration: 60,
      type: 'balanced',
      icon: '⚖️',
      color: 'electric-blue',
      gradient: 'gradient-growth',
      benefits: ['주 1-2회 트레이닝', '기본 식단 가이드', 'InBody 2회 측정', '운동 영상 피드백'],
      notIncluded: ['1:1 식단 관리'],
      popular: false,
    },
    {
      id: 'pkg-16',
      name: 'AI 추천 플랜',
      sessions: 16,
      price: 1200000,
      pricePerSession: 75000,
      duration: 60,
      type: 'recommended',
      icon: '🤖',
      color: 'energy-orange',
      gradient: 'gradient-energy',
      benefits: [
        '주 2-3회 트레이닝',
        '1:1 식단 관리 포함',
        'InBody 측정 무제한',
        '운동 영상 피드백',
        '24시간 채팅 상담',
      ],
      notIncluded: [],
      popular: true,
      recommended: true,
      discount: 15,
    },
  ];

  const comparisonFeatures = [
    { name: '세션 수', key: 'sessions' },
    { name: '세션당 가격', key: 'pricePerSession' },
    { name: '운동 시간', key: 'duration' },
    { name: '식단 관리', key: 'diet' },
    { name: 'InBody 측정', key: 'inbody' },
    { name: '영상 피드백', key: 'feedback' },
    { name: '채팅 상담', key: 'chat' },
  ];

  const getFeatureValue = (pkg: (typeof packages)[number], key: string) => {
    switch (key) {
      case 'sessions':
        return `${pkg.sessions}회`;
      case 'pricePerSession':
        return `${pkg.pricePerSession.toLocaleString()}원`;
      case 'duration':
        return `${pkg.duration}분`;
      case 'diet':
        return pkg.sessions >= 16 ? '1:1 관리' : pkg.sessions >= 8 ? '기본 가이드' : '미포함';
      case 'inbody':
        return pkg.sessions >= 16 ? '무제한' : pkg.sessions >= 8 ? '2회' : '미포함';
      case 'feedback':
        return pkg.sessions >= 8 ? '포함' : '미포함';
      case 'chat':
        return pkg.sessions >= 16 ? '24시간' : '미포함';
      default:
        return '-';
    }
  };

  const isFeatureIncluded = (pkg: (typeof packages)[number], key: string) => {
    switch (key) {
      case 'diet':
        return pkg.sessions >= 8;
      case 'inbody':
        return pkg.sessions >= 8;
      case 'feedback':
        return pkg.sessions >= 8;
      case 'chat':
        return pkg.sessions >= 16;
      default:
        return true;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D12', paddingBottom: '100px' }}>
      <PageHeader title="PT 패키지" onBack={() => router.back()} />

      <div style={{ padding: '16px', maxWidth: '672px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* AI Recommendation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ModernCard style={{
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            boxShadow: '0 0 30px rgba(255, 107, 53, 0.3)'
          }}>
            <div style={{ textAlign: 'center', padding: '8px 0' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>🤖</div>
              <h2 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #FF6B35, #FFD60A)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '4px'
              }}>
                AI 추천 패키지
              </h2>
              <p style={{ fontSize: '14px', color: '#9CA3AF' }}>
                회원님의 목표 달성을 위해 16회 패키지를 추천합니다
              </p>
            </div>
          </ModernCard>
        </motion.div>

        {/* Package Cards */}
        {packages.map((pkg, index) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
          >
            <ModernCard
              onClick={() => setSelectedPackage(pkg.id)}
              style={{
                position: 'relative',
                cursor: 'pointer',
                boxShadow: selectedPackage === pkg.id || pkg.recommended ? '0 0 30px rgba(0, 217, 255, 0.3)' : 'none',
                border: selectedPackage === pkg.id ? '2px solid #00D9FF' : 'none'
              }}
            >
              {pkg.recommended && (
                <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)' }}>
                  <Tag color="orange">
                    <Star size={12} style={{ display: 'inline', marginRight: '4px' }} fill="white" />
                    AI 추천
                  </Tag>
                </div>
              )}

              {pkg.popular && (
                <div style={{ position: 'absolute', top: '-12px', right: '16px' }}>
                  <Tag color="purple">인기</Tag>
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{ fontSize: '36px' }}>{pkg.icon}</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>
                    {pkg.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
                    {pkg.discount && (
                      <span style={{ fontSize: '14px', color: '#9CA3AF', textDecoration: 'line-through' }}>
                        {(pkg.price / (1 - pkg.discount / 100)).toLocaleString()}원
                      </span>
                    )}
                    <span style={{ fontSize: '24px', fontWeight: 'bold', color: pkg.color === 'energy-orange' ? '#FF6B35' : pkg.color === 'electric-blue' ? '#00D9FF' : '#7209B7' }}>
                      {pkg.price.toLocaleString()}원
                    </span>
                    {pkg.discount && (
                      <Tag color="orange">{pkg.discount}% 할인</Tag>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px', fontSize: '14px', color: '#9CA3AF' }}>
                    <span>{pkg.sessions}회 세션</span>
                    <span>·</span>
                    <span>회당 {pkg.pricePerSession.toLocaleString()}원</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                    {pkg.benefits.map((benefit, i) => (
                      <div
                        key={i}
                        style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '14px', color: '#D1D5DB' }}
                      >
                        <Check
                          size={16}
                          style={{ color: '#39FF14', flexShrink: 0, marginTop: '2px' }}
                        />
                        <span>{benefit}</span>
                      </div>
                    ))}
                    {pkg.notIncluded.map((item, i) => (
                      <div
                        key={i}
                        style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '14px', color: '#6B7280' }}
                      >
                        <X
                          size={16}
                          style={{ color: '#6B7280', flexShrink: 0, marginTop: '2px' }}
                        />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {selectedPackage === pkg.id ? (
                    <PrimaryButton
                      onClick={() => setSelectedPackage(pkg.id)}
                      fullWidth
                    >
                      선택됨
                    </PrimaryButton>
                  ) : (
                    <SecondaryButton
                      onClick={() => setSelectedPackage(pkg.id)}
                      fullWidth
                    >
                      선택하기
                    </SecondaryButton>
                  )}
                </div>
              </div>
            </ModernCard>
          </motion.div>
        ))}

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 style={{ fontWeight: 'bold', color: 'white', fontSize: '18px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={20} />
            패키지 비교
          </h3>
          <ModernCard>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', fontSize: '14px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <th style={{ textAlign: 'left', padding: '12px 0', color: '#9CA3AF', fontWeight: '500' }}>항목</th>
                    {packages.map((pkg) => (
                      <th key={pkg.id} style={{ textAlign: 'center', padding: '12px 0' }}>
                        <div style={{ fontWeight: 'bold', color: 'white' }}>{pkg.sessions}회</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, idx) => (
                    <tr key={feature.key} style={{ borderBottom: idx === comparisonFeatures.length - 1 ? 'none' : '1px solid rgba(255, 255, 255, 0.1)' }}>
                      <td style={{ padding: '12px 0', color: '#9CA3AF' }}>{feature.name}</td>
                      {packages.map((pkg) => (
                        <td key={pkg.id} style={{ textAlign: 'center', padding: '12px 0' }}>
                          <span
                            style={{
                              color: isFeatureIncluded(pkg, feature.key) ? 'white' : '#6B7280'
                            }}
                          >
                            {getFeatureValue(pkg, feature.key)}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ModernCard>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <ModernCard>
            <h3 style={{ fontWeight: 'bold', color: 'white', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={18} style={{ color: '#00D9FF' }} />
              안내사항
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#D1D5DB' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#00D9FF' }}>•</span>
                <span>모든 패키지는 등록일로부터 3개월 이내 사용 가능합니다</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#00D9FF' }}>•</span>
                <span>예약 취소는 24시간 전까지 가능합니다</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#00D9FF' }}>•</span>
                <span>트레이너 변경은 1회 무료로 가능합니다</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#00D9FF' }}>•</span>
                <span>중도 환불 시 이용 세션은 정가로 계산됩니다</span>
              </div>
            </div>
          </ModernCard>
        </motion.div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        padding: '16px',
        background: 'rgba(13, 13, 18, 0.95)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ maxWidth: '672px', margin: '0 auto' }}>
          <PrimaryButton
            onClick={() => router.push('/payment/checkout')}
            disabled={!selectedPackage}
            fullWidth
          >
            {selectedPackage
              ? `${packages.find((p) => p.id === selectedPackage)?.name} 구매하기`
              : '패키지를 선택해주세요'}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
