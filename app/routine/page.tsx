'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Play, Clock, Flame, Target, TrendingUp, Plus, ChevronRight } from 'lucide-react';
import { MOCK_ROUTINES } from '@/data/mock/routines';
import {
  ModernCard,
  FeatureCard,
  PageHeader,
  SectionTitle,
  PrimaryButton,
  SecondaryButton,
  Tag,
  ProgressBar,
  GradientIconBox,
  TabBar,
} from '@/components/ui/ModernUI';

export default function RoutinePage() {
  const router = useRouter();
  const [selectedTime, setSelectedTime] = useState('all');

  const timeFilters = [
    { id: 'all', label: '🏋️ 전체' },
    { id: 'morning', label: '🌅 오전' },
    { id: 'afternoon', label: '☀️ 오후' },
    { id: 'evening', label: '🌙 저녁' },
  ];

  const getDifficultyInfo = (difficulty: number) => {
    if (difficulty <= 2) return { color: 'green' as const, label: '초급' };
    if (difficulty === 3) return { color: 'orange' as const, label: '중급' };
    return { color: 'pink' as const, label: '고급' };
  };

  const totalCalories = MOCK_ROUTINES.reduce((sum, r) => sum + r.calories, 0);
  const totalDuration = MOCK_ROUTINES.reduce((sum, r) => sum + r.duration, 0);
  const totalExercises = MOCK_ROUTINES.reduce((sum, r) => sum + r.exercises.length, 0);

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D12', paddingBottom: '100px' }}>
      <PageHeader title="운동 루틴" showBack={false} />

      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {/* Today's Status */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FeatureCard>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#00D9FF',
                  textShadow: '0 0 10px rgba(0, 217, 255, 0.5)',
                  margin: '0 0 4px',
                }}>
                  오늘의 운동
                </h2>
                <p style={{ fontSize: '13px', color: '#9CA3AF', margin: 0 }}>
                  총 {MOCK_ROUTINES.length}개의 루틴
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  0/{MOCK_ROUTINES.length}
                </div>
                <div style={{ fontSize: '12px', color: '#6B7280' }}>완료</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {[
                { icon: <Flame size={20} color="#FF6B35" />, label: '예상 칼로리', value: totalCalories, unit: 'kcal' },
                { icon: <Clock size={20} color="#00D9FF" />, label: '총 시간', value: totalDuration, unit: '분' },
                { icon: <Target size={20} color="#39FF14" />, label: '운동 개수', value: totalExercises, unit: '개' },
              ].map((stat, i) => (
                <div key={i} style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: '14px',
                  padding: '14px',
                  textAlign: 'center',
                }}>
                  <div style={{ marginBottom: '6px' }}>{stat.icon}</div>
                  <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '4px' }}>{stat.label}</div>
                  <div style={{ fontWeight: 'bold', color: 'white', fontSize: '16px' }}>
                    {stat.value}<span style={{ fontSize: '12px', fontWeight: 'normal' }}>{stat.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </FeatureCard>
        </motion.section>

        {/* Time Filters */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
            {timeFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedTime(filter.id)}
                style={{
                  padding: '10px 18px',
                  borderRadius: '20px',
                  fontWeight: '600',
                  fontSize: '13px',
                  whiteSpace: 'nowrap',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  background: selectedTime === filter.id
                    ? 'linear-gradient(135deg, #FF6B35, #FF006E)'
                    : 'rgba(26, 26, 36, 0.8)',
                  color: selectedTime === filter.id ? 'white' : '#9CA3AF',
                  boxShadow: selectedTime === filter.id ? '0 4px 15px rgba(255, 107, 53, 0.4)' : 'none',
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </motion.section>

        {/* Routine List */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {MOCK_ROUTINES.map((routine, index) => {
              const difficultyInfo = getDifficultyInfo(routine.difficulty);
              return (
                <motion.div
                  key={routine.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <ModernCard style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
                      <GradientIconBox
                        gradient="linear-gradient(135deg, #FF6B35, #FF006E)"
                        size={56}
                      >
                        <Play size={28} color="white" />
                      </GradientIconBox>

                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <h3 style={{ fontWeight: 'bold', color: 'white', fontSize: '17px', margin: 0 }}>
                            {routine.name}
                          </h3>
                          <Tag color={difficultyInfo.color}>{difficultyInfo.label}</Tag>
                        </div>
                        <p style={{ fontSize: '13px', color: '#9CA3AF', margin: '0 0 12px', lineHeight: 1.4 }}>
                          {routine.description}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '13px', color: '#6B7280' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Clock size={14} /> {routine.duration}분
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Flame size={14} /> {routine.calories} kcal
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Target size={14} /> {routine.exercises.length}개
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Exercise Preview */}
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', overflowX: 'auto', paddingBottom: '4px' }}>
                      {routine.exercises.slice(0, 4).map((exercise) => (
                        <div key={exercise.id} style={{
                          padding: '8px 14px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '10px',
                          fontSize: '12px',
                          color: '#E5E7EB',
                          whiteSpace: 'nowrap',
                        }}>
                          {exercise.nameKo}
                        </div>
                      ))}
                      {routine.exercises.length > 4 && (
                        <div style={{
                          padding: '8px 14px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '10px',
                          fontSize: '12px',
                          color: '#6B7280',
                          whiteSpace: 'nowrap',
                        }}>
                          +{routine.exercises.length - 4}
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <div style={{ flex: 1 }}>
                        <PrimaryButton
                          onClick={() => router.push(`/routine/${routine.id}`)}
                          icon={<Play size={18} />}
                          fullWidth
                        >
                          시작하기
                        </PrimaryButton>
                      </div>
                      <button style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '14px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                      }}>
                        <TrendingUp size={20} color="#9CA3AF" />
                      </button>
                    </div>
                  </ModernCard>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Create Custom Routine */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ModernCard style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <GradientIconBox
                gradient="linear-gradient(135deg, #39FF14, #00D9FF)"
                size={48}
              >
                <Plus size={24} color="white" />
              </GradientIconBox>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontWeight: 'bold', color: 'white', margin: '0 0 4px', fontSize: '15px' }}>
                  커스텀 루틴 만들기
                </h4>
                <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>
                  나만의 운동 루틴을 직접 구성하세요
                </p>
              </div>
              <SecondaryButton size="sm">생성</SecondaryButton>
            </div>
          </ModernCard>
        </motion.section>

        {/* Weekly Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <SectionTitle title="이번 주 통계" />
          <ModernCard style={{ padding: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', textAlign: 'center' }}>
              {[
                { value: '5회', label: '완료', gradient: 'linear-gradient(135deg, #FF6B35, #FF006E)' },
                { value: '245분', label: '운동 시간', gradient: 'linear-gradient(135deg, #39FF14, #00D9FF)' },
                { value: '1,850', label: '칼로리', gradient: 'linear-gradient(135deg, #7209B7, #FF006E)' },
              ].map((stat, i) => (
                <div key={i}>
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
                  <div style={{ fontSize: '12px', color: '#6B7280' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </ModernCard>
        </motion.section>
      </div>
    </div>
  );
}
