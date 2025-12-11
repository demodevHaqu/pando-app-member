'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Play, Clock, Target, CheckCircle2 } from 'lucide-react';
import { MOCK_STRETCHING_EXERCISES } from '@/data/mock/stretching';
import {
  ModernCard,
  FeatureCard,
  PageHeader,
  PrimaryButton,
  SecondaryButton,
  Tag,
  ProgressBar,
} from '@/components/ui/ModernUI';

export default function StretchingPage() {
  const router = useRouter();
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: '전체', count: MOCK_STRETCHING_EXERCISES.length },
    { id: 'neck', label: '목/어깨', count: MOCK_STRETCHING_EXERCISES.filter(e => e.targetArea === '목/어깨').length },
    { id: 'back', label: '허리', count: MOCK_STRETCHING_EXERCISES.filter(e => e.targetArea === '허리').length },
    { id: 'leg', label: '다리', count: MOCK_STRETCHING_EXERCISES.filter(e => e.targetArea === '다리').length },
  ];

  const filteredExercises = selectedCategory === 'all'
    ? MOCK_STRETCHING_EXERCISES
    : MOCK_STRETCHING_EXERCISES.filter(e => {
        if (selectedCategory === 'neck') return e.targetArea === '목/어깨';
        if (selectedCategory === 'back') return e.targetArea === '허리';
        if (selectedCategory === 'leg') return e.targetArea === '다리';
        return true;
      });

  const toggleComplete = (id: string) => {
    setCompletedExercises((prev) =>
      prev.includes(id) ? prev.filter((eid) => eid !== id) : [...prev, id]
    );
  };

  const completionRate = Math.round(
    (completedExercises.length / MOCK_STRETCHING_EXERCISES.length) * 100
  );

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === 'easy') return 'green' as const;
    if (difficulty === 'medium') return 'orange' as const;
    return 'pink' as const;
  };

  const getDifficultyText = (difficulty: string) => {
    if (difficulty === 'easy') return '쉬움';
    if (difficulty === 'medium') return '보통';
    return '어려움';
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D12', paddingBottom: '100px' }}>
      <PageHeader title="스트레칭 존" />

      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Progress Card */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FeatureCard>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>
                  오늘의 스트레칭
                </h2>
                <p style={{ fontSize: '13px', color: '#6B7280' }}>
                  {completedExercises.length}/{MOCK_STRETCHING_EXERCISES.length} 완료
                </p>
              </div>
              <div style={{
                fontSize: '28px',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #39FF14, #00D9FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                {completionRate}%
              </div>
            </div>
            <ProgressBar percentage={completionRate} color="green" height={8} />
          </FeatureCard>
        </motion.section>

        {/* Category Filter */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  padding: '10px 16px',
                  borderRadius: '20px',
                  fontWeight: '600',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s',
                  border: 'none',
                  cursor: 'pointer',
                  background: selectedCategory === category.id
                    ? 'linear-gradient(135deg, #39FF14, #00D9FF)'
                    : 'rgba(26, 26, 36, 0.9)',
                  color: selectedCategory === category.id ? '#0D0D12' : '#9CA3AF',
                  boxShadow: selectedCategory === category.id ? '0 0 20px rgba(57, 255, 20, 0.3)' : 'none',
                  fontSize: '13px',
                }}
              >
                {category.label}
                <span style={{ marginLeft: '6px', opacity: 0.7, fontSize: '12px' }}>{category.count}</span>
              </button>
            ))}
          </div>
        </motion.section>

        {/* Exercise List */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
        >
          {filteredExercises.map((exercise, index) => {
            const isCompleted = completedExercises.includes(exercise.id);

            return (
              <motion.div
                key={exercise.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
              >
                <ModernCard style={{
                  padding: '16px',
                  opacity: isCompleted ? 0.6 : 1,
                  border: isCompleted ? '1px solid rgba(57, 255, 20, 0.3)' : undefined,
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{ position: 'relative' }}>
                      <div style={{
                        width: '72px',
                        height: '72px',
                        background: 'linear-gradient(135deg, #39FF14, #00D9FF)',
                        borderRadius: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '28px',
                      }}>
                        {exercise.icon}
                      </div>
                      {isCompleted && (
                        <div style={{
                          position: 'absolute',
                          top: '-4px',
                          right: '-4px',
                          width: '24px',
                          height: '24px',
                          background: '#39FF14',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          <CheckCircle2 size={14} color="#0D0D12" />
                        </div>
                      )}
                    </div>

                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontWeight: 'bold', color: 'white', marginBottom: '4px', fontSize: '15px' }}>{exercise.name}</h3>
                      <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '10px' }}>
                        {exercise.description}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#6B7280' }}>
                          <Clock size={14} />
                          {exercise.duration}초
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#6B7280' }}>
                          <Target size={14} />
                          {exercise.targetArea}
                        </div>
                        <Tag color={getDifficultyColor(exercise.difficulty)} size="sm">
                          {getDifficultyText(exercise.difficulty)}
                        </Tag>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px' }}>
                        <SecondaryButton
                          size="sm"
                          onClick={() => toggleComplete(exercise.id)}
                          fullWidth
                        >
                          {isCompleted ? '완료 취소' : '완료'}
                        </SecondaryButton>
                        <button style={{
                          padding: '8px 12px',
                          background: 'rgba(26, 26, 36, 0.9)',
                          borderRadius: '10px',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          cursor: 'pointer',
                        }}>
                          <Play size={16} color="#00D9FF" />
                        </button>
                      </div>
                    </div>
                  </div>
                </ModernCard>
              </motion.div>
            );
          })}
        </motion.section>

        {/* Complete All */}
        {completedExercises.length === MOCK_STRETCHING_EXERCISES.length && (
          <motion.section
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <FeatureCard>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎉</div>
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #39FF14, #00D9FF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '8px',
                }}>
                  모든 스트레칭 완료!
                </h3>
                <p style={{ color: '#6B7280', marginBottom: '20px', fontSize: '14px' }}>
                  오늘의 스트레칭을 모두 완료했습니다
                </p>
                <PrimaryButton fullWidth size="lg" onClick={() => router.push('/')}>
                  홈으로 돌아가기
                </PrimaryButton>
              </div>
            </FeatureCard>
          </motion.section>
        )}
      </div>
    </div>
  );
}
