'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { MOCK_GX_CLASSES } from '@/data/mock/gxClasses';
import { Calendar, Clock, Users, MapPin } from 'lucide-react';
import {
  ModernCard,
  FeatureCard,
  PageHeader,
  SectionTitle,
  Tag,
  ProgressBar,
} from '@/components/ui/ModernUI';

export default function GXPage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');
  const [selectedDate] = useState('2025-01-15');

  const enrolledClasses = MOCK_GX_CLASSES.filter((_, i) => i === 0);
  const availableClasses = MOCK_GX_CLASSES;

  const getClassTypeColor = (type: string) => {
    const colors: { [key: string]: 'green' | 'orange' | 'pink' | 'blue' } = {
      yoga: 'green',
      spinning: 'orange',
      pilates: 'pink',
      crossfit: 'blue',
    };
    return colors[type] || 'blue';
  };

  const getLevelInfo = (level: string) => {
    const levels: { [key: string]: { text: string; color: 'green' | 'orange' | 'pink' } } = {
      beginner: { text: '초급', color: 'green' },
      intermediate: { text: '중급', color: 'orange' },
      advanced: { text: '고급', color: 'pink' },
    };
    return levels[level] || { text: '초급', color: 'green' };
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D12', paddingBottom: '100px' }}>
      <PageHeader title="GX 클래스" />

      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {/* View Toggle */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div style={{ display: 'flex', gap: '10px' }}>
            {(['day', 'week'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: '14px',
                  border: 'none',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s',
                  background: viewMode === mode
                    ? 'linear-gradient(135deg, #FF6B35, #FF006E)'
                    : 'rgba(255, 255, 255, 0.05)',
                  color: viewMode === mode ? 'white' : '#9CA3AF',
                  boxShadow: viewMode === mode ? '0 4px 15px rgba(255, 107, 53, 0.4)' : 'none',
                }}
              >
                <Calendar size={16} />
                {mode === 'day' ? '일간' : '주간'}
              </button>
            ))}
          </div>
        </motion.section>

        {/* Date Selector */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ModernCard style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '6px' }}>선택된 날짜</div>
            <div style={{
              fontSize: '24px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              {new Date(selectedDate).toLocaleDateString('ko-KR', {
                month: 'long',
                day: 'numeric',
                weekday: 'short'
              })}
            </div>
          </ModernCard>
        </motion.section>

        {/* Enrolled Classes */}
        {enrolledClasses.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <SectionTitle title="내 예약" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {enrolledClasses.map((gxClass) => {
                const percentage = (gxClass.enrolled / gxClass.capacity) * 100;
                const levelInfo = getLevelInfo(gxClass.level);

                return (
                  <FeatureCard key={gxClass.id}>
                    <div
                      onClick={() => router.push(`/gx/${gxClass.id}`)}
                      style={{ display: 'flex', gap: '16px', cursor: 'pointer' }}
                    >
                      <div style={{
                        width: '88px',
                        height: '88px',
                        borderRadius: '14px',
                        background: `url(${gxClass.imageUrl}) center/cover`,
                        flexShrink: 0,
                      }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <div>
                            <h4 style={{ fontWeight: 'bold', color: 'white', margin: '0 0 6px', fontSize: '16px' }}>{gxClass.name}</h4>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#6B7280' }}>
                              <Clock size={14} />
                              {gxClass.startTime} - {gxClass.endTime}
                            </div>
                          </div>
                          <Tag color={levelInfo.color}>{levelInfo.text}</Tag>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#6B7280', marginBottom: '10px' }}>
                          <MapPin size={14} />
                          {gxClass.location} · {gxClass.instructor.name}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <Users size={14} color="#6B7280" />
                          <span style={{ fontSize: '12px', color: '#6B7280' }}>
                            {gxClass.enrolled}/{gxClass.capacity}
                          </span>
                          <div style={{ flex: 1 }}>
                            <ProgressBar
                              percentage={percentage}
                              color={percentage > 80 ? 'orange' : 'green'}
                              height={4}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </FeatureCard>
                );
              })}
            </div>
          </motion.section>
        )}

        {/* Available Classes */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <SectionTitle
            title="예약 가능한 클래스"
            action="참여 기록"
            onAction={() => router.push('/gx/history')}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {availableClasses.map((gxClass, index) => {
              const percentage = (gxClass.enrolled / gxClass.capacity) * 100;
              const isFull = gxClass.enrolled >= gxClass.capacity;
              const hasWaitlist = gxClass.waitlist > 0;
              const levelInfo = getLevelInfo(gxClass.level);
              const typeColor = getClassTypeColor(gxClass.type);

              return (
                <motion.div
                  key={gxClass.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <ModernCard
                    onClick={() => router.push(`/gx/${gxClass.id}`)}
                    style={{ padding: '16px' }}
                  >
                    <div style={{ display: 'flex', gap: '14px' }}>
                      <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '12px',
                        background: `url(${gxClass.imageUrl}) center/cover`,
                        flexShrink: 0,
                      }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '6px' }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                              <h4 style={{ fontWeight: 'bold', color: 'white', margin: 0, fontSize: '15px' }}>{gxClass.name}</h4>
                              <Tag color={typeColor} size="sm">{gxClass.type}</Tag>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#6B7280' }}>
                              <Clock size={12} />
                              {gxClass.startTime} - {gxClass.endTime} ({gxClass.duration}분)
                            </div>
                          </div>
                          <Tag color={levelInfo.color} size="sm">{levelInfo.text}</Tag>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#6B7280', marginBottom: '10px' }}>
                          <MapPin size={12} />
                          {gxClass.location} · {gxClass.instructor.name}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                            <Users size={12} color="#6B7280" />
                            <span style={{ fontSize: '11px', color: '#6B7280' }}>
                              {gxClass.enrolled}/{gxClass.capacity}
                            </span>
                            <div style={{ flex: 1, maxWidth: '80px' }}>
                              <ProgressBar
                                percentage={percentage}
                                color={percentage > 80 ? 'orange' : 'green'}
                                height={4}
                              />
                            </div>
                          </div>

                          {isFull ? (
                            <Tag color="orange">
                              {hasWaitlist ? `대기 ${gxClass.waitlist}명` : '마감'}
                            </Tag>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(`/gx/${gxClass.id}`);
                              }}
                              style={{
                                padding: '8px 16px',
                                borderRadius: '10px',
                                background: 'linear-gradient(135deg, #39FF14, #00D9FF)',
                                border: 'none',
                                color: 'black',
                                fontWeight: '600',
                                fontSize: '12px',
                                cursor: 'pointer',
                              }}
                            >
                              예약
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </ModernCard>
                </motion.div>
              );
            })}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
