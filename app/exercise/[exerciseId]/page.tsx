'use client';

import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Play,
  Target,
  Dumbbell,
  Clock,
  Zap,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';
import { MOCK_EXERCISES } from '@/data/mock/exercises';
import YouTubeVideoPlayer from '@/components/exercise/YouTubeVideoPlayer';
import {
  ModernCard,
  FeatureCard,
  PageHeader,
  PrimaryButton,
  Tag,
} from '@/components/ui/ModernUI';

// 모든 루틴에서 운동 데이터 가져오기
import { MOCK_ROUTINES } from '@/data/mock/routines';

interface PageProps {
  params: Promise<{ exerciseId: string }>;
}

// 모든 운동 데이터를 하나로 합치기
const getAllExercises = () => {
  const exerciseMap = new Map();

  // Mock exercises 추가
  MOCK_EXERCISES.forEach(ex => {
    exerciseMap.set(ex.id, ex);
  });

  // 모든 루틴의 운동도 추가
  MOCK_ROUTINES.forEach(routine => {
    routine.exercises.forEach(ex => {
      if (!exerciseMap.has(ex.id)) {
        exerciseMap.set(ex.id, ex);
      }
    });
  });

  return exerciseMap;
};

export default function ExerciseDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();

  const allExercises = getAllExercises();
  const exercise = allExercises.get(resolvedParams.exerciseId);

  if (!exercise) {
    return (
      <div style={{ minHeight: '100vh', background: '#0D0D12' }}>
        <PageHeader title="운동 상세" />
        <div style={{ padding: '24px 20px' }}>
          <ModernCard style={{ padding: '40px 20px', textAlign: 'center' }}>
            <p style={{ color: '#9CA3AF' }}>운동을 찾을 수 없습니다.</p>
          </ModernCard>
        </div>
      </div>
    );
  }

  const getDifficultyInfo = (difficulty: number) => {
    const levels = [
      { text: '입문', color: 'green' as const },
      { text: '초급', color: 'green' as const },
      { text: '중급', color: 'orange' as const },
      { text: '고급', color: 'pink' as const },
      { text: '전문가', color: 'pink' as const },
    ];
    return levels[Math.min(difficulty - 1, 4)] || levels[0];
  };

  const getCategoryInfo = (category: string) => {
    const categories: Record<string, { text: string; color: 'blue' | 'orange' | 'green' | 'pink' | 'purple' }> = {
      strength: { text: '근력 운동', color: 'orange' },
      cardio: { text: '유산소', color: 'green' },
      core: { text: '코어', color: 'blue' },
      stretching: { text: '스트레칭', color: 'purple' },
    };
    return categories[category] || { text: category, color: 'blue' as const };
  };

  const muscleGroupNames: Record<string, string> = {
    quadriceps: '대퇴사두근',
    glutes: '둔근',
    hamstrings: '햄스트링',
    back: '등',
    chest: '가슴',
    shoulders: '어깨',
    triceps: '삼두근',
    biceps: '이두근',
    core: '코어',
    obliques: '복사근',
    hip_flexors: '고관절 굴곡근',
    cardio: '심폐',
    legs: '하체',
    arms: '팔',
    full_body: '전신',
  };

  const difficultyInfo = getDifficultyInfo(exercise.difficulty);
  const categoryInfo = getCategoryInfo(exercise.category);

  // 운동 팁 생성
  const tips = [
    '운동 전 충분한 워밍업을 하세요',
    '호흡을 멈추지 말고 자연스럽게 유지하세요',
    '무게보다 정확한 자세가 더 중요합니다',
    '통증이 느껴지면 즉시 운동을 중단하세요',
  ];

  // 주의사항 생성
  const cautions = [
    '허리에 통증이 있다면 이 운동을 피하세요',
    '무릎이 발끝을 넘지 않도록 주의하세요',
    '급격한 동작을 피하고 천천히 수행하세요',
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D12', paddingBottom: '100px' }}>
      <PageHeader title="운동 상세" />

      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Exercise Header */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FeatureCard>
            {/* Title */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: 0 }}>
                  {exercise.nameKo}
                </h1>
                <p style={{ fontSize: '14px', color: '#6B7280', margin: '4px 0 0' }}>
                  {exercise.name}
                </p>
              </div>
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '16px' }}>
              <Tag color={categoryInfo.color}>{categoryInfo.text}</Tag>
              <Tag color={difficultyInfo.color}>{difficultyInfo.text}</Tag>
              {exercise.equipmentName && (
                <Tag color="purple">{exercise.equipmentName}</Tag>
              )}
            </div>
          </FeatureCard>
        </motion.section>

        {/* YouTube Video Player */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <YouTubeVideoPlayer
            exerciseName={exercise.nameKo}
            exerciseNameEn={exercise.name}
          />
        </motion.section>

        {/* Target Muscles */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: 'white', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Target size={20} color="#00D9FF" />
            타겟 근육
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {exercise.muscleGroups.map((muscle: string, index: number) => (
              <motion.div
                key={muscle}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 + index * 0.05 }}
                style={{
                  padding: '12px 18px',
                  background: 'linear-gradient(135deg, rgba(0, 217, 255, 0.15), rgba(0, 217, 255, 0.05))',
                  border: '1px solid rgba(0, 217, 255, 0.3)',
                  borderRadius: '12px',
                  fontSize: '14px',
                  color: '#00D9FF',
                  fontWeight: 500,
                }}
              >
                {muscleGroupNames[muscle] || muscle}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Exercise Info */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <ModernCard style={{ padding: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: 'rgba(255, 107, 53, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 10px',
                }}>
                  <Dumbbell size={22} color="#FF6B35" />
                </div>
                <p style={{ fontSize: '11px', color: '#6B7280', margin: '0 0 4px' }}>세트</p>
                <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', margin: 0 }}>{exercise.sets}</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: 'rgba(57, 255, 20, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 10px',
                }}>
                  <Zap size={22} color="#39FF14" />
                </div>
                <p style={{ fontSize: '11px', color: '#6B7280', margin: '0 0 4px' }}>횟수</p>
                <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', margin: 0 }}>{exercise.reps}</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: 'rgba(0, 217, 255, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 10px',
                }}>
                  <Clock size={22} color="#00D9FF" />
                </div>
                <p style={{ fontSize: '11px', color: '#6B7280', margin: '0 0 4px' }}>휴식</p>
                <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', margin: 0 }}>{exercise.restTime}초</p>
              </div>
            </div>
            {exercise.weight && (
              <div style={{
                marginTop: '20px',
                padding: '14px',
                background: 'rgba(114, 9, 183, 0.1)',
                borderRadius: '12px',
                textAlign: 'center',
                border: '1px solid rgba(114, 9, 183, 0.2)',
              }}>
                <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 4px' }}>권장 무게</p>
                <p style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  margin: 0,
                  background: 'linear-gradient(135deg, #7209B7, #FF006E)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  {exercise.weight} kg
                </p>
              </div>
            )}
          </ModernCard>
        </motion.section>

        {/* Instructions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: 'white', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle size={20} color="#39FF14" />
            운동 방법
          </h3>
          <ModernCard style={{ padding: '20px' }}>
            <ol style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: 0, padding: 0, listStyle: 'none' }}>
              {exercise.instructions.map((instruction: string, index: number) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + index * 0.05 }}
                  style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}
                >
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #00D9FF, #7209B7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    color: 'white',
                    fontSize: '13px',
                    flexShrink: 0,
                  }}>
                    {index + 1}
                  </div>
                  <p style={{ fontSize: '14px', color: '#D1D5DB', margin: 0, lineHeight: 1.6 }}>
                    {instruction}
                  </p>
                </motion.li>
              ))}
            </ol>
          </ModernCard>
        </motion.section>

        {/* Tips */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ModernCard style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ fontSize: '24px' }}>💡</div>
              <h4 style={{ fontWeight: 'bold', color: 'white', margin: 0 }}>운동 팁</h4>
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: 0, padding: 0, listStyle: 'none' }}>
              {tips.map((tip, index) => (
                <li key={index} style={{ fontSize: '13px', color: '#9CA3AF', display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ color: '#39FF14' }}>•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </ModernCard>
        </motion.section>

        {/* Cautions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <ModernCard style={{ padding: '20px', background: 'linear-gradient(145deg, rgba(255, 107, 53, 0.08), rgba(13, 13, 18, 0.98))', border: '1px solid rgba(255, 107, 53, 0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <AlertTriangle size={22} color="#FF6B35" />
              <h4 style={{ fontWeight: 'bold', color: 'white', margin: 0 }}>주의사항</h4>
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: 0, padding: 0, listStyle: 'none' }}>
              {cautions.map((caution, index) => (
                <li key={index} style={{ fontSize: '13px', color: '#FF6B35', display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span>•</span>
                  {caution}
                </li>
              ))}
            </ul>
          </ModernCard>
        </motion.section>

        {/* Start Button */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <PrimaryButton
            fullWidth
            size="lg"
            icon={<Play size={20} />}
            onClick={() => router.back()}
          >
            루틴으로 돌아가기
          </PrimaryButton>
        </motion.section>
      </div>
    </div>
  );
}
