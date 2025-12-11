'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Droplets, Clock, ThermometerSun, AlertTriangle, CheckCircle2 } from 'lucide-react';
import {
  ModernCard,
  FeatureCard,
  PageHeader,
  PrimaryButton,
  SecondaryButton,
  Tag,
} from '@/components/ui/ModernUI';

export default function SaunaPage() {
  const router = useRouter();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const RECOMMENDED_DURATION = 15 * 60;
  const MAX_DURATION = 20 * 60;

  useEffect(() => {
    if (!isCheckedIn || !startTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000);
      setElapsedSeconds(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [isCheckedIn, startTime]);

  const handleCheckIn = () => {
    setIsCheckedIn(true);
    setStartTime(new Date());
    setElapsedSeconds(0);
  };

  const handleCheckOut = () => {
    setIsCheckedIn(false);
    setStartTime(null);
    setElapsedSeconds(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressColor = () => {
    if (elapsedSeconds > MAX_DURATION) return '#EF4444';
    if (elapsedSeconds > RECOMMENDED_DURATION) return '#FF6B35';
    return '#39FF14';
  };

  const getProgressPercentage = () => {
    return Math.min((elapsedSeconds / MAX_DURATION) * 100, 100);
  };

  const safetyTips = [
    '수분을 충분히 섭취하세요',
    '어지러움을 느끼면 즉시 나오세요',
    '심장 질환이 있다면 의사와 상담하세요',
    '사우나 전후로 샤워를 하세요',
  ];

  const benefits = [
    { icon: '💪', title: '근육 회복', description: '혈액순환 촉진' },
    { icon: '😌', title: '스트레스 해소', description: '긴장 완화' },
    { icon: '😴', title: '수면 개선', description: '깊은 수면 유도' },
    { icon: '🔥', title: '해독 작용', description: '노폐물 배출' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D12', paddingBottom: '100px' }}>
      <PageHeader title="사우나" />

      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Status Card */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FeatureCard>
            <div style={{ textAlign: 'center' }}>
              {!isCheckedIn ? (
                <>
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Droplets size={80} color="#FF6B35" style={{ margin: '0 auto 16px' }} />
                  </motion.div>
                  <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
                    사우나 체크인
                  </h2>
                  <p style={{ color: '#6B7280', marginBottom: '24px', fontSize: '14px' }}>
                    편안한 휴식과 회복의 시간을 가지세요
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '24px' }}>
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '14px',
                      padding: '16px',
                    }}>
                      <ThermometerSun size={24} color="#FF6B35" style={{ margin: '0 auto 8px' }} />
                      <div style={{ fontSize: '13px', color: '#6B7280' }}>온도</div>
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>80°C</div>
                    </div>
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '14px',
                      padding: '16px',
                    }}>
                      <Clock size={24} color="#39FF14" style={{ margin: '0 auto 8px' }} />
                      <div style={{ fontSize: '13px', color: '#6B7280' }}>권장 시간</div>
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>15분</div>
                    </div>
                  </div>

                  <PrimaryButton fullWidth size="lg" onClick={handleCheckIn}>
                    체크인 하기
                  </PrimaryButton>
                </>
              ) : (
                <>
                  <div style={{ position: 'relative', width: '180px', height: '180px', margin: '0 auto 24px' }}>
                    <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                      <circle
                        cx="90"
                        cy="90"
                        r="80"
                        stroke="rgba(255, 255, 255, 0.1)"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="90"
                        cy="90"
                        r="80"
                        stroke={getProgressColor()}
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 80}`}
                        strokeDashoffset={`${2 * Math.PI * 80 * (1 - getProgressPercentage() / 100)}`}
                        strokeLinecap="round"
                        style={{ transition: 'all 1s' }}
                      />
                    </svg>
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <div style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>
                        {formatTime(elapsedSeconds)}
                      </div>
                      <div style={{ fontSize: '13px', color: '#6B7280' }}>경과 시간</div>
                    </div>
                  </div>

                  {elapsedSeconds > MAX_DURATION && (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      style={{ marginBottom: '16px' }}
                    >
                      <Tag color="orange">
                        <AlertTriangle size={14} style={{ marginRight: '4px' }} />
                        최대 시간 초과!
                      </Tag>
                    </motion.div>
                  )}

                  {elapsedSeconds > RECOMMENDED_DURATION && elapsedSeconds <= MAX_DURATION && (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      style={{ marginBottom: '16px' }}
                    >
                      <Tag color="pink">권장 시간 초과</Tag>
                    </motion.div>
                  )}

                  <p style={{ color: '#6B7280', marginBottom: '24px', fontSize: '14px' }}>
                    {elapsedSeconds < RECOMMENDED_DURATION
                      ? `권장 시간까지 ${formatTime(RECOMMENDED_DURATION - elapsedSeconds)} 남음`
                      : '충분히 휴식하셨습니다'}
                  </p>

                  <PrimaryButton fullWidth size="lg" icon={<CheckCircle2 size={20} />} onClick={handleCheckOut}>
                    체크아웃 하기
                  </PrimaryButton>
                </>
              )}
            </div>
          </FeatureCard>
        </motion.section>

        {/* Benefits */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>사우나 효과</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <ModernCard style={{ padding: '16px' }}>
                  <div style={{ fontSize: '28px', marginBottom: '8px' }}>{benefit.icon}</div>
                  <h4 style={{ fontWeight: 'bold', color: 'white', marginBottom: '4px', fontSize: '14px' }}>
                    {benefit.title}
                  </h4>
                  <p style={{ fontSize: '12px', color: '#6B7280' }}>{benefit.description}</p>
                </ModernCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Safety Tips */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ModernCard style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <AlertTriangle size={20} color="#FF6B35" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>안전 수칙</h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {safetyTips.map((tip, index) => (
                    <li key={index} style={{ fontSize: '13px', color: '#6B7280', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <span style={{ color: '#39FF14', marginTop: '2px' }}>•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ModernCard>
        </motion.section>

        {/* History */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>이번 주 이용 기록</h3>
          <ModernCard style={{ padding: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { date: '2025-01-13', duration: 18, rating: 5 },
                { date: '2025-01-11', duration: 15, rating: 4 },
                { date: '2025-01-09', duration: 12, rating: 4 },
              ].map((record, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: index < 2 ? '12px' : 0,
                    borderBottom: index < 2 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                  }}
                >
                  <div>
                    <div style={{ color: 'white', fontWeight: '600', fontSize: '14px' }}>
                      {new Date(record.date).toLocaleDateString('ko-KR', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                    <div style={{ fontSize: '12px', color: '#6B7280' }}>{record.duration}분</div>
                  </div>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {Array.from({ length: record.rating }).map((_, i) => (
                      <span key={i} style={{ color: '#FFD60A' }}>★</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ModernCard>
        </motion.section>
      </div>
    </div>
  );
}
