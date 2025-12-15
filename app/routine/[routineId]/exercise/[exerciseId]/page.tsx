'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, CheckCircle2, ChevronRight, Clock, Zap, Youtube } from 'lucide-react';
import { MOCK_ROUTINES } from '@/data/mock/routines';
import YouTubeVideoPlayer from '@/components/exercise/YouTubeVideoPlayer';
import {
  ModernCard,
  FeatureCard,
  PageHeader,
  PrimaryButton,
  SecondaryButton,
  Tag,
  ProgressBar,
} from '@/components/ui/ModernUI';

interface PageProps {
  params: Promise<{ routineId: string; exerciseId: string }>;
}

export default function ExerciseExecutionPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();

  const routine = MOCK_ROUTINES.find((r) => r.id === resolvedParams.routineId);
  const exerciseIndex = routine?.exercises.findIndex(
    (e) => e.id === resolvedParams.exerciseId
  ) ?? -1;
  const exercise = routine?.exercises[exerciseIndex];

  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [restTimeLeft, setRestTimeLeft] = useState(0);
  const [completedSets, setCompletedSets] = useState<number[]>([]);
  const [weight, setWeight] = useState(exercise?.weight || 0);

  useEffect(() => {
    if (!isResting || restTimeLeft <= 0) return;

    const timer = setInterval(() => {
      setRestTimeLeft((prev) => {
        if (prev <= 1) {
          setIsResting(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isResting, restTimeLeft]);

  if (!routine || !exercise) {
    return (
      <div style={{ minHeight: '100vh', background: '#0D0D12' }}>
        <PageHeader title="운동 실행" />
        <div style={{ padding: '24px 20px' }}>
          <ModernCard style={{ padding: '40px 20px', textAlign: 'center' }}>
            <p style={{ color: '#9CA3AF' }}>운동을 찾을 수 없습니다.</p>
          </ModernCard>
        </div>
      </div>
    );
  }

  const handleCompleteSet = () => {
    if (!completedSets.includes(currentSet)) {
      setCompletedSets([...completedSets, currentSet]);
    }

    if (currentSet < exercise.sets) {
      setIsResting(true);
      setRestTimeLeft(exercise.restTime);
      setCurrentSet(currentSet + 1);
    } else {
      handleCompleteExercise();
    }
  };

  const handleCompleteExercise = () => {
    const nextExercise = routine.exercises[exerciseIndex + 1];
    if (nextExercise) {
      router.push(`/routine/${routine.id}/exercise/${nextExercise.id}`);
    } else {
      router.push('/routine/complete');
    }
  };

  const handleSkipRest = () => {
    setIsResting(false);
    setRestTimeLeft(0);
  };

  const progress = (completedSets.length / exercise.sets) * 100;
  const overallProgress = (exerciseIndex / routine.exercises.length) * 100;

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D12', paddingBottom: '100px' }}>
      <PageHeader title={exercise.nameKo} />

      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Progress */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FeatureCard>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>
                  {exerciseIndex + 1} / {routine.exercises.length}
                </h2>
                <p style={{ fontSize: '13px', color: '#6B7280' }}>전체 진행률</p>
              </div>
              <Tag color="orange">{Math.round(overallProgress)}%</Tag>
            </div>
            <ProgressBar percentage={overallProgress} color="orange" height={6} />
          </FeatureCard>
        </motion.section>

        {/* Rest Timer */}
        <AnimatePresence>
          {isResting && (
            <motion.section
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <FeatureCard>
                <div style={{ textAlign: 'center' }}>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Clock size={64} color="#00D9FF" style={{ margin: '0 auto 16px' }} />
                  </motion.div>
                  <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>휴식 중</h3>
                  <div style={{
                    fontSize: '56px',
                    fontWeight: 'bold',
                    background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '16px',
                  }}>
                    {restTimeLeft}
                  </div>
                  <p style={{ color: '#9CA3AF', marginBottom: '16px', fontSize: '14px' }}>다음 세트 준비하세요</p>
                  <SecondaryButton size="sm" onClick={handleSkipRest}>
                    휴식 건너뛰기
                  </SecondaryButton>
                </div>
              </FeatureCard>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Exercise Info */}
        {!isResting && (
          <>
            {/* YouTube Video */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <YouTubeVideoPlayer
                exerciseName={exercise.nameKo}
                exerciseNameEn={exercise.name}
              />
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <ModernCard style={{ padding: '20px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
                  {exercise.nameKo}
                </h2>
                <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '20px' }}>
                  {exercise.muscleGroups.join(', ')}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    padding: '14px',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '4px' }}>세트</div>
                    <div style={{
                      fontSize: '24px',
                      fontWeight: 'bold',
                      background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                      {currentSet}/{exercise.sets}
                    </div>
                  </div>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    padding: '14px',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '4px' }}>횟수</div>
                    <div style={{
                      fontSize: '24px',
                      fontWeight: 'bold',
                      background: 'linear-gradient(135deg, #39FF14, #00D9FF)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                      {exercise.reps}
                    </div>
                  </div>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    padding: '14px',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '4px' }}>무게</div>
                    <div style={{
                      fontSize: '24px',
                      fontWeight: 'bold',
                      background: 'linear-gradient(135deg, #7209B7, #FF006E)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                      {weight}
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <ProgressBar percentage={progress} color="green" height={6} />
                </div>

                <PrimaryButton
                  fullWidth
                  size="lg"
                  icon={currentSet < exercise.sets ? <CheckCircle2 size={20} /> : <ChevronRight size={20} />}
                  onClick={handleCompleteSet}
                >
                  {currentSet < exercise.sets ? '세트 완료' : '다음 운동'}
                </PrimaryButton>
              </ModernCard>
            </motion.section>

            {/* Set Tracker */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>세트 기록</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
                {Array.from({ length: exercise.sets }, (_, i) => i + 1).map((set) => {
                  const isCompleted = completedSets.includes(set);
                  const isCurrent = set === currentSet && !isCompleted;

                  return (
                    <motion.div
                      key={set}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 + set * 0.05 }}
                    >
                      <div style={{
                        background: isCompleted
                          ? 'linear-gradient(135deg, #39FF14, #00D9FF)'
                          : isCurrent
                          ? 'linear-gradient(135deg, #FF6B35, #FF006E)'
                          : 'rgba(26, 26, 36, 0.9)',
                        borderRadius: '12px',
                        padding: '14px 0',
                        textAlign: 'center',
                        border: isCurrent ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                      }}>
                        <div style={{ fontWeight: 'bold', color: 'white', fontSize: '18px' }}>
                          {isCompleted ? '✓' : set}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>

            {/* Instructions */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <ModernCard style={{ padding: '20px' }}>
                <h4 style={{ fontWeight: 'bold', color: 'white', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Zap size={20} color="#00D9FF" />
                  운동 방법
                </h4>
                <ol style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {exercise.instructions.map((instruction, index) => (
                    <li
                      key={index}
                      style={{ fontSize: '13px', color: '#9CA3AF', display: 'flex', gap: '10px' }}
                    >
                      <span style={{ color: '#00D9FF', fontWeight: '600' }}>{index + 1}.</span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
              </ModernCard>
            </motion.section>

            {/* Weight Adjustment */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <ModernCard style={{ padding: '20px' }}>
                <h4 style={{ fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>무게 조절</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <SecondaryButton size="sm" onClick={() => setWeight(Math.max(0, weight - 5))}>
                    -5kg
                  </SecondaryButton>
                  <div style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{
                      fontSize: '32px',
                      fontWeight: 'bold',
                      background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                      {weight} kg
                    </div>
                  </div>
                  <SecondaryButton size="sm" onClick={() => setWeight(weight + 5)}>
                    +5kg
                  </SecondaryButton>
                </div>
              </ModernCard>
            </motion.section>
          </>
        )}
      </div>
    </div>
  );
}
