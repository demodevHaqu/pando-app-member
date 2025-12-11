🎯 PHASE 7: AI 진단 리포트Task 7.1: 타입 정의 및 Mock 데이터파일: types/report.tstypescriptexport interface InBodyReport {
  id: string;
  memberId: string;
  date: string;
  weight: number;
  bodyFatPercentage: number;
  muscleMass: number;
  bmr: number;
  visceralFatLevel: number;
  bodyWater: number;
  protein: number;
  mineral: number;
  segmentalAnalysis: {
    rightArm: number;
    leftArm: number;
    trunk: number;
    rightLeg: number;
    leftLeg: number;
  };
}

export interface FMSReport {
  id: string;
  memberId: string;
  date: string;
  totalScore: number;
  scores: {
    deepSquat: number;
    hurdleStep: number;
    inlineLunge: number;
    shoulderMobility: number;
    activeStraightLeg: number;
    trunkStability: number;
    rotaryStability: number;
  };
  issues: string[];
  recommendations: string[];
}

export interface PScore {
  id: string;
  memberId: string;
  date: string;
  score: number; // 0-100
  factors: {
    painLevel: number;
    fitnessGoals: number;
    currentFitness: number;
    injuryHistory: number;
    motivation: number;
  };
  recommendedPackage: 'intensive' | 'balanced' | 'light';
  reasoning: string;
}파일: data/mock/reports.tstypescriptimport { InBodyReport, FMSReport, PScore } from '@/types/report';

export const MOCK_INBODY_REPORTS: InBodyReport[] = [
  {
    id: 'inbody1',
    memberId: 'member1',
    date: '2025-01-15',
    weight: 75.5,
    bodyFatPercentage: 18.5,
    muscleMass: 58.2,
    bmr: 1680,
    visceralFatLevel: 8,
    bodyWater: 45.2,
    protein: 12.8,
    mineral: 4.2,
    segmentalAnalysis: {
      rightArm: 3.2,
      leftArm: 3.1,
      trunk: 28.5,
      rightLeg: 11.2,
      leftLeg: 11.2,
    },
  },
  {
    id: 'inbody2',
    memberId: 'member1',
    date: '2024-12-15',
    weight: 77.2,
    bodyFatPercentage: 20.1,
    muscleMass: 56.8,
    bmr: 1650,
    visceralFatLevel: 9,
    bodyWater: 44.1,
    protein: 12.3,
    mineral: 4.1,
    segmentalAnalysis: {
      rightArm: 3.0,
      leftArm: 2.9,
      trunk: 27.8,
      rightLeg: 10.9,
      leftLeg: 11.0,
    },
  },
  {
    id: 'inbody3',
    memberId: 'member1',
    date: '2024-11-15',
    weight: 78.5,
    bodyFatPercentage: 21.5,
    muscleMass: 55.5,
    bmr: 1630,
    visceralFatLevel: 10,
    bodyWater: 43.5,
    protein: 12.0,
    mineral: 4.0,
    segmentalAnalysis: {
      rightArm: 2.9,
      leftArm: 2.8,
      trunk: 27.2,
      rightLeg: 10.8,
      leftLeg: 10.8,
    },
  },
];

export const MOCK_FMS_REPORT: FMSReport = {
  id: 'fms1',
  memberId: 'member1',
  date: '2025-01-10',
  totalScore: 14,
  scores: {
    deepSquat: 2,
    hurdleStep: 2,
    inlineLunge: 2,
    shoulderMobility: 2,
    activeStraightLeg: 2,
    trunkStability: 2,
    rotaryStability: 2,
  },
  issues: ['좌우 어깨 가동성 불균형', '고관절 유연성 제한'],
  recommendations: [
    '어깨 가동성 스트레칭 (매일 10분)',
    '고관절 유연성 운동 추가',
    '코어 안정성 강화 운동',
  ],
};

