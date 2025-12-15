'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, Info, CheckCircle, Target, Heart, Sparkles, ArrowLeft } from 'lucide-react';
import {
  ModernCard,
  FeatureCard,
  PrimaryButton,
  SecondaryButton,
  ProgressBar,
} from '@/components/ui/ModernUI';

export default function GoalsPage() {
  const router = useRouter();
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedPrefs, setSelectedPrefs] = useState<string[]>([]);
  const [exerciseFrequency, setExerciseFrequency] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const goals = [
    { id: 'weight-loss', label: '체중 감량', icon: '⬇️', description: '체지방 감소' },
    { id: 'muscle-gain', label: '근비대', icon: '💪', description: '근육량 증가' },
    { id: 'body-correction', label: '체형교정', icon: '🧍', description: '자세 개선' },
    { id: 'pain-relief', label: '통증 완화', icon: '🩹', description: '만성 통증 개선' },
    { id: 'strength', label: '근력 증강', icon: '🏋️', description: '힘 키우기' },
    { id: 'endurance', label: '체력 향상', icon: '🏃', description: '지구력 강화' },
    { id: 'flexibility', label: '유연성 증대', icon: '🧘', description: '관절 가동성' },
    { id: 'wellness', label: '전반적 건강', icon: '❤️', description: '건강 유지' },
  ];

  const preferences = [
    { id: 'coaching', label: '트레이너 코칭 선호', icon: '👨‍🏫', description: '전문가 지도 원함' },
    { id: 'group', label: '그룹 수업 참여', icon: '👥', description: 'GX/그룹 운동' },
    { id: 'independent', label: '혼자 조용히 운동', icon: '🎯', description: '독립적 운동 선호' },
    { id: 'energetic', label: '활기찬 분위기', icon: '🎉', description: '에너지 넘치는 환경' },
    { id: 'calm', label: '차분한 분위기', icon: '🧘‍♀️', description: '조용한 환경 선호' },
    { id: 'variety', label: '다양한 프로그램', icon: '🎲', description: '여러 운동 시도' },
  ];

  const frequencies = [
    { id: 'freq-2', label: '주 1-2회', icon: '📆', description: '가볍게 시작' },
    { id: 'freq-4', label: '주 3-4회', icon: '📅', description: '규칙적 운동' },
    { id: 'freq-6', label: '주 5-6회', icon: '🔥', description: '집중 훈련' },
    { id: 'freq-7', label: '매일', icon: '⚡', description: '하드코어' },
  ];

  const toggleGoal = (goalId: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goalId) ? prev.filter((id) => id !== goalId) : [...prev, goalId]
    );
  };

  const togglePref = (prefId: string) => {
    setSelectedPrefs((prev) =>
      prev.includes(prefId) ? prev.filter((id) => id !== prefId) : [...prev, prefId]
    );
  };

  const handleSubmit = async () => {
    if (selectedGoals.length === 0) return;
    setLoading(true);
    // Save to localStorage for complete page
    localStorage.setItem('onboarding_goals', JSON.stringify(selectedGoals));
    localStorage.setItem('onboarding_prefs', JSON.stringify(selectedPrefs));
    localStorage.setItem('onboarding_frequency', exerciseFrequency || 'freq-4');
    await new Promise((resolve) => setTimeout(resolve, 800));
    router.push('/onboarding/health');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D12', paddingBottom: '100px' }}>
      {/* Custom Header */}
      <div style={{
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      }}>
        <button
          onClick={() => router.push('/onboarding')}
          style={{
            background: 'none',
            border: 'none',
            padding: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ArrowLeft size={24} color="#9CA3AF" />
        </button>
        <div>
          <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>운동 목표 설정</h1>
          <p style={{ fontSize: '12px', color: '#6B7280' }}>온보딩 2단계</p>
        </div>
      </div>

      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Onboarding Flow Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle size={16} color="#39FF14" />
            <span style={{ fontSize: '11px', color: '#39FF14' }}>계정 생성</span>
          </div>
          <div style={{ width: '20px', height: '1px', background: 'rgba(255, 255, 255, 0.2)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 8px', background: 'rgba(0, 217, 255, 0.2)', borderRadius: '8px' }}>
            <Target size={16} color="#00D9FF" />
            <span style={{ fontSize: '11px', color: '#00D9FF', fontWeight: 'bold' }}>운동 목표</span>
          </div>
          <div style={{ width: '20px', height: '1px', background: 'rgba(255, 255, 255, 0.2)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Heart size={16} color="#6B7280" />
            <span style={{ fontSize: '11px', color: '#6B7280' }}>건강 정보</span>
          </div>
          <div style={{ width: '20px', height: '1px', background: 'rgba(255, 255, 255, 0.2)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Sparkles size={16} color="#6B7280" />
            <span style={{ fontSize: '11px', color: '#6B7280' }}>완료</span>
          </div>
        </motion.div>

        {/* Progress */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>
            <span>온보딩 Step 2/4</span>
            <span>50%</span>
          </div>
          <ProgressBar percentage={50} color="blue" height={4} />
        </motion.div>

        {/* Goals section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <FeatureCard>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>운동 목표</h2>
              <span style={{
                padding: '2px 8px',
                borderRadius: '10px',
                background: 'rgba(255, 0, 110, 0.2)',
                color: '#FF006E',
                fontSize: '11px',
                fontWeight: 'bold',
              }}>필수</span>
            </div>
            <p style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '20px' }}>하나 이상 선택해주세요 (복수 선택 가능)</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {goals.map((goal, idx) => {
                const isSelected = selectedGoals.includes(goal.id);
                return (
                  <motion.button
                    key={goal.id}
                    onClick={() => toggleGoal(goal.id)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    style={{
                      position: 'relative',
                      padding: '16px 12px',
                      borderRadius: '14px',
                      border: isSelected ? '2px solid #00D9FF' : '1px solid rgba(255, 255, 255, 0.1)',
                      background: isSelected ? 'rgba(0, 217, 255, 0.1)' : 'rgba(26, 26, 36, 0.8)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: isSelected ? '0 0 20px rgba(0, 217, 255, 0.3)' : 'none',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: '28px', marginBottom: '6px' }}>{goal.icon}</div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: 'white', marginBottom: '2px' }}>{goal.label}</div>
                    <div style={{ fontSize: '11px', color: '#6B7280' }}>{goal.description}</div>
                    {isSelected && (
                      <div style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: '#00D9FF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <Check size={12} color="#0D0D12" />
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </FeatureCard>
        </motion.section>

        {/* Exercise frequency section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ModernCard style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>운동 빈도</h2>
            <p style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '20px' }}>주당 운동 횟수를 선택해주세요</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {frequencies.map((freq, idx) => {
                const isSelected = exerciseFrequency === freq.id;
                return (
                  <motion.button
                    key={freq.id}
                    onClick={() => setExerciseFrequency(freq.id)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    style={{
                      padding: '14px',
                      borderRadius: '12px',
                      border: isSelected ? '2px solid #39FF14' : '1px solid rgba(255, 255, 255, 0.1)',
                      background: isSelected ? 'rgba(57, 255, 20, 0.1)' : 'rgba(26, 26, 36, 0.8)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: '20px', marginBottom: '4px' }}>{freq.icon}</div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: 'white' }}>{freq.label}</div>
                    <div style={{ fontSize: '11px', color: '#6B7280' }}>{freq.description}</div>
                  </motion.button>
                );
              })}
            </div>
          </ModernCard>
        </motion.section>

        {/* Preferences section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ModernCard style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>운동 성향 (선택)</h2>
            <p style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '20px' }}>개인화된 추천을 위해 선택해주세요</p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {preferences.map((pref, idx) => {
                const isSelected = selectedPrefs.includes(pref.id);
                return (
                  <motion.button
                    key={pref.id}
                    onClick={() => togglePref(pref.id)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 16px',
                      borderRadius: '20px',
                      border: isSelected ? '1px solid #7209B7' : '1px solid rgba(255, 255, 255, 0.2)',
                      background: isSelected ? 'rgba(114, 9, 183, 0.15)' : 'transparent',
                      color: 'white',
                      fontSize: '13px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    <span>{pref.icon}</span>
                    {pref.label}
                  </motion.button>
                );
              })}
            </div>
          </ModernCard>
        </motion.section>

        {/* Info note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            display: 'flex',
            gap: '12px',
            padding: '14px 16px',
            borderRadius: '12px',
            background: 'rgba(0, 217, 255, 0.1)',
            border: '1px solid rgba(0, 217, 255, 0.3)',
          }}
        >
          <Info size={18} color="#00D9FF" style={{ flexShrink: 0, marginTop: '2px' }} />
          <p style={{ fontSize: '13px', color: '#D1D5DB', lineHeight: 1.5 }}>
            선택하신 목표와 성향을 바탕으로 AI가 맞춤 루틴을 생성합니다
          </p>
        </motion.div>

        {/* Submit buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{ display: 'flex', gap: '12px' }}
        >
          <SecondaryButton fullWidth size="lg" onClick={() => router.push('/onboarding')}>
            뒤로
          </SecondaryButton>
          <PrimaryButton
            fullWidth
            size="lg"
            onClick={handleSubmit}
            disabled={selectedGoals.length === 0 || loading}
          >
            {loading ? '저장 중...' : '다음'}
          </PrimaryButton>
        </motion.div>
      </div>
    </div>
  );
}
