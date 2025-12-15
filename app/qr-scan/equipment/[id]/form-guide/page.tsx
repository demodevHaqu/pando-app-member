'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import PoseCanvas from '@/components/motion-tracking/PoseCanvas';
import { PoseDetectionResult } from '@/types/pose-tracking';
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Camera,
  Video,
  Target,
  Zap,
  Activity,
  ThumbsUp,
  TrendingUp,
} from 'lucide-react';
import { MOCK_EQUIPMENT } from '@/data/mock/equipment';

// Mock 자세 가이드 데이터
const FORM_GUIDE_STEPS = [
  {
    id: 1,
    title: '시작 자세',
    description: '발을 어깨 너비로 벌리고, 등을 패드에 밀착시킵니다.',
    videoUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600',
    tips: ['시선은 정면을 향합니다', '어깨를 뒤로 젖히고 가슴을 펴세요'],
    warnings: ['허리가 패드에서 떨어지지 않도록 주의'],
  },
  {
    id: 2,
    title: '들어올리기',
    description: '숨을 내쉬며 천천히 중량을 밀어올립니다.',
    videoUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600',
    tips: ['팔꿈치가 완전히 펴지지 않도록 합니다', '가슴 근육의 수축을 느끼세요'],
    warnings: ['반동을 이용하지 마세요', '호흡을 참지 마세요'],
  },
  {
    id: 3,
    title: '내리기',
    description: '숨을 들이쉬며 천천히 시작 위치로 돌아갑니다.',
    videoUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600',
    tips: ['내릴 때는 올릴 때보다 천천히', '근육의 긴장을 유지하세요'],
    warnings: ['급격히 내리지 마세요', '중량이 바닥에 닿지 않도록'],
  },
];

// Mock 주의사항 데이터
const SAFETY_TIPS = [
  {
    icon: '💪',
    title: '적절한 무게 선택',
    description: '처음에는 가벼운 무게로 시작하여 올바른 자세를 익히세요.',
  },
  {
    icon: '🔄',
    title: '충분한 워밍업',
    description: '운동 전 5-10분 가벼운 유산소와 동적 스트레칭을 하세요.',
  },
  {
    icon: '⏱️',
    title: '적절한 휴식',
    description: '세트 사이 60-90초 휴식을 취하세요.',
  },
  {
    icon: '🚫',
    title: '통증 시 중단',
    description: '관절 통증이 느껴지면 즉시 운동을 중단하세요.',
  },
];

type ViewMode = 'guide' | 'tracking';

// Inline Style Card Component
const StyleCard = ({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{
    background: 'linear-gradient(145deg, rgba(26, 26, 36, 0.95), rgba(13, 13, 18, 0.98))',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: '20px',
    ...style
  }}>
    {children}
  </div>
);

