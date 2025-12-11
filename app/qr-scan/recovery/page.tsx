'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Clock, Target } from 'lucide-react';
import { MOCK_RECOVERY_ZONES, MOCK_RECOVERY_RECOMMENDATIONS } from '@/data/mock/recovery';
import {
  ModernCard,
  FeatureCard,
  PageHeader,
  Tag,
} from '@/components/ui/ModernUI';

export default function RecoveryPage() {
  const router = useRouter();

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D12', paddingBottom: '100px' }}>
      <PageHeader title="리커버리 존" />

      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* AI Recommendation */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FeatureCard>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
              <Sparkles size={28} color="#7209B7" />
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>
                  AI 추천 리커버리
                </h2>
                <p style={{ fontSize: '13px', color: '#6B7280' }}>
                  회원님의 운동 패턴을 분석했습니다
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {MOCK_RECOVERY_RECOMMENDATIONS.map((rec, index) => {
                const zone = MOCK_RECOVERY_ZONES.find((z) => z.id === rec.zoneId);
                return (
                  <motion.div
                    key={rec.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '14px',
                      padding: '16px',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                        <div style={{ fontSize: '28px' }}>{zone?.icon || '✨'}</div>
                        <div style={{ flex: 1 }}>
                          <h3 style={{ fontWeight: 'bold', color: 'white', marginBottom: '4px', fontSize: '15px' }}>
                            {rec.title}
                          </h3>
                          <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>
                            {rec.reason}
                          </p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Clock size={14} color="#39FF14" />
                            <span style={{ fontSize: '12px', color: '#39FF14' }}>
                              {rec.duration}분 권장
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </FeatureCard>
        </motion.section>

        {/* Recovery Zones */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: 'white' }}>리커버리 존 안내</h3>
            <Tag color="green">{MOCK_RECOVERY_ZONES.length}개 존</Tag>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {MOCK_RECOVERY_ZONES.map((zone, index) => (
              <motion.div
                key={zone.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                onClick={() => {
                  if (zone.id === 'sauna') {
                    router.push('/qr-scan/sauna');
                  }
                }}
                style={{ cursor: zone.id === 'sauna' ? 'pointer' : 'default' }}
              >
                <ModernCard style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      background: 'linear-gradient(135deg, #7209B7, #FF006E)',
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '26px',
                      flexShrink: 0,
                    }}>
                      {zone.icon}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <h3 style={{ fontWeight: 'bold', color: 'white', fontSize: '15px' }}>{zone.name}</h3>
                        {zone.temperature && (
                          <Tag color="orange" size="sm">{zone.temperature}°C</Tag>
                        )}
                      </div>

                      <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '10px' }}>
                        {zone.description}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                        <Clock size={14} color="#6B7280" />
                        <span style={{ fontSize: '12px', color: '#6B7280' }}>
                          권장 {zone.recommendedDuration}분 / 최대 {zone.maxDuration}분
                        </span>
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {zone.benefits.map((benefit, i) => (
                          <span
                            key={i}
                            style={{
                              padding: '4px 10px',
                              background: 'rgba(26, 26, 36, 0.9)',
                              borderRadius: '12px',
                              fontSize: '11px',
                              color: '#9CA3AF',
                            }}
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </ModernCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>
            이번 주 리커버리 통계
          </h3>
          <ModernCard style={{ padding: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', textAlign: 'center' }}>
              <div>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #39FF14, #00D9FF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '4px',
                }}>
                  4회
                </div>
                <div style={{ fontSize: '11px', color: '#6B7280' }}>총 이용</div>
              </div>
              <div>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '4px',
                }}>
                  68분
                </div>
                <div style={{ fontSize: '11px', color: '#6B7280' }}>총 시간</div>
              </div>
              <div>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #7209B7, #FF006E)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '4px',
                }}>
                  +15%
                </div>
                <div style={{ fontSize: '11px', color: '#6B7280' }}>회복 개선</div>
              </div>
            </div>
          </ModernCard>
        </motion.section>

        {/* Tips */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ModernCard style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <div style={{ fontSize: '28px' }}>💡</div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>회복 팁</h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <li style={{ fontSize: '13px', color: '#6B7280', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <TrendingUp size={16} color="#39FF14" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>운동 후 24-48시간 내 리커버리 존을 이용하세요</span>
                  </li>
                  <li style={{ fontSize: '13px', color: '#6B7280', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <Target size={16} color="#00D9FF" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>고강도 운동 후에는 사우나와 마사지를 추천합니다</span>
                  </li>
                  <li style={{ fontSize: '13px', color: '#6B7280', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <Sparkles size={16} color="#7209B7" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>정기적인 리커버리로 부상을 예방할 수 있습니다</span>
                  </li>
                </ul>
              </div>
            </div>
          </ModernCard>
        </motion.section>
      </div>
    </div>
  );
}
