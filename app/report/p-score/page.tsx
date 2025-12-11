'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ModernCard,
  FeatureCard,
  PageHeader,
  PrimaryButton,
  Tag,
  ProgressBar,
} from '@/components/ui/ModernUI';
import { TrendingUp, Target, Zap, Award, Calendar } from 'lucide-react';
import { MOCK_PSCORE_REPORT } from '@/data/mock/reports';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function PScoreDetailPage() {
  const report = MOCK_PSCORE_REPORT;

  const chartData = Object.entries(report.categories).map(([key, value]) => {
    const labels: Record<string, string> = {
      strength: '근력',
      endurance: '지구력',
      flexibility: '유연성',
      balance: '균형',
      posture: '자세',
    };
    return {
      category: labels[key] || key,
      score: value,
    };
  });

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#39FF14'; // green
    if (score >= 70) return '#00D9FF'; // blue
    if (score >= 60) return '#FF6B35'; // orange
    return '#EF4444'; // red
  };

  const getProgressBarColor = (score: number): 'green' | 'blue' | 'orange' | 'pink' => {
    if (score >= 80) return 'green';
    if (score >= 70) return 'blue';
    if (score >= 60) return 'orange';
    return 'pink';
  };

  const getRankInfo = (rank: string) => {
    const info: Record<string, { color: string; label: string; description: string }> = {
      S: { color: '#7209B7', label: 'S등급', description: '최상위 1%' },
      'A+': { color: '#39FF14', label: 'A+ 등급', description: '상위 5%' },
      A: { color: '#00D9FF', label: 'A등급', description: '상위 15%' },
      'B+': { color: '#FF6B35', label: 'B+ 등급', description: '상위 30%' },
      B: { color: '#FFD60A', label: 'B등급', description: '상위 50%' },
      'C+': { color: '#9CA3AF', label: 'C+ 등급', description: '하위 30%' },
      C: { color: '#6B7280', label: 'C등급', description: '하위 20%' },
      D: { color: '#EF4444', label: 'D등급', description: '하위 10%' },
    };
    return info[rank] || info['B'];
  };

  const rankInfo = getRankInfo(report.rank);
  const progress = (report.goalProgress.current / report.goalProgress.goal) * 100;
  const daysLeft = Math.ceil(
    (new Date(report.goalProgress.deadline).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D12', paddingBottom: '100px' }}>
      <PageHeader title="P-Score" />

      <div style={{ padding: '16px', maxWidth: '672px', margin: '0 auto' }}>
        {/* Total Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '24px' }}
        >
          <FeatureCard>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#7209B7', marginBottom: '4px' }}>
                  종합 체력 점수
                </h2>
                <p style={{ fontSize: '14px', color: '#9CA3AF' }}>
                  {new Date(report.calculatedAt).toLocaleDateString('ko-KR')}
                </p>
              </div>
              <Tag color="blue">{rankInfo.label}</Tag>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <svg style={{ width: '192px', height: '192px', transform: 'rotate(-90deg)' }}>
                  <circle
                    cx="96"
                    cy="96"
                    r="84"
                    stroke="#252533"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="84"
                    stroke="url(#gradient)"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 84}`}
                    strokeDashoffset={`${2 * Math.PI * 84 * (1 - report.totalScore / 100)}`}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#7209B7" />
                      <stop offset="100%" stopColor="#FF006E" />
                    </linearGradient>
                  </defs>
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ fontSize: '48px', fontWeight: 'bold', background: 'linear-gradient(135deg, #7209B7, #FF006E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '4px' }}>
                    {report.totalScore}
                  </div>
                  <div style={{ fontSize: '14px', color: '#9CA3AF' }}>/ 100</div>
                </div>
              </div>

              <div style={{ marginTop: '16px' }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: rankInfo.color, marginBottom: '4px' }}>
                  {rankInfo.description}
                </div>
                {report.trend === 'increasing' && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', color: '#39FF14' }}>
                    <TrendingUp style={{ width: '16px', height: '16px' }} />
                    <span style={{ fontSize: '14px' }}>
                      +{report.totalScore - report.previousScore} 상승
                    </span>
                  </div>
                )}
              </div>
            </div>
          </FeatureCard>
        </motion.div>

        {/* Category Scores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ marginBottom: '24px' }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>항목별 점수</h3>
          <ModernCard>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#252533" />
                <XAxis dataKey="category" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1A1A24',
                    border: '1px solid #7209B7',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getScoreColor(entry.score)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ModernCard>
        </motion.div>

        {/* Detailed Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ marginBottom: '24px' }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>세부 분석</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {chartData.map((item, index) => (
              <motion.div
                key={item.category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
              >
                <ModernCard>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: '600', color: 'white' }}>{item.category}</span>
                    <span style={{ fontSize: '24px', fontWeight: 'bold', color: getScoreColor(item.score) }}>
                      {item.score}
                    </span>
                  </div>
                  <ProgressBar percentage={item.score} color={getProgressBarColor(item.score)} />
                </ModernCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Goal Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ marginBottom: '24px' }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Target style={{ width: '20px', height: '20px', color: '#00D9FF' }} />
            목표 진행률
          </h3>
          <FeatureCard>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h4 style={{ fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>목표 점수 달성</h4>
                <p style={{ fontSize: '14px', color: '#9CA3AF' }}>
                  {report.goalProgress.goal}점 달성까지
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <Tag color="orange">D-{daysLeft}</Tag>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px' }}>
                <span style={{ color: '#9CA3AF' }}>현재</span>
                <span style={{ fontWeight: 'bold', color: 'white' }}>
                  {report.goalProgress.current}점
                </span>
              </div>
              <div style={{ height: '12px', background: '#0D0D12', borderRadius: '9999px', overflow: 'hidden' }}>
                <motion.div
                  style={{ height: '100%', background: 'linear-gradient(135deg, #7209B7, #FF006E)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '14px', marginTop: '8px' }}>
                <span style={{ color: '#9CA3AF' }}>목표</span>
                <span style={{ fontWeight: 'bold', color: 'white' }}>
                  {report.goalProgress.goal}점
                </span>
              </div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', padding: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '14px', color: '#9CA3AF' }}>달성률</span>
                <span style={{ fontSize: '20px', fontWeight: 'bold', background: 'linear-gradient(135deg, #7209B7, #FF006E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
          </FeatureCard>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ marginBottom: '24px' }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap style={{ width: '20px', height: '20px', color: '#00D9FF' }} />
            AI 추천
          </h3>
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
                    <div style={{ width: '8px', height: '8px', background: '#7209B7', borderRadius: '50%', marginTop: '8px' }} />
                    <p style={{ fontSize: '14px', color: '#D1D5DB', flex: 1 }}>{rec}</p>
                  </div>
                </ModernCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{ marginBottom: '24px' }}
        >
          <FeatureCard>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Award style={{ width: '24px', height: '24px', color: '#FFD60A' }} />
              <div style={{ flex: 1 }}>
                <h4 style={{ fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>이번 달 성과</h4>
                <p style={{ fontSize: '14px', color: '#9CA3AF' }}>
                  지난달 대비 체력이 향상되었습니다
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', background: 'linear-gradient(135deg, #39FF14, #00D9FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '4px' }}>
                  +{report.totalScore - report.previousScore}
                </div>
                <div style={{ fontSize: '12px', color: '#9CA3AF' }}>점수 상승</div>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', background: 'linear-gradient(135deg, #FF6B35, #FFD60A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '4px' }}>
                  12회
                </div>
                <div style={{ fontSize: '12px', color: '#9CA3AF' }}>운동 완료</div>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', background: 'linear-gradient(135deg, #7209B7, #FF006E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '4px' }}>
                  1단계
                </div>
                <div style={{ fontSize: '12px', color: '#9CA3AF' }}>등급 상승</div>
              </div>
            </div>
          </FeatureCard>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <PrimaryButton
            fullWidth
            onClick={() => {}}
            icon={<Calendar size={20} />}
          >
            맞춤 운동 계획 받기
          </PrimaryButton>
        </motion.div>
      </div>
    </div>
  );
}
