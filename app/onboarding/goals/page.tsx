'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import {
  ModernCard,
  FeatureCard,
  PageHeader,
  PrimaryButton,
  SecondaryButton,
  ProgressBar,
} from '@/components/ui/ModernUI';

export default function GoalsPage() {
  const router = useRouter();
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedPrefs, setSelectedPrefs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const goals = [
    { id: 'weight-loss', label: '체중 감량', icon: '⬇️' },
    { id: 'muscle-gain', label: '근비대', icon: '💪' },
    { id: 'strength', label: '근력 증강', icon: '🏋️' },
    { id: 'endurance', label: '체력 향상', icon: '🏃' },
    { id: 'flexibility', label: '유연성 증대', icon: '🧘' },
    { id: 'wellness', label: '전반적 건강', icon: '❤️' },
  ];

  const preferences = [
    { id: 'coaching', label: '트레이너 코칭 선호', icon: '👨‍🏫' },
    { id: 'group', label: '그룹 수업 참여', icon: '👥' },
    { id: 'independent', label: '독립적 운동', icon: '🎯' },
    { id: 'energetic', label: '활기찬 분위기', icon: '🎉' },
    { id: 'calm', label: '차분한 분위기', icon: '🧘‍♀️' },
    { id: 'variety', label: '다양한 프로그램', icon: '🎲' },
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
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push('/onboarding/health');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D12', paddingBottom: '100px' }}>
      <PageHeader title="운동 목표 설정" />

      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Progress */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>
            <span>Step 2/3</span>
            <span>66%</span>
          </div>
          <ProgressBar percentage={66} color="blue" height={4} />
        </motion.div>

        {/* Goals section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <FeatureCard>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>운동 목표</h2>
            <p style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '20px' }}>하나 이상 선택해주세요</p>

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
                      padding: '16px',
                      borderRadius: '14px',
                      border: isSelected ? '2px solid #00D9FF' : '1px solid rgba(255, 255, 255, 0.1)',
                      background: isSelected ? 'rgba(0, 217, 255, 0.1)' : 'rgba(26, 26, 36, 0.8)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: isSelected ? '0 0 20px rgba(0, 217, 255, 0.3)' : 'none',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: '28px', marginBottom: '8px' }}>{goal.icon}</div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: 'white' }}>{goal.label}</div>
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

        {/* Preferences section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ModernCard style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>선호도 (선택)</h2>
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
                      border: isSelected ? '1px solid #00D9FF' : '1px solid rgba(255, 255, 255, 0.2)',
                      background: isSelected ? 'rgba(0, 217, 255, 0.1)' : 'transparent',
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

        {/* Submit buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ display: 'flex', gap: '12px' }}
        >
          <SecondaryButton fullWidth size="lg" onClick={() => router.push('/onboarding')}>
            건너뛰기
          </SecondaryButton>
          <PrimaryButton
            fullWidth
            size="lg"
            onClick={handleSubmit}
            disabled={selectedGoals.length === 0 || loading}
          >
            {loading ? '처리 중...' : '다음'}
          </PrimaryButton>
        </motion.div>
      </div>
    </div>
  );
}
