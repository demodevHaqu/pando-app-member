'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { AlertCircle, Check, ArrowLeft, CheckCircle, Target, Heart, Sparkles } from 'lucide-react';
import {
  ModernCard,
  FeatureCard,
  PrimaryButton,
  SecondaryButton,
  ProgressBar,
} from '@/components/ui/ModernUI';

export default function HealthPage() {
  const router = useRouter();
  const [selectedPainAreas, setSelectedPainAreas] = useState<string[]>([]);
  const [painLevels, setPainLevels] = useState<Record<string, number>>({});
  const [bodyType, setBodyType] = useState<string | null>(null);
  const [injuries, setInjuries] = useState('');
  const [uncomfortableMovements, setUncomfortableMovements] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const painAreas = [
    { id: 'neck', label: '목', icon: '🦒' },
    { id: 'shoulder', label: '어깨', icon: '💪' },
    { id: 'back', label: '등', icon: '🔙' },
    { id: 'lower-back', label: '허리', icon: '⚡' },
    { id: 'hip', label: '골반/엉덩이', icon: '🦴' },
    { id: 'knee', label: '무릎', icon: '🦵' },
    { id: 'wrist', label: '손목', icon: '✋' },
    { id: 'ankle', label: '발목', icon: '🦶' },
  ];

  const bodyTypes = [
    { id: 'ectomorph', label: '마른 체형', icon: '📏', description: '근육량 증가 필요', color: '#00D9FF' },
    { id: 'mesomorph', label: '근육형', icon: '💪', description: '현재 좋은 상태', color: '#39FF14' },
    { id: 'endomorph', label: '통통한 체형', icon: '⭕', description: '체중 관리 필요', color: '#FF6B35' },
    { id: 'mixed', label: '혼합형', icon: '🔄', description: '균형 잡힌 관리', color: '#7209B7' },
  ];

  const movements = [
    { id: 'squat', label: '스쿼트 동작', icon: '🏋️' },
    { id: 'overhead', label: '머리 위로 들기', icon: '🙆' },
    { id: 'deadlift', label: '허리 숙이기', icon: '⬇️' },
    { id: 'twist', label: '몸통 회전', icon: '🔄' },
    { id: 'lunge', label: '런지 동작', icon: '🦵' },
    { id: 'pushup', label: '푸시업 동작', icon: '💪' },
  ];

  const togglePainArea = (areaId: string) => {
    setSelectedPainAreas((prev) => {
      if (prev.includes(areaId)) {
        const newLevels = { ...painLevels };
        delete newLevels[areaId];
        setPainLevels(newLevels);
        return prev.filter((id) => id !== areaId);
      } else {
        setPainLevels({ ...painLevels, [areaId]: 5 });
        return [...prev, areaId];
      }
    });
  };

  const toggleMovement = (movementId: string) => {
    setUncomfortableMovements((prev) =>
      prev.includes(movementId) ? prev.filter((id) => id !== movementId) : [...prev, movementId]
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Save to localStorage for complete page
    localStorage.setItem('onboarding_painAreas', JSON.stringify(selectedPainAreas));
    localStorage.setItem('onboarding_painLevels', JSON.stringify(painLevels));
    localStorage.setItem('onboarding_bodyType', bodyType || '');
    localStorage.setItem('onboarding_injuries', injuries);
    localStorage.setItem('onboarding_movements', JSON.stringify(uncomfortableMovements));
    await new Promise((resolve) => setTimeout(resolve, 800));
    router.push('/onboarding/complete');
  };

  const inputStyle = {
    width: '100%',
    padding: '16px 20px',
    borderRadius: '14px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: 'white',
    fontSize: '15px',
    outline: 'none',
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
          onClick={() => router.push('/onboarding/goals')}
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
          <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>건강 정보</h1>
          <p style={{ fontSize: '12px', color: '#6B7280' }}>온보딩 3단계</p>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle size={16} color="#39FF14" />
            <span style={{ fontSize: '11px', color: '#39FF14' }}>운동 목표</span>
          </div>
          <div style={{ width: '20px', height: '1px', background: 'rgba(255, 255, 255, 0.2)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 8px', background: 'rgba(255, 0, 110, 0.2)', borderRadius: '8px' }}>
            <Heart size={16} color="#FF006E" />
            <span style={{ fontSize: '11px', color: '#FF006E', fontWeight: 'bold' }}>건강 정보</span>
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
            <span>온보딩 Step 3/4</span>
            <span>75%</span>
          </div>
          <ProgressBar percentage={75} color="blue" height={4} />
        </motion.div>

        {/* Pain areas section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <FeatureCard>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>현재 통증 부위</h2>
            <p style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '20px' }}>통증이 있는 부위를 선택해주세요 (선택)</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '20px' }}>
              {painAreas.map((area) => {
                const isSelected = selectedPainAreas.includes(area.id);
                return (
                  <motion.button
                    key={area.id}
                    onClick={() => togglePainArea(area.id)}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '12px 8px',
                      borderRadius: '12px',
                      border: isSelected ? '2px solid #FF006E' : '1px solid rgba(255, 255, 255, 0.1)',
                      background: isSelected ? 'rgba(255, 0, 110, 0.15)' : 'rgba(26, 26, 36, 0.8)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: '20px', marginBottom: '4px' }}>{area.icon}</div>
                    <div style={{ fontSize: '11px', color: isSelected ? '#FF006E' : '#9CA3AF' }}>{area.label}</div>
                  </motion.button>
                );
              })}
            </div>

            {/* Pain level sliders for selected areas */}
            {selectedPainAreas.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p style={{ fontSize: '13px', color: '#9CA3AF' }}>통증 강도를 설정해주세요 (1~10)</p>
                {selectedPainAreas.map((areaId) => {
                  const area = painAreas.find((a) => a.id === areaId);
                  const level = painLevels[areaId] || 5;
                  return (
                    <div key={areaId} style={{
                      padding: '14px',
                      borderRadius: '12px',
                      background: 'rgba(255, 0, 110, 0.1)',
                      border: '1px solid rgba(255, 0, 110, 0.3)',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ fontSize: '14px', color: 'white' }}>{area?.icon} {area?.label}</span>
                        <span style={{
                          padding: '4px 10px',
                          borderRadius: '8px',
                          background: level >= 7 ? '#FF006E' : level >= 4 ? '#FFD60A' : '#39FF14',
                          color: level >= 4 && level < 7 ? '#0D0D12' : 'white',
                          fontSize: '13px',
                          fontWeight: 'bold',
                        }}>
                          {level}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={level}
                        onChange={(e) => setPainLevels({ ...painLevels, [areaId]: parseInt(e.target.value) })}
                        style={{
                          width: '100%',
                          accentColor: level >= 7 ? '#FF006E' : level >= 4 ? '#FFD60A' : '#39FF14',
                        }}
                      />
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#6B7280', marginTop: '4px' }}>
                        <span>약함</span>
                        <span>심함</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </FeatureCard>
        </motion.section>

        {/* Uncomfortable movements section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ModernCard style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>불편한 동작</h2>
            <p style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '20px' }}>수행하기 어려운 동작을 선택해주세요 (선택)</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {movements.map((movement) => {
                const isSelected = uncomfortableMovements.includes(movement.id);
                return (
                  <button
                    key={movement.id}
                    onClick={() => toggleMovement(movement.id)}
                    style={{
                      position: 'relative',
                      padding: '14px 8px',
                      borderRadius: '12px',
                      border: isSelected ? '2px solid #FFD60A' : '1px solid rgba(255, 255, 255, 0.1)',
                      background: isSelected ? 'rgba(255, 214, 10, 0.1)' : 'rgba(26, 26, 36, 0.8)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: '18px', marginBottom: '4px' }}>{movement.icon}</div>
                    <div style={{ fontSize: '11px', color: isSelected ? '#FFD60A' : '#9CA3AF' }}>{movement.label}</div>
                    {isSelected && (
                      <div style={{
                        position: 'absolute',
                        top: '6px',
                        right: '6px',
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        background: '#FFD60A',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <Check size={10} color="#0D0D12" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </ModernCard>
        </motion.section>

        {/* Body type section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ModernCard style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>현재 체형</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {bodyTypes.map((type) => {
                const isSelected = bodyType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => setBodyType(type.id)}
                    style={{
                      padding: '16px',
                      borderRadius: '14px',
                      border: isSelected ? `2px solid ${type.color}` : '1px solid rgba(255, 255, 255, 0.1)',
                      background: isSelected ? `${type.color}15` : 'rgba(26, 26, 36, 0.8)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: '28px', marginBottom: '8px' }}>{type.icon}</div>
                    <div style={{ fontWeight: '600', color: 'white', fontSize: '14px', marginBottom: '4px' }}>{type.label}</div>
                    <div style={{ fontSize: '11px', color: '#6B7280' }}>{type.description}</div>
                  </button>
                );
              })}
            </div>
          </ModernCard>
        </motion.section>

        {/* Injuries section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <ModernCard style={{ padding: '24px' }}>
            <label style={{ display: 'block', fontSize: '16px', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>
              과거 부상 또는 질환 (선택)
            </label>
            <p style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '16px' }}>
              운동 시 고려해야 할 부상 이력이나 질환을 입력해주세요
            </p>
            <textarea
              placeholder="예: 허리 디스크 (2022년), 무릎 관절염, 어깨 회전근개 파열 등"
              value={injuries}
              onChange={(e) => setInjuries(e.target.value)}
              rows={3}
              style={{
                ...inputStyle,
                resize: 'none',
                fontFamily: 'inherit',
              }}
            />
          </ModernCard>
        </motion.section>

        {/* Warning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            display: 'flex',
            gap: '12px',
            padding: '16px',
            borderRadius: '14px',
            background: 'rgba(255, 214, 10, 0.1)',
            border: '1px solid rgba(255, 214, 10, 0.3)',
          }}
        >
          <AlertCircle size={20} color="#FFD60A" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <p style={{ fontSize: '13px', color: '#E5E7EB', marginBottom: '4px' }}>
              제공하신 정보는 AI 맞춤 루틴 추천에 활용됩니다
            </p>
            <p style={{ fontSize: '12px', color: '#9CA3AF' }}>
              위험 동작 필터링 및 통증 관리에 반영됩니다
            </p>
          </div>
        </motion.div>

        {/* Submit buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{ display: 'flex', gap: '12px' }}
        >
          <SecondaryButton fullWidth size="lg" onClick={() => router.push('/onboarding/goals')}>
            뒤로
          </SecondaryButton>
          <PrimaryButton
            fullWidth
            size="lg"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? '저장 중...' : '완료'}
          </PrimaryButton>
        </motion.div>
      </div>
    </div>
  );
}
