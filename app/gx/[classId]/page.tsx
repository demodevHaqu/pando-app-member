'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ModernCard,
  PageHeader,
  PrimaryButton,
  SecondaryButton,
  Tag,
  ProgressBar,
} from '@/components/ui/ModernUI';
import Modal from '@/components/ui/Modal';
import { MOCK_GX_CLASSES } from '@/data/mock/gxClasses';
import { Clock, MapPin, Users, Star, Calendar, Target } from 'lucide-react';

export default function GXClassDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [showReserveModal, setShowReserveModal] = useState(false);
  const [isReserved, setIsReserved] = useState(false);

  const gxClass = MOCK_GX_CLASSES.find((c) => c.id === params.classId) || MOCK_GX_CLASSES[0];
  const percentage = (gxClass.enrolled / gxClass.capacity) * 100;
  const isFull = gxClass.enrolled >= gxClass.capacity;

  const mockReviews = [
    {
      id: 1,
      memberName: '김민지',
      memberImage: 'https://i.pravatar.cc/150?img=5',
      rating: 5,
      comment: '강사님이 정말 친절하시고 설명도 자세하게 해주세요! 초보자도 따라하기 쉬워요.',
      date: '2025-01-10',
    },
    {
      id: 2,
      memberName: '박준혁',
      memberImage: 'https://i.pravatar.cc/150?img=12',
      rating: 4,
      comment: '운동 강도가 적당해서 좋았습니다. 다음에도 참여할게요!',
      date: '2025-01-08',
    },
    {
      id: 3,
      memberName: '이서연',
      memberImage: 'https://i.pravatar.cc/150?img=8',
      rating: 5,
      comment: '요가 수업 중에서 최고예요. 음악도 좋고 분위기가 정말 편안해요.',
      date: '2025-01-05',
    },
  ];

  const handleReserve = () => {
    setIsReserved(true);
    setShowReserveModal(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D12', paddingBottom: '100px' }}>
      <PageHeader title="클래스 상세" showBack onBack={() => router.back()} />

      <div>
        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ position: 'relative', height: '256px' }}
        >
          <img
            src={gxClass.imageUrl}
            alt={gxClass.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, #0D0D12, rgba(13, 13, 18, 0.5), transparent)'
          }} />
          <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px' }}>
            <h1 style={{ fontSize: '30px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
              {gxClass.name}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Tag color="orange">{gxClass.type}</Tag>
              <Tag color="green">{gxClass.level === 'beginner' ? '초급' : gxClass.level === 'intermediate' ? '중급' : '고급'}</Tag>
            </div>
          </div>
        </motion.div>

        <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '768px', margin: '0 auto' }}>
          {/* Class Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <ModernCard>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={20} style={{ color: '#00D9FF' }} />
                  <div>
                    <div style={{ fontSize: '12px', color: '#9CA3AF' }}>시간</div>
                    <div style={{ fontWeight: 'bold', color: 'white' }}>{gxClass.startTime} - {gxClass.endTime}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Target size={20} style={{ color: '#39FF14' }} />
                  <div>
                    <div style={{ fontSize: '12px', color: '#9CA3AF' }}>운동 시간</div>
                    <div style={{ fontWeight: 'bold', color: 'white' }}>{gxClass.duration}분</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={20} style={{ color: '#FF006E' }} />
                  <div>
                    <div style={{ fontSize: '12px', color: '#9CA3AF' }}>장소</div>
                    <div style={{ fontWeight: 'bold', color: 'white' }}>{gxClass.location}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={20} style={{ color: '#FF6B35' }} />
                  <div>
                    <div style={{ fontSize: '12px', color: '#9CA3AF' }}>날짜</div>
                    <div style={{ fontWeight: 'bold', color: 'white' }}>
                      {new Date(gxClass.date).toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric' })}
                    </div>
                  </div>
                </div>
              </div>
            </ModernCard>
          </motion.div>

          {/* Capacity Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ModernCard>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Users size={20} style={{ color: '#00D9FF' }} />
                <span style={{ fontWeight: 'bold', color: 'white' }}>참가 인원</span>
                <Tag color={isFull ? 'orange' : 'green'}>
                  {gxClass.enrolled}/{gxClass.capacity}
                </Tag>
              </div>
              <ProgressBar
                percentage={percentage}
                color={percentage > 80 ? 'orange' : 'green'}
              />
              <div style={{ fontSize: '14px', color: '#9CA3AF', marginTop: '8px' }}>
                {isFull
                  ? `대기 인원: ${gxClass.waitlist}명`
                  : `${gxClass.capacity - gxClass.enrolled}자리 남음`}
              </div>
            </ModernCard>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ModernCard>
              <h3 style={{ fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>클래스 설명</h3>
              <p style={{ color: '#D1D5DB', lineHeight: '1.625' }}>{gxClass.description}</p>
            </ModernCard>
          </motion.div>

          {/* Instructor Profile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <ModernCard>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <img
                  src={gxClass.instructor.profileImage}
                  alt={gxClass.instructor.name}
                  style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px solid #00D9FF' }}
                />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>
                    {gxClass.instructor.name} 강사
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Star size={16} style={{ color: '#FF6B35', fill: '#FF6B35' }} />
                    <span style={{ fontSize: '14px', color: '#D1D5DB' }}>{gxClass.instructor.rating}</span>
                    <span style={{ fontSize: '14px', color: '#9CA3AF' }}>· {gxClass.instructor.experience}년 경력</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {gxClass.instructor.specialty.map((spec, i) => (
                      <span
                        key={i}
                        style={{
                          padding: '2px 8px',
                          background: 'rgba(0, 217, 255, 0.2)',
                          color: '#00D9FF',
                          fontSize: '12px',
                          borderRadius: '12px',
                          border: '1px solid rgba(0, 217, 255, 0.3)'
                        }}
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <p style={{ fontSize: '14px', color: '#D1D5DB' }}>{gxClass.instructor.bio}</p>
              </div>
            </ModernCard>
          </motion.div>

          {/* Reviews */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 style={{ fontWeight: 'bold', color: 'white', fontSize: '18px', marginBottom: '12px' }}>
              수강생 후기
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {mockReviews.map((review) => (
                <ModernCard key={review.id}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <img
                      src={review.memberImage}
                      alt={review.memberName}
                      style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontWeight: 'bold', color: 'white' }}>{review.memberName}</span>
                        <div style={{ display: 'flex' }}>
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              style={{ color: '#FF6B35', fill: '#FF6B35' }}
                            />
                          ))}
                        </div>
                      </div>
                      <p style={{ fontSize: '14px', color: '#D1D5DB', marginBottom: '4px' }}>{review.comment}</p>
                      <span style={{ fontSize: '12px', color: '#9CA3AF' }}>{review.date}</span>
                    </div>
                  </div>
                </ModernCard>
              ))}
            </div>
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
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ maxWidth: '768px', margin: '0 auto' }}>
          {isReserved ? (
            <PrimaryButton disabled fullWidth>
              예약 완료
            </PrimaryButton>
          ) : isFull ? (
            <PrimaryButton onClick={() => setShowReserveModal(true)} fullWidth>
              대기 등록하기
            </PrimaryButton>
          ) : (
            <PrimaryButton onClick={() => setShowReserveModal(true)} fullWidth>
              예약하기
            </PrimaryButton>
          )}
        </div>
      </div>

      {/* Reserve Modal */}
      <Modal
        isOpen={showReserveModal}
        onClose={() => setShowReserveModal(false)}
        title={isFull ? '대기 등록' : '클래스 예약'}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{ fontSize: '36px', marginBottom: '8px' }}>📅</div>
            <h3 style={{ fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>{gxClass.name}</h3>
            <p style={{ color: '#9CA3AF', fontSize: '14px' }}>
              {gxClass.startTime} - {gxClass.endTime} · {gxClass.location}
            </p>
          </div>

          {isFull && (
            <ModernCard>
              <p style={{ fontSize: '14px', color: '#D1D5DB' }}>
                현재 정원이 마감되었습니다. 대기 등록하시면 자리가 생길 때 알림을 받으실 수 있습니다.
              </p>
            </ModernCard>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <SecondaryButton onClick={() => setShowReserveModal(false)} fullWidth>
              취소
            </SecondaryButton>
            <PrimaryButton onClick={handleReserve} fullWidth>
              {isFull ? '대기 등록' : '예약 확정'}
            </PrimaryButton>
          </div>
        </div>
      </Modal>
    </div>
  );
}
