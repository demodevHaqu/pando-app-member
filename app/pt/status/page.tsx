'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ModernCard,
  PageHeader,
  PrimaryButton,
  SecondaryButton,
  Tag,
  ProgressBar,
} from '@/components/ui/ModernUI';
import { Calendar, Clock, User, Target, TrendingDown, Award } from 'lucide-react';

export default function PTStatusPage() {
  const router = useRouter();

  const contractInfo = {
    trainer: {
      name: '강동원',
      image: 'https://i.pravatar.cc/150?img=11',
      specialty: '체중 감량',
    },
    package: {
      name: 'AI 추천 플랜',
      totalSessions: 16,
      remainingSessions: 12,
      usedSessions: 4,
      startDate: '2025-01-02',
      expiryDate: '2025-04-02',
    },
    progress: {
      attendanceRate: 100,
      weight: { start: 78, current: 75, goal: 70 },
      muscleMass: { start: 32, current: 33 },
    },
  };

  const scheduledSessions = [
    {
      id: 1,
      date: '2025-01-16',
      time: '10:00',
      trainer: '강동원',
      location: 'PT룸 A',
      status: 'confirmed',
    },
    {
      id: 2,
      date: '2025-01-18',
      time: '14:00',
      trainer: '강동원',
      location: 'PT룸 A',
      status: 'confirmed',
    },
    {
      id: 3,
      date: '2025-01-20',
      time: '10:00',
      trainer: '강동원',
      location: 'PT룸 A',
      status: 'pending',
    },
  ];

  const completedSessions = [
    {
      id: 1,
      date: '2025-01-14',
      time: '10:00',
      focus: '하체 강화',
      rating: 5,
    },
    {
      id: 2,
      date: '2025-01-12',
      time: '14:00',
      focus: '상체 근력',
      rating: 5,
    },
    {
      id: 3,
      date: '2025-01-10',
      time: '10:00',
      focus: '유산소 + 코어',
      rating: 4,
    },
    {
      id: 4,
      date: '2025-01-08',
      time: '10:00',
      focus: '전신 운동',
      rating: 5,
    },
  ];

  const sessionPercentage = (contractInfo.package.usedSessions / contractInfo.package.totalSessions) * 100;
  const daysRemaining = Math.ceil(
    (new Date(contractInfo.package.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );
  const weightProgress = ((contractInfo.progress.weight.start - contractInfo.progress.weight.current) / (contractInfo.progress.weight.start - contractInfo.progress.weight.goal)) * 100;

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D12', paddingBottom: '100px' }}>
      <PageHeader title="PT 계약 현황" onBack={() => router.back()} />

      <div style={{ padding: '16px', maxWidth: '672px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Contract Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ModernCard style={{ boxShadow: '0 0 30px rgba(0, 217, 255, 0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
              <img
                src={contractInfo.trainer.image}
                alt={contractInfo.trainer.name}
                style={{ width: '64px', height: '64px', borderRadius: '9999px', border: '2px solid #00D9FF' }}
              />
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>
                  {contractInfo.package.name}
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#9CA3AF' }}>
                  <User size={14} />
                  <span>{contractInfo.trainer.name} 트레이너</span>
                </div>
              </div>
              <Tag color="orange">진행중</Tag>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Remaining Sessions */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', color: '#9CA3AF' }}>잔여 세션</span>
                  <span style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    background: 'linear-gradient(135deg, #FF6B35, #FFD60A)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    {contractInfo.package.remainingSessions}회 / {contractInfo.package.totalSessions}회
                  </span>
                </div>
                <ProgressBar
                  percentage={(contractInfo.package.usedSessions / contractInfo.package.totalSessions) * 100}
                  color="blue"
                />
              </div>

              {/* Expiry Date */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#9CA3AF' }}>
                  <Calendar size={14} />
                  <span>유효기간</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '14px', color: 'white', fontWeight: '500' }}>
                    ~ {new Date(contractInfo.package.expiryDate).toLocaleDateString('ko-KR')}
                  </div>
                  <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
                    {daysRemaining}일 남음
                  </div>
                </div>
              </div>
            </div>
          </ModernCard>
        </motion.div>

        {/* Progress Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 style={{ fontWeight: 'bold', color: 'white', fontSize: '18px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingDown size={20} style={{ color: '#39FF14' }} />
            운동 성과
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            <ModernCard>
              <div style={{ fontSize: '14px', color: '#9CA3AF', marginBottom: '8px' }}>체중 변화</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
                <span style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #FF6B35, #FFD60A)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {contractInfo.progress.weight.current}kg
                </span>
                <span style={{ fontSize: '14px', color: '#39FF14' }}>
                  -{contractInfo.progress.weight.start - contractInfo.progress.weight.current}kg
                </span>
              </div>
              <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
                목표: {contractInfo.progress.weight.goal}kg
              </div>
              <div style={{ marginTop: '8px' }}>
                <ProgressBar
                  percentage={weightProgress}
                  color="green"
                />
              </div>
            </ModernCard>

            <ModernCard>
              <div style={{ fontSize: '14px', color: '#9CA3AF', marginBottom: '8px' }}>근육량</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
                <span style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #00D9FF, #39FF14)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {contractInfo.progress.muscleMass.current}kg
                </span>
                <span style={{ fontSize: '14px', color: '#00D9FF' }}>
                  +{contractInfo.progress.muscleMass.current - contractInfo.progress.muscleMass.start}kg
                </span>
              </div>
              <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
                시작: {contractInfo.progress.muscleMass.start}kg
              </div>
            </ModernCard>

            <ModernCard>
              <div style={{ fontSize: '14px', color: '#9CA3AF', marginBottom: '8px' }}>출석률</div>
              <div style={{
                fontSize: '24px',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #7209B7, #FF006E)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '8px'
              }}>
                {contractInfo.progress.attendanceRate}%
              </div>
              <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
                {contractInfo.package.usedSessions}/{contractInfo.package.usedSessions} 완료
              </div>
            </ModernCard>

            <ModernCard>
              <div style={{ fontSize: '14px', color: '#9CA3AF', marginBottom: '8px' }}>평균 만족도</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#FF6B35' }}>4.8</span>
                <span style={{ color: '#FF6B35' }}>★</span>
              </div>
              <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
                4회 평가 완료
              </div>
            </ModernCard>
          </div>
        </motion.div>

        {/* Scheduled Sessions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h3 style={{ fontWeight: 'bold', color: 'white', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={20} />
              예정된 세션
            </h3>
            <SecondaryButton
              onClick={() => router.push('/pt/booking')}
              size="sm"
            >
              예약 추가
            </SecondaryButton>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {scheduledSessions.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <ModernCard style={{ boxShadow: '0 0 20px rgba(0, 217, 255, 0.2)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      background: 'rgba(26, 26, 36, 0.9)',
                      backdropFilter: 'blur(12px)',
                      borderRadius: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
                        {new Date(session.date).toLocaleDateString('ko-KR', { month: 'numeric' })}
                      </div>
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>
                        {new Date(session.date).getDate()}
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <Clock size={14} style={{ color: '#00D9FF' }} />
                        <span style={{ fontWeight: 'bold', color: 'white' }}>{session.time}</span>
                        <Tag color={session.status === 'confirmed' ? 'green' : 'purple'}>
                          {session.status === 'confirmed' ? '확정' : '대기'}
                        </Tag>
                      </div>
                      <div style={{ fontSize: '14px', color: '#9CA3AF' }}>
                        {session.trainer} · {session.location}
                      </div>
                    </div>
                  </div>
                </ModernCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Completed Sessions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 style={{ fontWeight: 'bold', color: 'white', fontSize: '18px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={20} style={{ color: '#FF6B35' }} />
            완료한 세션
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {completedSessions.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
              >
                <ModernCard>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>{session.focus}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#9CA3AF' }}>
                        <Calendar size={14} />
                        <span>{new Date(session.date).toLocaleDateString('ko-KR')}</span>
                        <span>·</span>
                        <Clock size={14} />
                        <span>{session.time}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                      {Array.from({ length: session.rating }).map((_, i) => (
                        <span key={i} style={{ color: '#FF6B35', fontSize: '14px' }}>★</span>
                      ))}
                    </div>
                  </div>
                </ModernCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            <PrimaryButton
              onClick={() => router.push('/pt/booking')}
              gradient="linear-gradient(135deg, #00D9FF, #39FF14)"
            >
              세션 예약
            </PrimaryButton>
            <SecondaryButton
              onClick={() => router.push('/pt/trainer/' + contractInfo.trainer.name)}
            >
              트레이너 프로필
            </SecondaryButton>
          </div>
        </motion.div>
        </div>
      </div>
    </div>
  );
}