export const MOCK_P_SCORE: PScore = {
  id: 'pscore1',
  memberId: 'member1',
  date: '2025-01-15',
  score: 72,
  factors: {
    painLevel: 65,
    fitnessGoals: 85,
    currentFitness: 60,
    injuryHistory: 70,
    motivation: 90,
  },
  recommendedPackage: 'balanced',
  reasoning:
    '회원님의 운동 목표가 명확하고 동기부여가 높지만, 현재 허리와 무릎에 통증이 있어 전문적인 가이드가 필요합니다. 주 2회 PT로 안전한 운동 습관을 만들어보세요.',
};Task 7.2: 리포트 메인 화면파일: app/report/page.tsxtypescript'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Tabs from '@/components/ui/Tabs';
import { TrendingUp, TrendingDown, Activity, Target, AlertCircle, ChevronRight } from 'lucide-react';
import { MOCK_INBODY_REPORTS, MOCK_FMS_REPORT, MOCK_P_SCORE } from '@/data/mock/reports';

export default function ReportMainPage() {
  const router = useRouter();

  const latestInBody = MOCK_INBODY_REPORTS[0];
  const previousInBody = MOCK_INBODY_REPORTS[1];

  const weightChange = latestInBody.weight - previousInBody.weight;
  const bodyFatChange = latestInBody.bodyFatPercentage - previousInBody.bodyFatPercentage;
  const muscleChange = latestInBody.muscleMass - previousInBody.muscleMass;

  const reportCards = [
    {
      id: 'inbody',
      title: 'InBody 체성분',
      icon: Activity,
      color: 'energy',
      path: '/report/inbody',
      date: latestInBody.date,
      summary: (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">체중</span>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold">{latestInBody.weight}kg</span>
              {weightChange !== 0 && (
                <span
                  className={`text-xs flex items-center gap-1 ${
                    weightChange > 0 ? 'text-power-pink' : 'text-neon-green'
                  }`}
                >
                  {weightChange > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {Math.abs(weightChange).toFixed(1)}kg
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">체지방률</span>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold">{latestInBody.bodyFatPercentage}%</span>
              {bodyFatChange !== 0 && (
                <span
                  className={`text-xs flex items-center gap-1 ${
                    bodyFatChange > 0 ? 'text-power-pink' : 'text-neon-green'
                  }`}
                >
                  {bodyFatChange > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {Math.abs(bodyFatChange).toFixed(1)}%
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">골격근량</span>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold">{latestInBody.muscleMass}kg</span>
              {muscleChange !== 0 && (
                <span
                  className={`text-xs flex items-center gap-1 ${
                    muscleChange > 0 ? 'text-neon-green' : 'text-power-pink'
                  }`}
                >
                  {muscleChange > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {Math.abs(muscleChange).toFixed(1)}kg
                </span>
              )}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'fms',
      title: 'FMS 체형 분석',
      icon: Target,
      color: 'growth',
      path: '/report/fms',
      date: MOCK_FMS_REPORT.date,
      summary: (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">종합 점수</span>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold">{MOCK_FMS_REPORT.totalScore}/21</span>
              <Badge type="growth">양호</Badge>
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xs text-gray-400 mb-2">주요 이슈</div>
            {MOCK_FMS_REPORT.issues.slice(0, 2).map((issue, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm text-gray-300 mb-1">
                <AlertCircle size={14} className="text-cyber-yellow flex-shrink-0 mt-0.5" />
                {issue}
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'pscore',
      title: 'PT 필요도 (P-Score)',
      icon: TrendingUp,
      color: 'premium',
      path: '/report/p-score',
      date: MOCK_P_SCORE.date,
      summary: (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">PT 필요도</span>
            <div className="text-3xl font-bold text-gradient-premium">{MOCK_P_SCORE.score}</div>
          </div>
          <div className="text-sm text-gray-300">
            {MOCK_P_SCORE.reasoning.slice(0, 80)}...
          </div>
          <Badge type="premium">
            추천: {MOCK_P_SCORE.recommendedPackage === 'balanced' ? '균형형' : '집중형'}
          </Badge>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-cyber-dark">
      <Header title="AI 진단 리포트" showBack={false} showNotification={true} />

      <div className="p-4 space-y-6">
        {/* 리포트 카드들 */}
        {reportCards.map((report, idx) => {
          const Icon = report.icon;
          return (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card variant="hologram" glow onClick={() => router.push(report.path)}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 bg-gradient-${report.color} rounded-full flex items-center justify-center`}
                    >
                      <Icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{report.title}</h3>
                      <p className="text-sm text-gray-400">
                        최근 측정: {new Date(report.date).toLocaleDateString('ko-KR')}
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-500" />
                </div>

                {report.summary}
              </Card>
            </motion.div>
          );
        })}

        {/* 측정 안내 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card variant="glass">
            <div className="flex gap-3">
              <AlertCircle size={24} className="text-electric-blue flex-shrink-0" />
              <div>
                <div className="font-bold text-white mb-1">정기 측정 안내</div>
                <p className="text-sm text-gray-400">
                  정확한 변화 추적을 위해 월 1회 측정을 권장합니다.
                  <br />
                  측정 문의: 프론트 데스크
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}Task 7.3: InBody 리포트 상세파일: app/report/inbody/page.tsxtypescript'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Tabs from '@/components/ui/Tabs';
import { TrendingUp, TrendingDown, Activity, Droplets, Zap } from 'lucide-react';
import { MOCK_INBODY_REPORTS } from '@/data/mock/reports';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function InBodyReportPage() {
  const router = useRouter();

  const latestReport = MOCK_INBODY_REPORTS[0];
  const previousReport = MOCK_INBODY_REPORTS[1];

  // 3개월 추이 데이터
  const trendData = MOCK_INBODY_REPORTS.slice()
    .reverse()
    .map((report) => ({
      date: new Date(report.date).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' }),
      weight: report.weight,
      bodyFat: report.bodyFatPercentage,
      muscle: report.muscleMass,
    }));

  const weightChange = latestReport.weight - previousReport.weight;
  const bodyFatChange = latestReport.bodyFatPercentage - previousReport.bodyFatPercentage;
  const muscleChange = latestReport.muscleMass - previousReport.muscleMass;

  const getChangeColor = (value: number, isGood: 'higher' | 'lower') => {
    if (value === 0) return 'text-gray-400';
    if (isGood === 'higher') {
      return value > 0 ? 'text-neon-green' : 'text-power-pink';
    } else {
      return value < 0 ? 'text-neon-green' : 'text-power-pink';
    }
  };

  // 부위별 근육 데이터
  const segmentalData = [
    { part: '오른팔', value: latestReport.segmentalAnalysis.rightArm, max: 5 },
    { part: '왼팔', value: latestReport.segmentalAnalysis.leftArm, max: 5 },
    { part: '몸통', value: latestReport.segmentalAnalysis.trunk, max: 35 },
    { part: '오른다리', value: latestReport.segmentalAnalysis.rightLeg, max: 15 },
    { part: '왼다리', value: latestReport.segmentalAnalysis.leftLeg, max: 15 },
  ];

  const tabContent = [
    {
      id: 'overview',
      label: '체성분 분석',
      content: (
        <div className="space-y-4">
          {/* 주요 지표 */}
          <Card>
            <h4 className="font-bold text-white mb-4">주요 지표</h4>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">체중</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-white">{latestReport.weight}kg</span>
                    {weightChange !== 0 && (
                      <span className={`text-sm flex items-center gap-1 ${getChangeColor(weightChange, 'lower')}`}>
                        {weightChange > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        {Math.abs(weightChange).toFixed(1)}kg
                      </span>
                    )}
                  </div>
                </div>
                <div className="h-2 bg-cyber-mid rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-energy transition-all duration-500"
                    style={{ width: `${(latestReport.weight / 100) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">체지방률</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-white">{latestReport.bodyFatPercentage}%</span>
                    {bodyFatChange !== 0 && (
                      <span className={`text-sm flex items-center gap-1 ${getChangeColor(bodyFatChange, 'lower')}`}>
                        {bodyFatChange > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        {Math.abs(bodyFatChange).toFixed(1)}%
                      </span>
                    )}
                  </div>
                </div>
                <div className="h-2 bg-cyber-mid rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-energy-orange to-power-pink transition-all duration-500"
                    style={{ width: `${latestReport.bodyFatPercentage * 4}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">골격근량</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-white">{latestReport.muscleMass}kg</span>
                    {muscleChange !== 0 && (
                      <span className={`text-sm flex items-center gap-1 ${getChangeColor(muscleChange, 'higher')}`}>
                        {muscleChange > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        {Math.abs(muscleChange).toFixed(1)}kg
                      </span>
                    )}
                  </div>
                </div>
                <div className="h-2 bg-cyber-mid rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-growth transition-all duration-500"
                    style={{ width: `${(latestReport.muscleMass / 80) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* 추가 지표 */}
          <Card>
            <h4 className="font-bold text-white mb-4">상세 분석</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 glass-dark rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Zap size={16} className="text-energy-orange" />
                  <span className="text-xs text-gray-400">기초대사량</span>
                </div>
                <div className="text-xl font-bold text-white">{latestReport.bmr}</div>
                <div className="text-xs text-gray-500">kcal/day</div>
              </div>

              <div className="p-3 glass-dark rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Activity size={16} className="text-power-pink" />
                  <span className="text-xs text-gray-400">내장지방</span>
                </div>
                <div className="text-xl font-bold text-white">{latestReport.visceralFatLevel}</div>
                <div className="text-xs text-gray-500">Level</div>
              </div>

              <div className="p-3 glass-dark rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets size={16} className="text-electric-blue" />
                  <span className="text-xs text-gray-400">체수분</span>
                </div>
                <div className="text-xl font-bold text-white">{latestReport.bodyWater}</div>
                <div className="text-xs text-gray-500">L</div>
              </div>

              <div className="p-3 glass-dark rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Activity size={16} className="text-neon-green" />
                  <span className="text-xs text-gray-400">단백질</span>
                </div>
                <div className="text-xl font-bold text-white">{latestReport.protein}</div>
                <div className="text-xs text-gray-500">kg</div>
              </div>
            </div>
          </Card>
        </div>
      ),
    },
    {
      id: 'segmental',
      label: '부위별 분석',
      content: (
        <div className="space-y-4">
          <Card>
            <h4 className="font-bold text-white mb-4">부위별 근육량</h4>
            <div className="space-y-4">
              {segmentalData.map((segment, idx) => {
                const percentage = (segment.value / segment.max) * 100;
                return (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">{segment.part}</span>
                      <span className="text-white font-bold">{segment.value}kg</span>
                    </div>
                    <div className="h-3 bg-cyber-mid rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-growth transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* 균형 분석 */}
          <Card variant="glass">
            <h4 className="font-bold text-white mb-3">좌우 균형</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">팔</span>
                <Badge type={Math.abs(latestReport.segmentalAnalysis.rightArm - latestReport.segmentalAnalysis.leftArm) < 0.2 ? 'growth' : 'energy'}>
                  {Math.abs(latestReport.segmentalAnalysis.rightArm - latestReport.segmentalAnalysis.leftArm) < 0.2
                    ? '균형'
                    : '불균형'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">다리</span>
                <Badge type={Math.abs(latestReport.segmentalAnalysis.rightLeg - latestReport.segmentalAnalysis.leftLeg) < 0.2 ? 'growth' : 'energy'}>
                  {Math.abs(latestReport.segmentalAnalysis.rightLeg - latestReport.segmentalAnalysis.leftLeg) < 0.2
                    ? '균형'
                    : '불균형'}
                </Badge>
              </div>
            </div>
          </Card>
        </div>
      ),
    },
    {
      id: 'trend',
      label: '변화 추이',
      content: (
        <div className="space-y-4">
          {/* 체중 추이 */}
          <Card>
            <h4 className="font-bold text-white mb-4">체중 변화</h4>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1A1A24" />
                <XAxis dataKey="date" stroke="#666" style={{ fontSize: '12px' }} />
                <YAxis stroke="#666" style={{ fontSize: '12px' }} domain={['dataMin - 2', 'dataMax + 2']} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1A1A24',
                    border: '1px solid #00D9FF',
                    borderRadius: '8px',
                  }}
                />
                <Line type="monotone" dataKey="weight" stroke="#FF6B35" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* 체지방률 추이 */}
          <Card>
            <h4 className="font-bold text-white mb-4">체지방률 변화</h4>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1A1A24" />
                <XAxis dataKey="date" stroke="#666" style={{ fontSize: '12px' }} />
                <YAxis stroke="#666" style={{ fontSize: '12px' }} domain={['dataMin - 2', 'dataMax + 2']} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1A1A24',
                    border: '1px solid #FF006E',
                    borderRadius: '8px',
                  }}
                />
                <Line type="monotone" dataKey="bodyFat" stroke="#FF006E" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* 근육량 추이 */}
          <Card>
            <h4 className="font-bold text-white mb-4">골격근량 변화</h4>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1A1A24" />
                <XAxis dataKey="date" stroke="#666" style={{ fontSize: '12px' }} />
                <YAxis stroke="#666" style={{ fontSize: '12px' }} domain={['dataMin - 2', 'dataMax + 2']} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1A1A24',
                    border: '1px solid #39FF14',
                    borderRadius: '8px',
                  }}
                />
                <Line type="monotone" dataKey="muscle" stroke="#39FF14" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-cyber-dark">
      <Header title="InBody 리포트" showBack={true} showNotification={false} />

      <div className="p-4 space-y-6">
        {/* 측정 날짜 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card variant="hologram">
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-2">최근 측정일</div>
              <div className="text-2xl font-bold text-gradient-energy">
                {new Date(latestReport.date).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* 탭 콘텐츠 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Tabs tabs={tabContent} />
        </motion.div>
      </div>
    </div>
  );
}Task 7.4: FMS 리포트파일: app/report/fms/page.tsxtypescript'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { Target, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';
import { MOCK_FMS_REPORT } from '@/data/mock/reports';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

export default function FMSReportPage() {
  const router = useRouter();

  const report = MOCK_FMS_REPORT;

  // Radar chart 데이터
  const radarData = [
    { subject: '딥 스쿼트', score: report.scores.deepSquat, fullMark: 3 },
    { subject: '허들 스텝', score: report.scores.hurdleStep, fullMark: 3 },
    { subject: '인라인 런지', score: report.scores.inlineLunge, fullMark: 3 },
    { subject: '어깨 가동성', score: report.scores.shoulderMobility, fullMark: 3 },
    { subject: '다리 들기', score: report.scores.activeStraightLeg, fullMark: 3 },
    { subject: '몸통 안정성', score: report.scores.trunkStability, fullMark: 3 },
    { subject: '회전 안정성', score: report.scores.rotaryStability, fullMark: 3 },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 2) return 'growth';
    if (score === 1) return 'energy';
    return 'premium';
  };

  const getScoreLabel = (score: number) => {
    if (score === 3) return '우수';
    if (score === 2) return '양호';
    if (score === 1) return '주의';
    return '위험';
  };

  const getTotalScoreStatus = (score: number) => {
    if (score >= 18) return { label: '우수', color: 'growth' };
    if (score >= 14) return { label: '양호', color: 'growth' };
    if (score >= 11) return { label: '주의', color: 'energy' };
    return { label: '위험', color: 'premium' };
  };

  const status = getTotalScoreStatus(report.totalScore);

  return (
    <div className="min-h-screen bg-cyber-dark">
      <Header title="FMS 체형 분석" showBack={true} showNotification={false} />

      <div className="p-4 space-y-6">
        {/* 종합 점수 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card variant="hologram" className="text-center">
            <div className="mb-4">
              <div className="text-sm text-gray-400 mb-2">FMS 종합 점수</div>
              <div className="text-6xl font-bold text-gradient-growth mb-2">
                {report.totalScore}
                <span className="text-2xl text-gray-400">/21</span>
              </div>
              <Badge type={status.color as any} glow>
                {status.label}
              </Badge>
            </div>
            <p className="text-sm text-gray-400">
              측정일: {new Date(report.date).toLocaleDateString('ko-KR')}
            </p>
          </Card>
        </motion.div>

        {/* Radar Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <h3 className="font-bold text-white mb-4">7가지 동작 패턴</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#1A1A24" />
                <PolarAngleAxis dataKey="subject" stroke="#666" style={{ fontSize: '11px' }} />
                <PolarRadiusAxis angle={90} domain={[0, 3]} stroke="#666" />
                <Radar name="점수" dataKey="score" stroke="#39FF14" fill="#39FF14" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* 항목별 점수 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <h3 className="font-bold text-white mb-4">항목별 상세 점수</h3>
            <div className="space-y-3">
              {Object.entries(report.scores).map(([key, score], idx) => {
                const labels: { [key: string]: string } = {
                  deepSquat: '딥 스쿼트',
                  hurdleStep: '허들 스텝',
                  inlineLunge: '인라인 런지',
                  shoulderMobility: '어깨 가동성',
                  activeStraightLeg: '다리 들어올리기',
                  trunkStability: '몸통 안정성',
                  rotaryStability: '회전 안정성',
                };

                return (
                  <div key={key} className="flex items-center justify-between p-3 glass-dark rounded-lg">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 bg-gradient-${getScoreColor(score)} rounded-full flex items-center justify-center font-bold text-white`}
                      >
                        {score}
                      </div>
                      <span className="text-white">{labels[key]}</span>
                    </div>
                    <Badge type={getScoreColor(score) as any}>{getScoreLabel(score)}</Badge>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* 주요 이슈 */}
        {report.issues.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card variant="glass">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle size={24} className="text-cyber-yellow" />
                <h3 className="font-bold text-white">주요 이슈</h3>
              </div>
              <ul className="space-y-2">
                {report.issues.map((issue, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-cyber-yellow mt-0.5">•</span>
                    {issue}
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        )}

        {/* 운동 추천 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={24} className="text-neon-green" />
              <h3 className="font-bold text-white">개선 운동 추천</h3>
            </div>
            <ul className="space-y-3">
              {report.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-3 p-3 glass-dark rounded-lg">
                  <CheckCircle size={20} className="text-neon-green flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-sm">{rec}</span>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}Task 7.5: P-Score (PT 필요도)파일: app/report/p-score/page.tsxtypescript'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { TrendingUp, Target, AlertCircle, Zap, Award } from 'lucide-react';
import { MOCK_P_SCORE } from '@/data/mock/reports';
import { MOCK_PT_PACKAGES } from '@/data/mock/trainers';

export default function PScorePage() {
  const router = useRouter();

  const pscore = MOCK_P_SCORE;

  const factorLabels: { [key: string]: string } = {
    painLevel: '통증 수준',
    fitnessGoals: '운동 목표',
    currentFitness: '현재 체력',
    injuryHistory: '부상 이력',
    motivation: '동기 부여',
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'premium';
    if (score >= 60) return 'energy';
    if (score >= 40) return 'growth';
    return 'growth';
  };

  const getScoreGrade = (score: number) => {
    if (score >= 80) return { label: '매우 필요', color: 'premium' };
    if (score >= 60) return { label: '필요', color: 'energy' };
    if (score >= 40) return { label: '권장', color: 'growth' };
    return { label: '선택', color: 'growth' };
  };

  const grade = getScoreGrade(pscore.score);

  // 추천 패키지 찾기
  const packageMap: { [key: string]: string } = {
    intensive: 'pkg1',
    balanced: 'pkg2',
    light: 'pkg3',
  };

  const recommendedPackageId = packageMap[pscore.recommendedPackage] || 'pkg2';
  const recommendedPackage = MOCK_PT_PACKAGES.find((pkg) => pkg.id === recommendedPackageId);

  return (
    <div className="min-h-screen bg-cyber-dark pb-24">
      <Header title="PT 필요도 분석" showBack={true} showNotification={false} />

      <div className="p-4 space-y-6">
        {/* P-Score 대형 표시 */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <Card variant="hologram" className="text-center">
            <div className="mb-4">
              <div className="text-sm text-gray-400 mb-2">PT 필요도</div>
              <div className="relative inline-block">
                {/* 원형 게이지 */}
                <svg width="200" height="200" className="mx-auto">
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    stroke="#1A1A24"
                    strokeWidth="20"
                    fill="none"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    stroke="url(#gradient)"
                    strokeWidth="20"
                    fill="none"
                    strokeDasharray={`${(pscore.score / 100) * 502} 502`}
                    strokeLinecap="round"
                    transform="rotate(-90 100 100)"
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#7209B7" />
                      <stop offset="100%" stopColor="#00D9FF" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div>
                    <div className="text-5xl font-bold text-gradient-premium">{pscore.score}</div>
                    <div className="text-sm text-gray-400">/ 100</div>
                  </div>
                </div>
              </div>
              <Badge type={grade.color as any} glow className="mt-4">
                {grade.label}
              </Badge>
            </div>
            <p className="text-sm text-gray-400">
              측정일: {new Date(pscore.date).toLocaleDateString('ko-KR')}
            </p>
          </Card>
        </motion.div>

        {/* AI 분석 결과 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Zap size={20} className="text-electric-blue" />
              <h3 className="font-bold text-white">AI 분석 결과</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">{pscore.reasoning}</p>
          </Card>
        </motion.div>

        {/* 세부 요인 분석 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <h3 className="font-bold text-white mb-4">세부 요인 분석</h3>
            <div className="space-y-4">
              {Object.entries(pscore.factors).map(([key, value], idx) => (
                <div key={key}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">{factorLabels[key]}</span>
                    <span className="text-white font-bold">{value}점</span>
                  </div>
                  <div className="h-2 bg-cyber-mid rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${value}%` }}
                      transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
                      className={`h-full bg-gradient-${getScoreColor(value)}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* 추천 패키지 */}
        {recommendedPackage && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card variant="glass" className="gradient-border">
              <div className="flex items-center gap-2 mb-4">
                <Award size={24} className="text-tech-purple" />
                <h3 className="font-bold text-white">AI 추천 패키지</h3>
                <Badge type="premium">BEST</Badge>
              </div>

              <div className="p-4 glass rounded-lg mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xl font-bold text-white">{recommendedPackage.name}</h4>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">총 {recommendedPackage.sessions}회</div>
                    <div className="text-2xl font-bold text-gradient-premium">
                      {(recommendedPackage.price / 10000).toFixed(0)}만원
                    </div>
                  </div>
                </div>

                <ul className="space-y-2">
                  {recommendedPackage.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                      <Target size={16} className="text-neon-green flex-shrink-0 mt-0.5" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                variant="premium"
                size="lg"
                className="w-full"
                onClick={() => router.push('/pt/package')}
                glow
                shine
              >
                패키지 상세 보기
              </Button>
            </Card>
          </motion.div>
        )}

        {/* 안내 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card variant="glass">
            <div className="flex gap-3">
              <AlertCircle size={24} className="text-electric-blue flex-shrink-0" />
              <div>
                <div className="font-bold text-white mb-1">P-Score란?</div>
                <p className="text-sm text-gray-400">
                  회원님의 운동 목표, 현재 체력, 통증 수준, 부상 이력을 종합 분석하여 PT의 필요성을 점수화한
                  지표입니다. 60점 이상일 경우 전문 트레이너의 도움을 권장드립니다.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-16 left-0 right-0 max-w-[425px] mx-auto p-4 bg-gradient-to-t from-cyber-dark via-cyber-dark to-transparent">
        <Button
          variant="energy"
          size="lg"
          className="w-full"
          onClick={() => router.push('/pt')}
          glow
          shine
        >
          <TrendingUp size={20} className="mr-2" />
          트레이너 추천 받기
        </Button>
      </div>
    </div>
  );
}✅ PHASE 7 완료 체크리스트:

 리포트 메인 (3가지 리포트 요약)
 InBody 상세 (체성분, 부위별, 추이)
 FMS 상세 (Radar 차트, 항목별 점수)
 P-Score 상세 (원형 게이지, 요인 분석, 추천 패키지)