'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Play, Clock, Target, CheckCircle2, Sparkles, X, Youtube, AlertTriangle } from 'lucide-react';
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

// AI 추천 스트레칭 루틴 (InBody/FMS/통증 데이터 기반)
const AI_RECOMMENDED_ROUTINE = {
  title: '오늘의 맞춤 스트레칭',
  reason: '어깨 통증 기록 및 FMS 결과를 기반으로 추천드립니다',
  exercises: ['ex1', 'ex2', 'ex3', 'ex5'],  // 추천 스트레칭 ID
  totalDuration: 165,  // 총 소요시간(초)
  basedOn: {
    inbody: '상체 근력 부족',
    fms: '어깨 가동성 제한',
    pain: '어깨 통증 기록 (레벨 3)',
  },
};

export default function StretchingPage() {
  const router = useRouter();
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showYoutubeModal, setShowYoutubeModal] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
  const [currentVideoTitle, setCurrentVideoTitle] = useState<string>('');

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

        {/* AI Recommended Routine */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <ModernCard style={{
            padding: '20px',
            background: 'linear-gradient(145deg, rgba(114, 9, 183, 0.15), rgba(13, 13, 18, 0.98))',
            border: '1px solid rgba(114, 9, 183, 0.3)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #7209B7, #FF006E)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Sparkles size={20} color="white" />
              </div>
              <div>
                <h3 style={{ fontWeight: 'bold', color: 'white', margin: 0, fontSize: '16px' }}>
                  {AI_RECOMMENDED_ROUTINE.title}
                </h3>
                <p style={{ fontSize: '12px', color: '#9CA3AF', margin: 0 }}>
                  {AI_RECOMMENDED_ROUTINE.reason}
                </p>
              </div>
            </div>

            {/* Based On Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
              <span style={{
                padding: '4px 10px',
                borderRadius: '12px',
                background: 'rgba(0, 217, 255, 0.15)',
                color: '#00D9FF',
                fontSize: '10px',
                fontWeight: '600',
              }}>
                InBody: {AI_RECOMMENDED_ROUTINE.basedOn.inbody}
              </span>
              <span style={{
                padding: '4px 10px',
                borderRadius: '12px',
                background: 'rgba(57, 255, 20, 0.15)',
                color: '#39FF14',
                fontSize: '10px',
                fontWeight: '600',
              }}>
                FMS: {AI_RECOMMENDED_ROUTINE.basedOn.fms}
              </span>
              <span style={{
                padding: '4px 10px',
                borderRadius: '12px',
                background: 'rgba(255, 214, 10, 0.15)',
                color: '#FFD60A',
                fontSize: '10px',
                fontWeight: '600',
              }}>
                {AI_RECOMMENDED_ROUTINE.basedOn.pain}
              </span>
            </div>

            {/* Recommended Exercises */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', overflowX: 'auto', paddingBottom: '4px' }}>
              {AI_RECOMMENDED_ROUTINE.exercises.map((exId, index) => {
                const exercise = MOCK_STRETCHING_EXERCISES.find(e => e.id === exId);
                if (!exercise) return null;
                return (
                  <div
                    key={exId}
                    style={{
                      flexShrink: 0,
                      width: '80px',
                      padding: '12px 8px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      textAlign: 'center',
                      border: completedExercises.includes(exId) ? '2px solid #39FF14' : '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <div style={{ fontSize: '24px', marginBottom: '6px' }}>{exercise.icon}</div>
                    <div style={{ fontSize: '10px', color: 'white', fontWeight: '600' }}>{index + 1}. {exercise.name}</div>
                    <div style={{ fontSize: '9px', color: '#6B7280', marginTop: '2px' }}>{exercise.duration}초</div>
                    {completedExercises.includes(exId) && (
                      <CheckCircle2 size={14} color="#39FF14" style={{ marginTop: '4px' }} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Progress */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '12px', color: '#9CA3AF' }}>
                {AI_RECOMMENDED_ROUTINE.exercises.filter(id => completedExercises.includes(id)).length}/{AI_RECOMMENDED_ROUTINE.exercises.length} 완료
              </span>
              <span style={{ fontSize: '12px', color: '#7209B7' }}>
                총 {Math.round(AI_RECOMMENDED_ROUTINE.totalDuration / 60)}분
              </span>
            </div>
            <ProgressBar
              percentage={Math.round((AI_RECOMMENDED_ROUTINE.exercises.filter(id => completedExercises.includes(id)).length / AI_RECOMMENDED_ROUTINE.exercises.length) * 100)}
              color="orange"
              height={6}
            />
          </ModernCard>
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
                        <button
                          onClick={() => {
                            if (exercise.youtubeId) {
                              setCurrentVideoId(exercise.youtubeId);
                              setCurrentVideoTitle(exercise.name);
                              setShowYoutubeModal(true);
                            }
                          }}
                          style={{
                            padding: '8px 12px',
                            background: exercise.youtubeId ? 'rgba(255, 0, 0, 0.2)' : 'rgba(26, 26, 36, 0.9)',
                            borderRadius: '10px',
                            border: exercise.youtubeId ? '1px solid rgba(255, 0, 0, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
                            cursor: exercise.youtubeId ? 'pointer' : 'default',
                          }}
                        >
                          {exercise.youtubeId ? (
                            <Youtube size={16} color="#FF0000" />
                          ) : (
                            <Play size={16} color="#00D9FF" />
                          )}
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

      {/* YouTube Video Modal */}
      {showYoutubeModal && currentVideoId && (
        <div
          onClick={() => setShowYoutubeModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '600px',
              background: '#0D0D12',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Youtube size={20} color="#FF0000" />
                <span style={{ fontWeight: 'bold', color: 'white' }}>
                  {currentVideoTitle}
                </span>
              </div>
              <button
                onClick={() => setShowYoutubeModal(false)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <X size={20} color="white" />
              </button>
            </div>

            {/* YouTube Embed */}
            <div style={{ aspectRatio: '16/9', width: '100%' }}>
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ border: 'none' }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
