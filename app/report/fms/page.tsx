'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ModernCard,
  FeatureCard,
  PageHeader,
  PrimaryButton,
  Tag,
  ProgressBar,
} from '@/components/ui/ModernUI';
import { AlertTriangle, CheckCircle2, Target } from 'lucide-react';
import { MOCK_FMS_REPORT } from '@/data/mock/reports';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

export default function FMSDetailPage() {
  const router = useRouter();
  const report = MOCK_FMS_REPORT;

  const chartData = Object.entries(report.scores).map(([key, value]) => {
    const labels: Record<string, string> = {
      deepSquat: '딥 스쿼트',
      hurdleStep: '허들 스텝',
      inlineLunge: '인라인 런지',
      shoulderMobility: '어깨 가동성',
      activeStraightLegRaise: '다리 들기',
      trunkStability: '몸통 안정성',
      rotaryStability: '회전 안정성',
    };
    return {
      category: labels[key] || key,
      score: value,
      fullMark: 3,
    };
  });

  const getScoreColor = (score: number) => {
    if (score === 3) return '#39FF14';
    if (score === 2) return '#FF6B35';
    return '#EF4444';
  };

  const getScoreBadge = (score: number) => {
    if (score === 3) return { tagColor: 'green' as const, label: '우수' };
    if (score === 2) return { tagColor: 'orange' as const, label: '보통' };
    return { tagColor: 'pink' as const, label: '개선 필요' };
  };

  const getTotalScoreStatus = (total: number) => {
    if (total >= 18) return { tagColor: 'green' as const, label: '우수', color: '#39FF14' };
    if (total >= 15) return { tagColor: 'orange' as const, label: '양호', color: '#FF6B35' };
    return { tagColor: 'pink' as const, label: '개선 필요', color: '#EF4444' };
  };

  const status = getTotalScoreStatus(report.totalScore);

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D12', paddingBottom: '100px' }}>
      <PageHeader title="FMS 평가" />

      <div style={{ padding: '16px', maxWidth: '672px', margin: '0 auto' }}>
        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ModernCard style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>
                  기능성 움직임 검사
                </h2>
                <p style={{ fontSize: '14px', color: '#9CA3AF' }}>
                  {new Date(report.measuredAt).toLocaleDateString('ko-KR')}
                </p>
              </div>
              <Tag color={status.tagColor}>{status.label}</Tag>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <div style={{ fontSize: '60px', fontWeight: 'bold', color: status.color, marginBottom: '8px' }}>
                {report.totalScore}
              </div>
              <div style={{ color: '#9CA3AF' }}>/ 21점</div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '14px', color: '#9CA3AF' }}>다음 검사 예정</span>
                <span style={{ fontWeight: '600', color: 'white' }}>
                  {new Date(report.nextTestDate).toLocaleDateString('ko-KR')}
                </span>
              </div>
            </div>
          </ModernCard>
        </motion.div>

        {/* Radar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ marginBottom: '24px' }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>종합 분석</h3>
          <ModernCard>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={chartData}>
                <PolarGrid stroke="#00D9FF" />
                <PolarAngleAxis
                  dataKey="category"
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                />
                <PolarRadiusAxis angle={90} domain={[0, 3]} tick={{ fill: '#9ca3af' }} />
                <Radar
                  name="점수"
                  dataKey="score"
                  stroke="#39FF14"
                  fill="#39FF14"
                  fillOpacity={0.5}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </ModernCard>
        </motion.div>

        {/* Detailed Scores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ marginBottom: '24px' }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>세부 항목</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Object.entries(report.scores).map(([key, value], index) => {
              const labels: Record<string, string> = {
                deepSquat: '딥 스쿼트',
                hurdleStep: '허들 스텝',
                inlineLunge: '인라인 런지',
                shoulderMobility: '어깨 가동성',
                activeStraightLegRaise: '다리 들기',
                trunkStability: '몸통 안정성',
                rotaryStability: '회전 안정성',
              };

              const descriptions: Record<string, string> = {
                deepSquat: '하체 유연성 및 균형',
                hurdleStep: '보행 패턴 및 안정성',
                inlineLunge: '회전 및 측면 안정성',
                shoulderMobility: '어깨 가동 범위',
                activeStraightLegRaise: '하체 유연성',
                trunkStability: '코어 근력',
                rotaryStability: '몸통 회전 안정성',
              };

              const badge = getScoreBadge(value);
              const gradientColor = value === 3 ? '#39FF14' : value === 2 ? '#FF6B35' : '#7209B7';

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <ModernCard>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>
                          {labels[key] || key}
                        </h4>
                        <p style={{ fontSize: '14px', color: '#9CA3AF' }}>
                          {descriptions[key] || ''}
                        </p>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '30px', fontWeight: 'bold', color: getScoreColor(value), marginBottom: '4px' }}>
                          {value}
                        </div>
                        <div style={{ fontSize: '12px', color: '#9CA3AF' }}>/ 3</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ flex: 1 }}>
                        <ProgressBar percentage={(value / 3) * 100} color={badge.tagColor} />
                      </div>
                      <Tag color={badge.tagColor}>
                        {badge.label}
                      </Tag>
                    </div>
                  </ModernCard>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Pain Flags */}
        {report.painFlags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ marginBottom: '24px' }}
          >
            <ModernCard>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <AlertTriangle style={{ width: '24px', height: '24px', color: '#FF6B35', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>통증 부위</h4>
                  <p style={{ fontSize: '14px', color: '#9CA3AF', marginBottom: '12px' }}>
                    다음 부위에서 통증이 감지되었습니다
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {report.painFlags.map((pain, index) => (
                      <Tag key={index} color="orange">
                        {pain}
                      </Tag>
                    ))}
                  </div>
                </div>
              </div>
            </ModernCard>
          </motion.div>
        )}

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ marginBottom: '24px' }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>개선 방안</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {report.recommendations.map((rec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
              >
                <ModernCard>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <CheckCircle2 style={{ width: '20px', height: '20px', color: '#39FF14', flexShrink: 0, marginTop: '2px' }} />
                    <p style={{ fontSize: '14px', color: '#D1D5DB' }}>{rec}</p>
                  </div>
                </ModernCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <FeatureCard>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Target style={{ width: '24px', height: '24px', color: '#00D9FF' }} />
              <div style={{ flex: 1 }}>
                <h4 style={{ fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>맞춤 운동 프로그램</h4>
                <p style={{ fontSize: '14px', color: '#9CA3AF' }}>
                  FMS 결과를 기반으로 한 개선 루틴
                </p>
              </div>
            </div>
            <PrimaryButton fullWidth onClick={() => router.push('/routine')}>
              루틴 시작하기
            </PrimaryButton>
          </FeatureCard>
        </motion.div>
      </div>
    </div>
  );
}
