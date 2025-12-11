'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity, Scale } from 'lucide-react';
import { MOCK_INBODY_REPORT } from '@/data/mock/reports';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  ModernCard,
  FeatureCard,
  PageHeader,
  Tag,
} from '@/components/ui/ModernUI';

export default function InBodyDetailPage() {
  const report = MOCK_INBODY_REPORT;

  const getStatus = (value: number, ideal: number, tolerance: number) => {
    if (value >= ideal - tolerance && value <= ideal + tolerance) return 'normal';
    if (value < ideal - tolerance) return 'low';
    return 'high';
  };

  const bmiStatus = getStatus(report.bmi, 22, 3);
  const bodyFatStatus = getStatus(report.bodyFatPercent, 18, 5);

  const chartData = report.history.map((h) => ({
    date: new Date(h.date).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' }),
    체중: h.weight,
    골격근량: h.muscleMass,
    체지방률: h.bodyFatPercent,
  }));

  const segments = [
    { name: '오른팔', muscle: report.segmentalAnalysis.rightArm.muscle, fat: report.segmentalAnalysis.rightArm.fat },
    { name: '왼팔', muscle: report.segmentalAnalysis.leftArm.muscle, fat: report.segmentalAnalysis.leftArm.fat },
    { name: '몸통', muscle: report.segmentalAnalysis.trunk.muscle, fat: report.segmentalAnalysis.trunk.fat },
    { name: '오른다리', muscle: report.segmentalAnalysis.rightLeg.muscle, fat: report.segmentalAnalysis.rightLeg.fat },
    { name: '왼다리', muscle: report.segmentalAnalysis.leftLeg.muscle, fat: report.segmentalAnalysis.leftLeg.fat },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D12', paddingBottom: '100px' }}>
      <PageHeader title="InBody 분석" />

      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Summary */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FeatureCard>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>
                  체성분 분석 결과
                </h2>
                <p style={{ fontSize: '13px', color: '#6B7280' }}>
                  {new Date(report.measuredAt).toLocaleDateString('ko-KR')}
                </p>
              </div>
              <Tag color="green">최신</Tag>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '14px',
                padding: '16px',
                textAlign: 'center',
              }}>
                <Scale size={24} color="#00D9FF" style={{ margin: '0 auto 8px' }} />
                <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '4px' }}>체중</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '2px' }}>
                  {report.weight}
                </div>
                <div style={{ fontSize: '11px', color: '#6B7280' }}>kg</div>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '14px',
                padding: '16px',
                textAlign: 'center',
              }}>
                <Activity size={24} color="#39FF14" style={{ margin: '0 auto 8px' }} />
                <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '4px' }}>골격근량</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '2px' }}>
                  {report.muscleMass}
                </div>
                <div style={{ fontSize: '11px', color: '#6B7280' }}>kg</div>
              </div>
            </div>
          </FeatureCard>
        </motion.section>

        {/* Key Metrics */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>주요 지표</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            <ModernCard style={{ padding: '16px' }}>
              <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '8px' }}>체지방률</div>
              <div style={{
                fontSize: '24px',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '8px',
              }}>
                {report.bodyFatPercent}%
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {bodyFatStatus === 'normal' ? (
                  <Tag color="green" size="sm">정상</Tag>
                ) : bodyFatStatus === 'low' ? (
                  <>
                    <TrendingDown size={14} color="#00D9FF" />
                    <span style={{ fontSize: '12px', color: '#00D9FF' }}>낮음</span>
                  </>
                ) : (
                  <>
                    <TrendingUp size={14} color="#FF6B35" />
                    <span style={{ fontSize: '12px', color: '#FF6B35' }}>높음</span>
                  </>
                )}
              </div>
            </ModernCard>

            <ModernCard style={{ padding: '16px' }}>
              <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '8px' }}>BMI</div>
              <div style={{
                fontSize: '24px',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #39FF14, #00D9FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '8px',
              }}>
                {report.bmi}
              </div>
              <Tag
                color={bmiStatus === 'normal' ? 'green' : bmiStatus === 'low' ? 'orange' : 'pink'}
                size="sm"
              >
                {bmiStatus === 'normal' ? '정상' : bmiStatus === 'low' ? '저체중' : '과체중'}
              </Tag>
            </ModernCard>

            <ModernCard style={{ padding: '16px' }}>
              <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '8px' }}>체지방량</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>
                {report.bodyFatMass}
              </div>
              <div style={{ fontSize: '11px', color: '#6B7280' }}>kg</div>
            </ModernCard>

            <ModernCard style={{ padding: '16px' }}>
              <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '8px' }}>기초대사량</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>
                {report.bmr}
              </div>
              <div style={{ fontSize: '11px', color: '#6B7280' }}>kcal</div>
            </ModernCard>

            <ModernCard style={{ padding: '16px' }}>
              <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '8px' }}>체수분</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>
                {report.bodyWater}
              </div>
              <div style={{ fontSize: '11px', color: '#6B7280' }}>L</div>
            </ModernCard>

            <ModernCard style={{ padding: '16px' }}>
              <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '8px' }}>내장지방레벨</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>
                {report.visceralFatLevel}
              </div>
              <div style={{ fontSize: '11px', color: '#6B7280' }}>
                {report.visceralFatLevel < 10 ? '정상' : '주의'}
              </div>
            </ModernCard>
          </div>
        </motion.section>

        {/* Trend Chart */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>추이 분석</h3>
          <ModernCard style={{ padding: '20px' }}>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2e3a" />
                <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1d29',
                    border: '1px solid #3b82f6',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="체중" stroke="#00D9FF" strokeWidth={2} dot={{ fill: '#00D9FF', r: 4 }} />
                <Line type="monotone" dataKey="골격근량" stroke="#39FF14" strokeWidth={2} dot={{ fill: '#39FF14', r: 4 }} />
                <Line type="monotone" dataKey="체지방률" stroke="#FF6B35" strokeWidth={2} dot={{ fill: '#FF6B35', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </ModernCard>
        </motion.section>

        {/* Segmental Analysis */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>부위별 분석</h3>
          <ModernCard style={{ padding: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {segments.map((segment, index) => {
                const total = segment.muscle + segment.fat;
                const musclePercent = (segment.muscle / total) * 100;
                return (
                  <div key={index} style={{
                    paddingBottom: index < segments.length - 1 ? '16px' : 0,
                    borderBottom: index < segments.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <span style={{ color: 'white', fontWeight: '600', fontSize: '14px' }}>{segment.name}</span>
                      <div style={{ display: 'flex', gap: '16px', fontSize: '13px' }}>
                        <span style={{ color: '#39FF14' }}>근육 {segment.muscle}kg</span>
                        <span style={{ color: '#FF6B35' }}>지방 {segment.fat}kg</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <div style={{ flex: 1, height: '6px', background: '#1A1A24', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${musclePercent}%`, background: 'linear-gradient(135deg, #39FF14, #00D9FF)' }} />
                      </div>
                      <div style={{ flex: 1, height: '6px', background: '#1A1A24', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${100 - musclePercent}%`, background: 'linear-gradient(135deg, #FF6B35, #FF006E)' }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ModernCard>
        </motion.section>

        {/* Recommendations */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>AI 추천</h3>
          <FeatureCard>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { color: '#39FF14', title: '근육량 증가', text: '주 3-4회 근력 운동과 단백질 섭취를 늘리세요' },
                { color: '#00D9FF', title: '체지방 감소', text: '유산소 운동을 주 2-3회 추가하세요' },
                { color: '#FF6B35', title: '수분 섭취', text: '하루 2L 이상의 물을 마시세요' },
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{ width: '8px', height: '8px', background: item.color, borderRadius: '50%', marginTop: '6px', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontWeight: 'bold', color: 'white', marginBottom: '4px', fontSize: '14px' }}>{item.title}</h4>
                    <p style={{ fontSize: '13px', color: '#6B7280' }}>{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </FeatureCard>
        </motion.section>
      </div>
    </div>
  );
}
