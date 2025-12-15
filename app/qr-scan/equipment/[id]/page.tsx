'use client';

import React, { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Play, TrendingUp, ChevronRight, Camera, Sparkles, Clock, Target, Dumbbell, Info, X, Youtube, AlertTriangle, CheckCircle } from 'lucide-react';
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
import { TrainingRecommendation } from '@/types/equipment';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EquipmentDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('videos');
  const [selectedLevel, setSelectedLevel] = useState<'basic' | 'intermediate' | 'advanced'>('basic');
  const [showYoutubeModal, setShowYoutubeModal] = useState(false);
  const [painLevel, setPainLevel] = useState<number | null>(null);
  const [showPainRecorded, setShowPainRecorded] = useState(false);
  const [painLocation, setPainLocation] = useState<string>('');

  const equipment = MOCK_EQUIPMENT.find((e) => e.id === resolvedParams.id);

  // 난이도에 따른 추천 훈련 정보 가져오기
  const getRecommendedTraining = (): TrainingRecommendation | null => {
    if (!equipment?.recommendedTraining) return null;
    const levelMap = {
      basic: 'beginner',
      intermediate: 'intermediate',
      advanced: 'advanced',
    } as const;
    return equipment.recommendedTraining[levelMap[selectedLevel]];
  };

  const currentTraining = getRecommendedTraining();
  const currentYoutubeId = equipment?.youtubeVideos?.[selectedLevel];

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
                    onClick={() => setSelectedLevel(level.id as 'basic' | 'intermediate' | 'advanced')}
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

              {/* YouTube Video Card */}
              <ModernCard style={{ padding: '20px' }}>
                <div
                  onClick={() => currentYoutubeId && setShowYoutubeModal(true)}
                  style={{
                    aspectRatio: '16/9',
                    background: currentYoutubeId
                      ? `url(https://img.youtube.com/vi/${currentYoutubeId}/hqdefault.jpg) center/cover`
                      : 'rgba(0, 0, 0, 0.4)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                    cursor: currentYoutubeId ? 'pointer' : 'default',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0, 0, 0, 0.4)',
                  }} />
                  <div style={{
                    position: 'relative',
                    zIndex: 1,
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'rgba(255, 0, 0, 0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 20px rgba(255, 0, 0, 0.4)',
                  }}>
                    <Play size={28} color="white" fill="white" style={{ marginLeft: '4px' }} />
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 10px',
                    borderRadius: '8px',
                    background: 'rgba(0, 0, 0, 0.7)',
                  }}>
                    <Youtube size={14} color="#FF0000" />
                    <span style={{ fontSize: '11px', color: 'white', fontWeight: '600' }}>YouTube</span>
                  </div>
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

              {/* Recommended Training Info */}
              {currentTraining && (
                <ModernCard style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <Target size={18} color="white" />
                    </div>
                    <h4 style={{ fontWeight: 'bold', color: 'white', margin: 0 }}>추천 운동 설정</h4>
                  </div>

                  {/* Stats Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '16px' }}>
                    <div style={{
                      padding: '14px',
                      borderRadius: '12px',
                      background: 'rgba(255, 107, 53, 0.1)',
                      border: '1px solid rgba(255, 107, 53, 0.2)',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <Dumbbell size={16} color="#FF6B35" />
                        <span style={{ fontSize: '12px', color: '#9CA3AF' }}>세트 x 반복</span>
                      </div>
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>
                        {currentTraining.sets} x {currentTraining.reps}
                      </div>
                    </div>
                    <div style={{
                      padding: '14px',
                      borderRadius: '12px',
                      background: 'rgba(0, 217, 255, 0.1)',
                      border: '1px solid rgba(0, 217, 255, 0.2)',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <Target size={16} color="#00D9FF" />
                        <span style={{ fontSize: '12px', color: '#9CA3AF' }}>권장 중량</span>
                      </div>
                      <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'white' }}>
                        {currentTraining.weight}
                      </div>
                    </div>
                    <div style={{
                      padding: '14px',
                      borderRadius: '12px',
                      background: 'rgba(57, 255, 20, 0.1)',
                      border: '1px solid rgba(57, 255, 20, 0.2)',
                      gridColumn: 'span 2',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <Clock size={16} color="#39FF14" />
                        <span style={{ fontSize: '12px', color: '#9CA3AF' }}>세트 간 휴식</span>
                      </div>
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>
                        {currentTraining.restSeconds}초
                      </div>
                    </div>
                  </div>

                  {/* Tips */}
                  <div style={{
                    padding: '14px',
                    borderRadius: '12px',
                    background: 'rgba(114, 9, 183, 0.1)',
                    border: '1px solid rgba(114, 9, 183, 0.2)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                      <Info size={16} color="#7209B7" />
                      <span style={{ fontSize: '13px', fontWeight: '600', color: '#7209B7' }}>운동 팁</span>
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {currentTraining.tips.map((tip, index) => (
                        <li key={index} style={{ fontSize: '13px', color: '#D1D5DB' }}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </ModernCard>
              )}
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

        {/* Pain Recording Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ModernCard style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #FFD60A, #FF6B35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <AlertTriangle size={18} color="white" />
              </div>
              <div>
                <h4 style={{ fontWeight: 'bold', color: 'white', margin: 0 }}>운동 후 통증 기록</h4>
                <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>통증을 기록하여 안전한 운동을 하세요</p>
              </div>
            </div>

            {showPainRecorded ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{
                  textAlign: 'center',
                  padding: '20px',
                  borderRadius: '12px',
                  background: 'rgba(57, 255, 20, 0.1)',
                  border: '1px solid rgba(57, 255, 20, 0.2)',
                }}
              >
                <CheckCircle size={40} color="#39FF14" style={{ marginBottom: '12px' }} />
                <p style={{ color: '#39FF14', fontWeight: 'bold', marginBottom: '4px' }}>통증이 기록되었습니다</p>
                <p style={{ fontSize: '12px', color: '#6B7280' }}>
                  {painLocation && `${painLocation} - `}통증 레벨 {painLevel}/10
                </p>
              </motion.div>
            ) : (
              <>
                {/* Pain Level Slider */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ fontSize: '12px', color: '#6B7280' }}>통증 정도</span>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: painLevel === null ? '#6B7280' :
                             painLevel <= 3 ? '#39FF14' :
                             painLevel <= 6 ? '#FFD60A' : '#FF006E'
                    }}>
                      {painLevel === null ? '선택하세요' : `${painLevel}/10`}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                      <button
                        key={level}
                        onClick={() => setPainLevel(level)}
                        style={{
                          flex: 1,
                          height: '36px',
                          borderRadius: '8px',
                          border: painLevel === level ? '2px solid white' : '1px solid rgba(255, 255, 255, 0.1)',
                          background: painLevel !== null && level <= painLevel
                            ? level <= 3 ? 'rgba(57, 255, 20, 0.6)'
                            : level <= 6 ? 'rgba(255, 214, 10, 0.6)'
                            : 'rgba(255, 0, 110, 0.6)'
                            : 'rgba(26, 26, 36, 0.8)',
                          color: painLevel === level ? 'white' : '#6B7280',
                          fontSize: '11px',
                          fontWeight: painLevel === level ? 'bold' : 'normal',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                      >
                        {level}
                      </button>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                    <span style={{ fontSize: '10px', color: '#39FF14' }}>없음</span>
                    <span style={{ fontSize: '10px', color: '#FFD60A' }}>중간</span>
                    <span style={{ fontSize: '10px', color: '#FF006E' }}>심함</span>
                  </div>
                </div>

                {/* Pain Location */}
                {painLevel !== null && painLevel > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    style={{ marginBottom: '16px' }}
                  >
                    <label style={{ display: 'block', fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>
                      통증 부위 (선택)
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {['허리', '무릎', '어깨', '팔꿈치', '손목', '목', '발목', '기타'].map((loc) => (
                        <button
                          key={loc}
                          onClick={() => setPainLocation(painLocation === loc ? '' : loc)}
                          style={{
                            padding: '8px 14px',
                            borderRadius: '20px',
                            border: painLocation === loc ? '2px solid #00D9FF' : '1px solid rgba(255, 255, 255, 0.1)',
                            background: painLocation === loc ? 'rgba(0, 217, 255, 0.2)' : 'rgba(26, 26, 36, 0.8)',
                            color: painLocation === loc ? '#00D9FF' : '#9CA3AF',
                            fontSize: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                          }}
                        >
                          {loc}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Submit Button */}
                <button
                  onClick={() => {
                    if (painLevel !== null) {
                      setShowPainRecorded(true);
                      // 여기서 실제로는 API 호출하여 통증 데이터 저장
                    }
                  }}
                  disabled={painLevel === null}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '12px',
                    border: 'none',
                    background: painLevel !== null
                      ? 'linear-gradient(135deg, #FFD60A, #FF6B35)'
                      : 'rgba(255, 255, 255, 0.1)',
                    color: painLevel !== null ? '#0D0D12' : '#6B7280',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    cursor: painLevel !== null ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s',
                  }}
                >
                  {painLevel === 0 ? '통증 없음으로 기록' : '통증 기록하기'}
                </button>

                <p style={{ fontSize: '11px', color: '#6B7280', textAlign: 'center', marginTop: '10px' }}>
                  기록된 통증 데이터는 위험 동작 필터링에 활용됩니다
                </p>
              </>
            )}
          </ModernCard>
        </motion.section>
      </div>

      {/* YouTube Video Modal */}
      {showYoutubeModal && currentYoutubeId && (
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
                  {equipment?.name} - {selectedLevel === 'basic' ? '기본' : selectedLevel === 'intermediate' ? '중급' : '고급'}
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
                src={`https://www.youtube.com/embed/${currentYoutubeId}?autoplay=1`}
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
