'use client';

import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Play, Clock, Flame, Dumbbell, ChevronRight } from 'lucide-react';
import { MOCK_ROUTINES } from '@/data/mock/routines';
import {
  ModernCard,
  FeatureCard,
  PageHeader,
  PrimaryButton,
  Tag,
  IconBox,
} from '@/components/ui/ModernUI';

interface PageProps {
  params: Promise<{ routineId: string }>;
}

export default function RoutineDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();

  const routine = MOCK_ROUTINES.find((r) => r.id === resolvedParams.routineId);

  if (!routine) {
    return (
      <div style={{ minHeight: '100vh', background: '#0D0D12' }}>
        <PageHeader title="루틴 상세" />
        <div style={{ padding: '24px 20px' }}>
          <ModernCard style={{ padding: '40px 20px', textAlign: 'center' }}>
            <p style={{ color: '#9CA3AF' }}>루틴을 찾을 수 없습니다.</p>
          </ModernCard>
        </div>
      </div>
    );
  }

  const getDifficultyInfo = (difficulty: number) => {
    if (difficulty <= 2) return { color: 'green' as const, text: '초급' };
    if (difficulty === 3) return { color: 'orange' as const, text: '중급' };
    return { color: 'pink' as const, text: '고급' };
  };

  const startRoutine = () => {
    if (routine.exercises.length > 0) {
      router.push(`/routine/${routine.id}/exercise/${routine.exercises[0].id}`);
    }
  };

  const difficultyInfo = getDifficultyInfo(routine.difficulty);

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D12', paddingBottom: '100px' }}>
      <PageHeader title="루틴 상세" />

      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Routine Header */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FeatureCard>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h1 style={{
                fontSize: '22px',
                fontWeight: 'bold',
                color: 'white',
                flex: 1,
              }}>
                {routine.name}
              </h1>
              <Tag color={difficultyInfo.color}>{difficultyInfo.text}</Tag>
            </div>

            <p style={{ fontSize: '14px', color: '#9CA3AF', marginBottom: '20px' }}>{routine.description}</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                padding: '14px',
                textAlign: 'center',
              }}>
                <Clock size={20} color="#00D9FF" style={{ margin: '0 auto 8px' }} />
                <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '4px' }}>시간</div>
                <div style={{ fontWeight: 'bold', color: 'white', fontSize: '15px' }}>{routine.duration}분</div>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                padding: '14px',
                textAlign: 'center',
              }}>
                <Flame size={20} color="#FF6B35" style={{ margin: '0 auto 8px' }} />
                <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '4px' }}>칼로리</div>
                <div style={{ fontWeight: 'bold', color: 'white', fontSize: '15px' }}>{routine.calories}</div>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                padding: '14px',
                textAlign: 'center',
              }}>
                <Dumbbell size={20} color="#39FF14" style={{ margin: '0 auto 8px' }} />
                <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '4px' }}>운동</div>
                <div style={{ fontWeight: 'bold', color: 'white', fontSize: '15px' }}>{routine.exercises.length}개</div>
              </div>
            </div>

            <PrimaryButton fullWidth size="lg" icon={<Play size={20} />} onClick={startRoutine}>
              루틴 시작하기
            </PrimaryButton>
          </FeatureCard>
        </motion.section>

        {/* Exercise List */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: 'white' }}>운동 목록</h3>
            <Tag color="green">{routine.exercises.length}개</Tag>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {routine.exercises.map((exercise, index) => {
              const exDiffInfo = getDifficultyInfo(exercise.difficulty);
              return (
                <motion.div
                  key={exercise.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <ModernCard
                    style={{ padding: '16px' }}
                    onClick={() => router.push(`/exercise/${exercise.id}`)}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        color: 'white',
                        fontSize: '18px',
                        flexShrink: 0,
                      }}>
                        {index + 1}
                      </div>

                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontWeight: 'bold', color: 'white', marginBottom: '4px', fontSize: '15px' }}>
                          {exercise.nameKo}
                        </h4>
                        <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '10px' }}>
                          {exercise.muscleGroups.join(', ')}
                        </p>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: '#9CA3AF', marginBottom: '10px' }}>
                          <span>{exercise.sets} 세트</span>
                          <span>{exercise.reps} 회</span>
                          {exercise.weight && <span>{exercise.weight} kg</span>}
                          <span>휴식 {exercise.restTime}초</span>
                        </div>

                        <Tag color={exDiffInfo.color} size="sm">난이도 {exercise.difficulty}</Tag>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                        <ChevronRight size={20} color="#00D9FF" />
                        <span style={{ fontSize: '10px', color: '#6B7280' }}>상세</span>
                      </div>
                    </div>
                  </ModernCard>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Tips */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ModernCard style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <div style={{ fontSize: '28px' }}>💡</div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>운동 팁</h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    '운동 전 충분한 워밍업을 하세요',
                    '정확한 자세가 무게보다 중요합니다',
                    '세트 간 휴식 시간을 지켜주세요',
                    '운동 중 수분을 충분히 섭취하세요',
                  ].map((tip, i) => (
                    <li key={i} style={{ fontSize: '13px', color: '#9CA3AF' }}>• {tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </ModernCard>
        </motion.section>

        {/* Previous Records */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>이전 기록</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { date: '2025-01-13', duration: 47, calories: 395 },
              { date: '2025-01-11', duration: 45, calories: 380 },
              { date: '2025-01-09', duration: 43, calories: 365 },
            ].map((record, index) => (
              <ModernCard key={index} style={{ padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ color: 'white', fontWeight: '600', fontSize: '14px' }}>
                      {new Date(record.date).toLocaleDateString('ko-KR', {
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                    <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
                      {record.duration}분 · {record.calories} kcal
                    </div>
                  </div>
                  <Tag color="green" size="sm">완료</Tag>
                </div>
              </ModernCard>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
