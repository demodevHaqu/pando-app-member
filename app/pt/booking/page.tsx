'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ModernCard,
  PageHeader,
  PrimaryButton,
  SecondaryButton,
  Tag,
} from '@/components/ui/ModernUI';
import Modal from '@/components/ui/Modal';
import { ChevronLeft, ChevronRight, Calendar, Clock } from 'lucide-react';

export default function PTBookingPage() {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 15)); // January 15, 2025
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const timeSlots = [
    { time: '09:00', available: true },
    { time: '10:00', available: true },
    { time: '11:00', available: false },
    { time: '12:00', available: false },
    { time: '14:00', available: true },
    { time: '15:00', available: true },
    { time: '16:00', available: true },
    { time: '17:00', available: false },
    { time: '18:00', available: true },
    { time: '19:00', available: true },
    { time: '20:00', available: false },
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const days = getDaysInMonth(currentDate);

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDate(null);
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDate(null);
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date(2025, 0, 15); // Mock today
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date: Date | null) => {
    if (!date || !selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isPast = (date: Date | null) => {
    if (!date) return false;
    const today = new Date(2025, 0, 15);
    today.setHours(0, 0, 0, 0);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    return compareDate < today;
  };

  const handleDateSelect = (date: Date | null) => {
    if (date && !isPast(date)) {
      setSelectedDate(date);
      setSelectedTime(null);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleBooking = () => {
    setShowConfirmModal(true);
  };

  const confirmBooking = () => {
    setShowConfirmModal(false);
    router.push('/pt/status');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D12', paddingBottom: '100px' }}>
      <PageHeader title="PT 예약" onBack={() => router.back()} />

      <div style={{ padding: '16px', maxWidth: '672px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Calendar Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ModernCard>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <button
                onClick={goToPreviousMonth}
                style={{
                  padding: '8px',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <ChevronLeft size={24} style={{ color: 'white' }} />
              </button>
              <div style={{ textAlign: 'center' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>
                  {currentDate.toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                  })}
                </h2>
              </div>
              <button
                onClick={goToNextMonth}
                style={{
                  padding: '8px',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <ChevronRight size={24} style={{ color: 'white' }} />
              </button>
            </div>

            {/* Calendar Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
              {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                <div
                  key={day}
                  style={{ textAlign: 'center', fontSize: '14px', color: '#9CA3AF', fontWeight: 'bold', padding: '8px 0' }}
                >
                  {day}
                </div>
              ))}
              {days.map((date, index) => (
                <button
                  key={index}
                  onClick={() => handleDateSelect(date)}
                  disabled={!date || isPast(date)}
                  style={{
                    aspectRatio: '1',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.2s',
                    background: isSelected(date) ? 'linear-gradient(135deg, #FF6B35, #FFD60A)' : 'transparent',
                    color: !date ? 'transparent' : isPast(date) ? '#6B7280' : 'white',
                    border: isToday(date) ? '2px solid #00D9FF' : 'none',
                    cursor: !date || isPast(date) ? 'not-allowed' : 'pointer',
                    visibility: !date ? 'hidden' : 'visible',
                    boxShadow: isSelected(date) ? '0 0 20px rgba(255, 107, 53, 0.5)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (date && !isPast(date) && !isSelected(date)) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (date && !isPast(date) && !isSelected(date)) {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  {date?.getDate()}
                </button>
              ))}
            </div>
          </ModernCard>
        </motion.div>

        {/* Selected Date Info */}
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ModernCard>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Calendar size={20} style={{ color: '#00D9FF' }} />
                <span style={{ fontWeight: 'bold', color: 'white' }}>선택된 날짜</span>
              </div>
              <div style={{ fontSize: '18px', color: '#D1D5DB' }}>
                {selectedDate.toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long',
                })}
              </div>
            </ModernCard>
          </motion.div>
        )}

        {/* Time Slots */}
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Clock size={20} style={{ color: 'white' }} />
              <h3 style={{ fontWeight: 'bold', color: 'white', fontSize: '18px' }}>시간 선택</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {timeSlots.map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => slot.available && handleTimeSelect(slot.time)}
                  disabled={!slot.available}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    fontWeight: '500',
                    transition: 'all 0.2s',
                    background: !slot.available
                      ? 'rgba(26, 26, 36, 0.5)'
                      : selectedTime === slot.time
                      ? 'linear-gradient(135deg, #FF6B35, #FFD60A)'
                      : '#1A1A24',
                    color: !slot.available ? '#6B7280' : 'white',
                    cursor: !slot.available ? 'not-allowed' : 'pointer',
                    border: !slot.available || selectedTime === slot.time ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: selectedTime === slot.time ? '0 0 20px rgba(255, 107, 53, 0.5)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (slot.available && selectedTime !== slot.time) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (slot.available && selectedTime !== slot.time) {
                      e.currentTarget.style.background = '#1A1A24';
                    }
                  }}
                >
                  <div style={{ fontSize: '14px' }}>{slot.time}</div>
                  {!slot.available && (
                    <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>예약됨</div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ModernCard>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '16px', height: '16px', border: '2px solid #00D9FF', borderRadius: '4px' }} />
                <span style={{ color: '#9CA3AF' }}>오늘</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '16px', height: '16px', background: 'linear-gradient(135deg, #FF6B35, #FFD60A)', borderRadius: '4px' }} />
                <span style={{ color: '#9CA3AF' }}>선택됨</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '16px', height: '16px', background: 'rgba(26, 26, 36, 0.5)', borderRadius: '4px' }} />
                <span style={{ color: '#9CA3AF' }}>예약불가</span>
              </div>
            </div>
          </ModernCard>
        </motion.div>

        {/* Trainer Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ModernCard>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img
                src="https://i.pravatar.cc/150?img=11"
                alt="트레이너"
                style={{ width: '48px', height: '48px', borderRadius: '9999px', border: '2px solid #00D9FF' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>강동원 트레이너</div>
                <div style={{ fontSize: '14px', color: '#9CA3AF' }}>체중 감량 · 다이어트 전문</div>
              </div>
              <Tag color="orange">잔여 12회</Tag>
            </div>
          </ModernCard>
        </motion.div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        padding: '16px',
        background: 'rgba(13, 13, 18, 0.95)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ maxWidth: '672px', margin: '0 auto' }}>
          <PrimaryButton
            onClick={handleBooking}
            disabled={!selectedDate || !selectedTime}
            fullWidth
          >
            {selectedDate && selectedTime
              ? `${selectedDate.toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric' })} ${selectedTime} 예약하기`
              : '날짜와 시간을 선택해주세요'}
          </PrimaryButton>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="예약 확인"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{ fontSize: '36px', marginBottom: '8px' }}>📅</div>
            <h3 style={{ fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>PT 세션 예약</h3>
            {selectedDate && selectedTime && (
              <p style={{ color: '#9CA3AF' }}>
                {selectedDate.toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long',
                })}{' '}
                {selectedTime}
              </p>
            )}
          </div>

          <ModernCard>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#D1D5DB' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>트레이너</span>
                <span style={{ color: 'white', fontWeight: 'bold' }}>강동원</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>세션 시간</span>
                <span style={{ color: 'white', fontWeight: 'bold' }}>60분</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>잔여 세션</span>
                <span style={{ color: 'white', fontWeight: 'bold' }}>12회 → 11회</span>
              </div>
            </div>
          </ModernCard>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <SecondaryButton
              onClick={() => setShowConfirmModal(false)}
              fullWidth
            >
              취소
            </SecondaryButton>
            <PrimaryButton
              onClick={confirmBooking}
              fullWidth
            >
              예약 확정
            </PrimaryButton>
          </div>
        </div>
      </Modal>
    </div>
  );
}
