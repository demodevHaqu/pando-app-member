'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  TODAY_GX_CLASSES,
  WEEKLY_GX_CLASSES,
  getClassesByDate,
  formatDateKo
} from '@/data/mock/gxClasses';
import { Calendar, Clock, Users, MapPin, ChevronRight, Check } from 'lucide-react';
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
  // 예약된 클래스 ID 추적
  const [reservedClassIds, setReservedClassIds] = useState<Set<string>>(new Set());
  // 대기 등록된 클래스 ID 추적
  const [waitlistedClassIds, setWaitlistedClassIds] = useState<Set<string>>(new Set());

  // 일간: 오늘 클래스, 주간: 주간 클래스
  const displayClasses = viewMode === 'day' ? TODAY_GX_CLASSES : WEEKLY_GX_CLASSES;

  // 예약된 클래스 (첫 번째 클래스를 예약된 것으로 표시)
  const enrolledClasses = useMemo(() => {
    return viewMode === 'day' ? [TODAY_GX_CLASSES[0]] : [WEEKLY_GX_CLASSES[0]];
  }, [viewMode]);

  // 주간 뷰에서 날짜별 그룹화
  const classesGroupedByDate = useMemo(() => {
    if (viewMode === 'week') {
      return getClassesByDate(WEEKLY_GX_CLASSES);
    }
    return {};
  }, [viewMode]);

  // 예약/대기등록 처리 함수
  const handleReserve = (e: React.MouseEvent, classId: string, isFull: boolean) => {
    e.stopPropagation();
    if (isFull) {
      setWaitlistedClassIds(prev => new Set(prev).add(classId));
    } else {
      setReservedClassIds(prev => new Set(prev).add(classId));
    }
  };

  const getClassTypeColor = (type: string) => {
    const colors: { [key: string]: 'green' | 'orange' | 'pink' | 'blue' | 'purple' } = {
      yoga: 'green',
      spinning: 'orange',
      pilates: 'pink',
      crossfit: 'blue',
      aerobic: 'purple',
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
            <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '6px' }}>
              {viewMode === 'day' ? '오늘' : '이번 주'}
            </div>
            <div style={{
              fontSize: '24px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              {viewMode === 'day' ? (
                new Date().toLocaleDateString('ko-KR', {
                  month: 'long',
                  day: 'numeric',
                  weekday: 'short'
                })
              ) : (
                `${displayClasses.length}개 클래스`
              )}
            </div>
            {viewMode === 'week' && (
              <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '8px' }}>
                {Object.keys(classesGroupedByDate).length}일간 스케줄
              </div>
            )}
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
            title={viewMode === 'day' ? '오늘의 클래스' : '주간 클래스'}
            action="참여 기록"
            onAction={() => router.push('/gx/history')}
          />

          {/* 일간 뷰: 플랫 리스트 */}
          {viewMode === 'day' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {TODAY_GX_CLASSES.map((gxClass, index) => {
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

                            {reservedClassIds.has(gxClass.id) ? (
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '6px 12px',
                                borderRadius: '10px',
                                background: 'rgba(57, 255, 20, 0.15)',
                                border: '1px solid #39FF14',
                              }}>
                                <Check size={14} color="#39FF14" />
                                <span style={{ color: '#39FF14', fontWeight: '600', fontSize: '12px' }}>예약완료</span>
                              </div>
                            ) : waitlistedClassIds.has(gxClass.id) ? (
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '6px 12px',
                                borderRadius: '10px',
                                background: 'rgba(255, 107, 53, 0.15)',
                                border: '1px solid #FF6B35',
                              }}>
                                <Check size={14} color="#FF6B35" />
                                <span style={{ color: '#FF6B35', fontWeight: '600', fontSize: '12px' }}>대기등록</span>
                              </div>
                            ) : isFull ? (
                              <button
                                onClick={(e) => handleReserve(e, gxClass.id, true)}
                                style={{
                                  padding: '8px 16px',
                                  borderRadius: '10px',
                                  background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
                                  border: 'none',
                                  color: 'white',
                                  fontWeight: '600',
                                  fontSize: '12px',
                                  cursor: 'pointer',
                                }}
                              >
                                대기등록
                              </button>
                            ) : (
                              <button
                                onClick={(e) => handleReserve(e, gxClass.id, false)}
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
          )}

          {/* 주간 뷰: 날짜별 그룹화 */}
          {viewMode === 'week' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {Object.entries(classesGroupedByDate)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([date, classes], dateIndex) => (
                  <div key={date}>
                    {/* 날짜 헤더 */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '12px',
                      paddingBottom: '8px',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    }}>
                      <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        background: dateIndex === 0
                          ? 'linear-gradient(135deg, #FF6B35, #FF006E)'
                          : 'rgba(255, 255, 255, 0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <Calendar size={20} color={dateIndex === 0 ? 'white' : '#6B7280'} />
                      </div>
                      <div>
                        <h4 style={{
                          fontWeight: 'bold',
                          color: 'white',
                          margin: 0,
                          fontSize: '16px',
                        }}>
                          {formatDateKo(date)}
                        </h4>
                        <p style={{ fontSize: '12px', color: '#6B7280', margin: '2px 0 0' }}>
                          {classes.length}개 클래스
                        </p>
                      </div>
                    </div>

                    {/* 해당 날짜의 클래스 목록 */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {classes.map((gxClass, index) => {
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
                            transition={{ delay: 0.1 + dateIndex * 0.1 + index * 0.03 }}
                          >
                            <ModernCard
                              onClick={() => router.push(`/gx/${gxClass.id}`)}
                              style={{ padding: '14px' }}
                            >
                              <div style={{ display: 'flex', gap: '12px' }}>
                                <div style={{
                                  width: '60px',
                                  height: '60px',
                                  borderRadius: '10px',
                                  background: `url(${gxClass.imageUrl}) center/cover`,
                                  flexShrink: 0,
                                }} />
                                <div style={{ flex: 1 }}>
                                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                      <h4 style={{ fontWeight: 'bold', color: 'white', margin: 0, fontSize: '14px' }}>{gxClass.name}</h4>
                                      <Tag color={typeColor} size="sm">{gxClass.type}</Tag>
                                    </div>
                                    <Tag color={levelInfo.color} size="sm">{levelInfo.text}</Tag>
                                  </div>

                                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px', color: '#6B7280', marginBottom: '8px' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                      <Clock size={11} />
                                      {gxClass.startTime}
                                    </span>
                                    <span>{gxClass.instructor.name}</span>
                                    <span>{gxClass.location}</span>
                                  </div>

                                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                      <Users size={11} color="#6B7280" />
                                      <span style={{ fontSize: '11px', color: '#6B7280' }}>
                                        {gxClass.enrolled}/{gxClass.capacity}
                                      </span>
                                      <div style={{ width: '50px' }}>
                                        <ProgressBar
                                          percentage={percentage}
                                          color={percentage > 80 ? 'orange' : 'green'}
                                          height={3}
                                        />
                                      </div>
                                    </div>

                                    {reservedClassIds.has(gxClass.id) ? (
                                      <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        padding: '4px 8px',
                                        borderRadius: '8px',
                                        background: 'rgba(57, 255, 20, 0.15)',
                                        border: '1px solid #39FF14',
                                      }}>
                                        <Check size={12} color="#39FF14" />
                                        <span style={{ color: '#39FF14', fontWeight: '600', fontSize: '11px' }}>예약완료</span>
                                      </div>
                                    ) : waitlistedClassIds.has(gxClass.id) ? (
                                      <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        padding: '4px 8px',
                                        borderRadius: '8px',
                                        background: 'rgba(255, 107, 53, 0.15)',
                                        border: '1px solid #FF6B35',
                                      }}>
                                        <Check size={12} color="#FF6B35" />
                                        <span style={{ color: '#FF6B35', fontWeight: '600', fontSize: '11px' }}>대기등록</span>
                                      </div>
                                    ) : isFull ? (
                                      <button
                                        onClick={(e) => handleReserve(e, gxClass.id, true)}
                                        style={{
                                          padding: '6px 10px',
                                          borderRadius: '8px',
                                          background: 'linear-gradient(135deg, #FF6B35, #FF006E)',
                                          border: 'none',
                                          color: 'white',
                                          fontWeight: '600',
                                          fontSize: '11px',
                                          cursor: 'pointer',
                                        }}
                                      >
                                        대기등록
                                      </button>
                                    ) : (
                                      <button
                                        onClick={(e) => handleReserve(e, gxClass.id, false)}
                                        style={{
                                          padding: '6px 10px',
                                          borderRadius: '8px',
                                          background: 'linear-gradient(135deg, #39FF14, #00D9FF)',
                                          border: 'none',
                                          color: 'black',
                                          fontWeight: '600',
                                          fontSize: '11px',
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
                  </div>
                ))}
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
}
