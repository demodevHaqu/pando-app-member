'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
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

export default function FormGuidePage() {
  const router = useRouter();
  const params = useParams();
  const equipmentId = params.id as string;

  const equipment = MOCK_EQUIPMENT.find((e) => e.id === equipmentId);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  if (!equipment) {
    return (
      <div className="min-h-screen bg-cyber-dark flex items-center justify-center">
        <p className="text-white">기구 정보를 찾을 수 없습니다</p>
      </div>
    );
  }

  const step = FORM_GUIDE_STEPS[currentStep];

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNextStep = () => {
    if (currentStep < FORM_GUIDE_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleComplete = () => {
    alert('자세 가이드를 완료했습니다! 이제 운동을 시작해보세요.');
    router.back();
  };

  return (
    <div className="min-h-screen bg-cyber-dark pb-24">
      <Header title={`${equipment.name} 자세 가이드`} showBack={true} showNotification={false} />

      <div className="p-4 space-y-6">
        {/* 비디오 플레이어 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="relative aspect-video rounded-xl overflow-hidden bg-cyber-mid">
            <img src={step.videoUrl} alt={step.title} className="w-full h-full object-cover" />

            {/* 재생 컨트롤 오버레이 */}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <Button
                variant="energy"
                size="lg"
                className="rounded-full w-16 h-16"
                onClick={() => setIsPlaying(!isPlaying)}
                glow
              >
                {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
              </Button>
            </div>

            {/* 상단 컨트롤 */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 bg-black/50 rounded-full backdrop-blur-sm"
              >
                {isMuted ? (
                  <VolumeX size={20} className="text-white" />
                ) : (
                  <Volume2 size={20} className="text-white" />
                )}
              </button>
            </div>

            {/* 단계 표시 */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex gap-1">
                {FORM_GUIDE_STEPS.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1 flex-1 rounded-full transition-all ${
                      idx <= currentStep ? 'bg-electric-blue' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 단계 정보 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card variant="hologram">
            <div className="flex items-center justify-between mb-3">
              <Badge type="energy">
                STEP {currentStep + 1}/{FORM_GUIDE_STEPS.length}
              </Badge>
              <button onClick={() => setCurrentStep(0)} className="text-gray-400 hover:text-white">
                <RotateCcw size={20} />
              </button>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">{step.title}</h2>
            <p className="text-gray-300 mb-4">{step.description}</p>

            {/* 팁 */}
            <div className="space-y-2 mb-4">
              <h4 className="font-bold text-neon-green flex items-center gap-2">
                <CheckCircle size={16} />
                핵심 포인트
              </h4>
              {step.tips.map((tip, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-neon-green">•</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>

            {/* 주의사항 */}
            <div className="space-y-2">
              <h4 className="font-bold text-cyber-yellow flex items-center gap-2">
                <AlertTriangle size={16} />
                주의사항
              </h4>
              {step.warnings.map((warning, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-cyber-yellow">•</span>
                  <span>{warning}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* 단계 네비게이션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-3"
        >
          <Button
            variant="ghost"
            size="lg"
            className="flex-1"
            onClick={handlePrevStep}
            disabled={currentStep === 0}
          >
            <ChevronLeft size={20} className="mr-1" />
            이전
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="flex-1"
            onClick={handleNextStep}
            disabled={currentStep === FORM_GUIDE_STEPS.length - 1}
          >
            다음
            <ChevronRight size={20} className="ml-1" />
          </Button>
        </motion.div>

        {/* 안전 수칙 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <h3 className="font-bold text-white mb-4">안전 수칙</h3>
            <div className="grid grid-cols-2 gap-3">
              {SAFETY_TIPS.map((tip, idx) => (
                <div key={idx} className="p-3 glass-dark rounded-lg">
                  <div className="text-2xl mb-2">{tip.icon}</div>
                  <h4 className="font-bold text-white text-sm mb-1">{tip.title}</h4>
                  <p className="text-xs text-gray-400">{tip.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* 관련 근육 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card variant="glass">
            <h3 className="font-bold text-white mb-3">타겟 근육</h3>
            <div className="flex flex-wrap gap-2">
              {equipment.targetMuscles.map((muscle, idx) => (
                <Badge key={idx} type="premium">
                  {muscle}
                </Badge>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-16 left-0 right-0 max-w-[425px] mx-auto p-4 bg-gradient-to-t from-cyber-dark via-cyber-dark to-transparent">
        {currentStep === FORM_GUIDE_STEPS.length - 1 ? (
          <Button variant="energy" size="lg" className="w-full" onClick={handleComplete} glow shine>
            <CheckCircle size={20} className="mr-2" />
            가이드 완료
          </Button>
        ) : (
          <Button variant="energy" size="lg" className="w-full" onClick={handleNextStep} glow shine>
            다음 단계로
            <ChevronRight size={20} className="ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