export default function FormGuidePage() {
  const router = useRouter();
  const params = useParams();
  const equipmentId = params.id as string;

  const equipment = MOCK_EQUIPMENT.find((e) => e.id === equipmentId);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('guide');

  // Motion tracking state (fake)
  const [repCount, setRepCount] = useState(0);
  const [formScore, setFormScore] = useState(92);
  const [currentPhase, setCurrentPhase] = useState<'idle' | 'descending' | 'bottom' | 'ascending'>('idle');
  const [isTracking, setIsTracking] = useState(false);
  const phaseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const repTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Fake feedback items
  const fakeFeedbacks = [
    { type: 'good' as const, message: '허리가 잘 펴져 있습니다', score: 95 },
    { type: 'good' as const, message: '무릎 각도가 적절합니다', score: 90 },
    { type: 'warning' as const, message: '어깨를 조금 더 펴주세요', score: 75 },
  ];

  // Simulate phase changes
  useEffect(() => {
    if (isTracking) {
      const phases: Array<'idle' | 'descending' | 'bottom' | 'ascending'> = ['idle', 'descending', 'bottom', 'ascending'];
      let phaseIndex = 0;

      phaseTimerRef.current = setInterval(() => {
        phaseIndex = (phaseIndex + 1) % phases.length;
        setCurrentPhase(phases[phaseIndex]);

        // Complete a rep when returning to idle
        if (phases[phaseIndex] === 'idle' && phaseIndex === 0) {
          setRepCount(prev => prev + 1);
          // Vary the score slightly
          setFormScore(85 + Math.floor(Math.random() * 15));
        }
      }, 1500);

      return () => {
        if (phaseTimerRef.current) clearInterval(phaseTimerRef.current);
      };
    }
  }, [isTracking]);

  // Handle pose detection (just starts tracking)
  const handlePoseDetected = useCallback((pose: PoseDetectionResult) => {
    if (!isTracking) {
      setIsTracking(true);
    }
  }, [isTracking]);

  const resetTracking = useCallback(() => {
    setRepCount(0);
    setFormScore(92);
    setCurrentPhase('idle');
    setIsTracking(false);
    if (phaseTimerRef.current) clearInterval(phaseTimerRef.current);
    if (repTimerRef.current) clearInterval(repTimerRef.current);
  }, []);

  if (!equipment) {
    return (
      <div style={{ minHeight: '100vh', background: '#0D0D12', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'white' }}>기구 정보를 찾을 수 없습니다</p>
      </div>
    );
  }

  const step = FORM_GUIDE_STEPS[currentStep];

  const handlePrevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleNextStep = () => {
    if (currentStep < FORM_GUIDE_STEPS.length - 1) setCurrentStep(currentStep + 1);
  };

  const handleComplete = () => {
    import('@/components/ui/AlertModal').then(({ showAlert }) => {
      showAlert('자세 가이드를 완료했습니다!\n이제 운동을 시작해보세요.', {
        type: 'success',
        onConfirm: () => router.back(),
      });
    });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D12', paddingBottom: '120px' }}>
      <Header title={`${equipment.name} 자세 가이드`} showBack={true} showLogo={true} showNotification={false} />

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* 모드 전환 탭 */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: 'flex',
            gap: '8px',
            padding: '4px',
            background: '#1A1A24',
            borderRadius: '16px',
          }}
        >
          <button
            onClick={() => setViewMode('guide')}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '14px 16px',
              borderRadius: '12px',
              fontWeight: 600,
              fontSize: '14px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              background: viewMode === 'guide' ? 'linear-gradient(135deg, #FF6B35, #FF006E)' : 'transparent',
              color: viewMode === 'guide' ? 'white' : '#9CA3AF',
            }}
          >
            <Video size={18} />
            가이드 영상
          </button>
          <button
            onClick={() => setViewMode('tracking')}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '14px 16px',
              borderRadius: '12px',
              fontWeight: 600,
              fontSize: '14px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              background: viewMode === 'tracking' ? 'linear-gradient(135deg, #FF6B35, #FF006E)' : 'transparent',
              color: viewMode === 'tracking' ? 'white' : '#9CA3AF',
            }}
          >
            <Camera size={18} />
            AI 자세 분석
          </button>
        </motion.div>

        <AnimatePresence mode="wait">
          {viewMode === 'guide' ? (
            <motion.div
              key="guide"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
            >
              {/* 비디오 플레이어 */}
              <div style={{
                position: 'relative',
                aspectRatio: '16/9',
                borderRadius: '16px',
                overflow: 'hidden',
                background: '#1A1A24',
              }}>
                <img
                  src={step.videoUrl}
                  alt={step.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                {/* 재생 컨트롤 오버레이 */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0, 0, 0, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 4px 20px rgba(255, 107, 53, 0.5)',
                    }}
                  >
                    {isPlaying ? <Pause size={28} color="white" /> : <Play size={28} color="white" style={{ marginLeft: '4px' }} />}
                  </button>
                </div>

                {/* 상단 컨트롤 */}
                <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    style={{
                      padding: '8px',
                      background: 'rgba(0, 0, 0, 0.5)',
                      borderRadius: '50%',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {isMuted ? <VolumeX size={20} color="white" /> : <Volume2 size={20} color="white" />}
                  </button>
                </div>

                {/* 단계 표시 */}
                <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px' }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {FORM_GUIDE_STEPS.map((_, idx) => (
                      <div
                        key={idx}
                        style={{
                          height: '4px',
                          flex: 1,
                          borderRadius: '2px',
                          background: idx <= currentStep ? '#00D9FF' : 'rgba(255, 255, 255, 0.3)',
                          transition: 'background 0.3s',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* 단계 정보 */}
              <StyleCard>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{
                    padding: '6px 12px',
                    borderRadius: '20px',
                    background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 'bold',
                  }}>
                    STEP {currentStep + 1}/{FORM_GUIDE_STEPS.length}
                  </span>
                  <button
                    onClick={() => setCurrentStep(0)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
                  >
                    <RotateCcw size={20} color="#9CA3AF" />
                  </button>
                </div>

                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>{step.title}</h2>
                <p style={{ color: '#D1D5DB', marginBottom: '16px', lineHeight: 1.6 }}>{step.description}</p>

                {/* 팁 */}
                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{ fontWeight: 'bold', color: '#39FF14', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <CheckCircle size={16} />
                    핵심 포인트
                  </h4>
                  {step.tips.map((tip, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '14px', color: '#D1D5DB', marginBottom: '4px' }}>
                      <span style={{ color: '#39FF14' }}>•</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>

                {/* 주의사항 */}
                <div>
                  <h4 style={{ fontWeight: 'bold', color: '#FFD60A', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <AlertTriangle size={16} />
                    주의사항
                  </h4>
                  {step.warnings.map((warning, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '14px', color: '#D1D5DB', marginBottom: '4px' }}>
                      <span style={{ color: '#FFD60A' }}>•</span>
                      <span>{warning}</span>
                    </div>
                  ))}
                </div>
              </StyleCard>

              {/* 단계 네비게이션 */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={handlePrevStep}
                  disabled={currentStep === 0}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    padding: '16px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: currentStep === 0 ? '#6B7280' : 'white',
                    fontWeight: 'bold',
                    cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
                    opacity: currentStep === 0 ? 0.5 : 1,
                  }}
                >
                  <ChevronLeft size={20} />
                  이전
                </button>
                <button
                  onClick={handleNextStep}
                  disabled={currentStep === FORM_GUIDE_STEPS.length - 1}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    padding: '16px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: currentStep === FORM_GUIDE_STEPS.length - 1 ? '#6B7280' : 'white',
                    fontWeight: 'bold',
                    cursor: currentStep === FORM_GUIDE_STEPS.length - 1 ? 'not-allowed' : 'pointer',
                    opacity: currentStep === FORM_GUIDE_STEPS.length - 1 ? 0.5 : 1,
                  }}
                >
                  다음
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* 안전 수칙 */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <StyleCard>
                  <h3 style={{ fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>안전 수칙</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                    {SAFETY_TIPS.map((tip, idx) => (
                      <div key={idx} style={{
                        padding: '12px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '12px',
                      }}>
                        <div style={{ fontSize: '24px', marginBottom: '8px' }}>{tip.icon}</div>
                        <h4 style={{ fontWeight: 'bold', color: 'white', fontSize: '13px', marginBottom: '4px' }}>{tip.title}</h4>
                        <p style={{ fontSize: '11px', color: '#9CA3AF', lineHeight: 1.4 }}>{tip.description}</p>
                      </div>
                    ))}
                  </div>
                </StyleCard>
              </motion.div>

              {/* 관련 근육 */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <StyleCard>
                  <h3 style={{ fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>타겟 근육</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {Array.from(new Set(equipment.exercises.flatMap(ex => ex.muscleGroups))).map((muscle, idx) => (
                      <span key={idx} style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        background: 'rgba(114, 9, 183, 0.2)',
                        border: '1px solid rgba(114, 9, 183, 0.4)',
                        color: '#A855F7',
                        fontSize: '12px',
                        fontWeight: 500,
                      }}>
                        {muscle}
                      </span>
                    ))}
                  </div>
                </StyleCard>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="tracking"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              {/* 모션 트래킹 화면 */}
              <div style={{ aspectRatio: '4/3', borderRadius: '16px', overflow: 'hidden', background: '#1A1A24' }}>
                <PoseCanvas
                  onPoseDetected={handlePoseDetected}
                  showSkeleton={true}
                  showVideo={true}
                  mirrorMode={true}
                  width={640}
                  height={480}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>

              {/* 실시간 스코어 및 횟수 */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                <StyleCard style={{ textAlign: 'center', padding: '16px' }}>
                  <Target size={24} color="#00D9FF" style={{ margin: '0 auto 8px' }} />
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>{formScore}</div>
                  <div style={{ fontSize: '11px', color: '#9CA3AF' }}>자세 점수</div>
                </StyleCard>
                <StyleCard style={{ textAlign: 'center', padding: '16px' }}>
                  <Zap size={24} color="#FF6B35" style={{ margin: '0 auto 8px' }} />
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>{repCount}</div>
                  <div style={{ fontSize: '11px', color: '#9CA3AF' }}>반복 횟수</div>
                </StyleCard>
                <StyleCard style={{ textAlign: 'center', padding: '16px' }}>
                  <Activity size={24} color="#39FF14" style={{ margin: '0 auto 8px' }} />
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'white' }}>
                    {currentPhase === 'idle' ? '대기' :
                     currentPhase === 'descending' ? '내려가기' :
                     currentPhase === 'bottom' ? '최저점' : '올라가기'}
                  </div>
                  <div style={{ fontSize: '11px', color: '#9CA3AF' }}>현재 단계</div>
                </StyleCard>
              </div>

              {/* 실시간 피드백 (Fake) */}
              <StyleCard>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <h3 style={{ fontWeight: 'bold', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <TrendingUp size={18} color="#00D9FF" />
                    실시간 피드백
                  </h3>
                  <div style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    background: formScore >= 85 ? 'rgba(57, 255, 20, 0.2)' : 'rgba(255, 214, 10, 0.2)',
                    border: `1px solid ${formScore >= 85 ? 'rgba(57, 255, 20, 0.4)' : 'rgba(255, 214, 10, 0.4)'}`,
                  }}>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: formScore >= 85 ? '#39FF14' : '#FFD60A' }}>
                      {formScore >= 85 ? '좋은 자세!' : '개선 필요'}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {fakeFeedbacks.map((feedback, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px',
                        borderRadius: '12px',
                        background: feedback.type === 'good'
                          ? 'rgba(57, 255, 20, 0.1)'
                          : 'rgba(255, 214, 10, 0.1)',
                        border: `1px solid ${feedback.type === 'good' ? 'rgba(57, 255, 20, 0.2)' : 'rgba(255, 214, 10, 0.2)'}`,
                      }}
                    >
                      {feedback.type === 'good' ? (
                        <ThumbsUp size={18} color="#39FF14" />
                      ) : (
                        <AlertTriangle size={18} color="#FFD60A" />
                      )}
                      <span style={{ flex: 1, color: '#D1D5DB', fontSize: '14px' }}>{feedback.message}</span>
                      <span style={{
                        fontSize: '12px',
                        fontWeight: 'bold',
                        color: feedback.score >= 80 ? '#39FF14' : '#FFD60A',
                      }}>
                        {feedback.score}점
                      </span>
                    </motion.div>
                  ))}
                </div>
              </StyleCard>

              {/* 가이드 완료 버튼 */}
              <button
                onClick={handleComplete}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '18px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
                  border: 'none',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(255, 107, 53, 0.4)',
                }}
              >
                <CheckCircle size={20} />
                가이드 완료
              </button>

              {/* 리셋 버튼 */}
              <button
                onClick={resetTracking}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '14px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                <RotateCcw size={18} />
                기록 초기화
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 하단 고정 버튼 - 가이드 모드에서만 표시 */}
      {viewMode === 'guide' && (
        <div style={{
          position: 'fixed',
          bottom: '64px',
          left: 0,
          right: 0,
          maxWidth: '425px',
          margin: '0 auto',
          padding: '16px',
          background: 'linear-gradient(to top, #0D0D12, #0D0D12, transparent)',
        }}>
          {currentStep === FORM_GUIDE_STEPS.length - 1 ? (
            <button
              onClick={() => setViewMode('tracking')}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '18px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
                border: 'none',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(255, 107, 53, 0.4)',
              }}
            >
              <Camera size={20} />
              AI 자세 분석 시작
            </button>
          ) : (
            <button
              onClick={handleNextStep}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '18px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
                border: 'none',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(255, 107, 53, 0.4)',
              }}
            >
              다음 단계로
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
