'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { TrendingUp, Activity, Target, BarChart3, Calendar, ChevronRight } from 'lucide-react';
import {
  MOCK_INBODY_REPORT,
  MOCK_FMS_REPORT,
  MOCK_PSCORE_REPORT,
} from '@/data/mock/reports';
import {
  ModernCard,
  FeatureCard,
  PremiumCard,
  PageHeader,
  SectionTitle,
  PrimaryButton,
  SecondaryButton,
  Tag,
  ProgressBar,
  IconBox,
  GradientIconBox,
  TabBar,
} from '@/components/ui/ModernUI';

export default function ReportPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('inbody');

  const tabs = [
    { id: 'inbody', label: 'InBody' },
    { id: 'fms', label: 'FMS' },
    { id: 'pscore', label: 'P-Score' },
  ];

  const renderInbodyTab = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <ModernCard onClick={() => router.push('/report/inbody')} style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>InBody 분석</h3>
            <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>
              {new Date(MOCK_INBODY_REPORT.measuredAt).toLocaleDateString('ko-KR')}
            </p>
          </div>
          <Tag color="green">최신</Tag>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
          {[
            { label: '체중', value: MOCK_INBODY_REPORT.weight, unit: 'kg' },
            { label: '골격근량', value: MOCK_INBODY_REPORT.muscleMass, unit: 'kg' },
            { label: '체지방률', value: MOCK_INBODY_REPORT.bodyFatPercent, unit: '%' },
          ].map((item, i) => (
            <div key={i} style={{
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '14px',
              padding: '14px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '6px' }}>{item.label}</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>{item.value}</div>
              <div style={{ fontSize: '11px', color: '#6B7280' }}>{item.unit}</div>
            </div>
          ))}
        </div>

        <PrimaryButton fullWidth gradient="linear-gradient(135deg, #39FF14, #00D9FF)">
          상세 보기
        </PrimaryButton>
      </ModernCard>

      <ModernCard style={{ padding: '20px' }}>
        <h4 style={{ fontWeight: 'bold', color: 'white', marginBottom: '16px', fontSize: '15px' }}>추이 분석</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {MOCK_INBODY_REPORT.history.map((record, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: index < MOCK_INBODY_REPORT.history.length - 1 ? '12px' : 0,
              borderBottom: index < MOCK_INBODY_REPORT.history.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
            }}>
              <span style={{ fontSize: '13px', color: '#6B7280' }}>{record.date}</span>
              <div style={{ display: 'flex', gap: '20px', fontSize: '13px' }}>
                <span style={{ color: 'white' }}>{record.weight}kg</span>
                <span style={{ color: '#39FF14' }}>{record.muscleMass}kg</span>
                <span style={{ color: '#FF6B35' }}>{record.bodyFatPercent}%</span>
              </div>
            </div>
          ))}
        </div>
      </ModernCard>
    </div>
  );

  const renderFmsTab = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <ModernCard onClick={() => router.push('/report/fms')} style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>FMS 평가</h3>
            <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>
              {new Date(MOCK_FMS_REPORT.measuredAt).toLocaleDateString('ko-KR')}
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '32px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              {MOCK_FMS_REPORT.totalScore}
            </div>
            <div style={{ fontSize: '11px', color: '#6B7280' }}>/ 21점</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '20px' }}>
          {[
            { key: 'deepSquat', label: '딥 스쿼트' },
            { key: 'hurdleStep', label: '허들 스텝' },
            { key: 'inlineLunge', label: '인라인 런지' },
            { key: 'shoulderMobility', label: '어깨 가동성' },
          ].map((item, i) => (
            <div key={i} style={{
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '12px',
              padding: '12px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '4px' }}>{item.label}</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>
                {MOCK_FMS_REPORT.scores[item.key as keyof typeof MOCK_FMS_REPORT.scores]}/3
              </div>
            </div>
          ))}
        </div>

        <PrimaryButton fullWidth>상세 보기</PrimaryButton>
      </ModernCard>

      {MOCK_FMS_REPORT.painFlags.length > 0 && (
        <ModernCard style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
            <div style={{ fontSize: '28px' }}>⚠️</div>
            <div style={{ flex: 1 }}>
              <h4 style={{ fontWeight: 'bold', color: 'white', marginBottom: '10px', fontSize: '15px' }}>통증 부위</h4>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {MOCK_FMS_REPORT.painFlags.map((pain, index) => (
                  <Tag key={index} color="orange">{pain}</Tag>
                ))}
              </div>
            </div>
          </div>
        </ModernCard>
      )}
    </div>
  );

  const renderPscoreTab = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <PremiumCard onClick={() => router.push('/report/p-score')}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#7209B7',
              textShadow: '0 0 10px rgba(114, 9, 183, 0.5)',
              marginBottom: '4px',
            }}>
              P-Score
            </h3>
            <p style={{ fontSize: '13px', color: '#9CA3AF', margin: 0 }}>종합 체력 점수</p>
          </div>
          <Tag color="purple">{MOCK_PSCORE_REPORT.rank}</Tag>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            fontSize: '56px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #7209B7, #FF006E)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '8px',
          }}>
            {MOCK_PSCORE_REPORT.totalScore}
          </div>
          {MOCK_PSCORE_REPORT.trend === 'increasing' && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', color: '#39FF14', fontSize: '14px' }}>
              <TrendingUp size={16} />
              +{MOCK_PSCORE_REPORT.totalScore - MOCK_PSCORE_REPORT.previousScore} 상승
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', marginBottom: '20px' }}>
          {[
            { key: 'strength', label: '근력' },
            { key: 'endurance', label: '지구력' },
            { key: 'flexibility', label: '유연성' },
            { key: 'balance', label: '균형' },
            { key: 'posture', label: '자세' },
          ].map((item) => (
            <div key={item.key} style={{ textAlign: 'center' }}>
              <div style={{
                width: '44px',
                height: '44px',
                margin: '0 auto 6px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #7209B7, #FF006E)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                color: 'white',
                fontSize: '14px',
              }}>
                {MOCK_PSCORE_REPORT.categories[item.key as keyof typeof MOCK_PSCORE_REPORT.categories]}
              </div>
              <div style={{ fontSize: '10px', color: '#6B7280' }}>{item.label}</div>
            </div>
          ))}
        </div>

        <PrimaryButton fullWidth gradient="linear-gradient(135deg, #7209B7, #FF006E)">
          상세 보기
        </PrimaryButton>
      </PremiumCard>

      <ModernCard style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h4 style={{ fontWeight: 'bold', color: 'white', margin: 0, fontSize: '15px' }}>목표 진행률</h4>
          <span style={{ fontSize: '13px', color: '#6B7280' }}>
            D-{Math.ceil(
              (new Date(MOCK_PSCORE_REPORT.goalProgress.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
            )}
          </span>
        </div>

        <div style={{ marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: '#6B7280' }}>현재</span>
            <span style={{ fontWeight: 'bold', color: 'white', fontSize: '14px' }}>{MOCK_PSCORE_REPORT.goalProgress.current}</span>
          </div>
          <ProgressBar
            percentage={(MOCK_PSCORE_REPORT.goalProgress.current / MOCK_PSCORE_REPORT.goalProgress.goal) * 100}
            color="pink"
          />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
            <span style={{ fontSize: '13px', color: '#6B7280' }}>목표</span>
            <span style={{ fontWeight: 'bold', color: 'white', fontSize: '14px' }}>{MOCK_PSCORE_REPORT.goalProgress.goal}</span>
          </div>
        </div>
      </ModernCard>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D12', paddingBottom: '100px' }}>
      <PageHeader title="AI 리포트" showBack={false} />

      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {/* Summary */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FeatureCard>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
              <GradientIconBox gradient="linear-gradient(135deg, #00D9FF, #7209B7)" size={48}>
                <BarChart3 size={24} color="white" />
              </GradientIconBox>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', margin: '0 0 4px' }}>건강 리포트</h2>
                <p style={{ fontSize: '13px', color: '#9CA3AF', margin: 0 }}>AI 기반 종합 분석</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {[
                { icon: <Activity size={20} color="#39FF14" />, label: 'InBody', value: '최신' },
                { icon: <Target size={20} color="#FF6B35" />, label: 'FMS', value: `${MOCK_FMS_REPORT.totalScore}점` },
                { icon: <TrendingUp size={20} color="#7209B7" />, label: 'P-Score', value: MOCK_PSCORE_REPORT.totalScore },
              ].map((item, i) => (
                <div key={i} style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: '14px',
                  padding: '14px',
                  textAlign: 'center',
                }}>
                  <div style={{ marginBottom: '6px' }}>{item.icon}</div>
                  <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '4px' }}>{item.label}</div>
                  <div style={{ fontWeight: 'bold', color: 'white', fontSize: '14px' }}>{item.value}</div>
                </div>
              ))}
            </div>
          </FeatureCard>
        </motion.section>

        {/* Tab Bar */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </motion.section>

        {/* Tab Content */}
        <motion.section
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {activeTab === 'inbody' && renderInbodyTab()}
          {activeTab === 'fms' && renderFmsTab()}
          {activeTab === 'pscore' && renderPscoreTab()}
        </motion.section>

        {/* Next Test */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ModernCard style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <IconBox color="blue" size={48}>
                <Calendar size={24} color="#00D9FF" />
              </IconBox>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontWeight: 'bold', color: 'white', margin: '0 0 4px', fontSize: '15px' }}>다음 검사 일정</h4>
                <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>FMS 재검사: {MOCK_FMS_REPORT.nextTestDate}</p>
              </div>
              <SecondaryButton size="sm">예약</SecondaryButton>
            </div>
          </ModernCard>
        </motion.section>
      </div>
    </div>
  );
}
