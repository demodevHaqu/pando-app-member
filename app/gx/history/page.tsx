'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ModernCard, PageHeader, Tag } from '@/components/ui/ModernUI';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Calendar, TrendingUp, Award, Target } from 'lucide-react';

export default function GXHistoryPage() {
  const router = useRouter();

  const attendanceHistory = [
    {
      id: 1,
      className: '아침 요가',
      instructor: '박지현',
      date: '2025-01-14',
      time: '10:00 - 11:00',
      type: 'yoga',
      location: 'GX룸 A',
    },
    {
      id: 2,
      className: '파워 스피닝',
      instructor: '이민호',
      date: '2025-01-12',
      time: '14:00 - 14:45',
      type: 'spinning',
      location: '스피닝룸',
    },
    {
      id: 3,
      className: '저녁 필라테스',
      instructor: '박지현',
      date: '2025-01-10',
      time: '19:00 - 20:00',
      type: 'pilates',
      location: 'GX룸 B',
    },
    {
      id: 4,
      className: '아침 요가',
      instructor: '박지현',
      date: '2025-01-08',
      time: '10:00 - 11:00',
      type: 'yoga',
      location: 'GX룸 A',
    },
    {
      id: 5,
      className: '파워 스피닝',
      instructor: '이민호',
      date: '2025-01-06',
      time: '14:00 - 14:45',
      type: 'spinning',
      location: '스피닝룸',
    },
  ];

  // Calculate stats
  const totalClasses = attendanceHistory.length;
  const thisMonthClasses = attendanceHistory.filter(
    (c) => new Date(c.date).getMonth() === 0
  ).length;

  // Class type distribution
  const classTypeData = [
    { name: '요가', value: 2, color: '#00ff88' },
    { name: '스피닝', value: 2, color: '#ff6b35' },
    { name: '필라테스', value: 1, color: '#ff3eb5' },
  ];

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: 'green' | 'orange' | 'pink' } = {
      yoga: 'green',
      spinning: 'orange',
      pilates: 'pink',
    };
    return colors[type] || 'green';
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D12', paddingBottom: '100px' }}>
      <PageHeader title="GX 참여 기록" showBack onBack={() => router.back()} />

      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '768px', margin: '0 auto' }}>
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}
        >
          <ModernCard>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Target size={20} style={{ color: '#00D9FF' }} />
              <span style={{ fontSize: '14px', color: '#9CA3AF' }}>총 참여</span>
            </div>
            <div style={{ fontSize: '30px', fontWeight: 'bold', background: 'linear-gradient(135deg, #FF6B35, #FFD60A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {totalClasses}
            </div>
            <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '4px' }}>클래스</div>
          </ModernCard>

          <ModernCard>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <TrendingUp size={20} style={{ color: '#39FF14' }} />
              <span style={{ fontSize: '14px', color: '#9CA3AF' }}>이번 달</span>
            </div>
            <div style={{ fontSize: '30px', fontWeight: 'bold', background: 'linear-gradient(135deg, #39FF14, #00D9FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {thisMonthClasses}
            </div>
            <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '4px' }}>클래스</div>
          </ModernCard>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ModernCard>
            <h3 style={{ fontWeight: 'bold', color: 'white', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={20} style={{ color: '#FF6B35' }} />
              클래스 유형별 분포
            </h3>
            <div style={{ height: '256px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={classTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {classTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1a2e',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                  <Legend
                    iconType="circle"
                    wrapperStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ModernCard>
        </motion.div>

        {/* Achievement Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ModernCard>
            <h3 style={{ fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>달성 배지</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  margin: '0 auto',
                  background: 'rgba(26, 26, 36, 0.9)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '30px',
                  marginBottom: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  animation: 'scalePopIn 0.5s ease-out'
                }}>
                  🔥
                </div>
                <div style={{ fontSize: '12px', color: '#9CA3AF' }}>5회 연속</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  margin: '0 auto',
                  background: 'rgba(26, 26, 36, 0.9)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '30px',
                  marginBottom: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  animation: 'scalePopIn 0.5s ease-out',
                  animationDelay: '0.1s'
                }}>
                  🎯
                </div>
                <div style={{ fontSize: '12px', color: '#9CA3AF' }}>월 10회</div>
              </div>
              <div style={{ textAlign: 'center', opacity: 0.5 }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  margin: '0 auto',
                  background: 'rgba(26, 26, 36, 0.9)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '30px',
                  marginBottom: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  ⭐
                </div>
                <div style={{ fontSize: '12px', color: '#9CA3AF' }}>월 20회</div>
              </div>
            </div>
          </ModernCard>
        </motion.div>

        {/* Attendance History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 style={{ fontWeight: 'bold', color: 'white', fontSize: '18px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={20} />
            참여 내역
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {attendanceHistory.map((record, index) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
              >
                <ModernCard onClick={() => router.push('/gx')} style={{ cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: 'rgba(26, 26, 36, 0.9)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      <Calendar size={20} style={{ color: '#00D9FF' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <h4 style={{ fontWeight: 'bold', color: 'white' }}>{record.className}</h4>
                        <Tag color={getTypeColor(record.type)}>
                          {record.type}
                        </Tag>
                      </div>
                      <div style={{ fontSize: '14px', color: '#9CA3AF', marginBottom: '4px' }}>
                        {record.instructor} 강사 · {record.location}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#6B7280' }}>
                        <span>
                          {new Date(record.date).toLocaleDateString('ko-KR')}
                        </span>
                        <span>·</span>
                        <span>{record.time}</span>
                      </div>
                    </div>
                  </div>
                </ModernCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
