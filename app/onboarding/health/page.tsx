'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import {
  ModernCard,
  FeatureCard,
  PageHeader,
  PrimaryButton,
  SecondaryButton,
  ProgressBar,
} from '@/components/ui/ModernUI';

export default function HealthPage() {
  const router = useRouter();
  const [selectedPainAreas, setSelectedPainAreas] = useState<string[]>([]);
  const [bodyType, setBodyType] = useState<string | null>(null);
  const [injuries, setInjuries] = useState('');
  const [loading, setLoading] = useState(false);

  const painAreas = [
    { id: 'neck', label: '목', top: '10%' },
    { id: 'shoulder', label: '어깨', top: '18%' },
    { id: 'back', label: '등', top: '30%' },
    { id: 'lower-back', label: '허리', top: '45%' },
    { id: 'hip', label: '엉덩이', top: '55%' },
    { id: 'knee', label: '무릎', top: '72%' },
    { id: 'ankle', label: '발목', top: '88%' },
  ];

  const bodyTypes = [
    { id: 'ectomorph', label: '마른 체형', icon: '📏', description: '근육량 증가 필요' },
    { id: 'mesomorph', label: '근육형', icon: '💪', description: '현재 좋은 상태' },
    { id: 'endomorph', label: '통통한 체형', icon: '⭕', description: '체중 관리 필요' },
  ];

  const togglePainArea = (areaId: string) => {
    setSelectedPainAreas((prev) =>
      prev.includes(areaId) ? prev.filter((id) => id !== areaId) : [...prev, areaId]
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
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
      <PageHeader title="건강 정보" />

      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Progress */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>
            <span>Step 3/3</span>
            <span>100%</span>
          </div>
          <ProgressBar percentage={100} color="green" height={4} />
        </motion.div>

        {/* Pain areas section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <FeatureCard>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>통증 부위</h2>
            <p style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '20px' }}>통증이 있는 부위를 선택해주세요 (선택)</p>

            {/* Body diagram */}
            <div style={{
              position: 'relative',
              width: '80px',
              height: '280px',
              margin: '0 auto 20px',
              background: 'linear-gradient(180deg, rgba(0, 217, 255, 0.1) 0%, rgba(114, 9, 183, 0.1) 100%)',
              borderRadius: '40px',
              border: '2px solid rgba(0, 217, 255, 0.3)',
            }}>
              {/* Body shape visualization */}
              <div style={{
                position: 'absolute',
                top: '5%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'rgba(0, 217, 255, 0.5)',
              }} />
              <div style={{
                position: 'absolute',
                top: '15%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '32px',
                height: '70px',
                background: 'rgba(0, 217, 255, 0.3)',
                borderRadius: '8px',
              }} />
              <div style={{
                position: 'absolute',
                top: '45%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '24px',
                height: '50px',
                background: 'rgba(0, 217, 255, 0.3)',
                borderRadius: '8px',
              }} />

              {/* Pain area buttons */}
              {painAreas.map((area) => {
                const isSelected = selectedPainAreas.includes(area.id);
                return (
                  <motion.button
                    key={area.id}
                    onClick={() => togglePainArea(area.id)}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: area.top,
                      transform: 'translateX(-50%)',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      background: isSelected ? '#FF006E' : 'rgba(255, 255, 255, 0.2)',
                      boxShadow: isSelected ? '0 0 15px rgba(255, 0, 110, 0.5)' : 'none',
                    }}
                    title={area.label}
                  />
                );
              })}
            </div>

            {/* Selected areas display */}
            {selectedPainAreas.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                {selectedPainAreas.map((areaId) => {
                  const area = painAreas.find((a) => a.id === areaId);
                  return (
                    <div
                      key={areaId}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '20px',
                        background: 'rgba(255, 0, 110, 0.2)',
                        color: '#FF006E',
                        fontSize: '13px',
                        border: '1px solid rgba(255, 0, 110, 0.5)',
                      }}
                    >
                      {area?.label}
                    </div>
                  );
                })}
              </div>
            )}
          </FeatureCard>
        </motion.section>

        {/* Body type section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ModernCard style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>현재 체형</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {bodyTypes.map((type) => {
                const isSelected = bodyType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => setBodyType(type.id)}
                    style={{
                      width: '100%',
                      padding: '16px',
                      borderRadius: '14px',
                      border: isSelected ? '2px solid #00D9FF' : '1px solid rgba(255, 255, 255, 0.1)',
                      background: isSelected ? 'rgba(0, 217, 255, 0.1)' : 'rgba(26, 26, 36, 0.8)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'left',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <span style={{ fontSize: '28px' }}>{type.icon}</span>
                      <div>
                        <div style={{ fontWeight: '600', color: 'white', fontSize: '15px' }}>{type.label}</div>
                        <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>{type.description}</div>
                      </div>
                    </div>
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
          transition={{ delay: 0.3 }}
        >
          <ModernCard style={{ padding: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', color: '#9CA3AF', marginBottom: '10px' }}>
              기존 부상 또는 질환 (선택)
            </label>
            <input
              type="text"
              placeholder="예: 허리 디스크, 무릎 관절염 등"
              value={injuries}
              onChange={(e) => setInjuries(e.target.value)}
              style={inputStyle}
            />
            <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '8px' }}>
              여러 개인 경우 쉼표로 구분해주세요
            </p>
          </ModernCard>
        </motion.section>

        {/* Warning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
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
          <p style={{ fontSize: '13px', color: '#E5E7EB' }}>
            제공하신 정보는 개인맞춤 운동 루틴 추천에만 사용됩니다
          </p>
        </motion.div>

        {/* Submit buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
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
            {loading ? '처리 중...' : '완료'}
          </PrimaryButton>
        </motion.div>
      </div>
    </div>
  );
}
