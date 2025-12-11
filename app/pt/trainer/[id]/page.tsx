'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ModernCard,
  PageHeader,
  PrimaryButton,
  SecondaryButton,
  Tag,
} from '@/components/ui/ModernUI';
import Tabs from '@/components/ui/Tabs';
import { MOCK_TRAINERS } from '@/data/mock/trainers';
import { Star, Award, Calendar, Users, TrendingUp, Target } from 'lucide-react';

export default function TrainerDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  const trainer = MOCK_TRAINERS.find((t) => t.id === params.id) || MOCK_TRAINERS[0];

  const mockTransformations = [
    {
      id: 1,
      memberName: '김*수',
      beforeImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=500&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=500&fit=crop',
      period: '3개월',
      weightLoss: '12kg',
      result: '체지방 15% 감소',
    },
    {
      id: 2,
      memberName: '이*영',
      beforeImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=500&fit=crop',
      period: '4개월',
      weightLoss: '8kg',
      result: '근육량 3kg 증가',
    },
  ];

  const mockReviews = [
    {
      id: 1,
      memberName: '박민지',
      memberImage: 'https://i.pravatar.cc/150?img=5',
      rating: 5,
      comment: '정말 꼼꼼하게 봐주시고 동기부여도 잘 해주세요! 3개월 만에 목표 달성했습니다.',
      date: '2025-01-10',
      tags: ['친절함', '전문성', '동기부여'],
    },
    {
      id: 2,
      memberName: '최준호',
      memberImage: 'https://i.pravatar.cc/150?img=12',
      rating: 5,
      comment: '운동에 대한 이론과 실전을 모두 잘 알려주십니다. 적극 추천드려요!',
      date: '2025-01-05',
      tags: ['전문성', '체계적'],
    },
    {
      id: 3,
      memberName: '정수연',
      memberImage: 'https://i.pravatar.cc/150?img=8',
      rating: 4,
      comment: '식단 관리까지 세심하게 체크해주셔서 감사했습니다.',
      date: '2024-12-28',
      tags: ['식단관리', '세심함'],
    },
  ];

  const tabs = [
    { id: 'overview', label: '소개' },
    { id: 'transformations', label: '변화사례' },
    { id: 'reviews', label: '리뷰' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D12', paddingBottom: '100px' }}>
      <PageHeader title="트레이너 프로필" onBack={() => router.back()} />

      <div>
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <ModernCard style={{ margin: '16px', marginBottom: '0' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <img
                src={trainer.profileImage}
                alt={trainer.name}
                style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '8px',
                  objectFit: 'cover',
                  border: '2px solid #00D9FF'
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>
                      {trainer.name} 트레이너
                    </h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <Star size={16} style={{ color: '#FF6B35' }} fill="#FF6B35" />
                      <span style={{ color: 'white', fontWeight: 'bold' }}>{trainer.rating}</span>
                      <span style={{ fontSize: '14px', color: '#9CA3AF' }}>
                        ({trainer.reviewCount}개 리뷰)
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#9CA3AF', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={14} />
                    <span>경력 {trainer.experience}년</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Users size={14} />
                    <span>{trainer.reviewCount}+ 회원</span>
                  </div>
                </div>

                {trainer.matchScore && (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '12px', color: '#9CA3AF' }}>회원님과 매칭도</span>
                      <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#39FF14' }}>
                        {trainer.matchScore}%
                      </span>
                    </div>
                    <div style={{ height: '8px', background: '#1A1A24', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          background: 'linear-gradient(to right, #00D9FF, #39FF14)',
                          width: `${trainer.matchScore}%`
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ModernCard>
        </motion.div>

        {/* Tabs */}
        <div style={{ padding: '0 16px', marginTop: '16px' }}>
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {/* Tab Content */}
        <div style={{ padding: '16px', maxWidth: '672px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {activeTab === 'overview' && (
            <>
              {/* Specialties */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <ModernCard>
                  <h3 style={{ fontWeight: 'bold', color: 'white', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Target size={18} style={{ color: '#00D9FF' }} />
                    전문 분야
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {trainer.specialty.map((spec, i) => (
                      <Tag key={i} color="orange">
                        {spec}
                      </Tag>
                    ))}
                  </div>
                </ModernCard>
              </motion.div>

              {/* Certifications */}
              {trainer.certifications && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <ModernCard>
                    <h3 style={{ fontWeight: 'bold', color: 'white', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Award size={18} style={{ color: '#FF6B35' }} />
                      자격증
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {trainer.certifications.map((cert, i) => (
                        <div
                          key={i}
                          style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#D1D5DB' }}
                        >
                          <div style={{ width: '8px', height: '8px', background: '#39FF14', borderRadius: '9999px' }} />
                          <span>{cert}</span>
                        </div>
                      ))}
                    </div>
                  </ModernCard>
                </motion.div>
              )}

              {/* Bio */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <ModernCard>
                  <h3 style={{ fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>소개</h3>
                  <p style={{ color: '#D1D5DB', lineHeight: '1.625' }}>{trainer.bio}</p>
                </ModernCard>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  <ModernCard style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', background: 'linear-gradient(135deg, #FF6B35, #FFD60A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '4px' }}>
                      {trainer.reviewCount}+
                    </div>
                    <div style={{ fontSize: '12px', color: '#9CA3AF' }}>총 회원</div>
                  </ModernCard>
                  <ModernCard style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', background: 'linear-gradient(135deg, #00D9FF, #39FF14)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '4px' }}>
                      {trainer.experience}년
                    </div>
                    <div style={{ fontSize: '12px', color: '#9CA3AF' }}>경력</div>
                  </ModernCard>
                  <ModernCard style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', background: 'linear-gradient(135deg, #7209B7, #FF006E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '4px' }}>
                      {trainer.rating}
                    </div>
                    <div style={{ fontSize: '12px', color: '#9CA3AF' }}>평점</div>
                  </ModernCard>
                </div>
              </motion.div>
            </>
          )}

          {activeTab === 'transformations' && (
            <>
              {mockTransformations.map((transformation, index) => (
                <motion.div
                  key={transformation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ModernCard>
                    <h4 style={{ fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>
                      {transformation.memberName} 회원님
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '16px' }}>
                      <div>
                        <div style={{ fontSize: '14px', color: '#9CA3AF', marginBottom: '8px' }}>Before</div>
                        <img
                          src={transformation.beforeImage}
                          alt="Before"
                          style={{ width: '100%', height: '192px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', color: '#9CA3AF', marginBottom: '8px' }}>After</div>
                        <img
                          src={transformation.afterImage}
                          alt="After"
                          style={{ width: '100%', height: '192px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#FF6B35' }}>
                          {transformation.period}
                        </div>
                        <div style={{ fontSize: '12px', color: '#9CA3AF' }}>기간</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#39FF14' }}>
                          -{transformation.weightLoss}
                        </div>
                        <div style={{ fontSize: '12px', color: '#9CA3AF' }}>체중 감량</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#00D9FF' }}>
                          {transformation.result}
                        </div>
                      </div>
                    </div>
                  </ModernCard>
                </motion.div>
              ))}
            </>
          )}

          {activeTab === 'reviews' && (
            <>
              {mockReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ModernCard>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <img
                        src={review.memberImage}
                        alt={review.memberName}
                        style={{ width: '48px', height: '48px', borderRadius: '9999px' }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 'bold', color: 'white' }}>
                            {review.memberName}
                          </span>
                          <div style={{ display: 'flex' }}>
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                style={{ color: '#FF6B35' }}
                                fill="#FF6B35"
                              />
                            ))}
                          </div>
                        </div>
                        <p style={{ fontSize: '14px', color: '#D1D5DB', marginBottom: '8px' }}>
                          {review.comment}
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                          {review.tags.map((tag, i) => (
                            <span
                              key={i}
                              style={{
                                padding: '2px 8px',
                                background: 'rgba(0, 217, 255, 0.2)',
                                color: '#00D9FF',
                                fontSize: '12px',
                                borderRadius: '9999px',
                                border: '1px solid rgba(0, 217, 255, 0.3)'
                              }}
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <span style={{ fontSize: '12px', color: '#9CA3AF' }}>
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </ModernCard>
                </motion.div>
              ))}
            </>
          )}
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
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
            onClick={() => router.push('/pt/booking')}
            fullWidth
          >
            {trainer.name} 트레이너와 시작하기
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
