'use client';

import React, { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Play, TrendingUp, ChevronRight, Camera, Sparkles } from 'lucide-react';
import { MOCK_EQUIPMENT } from '@/data/mock/equipment';
import { MOCK_EXERCISES } from '@/data/mock/exercises';
import {
  ModernCard,
  FeatureCard,
  PageHeader,
  PrimaryButton,
  Tag,
  TabBar,
} from '@/components/ui/ModernUI';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EquipmentDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('videos');
  const [selectedLevel, setSelectedLevel] = useState('basic');

  const equipment = MOCK_EQUIPMENT.find((e) => e.id === resolvedParams.id);

  if (!equipment) {
    return (
      <div style={{ minHeight: '100vh', background: '#0D0D12' }}>
        <PageHeader title="기구 정보" />
        <div style={{ padding: '24px 20px' }}>
          <ModernCard style={{ padding: '40px 20px', textAlign: 'center' }}>
            <p style={{ color: '#9CA3AF' }}>기구 정보를 찾을 수 없습니다.</p>
          </ModernCard>
        </div>
      </div>
    );
  }

  const recentRecords = MOCK_EXERCISES.filter(
    (ex) => ex.equipmentId === equipment.id
  ).slice(0, 3);

  const getDifficultyInfo = (difficulty: number) => {
    if (difficulty <= 2) return { color: 'green' as const, text: '초급' };
    if (difficulty === 3) return { color: 'orange' as const, text: '중급' };
    return { color: 'pink' as const, text: '고급' };
  };

  const tabs = [
    { id: 'videos', label: '운동 영상' },
    { id: 'exercises', label: '운동 목록', badge: equipment.exercises.length },
    { id: 'records', label: '운동 기록', badge: recentRecords.length },
  ];

  const levelTabs = [
    { id: 'basic', label: '기본', color: '#00D9FF' },
    { id: 'intermediate', label: '중급', color: '#39FF14' },
    { id: 'advanced', label: '고급', color: '#FF6B35' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D12', paddingBottom: '100px' }}>
      <PageHeader title={equipment.name} />

      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Equipment Info */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FeatureCard>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
                  {equipment.name}
                </h2>
                <p style={{ color: '#6B7280', fontSize: '14px' }}>{equipment.location}</p>
              </div>
              <Tag color={equipment.status === 'available' ? 'green' : 'orange'}>
                {equipment.status === 'available' ? '사용가능' : '사용중'}
              </Tag>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <TrendingUp size={20} color="#39FF14" />
              <span style={{ fontSize: '14px', color: '#D1D5DB' }}>
                이 기구로 {equipment.exercises.length}가지 운동을 할 수 있습니다
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <PrimaryButton fullWidth size="lg" onClick={() => router.push('/routine')}>
                루틴에 추가하기
              </PrimaryButton>

              {/* AI 자세 검증 버튼 - 눈에 띄게 */}
              <motion.button
                onClick={() => router.push(`/qr-scan/equipment/${resolvedParams.id}/form-guide`)}
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(57, 255, 20, 0.15), rgba(0, 217, 255, 0.1))',
                  border: '2px solid rgba(57, 255, 20, 0.5)',
                  color: '#39FF14',
                  fontWeight: 'bold',
                  fontSize: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(57, 255, 20, 0.2), inset 0 0 20px rgba(57, 255, 20, 0.05)',
                }}
                whileHover={{ scale: 1.02, boxShadow: '0 6px 25px rgba(57, 255, 20, 0.3)' }}
                whileTap={{ scale: 0.98 }}
              >
                <Camera size={20} />
                AI 자세 검증 시작하기
                <Sparkles size={18} />
              </motion.button>
            </div>
          </FeatureCard>
        </motion.section>

        {/* AI 자세 검증 안내 카드 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <ModernCard
            onClick={() => router.push(`/qr-scan/equipment/${resolvedParams.id}/form-guide`)}
            style={{
              padding: '20px',
              background: 'linear-gradient(145deg, rgba(57, 255, 20, 0.08), rgba(13, 13, 18, 0.98))',
              border: '1px solid rgba(57, 255, 20, 0.2)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #39FF14, #00D9FF)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(57, 255, 20, 0.4)',
              }}>
                <Camera size={28} color="white" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <h4 style={{ fontWeight: 'bold', color: 'white', margin: 0, fontSize: '16px' }}>
                    AI 자세 검증
                  </h4>
                  <span style={{
                    padding: '3px 8px',
                    borderRadius: '10px',
                    background: 'rgba(57, 255, 20, 0.2)',
                    color: '#39FF14',
                    fontSize: '10px',
                    fontWeight: 'bold',
                  }}>
                    NEW
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: '#9CA3AF', margin: 0, lineHeight: 1.4 }}>
                  카메라로 실시간 자세를 분석하고 즉각적인 피드백을 받으세요
                </p>
              </div>
              <ChevronRight size={20} color="#39FF14" />
            </div>
          </ModernCard>
        </motion.section>

        {/* Tabs */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </motion.section>

        {/* Tab Content */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {activeTab === 'videos' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Level Selector */}
              <div style={{ display: 'flex', gap: '8px' }}>
                {levelTabs.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setSelectedLevel(level.id)}
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: '12px',
                      border: selectedLevel === level.id ? `2px solid ${level.color}` : '1px solid rgba(255, 255, 255, 0.1)',
                      background: selectedLevel === level.id ? `${level.color}20` : 'rgba(26, 26, 36, 0.8)',
                      color: selectedLevel === level.id ? level.color : '#9CA3AF',
                      fontWeight: '600',
                      fontSize: '13px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {level.label}
                  </button>
                ))}
              </div>

              {/* Video Card */}
              <ModernCard style={{ padding: '20px' }}>
                <div style={{
                  aspectRatio: '16/9',
                  background: 'rgba(0, 0, 0, 0.4)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}>
                  <Play size={48} color={levelTabs.find(l => l.id === selectedLevel)?.color || '#00D9FF'} />
                </div>
                <h4 style={{ fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
                  {selectedLevel === 'basic' ? '기본 자세' : selectedLevel === 'intermediate' ? '중급 테크닉' : '고급 변형 동작'}
                </h4>
                <p style={{ fontSize: '13px', color: '#6B7280' }}>
                  {selectedLevel === 'basic'
                    ? '초보자를 위한 기본 동작과 자세를 배워보세요'
                    : selectedLevel === 'intermediate'
                    ? '더 효과적인 운동을 위한 중급 테크닉'
                    : '고급 사용자를 위한 변형 동작과 팁'}
                </p>
              </ModernCard>
            </div>
          )}

          {activeTab === 'exercises' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {equipment.exercises.map((exercise, index) => {
                const diffInfo = getDifficultyInfo(exercise.difficulty);
                return (
                  <motion.div
                    key={exercise.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ModernCard style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>{exercise.nameKo}</h4>
                          <div style={{ marginBottom: '8px' }}>
                            <Tag color={diffInfo.color} size="sm">난이도 {exercise.difficulty}</Tag>
                          </div>
                          <p style={{ fontSize: '12px', color: '#6B7280' }}>
                            {exercise.muscleGroups.join(', ')}
                          </p>
                        </div>
                        <ChevronRight size={20} color="#6B7280" />
                      </div>
                    </ModernCard>
                  </motion.div>
                );
              })}
            </div>
          )}

          {activeTab === 'records' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentRecords.length > 0 ? (
                recentRecords.map((exercise, index) => (
                  <motion.div
                    key={exercise.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ModernCard style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <h4 style={{ fontWeight: 'bold', color: 'white' }}>{exercise.nameKo}</h4>
                        <Tag color="green" size="sm">완료</Tag>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', textAlign: 'center' }}>
                        <div>
                          <div style={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                            background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}>
                            {exercise.sets}
                          </div>
                          <div style={{ fontSize: '11px', color: '#6B7280' }}>세트</div>
                        </div>
                        <div>
                          <div style={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                            background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}>
                            {exercise.reps}
                          </div>
                          <div style={{ fontSize: '11px', color: '#6B7280' }}>회</div>
                        </div>
                        <div>
                          <div style={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                            background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}>
                            {exercise.weight || 0}
                          </div>
                          <div style={{ fontSize: '11px', color: '#6B7280' }}>kg</div>
                        </div>
                      </div>
                    </ModernCard>
                  </motion.div>
                ))
              ) : (
                <ModernCard style={{ padding: '40px 20px', textAlign: 'center' }}>
                  <p style={{ color: '#6B7280' }}>아직 운동 기록이 없습니다</p>
                </ModernCard>
              )}
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
}
