'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { MOCK_TRAINERS } from '@/data/mock/trainers';
import { Star, Award, TrendingUp, Target, ChevronRight, Zap } from 'lucide-react';
import {
  ModernCard,
  FeatureCard,
  PremiumCard,
  PageHeader,
  SectionTitle,
  PrimaryButton,
  Tag,
  ProgressBar,
  IconBox,
  GradientIconBox,
  Avatar,
} from '@/components/ui/ModernUI';

export default function PTPage() {
  const router = useRouter();

  const topTrainers = [...MOCK_TRAINERS]
    .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
    .slice(0, 3);

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'green' as const;
    if (score >= 80) return 'blue' as const;
    return 'orange' as const;
  };

  const getMatchScoreLabel = (score: number) => {
    if (score >= 90) return '최적';
    if (score >= 80) return '적합';
    return '양호';
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D12', paddingBottom: '100px' }}>
      <PageHeader title="퍼스널 트레이닝" />

      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {/* AI Recommendation Header */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FeatureCard>
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ fontSize: '48px', marginBottom: '12px' }}
              >
                🤖
              </motion.div>
              <h2 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '6px',
              }}>
                AI 매칭 트레이너
              </h2>
              <p style={{ fontSize: '13px', color: '#9CA3AF', margin: 0 }}>
                회원님의 목표와 운동 수준에 맞춰 추천드립니다
              </p>
            </div>
          </FeatureCard>
        </motion.section>

        {/* Quick Actions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            <ModernCard onClick={() => router.push('/pt/status')} style={{ padding: '20px', textAlign: 'center' }}>
              <IconBox color="blue" size={48}>
                <Target size={24} color="#00D9FF" />
              </IconBox>
              <div style={{ fontWeight: 'bold', color: 'white', margin: '12px 0 4px', fontSize: '15px' }}>계약 현황</div>
              <div style={{ fontSize: '12px', color: '#6B7280' }}>잔여 세션 확인</div>
            </ModernCard>

            <ModernCard onClick={() => router.push('/pt/package')} style={{ padding: '20px', textAlign: 'center' }}>
              <IconBox color="orange" size={48}>
                <Award size={24} color="#FF6B35" />
              </IconBox>
              <div style={{ fontWeight: 'bold', color: 'white', margin: '12px 0 4px', fontSize: '15px' }}>패키지 구매</div>
              <div style={{ fontSize: '12px', color: '#6B7280' }}>최적 패키지 찾기</div>
            </ModernCard>
          </div>
        </motion.section>

        {/* Top 3 Matched Trainers */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <SectionTitle title="AI 추천 트레이너 TOP 3" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {topTrainers.map((trainer, index) => {
              const matchColor = getMatchScoreColor(trainer.matchScore || 0);
              const matchLabel = getMatchScoreLabel(trainer.matchScore || 0);

              return (
                <motion.div
                  key={trainer.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {index === 0 ? (
                    <FeatureCard>
                      <div
                        onClick={() => router.push(`/pt/trainer/${trainer.id}`)}
                        style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', cursor: 'pointer' }}
                      >
                        <div style={{ position: 'relative' }}>
                          <Avatar name={trainer.name} size={72} />
                          <div style={{
                            position: 'absolute',
                            top: '-8px',
                            left: '-8px',
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: '13px',
                            color: 'white',
                            boxShadow: '0 2px 10px rgba(255, 107, 53, 0.5)',
                          }}>
                            {index + 1}
                          </div>
                        </div>

                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <div>
                              <h4 style={{ fontWeight: 'bold', color: 'white', margin: '0 0 6px', fontSize: '17px' }}>{trainer.name}</h4>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                <Star size={14} color="#FF6B35" fill="#FF6B35" />
                                <span style={{ fontSize: '13px', color: '#E5E7EB' }}>{trainer.rating}</span>
                                <span style={{ fontSize: '12px', color: '#6B7280' }}>({trainer.reviewCount}개 리뷰)</span>
                              </div>
                            </div>
                            <Tag color={matchColor}>{matchLabel}</Tag>
                          </div>

                          <div style={{ marginBottom: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                              <span style={{ fontSize: '12px', color: '#6B7280' }}>매칭 점수</span>
                              <span style={{ fontSize: '14px', fontWeight: 'bold', color: matchColor === 'green' ? '#39FF14' : matchColor === 'blue' ? '#00D9FF' : '#FF6B35' }}>
                                {trainer.matchScore}%
                              </span>
                            </div>
                            <ProgressBar percentage={trainer.matchScore || 0} color={matchColor} />
                          </div>

                          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px' }}>
                            {trainer.specialty.slice(0, 3).map((spec, i) => (
                              <Tag key={i} color="blue" size="sm">{spec}</Tag>
                            ))}
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', color: '#6B7280' }}>
                            <span>경력 {trainer.experience}년</span>
                            {trainer.certifications && (
                              <span>자격증 {trainer.certifications.length}개</span>
                            )}
                          </div>
                        </div>

                        <ChevronRight size={20} color="#6B7280" />
                      </div>
                    </FeatureCard>
                  ) : (
                    <ModernCard
                      onClick={() => router.push(`/pt/trainer/${trainer.id}`)}
                      style={{ padding: '16px' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                        <div style={{ position: 'relative' }}>
                          <Avatar name={trainer.name} size={64} />
                          <div style={{
                            position: 'absolute',
                            top: '-6px',
                            left: '-6px',
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            background: index === 1 ? 'linear-gradient(135deg, #00D9FF, #7209B7)' : 'linear-gradient(135deg, #39FF14, #00D9FF)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: '12px',
                            color: 'white',
                          }}>
                            {index + 1}
                          </div>
                        </div>

                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '6px' }}>
                            <div>
                              <h4 style={{ fontWeight: 'bold', color: 'white', margin: '0 0 4px', fontSize: '15px' }}>{trainer.name}</h4>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Star size={12} color="#FF6B35" fill="#FF6B35" />
                                <span style={{ fontSize: '12px', color: '#E5E7EB' }}>{trainer.rating}</span>
                              </div>
                            </div>
                            <Tag color={matchColor} size="sm">{matchLabel}</Tag>
                          </div>

                          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
                            {trainer.specialty.slice(0, 2).map((spec, i) => (
                              <Tag key={i} color="blue" size="sm">{spec}</Tag>
                            ))}
                          </div>

                          <div style={{ fontSize: '12px', color: '#6B7280' }}>
                            매칭 {trainer.matchScore}% · 경력 {trainer.experience}년
                          </div>
                        </div>

                        <ChevronRight size={18} color="#6B7280" />
                      </div>
                    </ModernCard>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Why AI Matching */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <ModernCard style={{ padding: '20px' }}>
            <h3 style={{ fontWeight: 'bold', color: 'white', margin: '0 0 16px', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Target size={18} color="#39FF14" />
              매칭 기준
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                '회원님의 운동 목표 (체중 감량)',
                '현재 운동 수준 (초급)',
                '선호하는 운동 스타일',
                '트레이너 경력 및 전문성',
                '회원 만족도 및 리뷰',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ color: '#39FF14', fontSize: '14px' }}>✓</span>
                  <span style={{ fontSize: '13px', color: '#E5E7EB' }}>{item}</span>
                </div>
              ))}
            </div>
          </ModernCard>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <PrimaryButton
            fullWidth
            size="lg"
            icon={<Zap size={20} />}
            onClick={() => router.push('/pt/package')}
          >
            패키지 선택하고 시작하기
          </PrimaryButton>
        </motion.section>
      </div>
    </div>
  );
}
