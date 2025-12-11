🏋️ PANDO Fitness - PHASE 8, 9 계속 구현

Task 8.3: GX 클래스 상세
파일: app/gx/[classId]/page.tsx
typescript'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import ProgressBar from '@/components/ui/ProgressBar';
import { Clock, MapPin, Users, Star, Award, AlertCircle, Calendar } from 'lucide-react';
import { MOCK_GX_CLASSES, MOCK_GX_ATTENDANCE } from '@/data/mock/gxClasses';

export default function GXClassDetailPage() {
  const router = useRouter();
  const params = useParams();
  const classId = params.classId as string;

  const gxClass = MOCK_GX_CLASSES.find((g) => g.id === classId);
  const myAttendance = MOCK_GX_ATTENDANCE.find((a) => a.classId === classId);

  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  if (!gxClass) {
    return (
      <div className="min-h-screen bg-cyber-dark flex items-center justify-center">
        <p className="text-white">클래스를 찾을 수 없습니다</p>
      </div>
    );
  }

  const isFull = gxClass.enrolled >= gxClass.capacity;
  const isEnrolled = myAttendance?.status === 'enrolled';
  const isWaitlist = myAttendance?.status === 'waitlist';
  const percentage = (gxClass.enrolled / gxClass.capacity) * 100;

  const handleEnroll = () => {
    if (isFull) {
      alert('대기 등록이 완료되었습니다!');
    } else {
      alert('예약이 완료되었습니다!');
    }
    setShowEnrollModal(false);
    router.push('/gx');
  };

  const handleCancel = () => {
    alert('예약이 취소되었습니다.');
    setShowCancelModal(false);
    router.push('/gx');
  };

  const levelLabels = {
    beginner: '초급',
    intermediate: '중급',
    advanced: '고급',
  };

  const typeLabels = {
    yoga: '요가',
    pilates: '필라테스',
    spinning: '스피닝',
    zumba: '줌바',
    crossfit: '크로스핏',
    boxing: '복싱',
  };

  // Mock reviews
  const reviews = [
    {
      id: 'rev1',
      memberName: '김*수',
      rating: 5,
      comment: '강사님이 정말 친절하시고 동작 하나하나 세세하게 알려주십니다!',
      date: '2025-01-10',
    },
    {
      id: 'rev2',
      memberName: '이*영',
      rating: 5,
      comment: '초보자도 따라하기 쉬웠어요. 추천합니다!',
      date: '2025-01-08',
    },
    {
      id: 'rev3',
      memberName: '박*현',
      rating: 4,
      comment: '시설도 좋고 분위기도 좋습니다.',
      date: '2025-01-05',
    },
  ];

  return (
    <div className="min-h-screen bg-cyber-dark pb-24">
      <Header title="클래스 상세" showBack={true} showNotification={false} />

      <div className="p-4 space-y-6">
        {/* 클래스 이미지 */}
        {gxClass.imageUrl && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="aspect-video rounded-xl overflow-hidden">
              <img
                src={gxClass.imageUrl}
                alt={gxClass.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        )}

        {/* 클래스 정보 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card variant="hologram">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">{gxClass.name}</h2>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge type="growth">{typeLabels[gxClass.type]}</Badge>
                  <Badge type="energy">{levelLabels[gxClass.level]}</Badge>
                  {isEnrolled && (
                    <Badge type="premium" glow>
                      예약완료
                    </Badge>
                  )}
                  {isWaitlist && (
                    <Badge type="energy" glow>
                      대기중
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <Calendar size={20} className="text-electric-blue" />
                <span>
                  {new Date(gxClass.date).toLocaleDateString('ko-KR', {
                    month: 'long',
                    day: 'numeric',
                    weekday: 'short',
                  })}
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Clock size={20} className="text-electric-blue" />
                <span>
                  {gxClass.startTime} - {gxClass.endTime} ({gxClass.duration}분)
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin size={20} className="text-electric-blue" />
                <span>{gxClass.location}</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* 정원 현황 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Users size={20} className="text-neon-green" />
              <h3 className="font-bold text-white">정원 현황</h3>
            </div>
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">현재 인원</span>
                <span className="text-white font-bold">
                  {gxClass.enrolled}/{gxClass.capacity}명
                </span>
              </div>
              <ProgressBar
                value={gxClass.enrolled}
                max={gxClass.capacity}
                color={percentage > 80 ? 'orange' : 'green'}
              />
            </div>
            {gxClass.waitlist > 0 && (
              <div className="flex items-center justify-between p-3 bg-cyber-yellow/10 rounded-lg">
                <span className="text-sm text-cyber-yellow">대기 인원</span>
                <span className="text-cyber-yellow font-bold">{gxClass.waitlist}명</span>
              </div>
            )}
          </Card>
        </motion.div>

        {/* 클래스 설명 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <h3 className="font-bold text-white mb-3">클래스 소개</h3>
            <p className="text-gray-300 leading-relaxed">{gxClass.description}</p>
          </Card>
        </motion.div>

        {/* 강사 정보 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card glow onClick={() => router.push(`/gx/instructor/${gxClass.instructor.id}`)}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                {gxClass.instructor.profileImage ? (
                  <img
                    src={gxClass.instructor.profileImage}
                    alt={gxClass.instructor.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-premium flex items-center justify-center text-white text-xl font-bold">
                    {gxClass.instructor.name[0]}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-white mb-1">{gxClass.instructor.name} 강사</h4>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-cyber-yellow fill-cyber-yellow" />
                    <span className="text-white font-bold">{gxClass.instructor.rating}</span>
                    <span className="text-gray-400 text-sm">
                      ({gxClass.instructor.reviewCount})
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-400">
                    <Award size={14} />
                    <span>{gxClass.instructor.experience}년</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {gxClass.instructor.specialty.map((spec, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-electric-blue/10 text-electric-blue rounded text-xs"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* 리뷰 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white">수강생 리뷰</h3>
              <div className="flex items-center gap-1">
                <Star size={16} className="text-cyber-yellow fill-cyber-yellow" />
                <span className="font-bold text-white">{gxClass.instructor.rating}</span>
              </div>
            </div>
            <div className="space-y-3">
              {reviews.map((review, idx) => (
                <div key={review.id} className="p-3 glass-dark rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white">{review.memberName}</span>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className="text-cyber-yellow fill-cyber-yellow"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{review.comment}</p>
                  <span className="text-xs text-gray-500">
                    {new Date(review.date).toLocaleDateString('ko-KR')}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* 주의사항 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card variant="glass">
            <div className="flex gap-3">
              <AlertCircle size={24} className="text-electric-blue flex-shrink-0" />
              <div>
                <div className="font-bold text-white mb-1">예약 안내</div>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• 수업 시작 2시간 전까지 취소 가능</li>
                  <li>• 무단 불참 시 패널티가 부과될 수 있습니다</li>
                  <li>• 수업 10분 전 도착을 권장합니다</li>
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-16 left-0 right-0 max-w-[425px] mx-auto p-4 bg-gradient-to-t from-cyber-dark via-cyber-dark to-transparent">
        {isEnrolled ? (
          <Button
            variant="premium"
            size="lg"
            className="w-full"
            onClick={() => setShowCancelModal(true)}
          >
            예약 취소하기
          </Button>
        ) : isWaitlist ? (
          <Button variant="energy" size="lg" className="w-full" onClick={() => setShowCancelModal(true)}>
            대기 취소하기
          </Button>
        ) : (
          <Button
            variant="energy"
            size="lg"
            className="w-full"
            onClick={() => setShowEnrollModal(true)}
            glow
            shine
          >
            {isFull ? '대기 등록하기' : '예약하기'}
          </Button>
        )}
      </div>

      {/* 예약 확인 모달 */}
      <Modal
        isOpen={showEnrollModal}
        onClose={() => setShowEnrollModal(false)}
        title={isFull ? '대기 등록 확인' : '예약 확인'}
      >
        <div className="space-y-4">
          <Card>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">클래스</span>
                <span className="text-white font-bold">{gxClass.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">날짜</span>
                <span className="text-white">
                  {new Date(gxClass.date).toLocaleDateString('ko-KR')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">시간</span>
                <span className="text-white">{gxClass.startTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">강사</span>
                <span className="text-white">{gxClass.instructor.name}</span>
              </div>
            </div>
          </Card>

          {isFull && (
            <Card variant="glass">
              <div className="flex gap-2">
                <AlertCircle size={20} className="text-cyber-yellow flex-shrink-0" />
                <p className="text-sm text-gray-300">
                  정원이 마감되어 대기 등록됩니다. 취소 발생 시 순서대로 자동 예약됩니다.
                </p>
              </div>
            </Card>
          )}

          <div className="flex gap-2">
            <Button variant="ghost" className="flex-1" onClick={() => setShowEnrollModal(false)}>
              취소
            </Button>
            <Button variant="energy" className="flex-1" onClick={handleEnroll} glow shine>
              확인
            </Button>
          </div>
        </div>
      </Modal>

      {/* 취소 확인 모달 */}
      <Modal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        title="예약 취소"
      >
        <div className="space-y-4">
          <p className="text-gray-300">정말 예약을 취소하시겠습니까?</p>
          <div className="flex gap-2">
            <Button variant="ghost" className="flex-1" onClick={() => setShowCancelModal(false)}>
              아니오
            </Button>
            <Button variant="energy" className="flex-1" onClick={handleCancel}>
              예, 취소합니다
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

Task 8.4: 내 GX 기록
파일: app/gx/history/page.tsx
typescript'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Tabs from '@/components/ui/Tabs';
import { Calendar, TrendingUp, Star, Award } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

export default function MyGXHistoryPage() {
  const router = useRouter();

  // Mock data
  const attendanceHistory = [
    {
      id: 'hist1',
      className: '아침 요가',
      instructor: '박지현',
      date: '2025-01-15',
      status: 'attended',
      rating: 5,
      review: '정말 좋았어요!',
    },
    {
      id: 'hist2',
      className: '파워 스피닝',
      instructor: '이민호',
      date: '2025-01-14',
      status: 'attended',
      rating: 4,
    },
    {
      id: 'hist3',
      className: '저녁 필라테스',
      instructor: '박지현',
      date: '2025-01-13',
      status: 'attended',
      rating: 5,
    },
    {
      id: 'hist4',
      className: '점심 줌바',
      instructor: '최수영',
      date: '2025-01-12',
      status: 'cancelled',
    },
    {
      id: 'hist5',
      className: '아침 요가',
      instructor: '박지현',
      date: '2025-01-10',
      status: 'attended',
      rating: 5,
    },
  ];

  const stats = {
    totalAttended: 12,
    totalCancelled: 2,
    totalNoShow: 0,
    attendanceRate: 85.7,
    favoriteType: ['요가', '필라테스', '스피닝'],
  };

  // Pie chart data
  const pieData = [
    { name: '요가', value: 5, color: '#39FF14' },
    { name: '필라테스', value: 3, color: '#00D9FF' },
    { name: '스피닝', value: 2, color: '#FF6B35' },
    { name: '줌바', value: 2, color: '#FF006E' },
  ];

  const statusLabels: { [key: string]: { label: string; color: string } } = {
    attended: { label: '참여', color: 'growth' },
    cancelled: { label: '취소', color: 'energy' },
    'no-show': { label: '불참', color: 'premium' },
  };

  const tabContent = [
    {
      id: 'history',
      label: '참여 기록',
      content: (
        <div className="space-y-3">
          {attendanceHistory.map((record, idx) => (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-bold text-white mb-1">{record.className}</h4>
                    <div className="text-sm text-gray-400 mb-2">
                      {record.instructor} · {new Date(record.date).toLocaleDateString('ko-KR')}
                    </div>
                    {record.status === 'attended' && record.rating && (
                      <div className="flex items-center gap-1">
                        {Array.from({ length: record.rating }).map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className="text-cyber-yellow fill-cyber-yellow"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <Badge type={statusLabels[record.status].color as any}>
                    {statusLabels[record.status].label}
                  </Badge>
                </div>
                {record.review && (
                  <p className="text-sm text-gray-300 p-3 glass-dark rounded-lg">
                    {record.review}
                  </p>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      ),
    },
    {
      id: 'stats',
      label: '통계',
      content: (
        <div className="space-y-4">
          {/* 출석률 */}
          <Card variant="hologram">
            <div className="text-center mb-4">
              <div className="text-sm text-gray-400 mb-2">출석률</div>
              <div className="text-5xl font-bold text-gradient-growth mb-2">
                {stats.attendanceRate}%
              </div>
              <div className="text-sm text-gray-400">
                총 {stats.totalAttended + stats.totalCancelled + stats.totalNoShow}회 중{' '}
                {stats.totalAttended}회 참여
              </div>
            </div>
          </Card>

          {/* 참여 통계 */}
          <Card>
            <h4 className="font-bold text-white mb-4">참여 현황</h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 glass-dark rounded-lg">
                <div className="text-2xl font-bold text-neon-green mb-1">
                  {stats.totalAttended}
                </div>
                <div className="text-xs text-gray-400">참여</div>
              </div>
              <div className="text-center p-3 glass-dark rounded-lg">
                <div className="text-2xl font-bold text-energy-orange mb-1">
                  {stats.totalCancelled}
                </div>
                <div className="text-xs text-gray-400">취소</div>
              </div>
              <div className="text-center p-3 glass-dark rounded-lg">
                <div className="text-2xl font-bold text-power-pink mb-1">
                  {stats.totalNoShow}
                </div>
                <div className="text-xs text-gray-400">불참</div>
              </div>
            </div>
          </Card>

          {/* 선호 클래스 타입 */}
          <Card>
            <h4 className="font-bold text-white mb-4">선호 클래스 타입</h4>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* TOP 3 */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Award size={20} className="text-cyber-yellow" />
              <h4 className="font-bold text-white">선호 클래스 TOP3</h4>
            </div>
            <div className="space-y-3">
              {stats.favoriteType.map((type, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 glass-dark rounded-lg"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                      idx === 0
                        ? 'bg-cyber-yellow'
                        : idx === 1
                        ? 'bg-gray-400'
                        : 'bg-energy-orange'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <span className="text-white font-bold">{type}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-cyber-dark">
      <Header title="내 GX 기록" showBack={true} showNotification={false} />

      <div className="p-4 space-y-6">
        {/* 요약 카드 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card variant="hologram">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <Calendar size={24} className="text-electric-blue mx-auto mb-2" />
                <div className="text-2xl font-bold text-white mb-1">{stats.totalAttended}</div>
                <div className="text-sm text-gray-400">총 참여</div>
              </div>
              <div className="text-center">
                <TrendingUp size={24} className="text-neon-green mx-auto mb-2" />
                <div className="text-2xl font-bold text-white mb-1">
                  {stats.attendanceRate}%
                </div>
                <div className="text-sm text-gray-400">출석률</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* 탭 콘텐츠 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs tabs={tabContent} />
        </motion.div>
      </div>
    </div>
  );
}

✅ PHASE 8 완료 체크리스트:

 GX 스케줄 메인 (오늘/주간 뷰, 내 예약)
 GX 클래스 상세 (정원, 강사, 리뷰)
 예약/취소 모달
 내 GX 기록 (참여 이력, 출석률, 통계)


🎯 PHASE 9: PT/OT 예약 시스템
Task 9.1: 타입 정의 및 Mock 데이터
파일: types/pt.ts
typescriptexport interface Trainer {
  id: string;
  name: string;
  profileImage?: string;
  gender: 'male' | 'female';
  specialty: string[];
  experience: number;
  rating: number;
  reviewCount: number;
  bio: string;
  certifications: string[];
  matchScore?: number;
}

export interface PTPackage {
  id: string;
  name: string;
  sessions: number;
  price: number;
  duration: number;
  type: 'recommended' | 'balanced' | 'economy';
  benefits: string[];
}

export interface PTSession {
  id: string;
  trainerId: string;
  memberId: string;
  packageId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  type: 'pt' | 'ot1' | 'ot2';
  notes?: string;
}

export interface PTContract {
  id: string;
  memberId: string;
  trainerId: string;
  packageId: string;
  totalSessions: number;
  remainingSessions: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'cancelled';
}
파일: data/mock/trainers.ts
typescriptimport { Trainer, PTPackage, PTSession, PTContract } from '@/types/pt';

export const MOCK_TRAINERS: Trainer[] = [
  {
    id: 'trainer1',
    name: '강동원',
    profileImage: 'https://i.pravatar.cc/150?img=11',
    gender: 'male',
    specialty: ['체중 감량', '다이어트', '체형 교정'],
    experience: 10,
    rating: 4.9,
    reviewCount: 127,
    bio: '10년 경력의 다이어트 전문 트레이너입니다. 500명 이상의 회원님들과 함께 성공적인 다이어트를 이뤄냈습니다.',
    certifications: ['NSCA-CPT', 'ACSM-CPT', '생활스포츠지도사 2급'],
    matchScore: 95,
  },
  {
    id: 'trainer2',
    name: '이효리',
    profileImage: 'https://i.pravatar.cc/150?img=8',
    gender: 'female',
    specialty: ['근비대', '파워리프팅', '체력 향상'],
    experience: 7,
    rating: 4.8,
    reviewCount: 89,
    bio: '파워리프팅 대회 입상 경력. 근육량 증가와 근력 향상이 목표인 회원님들께 추천합니다.',
    certifications: ['NSCA-CSCS', 'ACE-CPT'],
    matchScore: 88,
  },
  {
    id: 'trainer3',
    name: '송혜교',
    profileImage: 'https://i.pravatar.cc/150?img=10',
    gender: 'female',
    specialty: ['체형 교정', '재활 운동', '통증 개선'],
    experience: 12,
    rating: 4.95,
    reviewCount: 203,
    bio: '물리치료 전공 출신. 통증이 있거나 부상 이력이 있는 회원님들을 위한 맞춤 재활 프로그램을 제공합니다.',
    certifications: ['물리치료사', 'NASM-CPT', 'CES'],
    matchScore: 92,
  },
];

export const MOCK_PT_PACKAGES: PTPackage[] = [
  {
    id: 'pkg1',
    name: 'AI 추천 플랜',
    sessions: 16,
    price: 1200000,
    duration: 60,
    type: 'recommended',
    benefits: ['주 2-3회 트레이닝', '식단 관리 포함', 'InBody 측정 무제한', '카톡 상담 24시간'],
  },
  {
    id: 'pkg2',
    name: '균형형',
    sessions: 8,
    price: 640000,
    duration: 60,
    type: 'balanced',
    benefits: ['주 1-2회 트레이닝', '기본 식단 가이드', 'InBody 측정 월 1회'],
  },
  {
    id: 'pkg3',
    name: '경제형',
    sessions: 4,
    price: 340000,
    duration: 60,
    type: 'economy',
    benefits: ['주 1회 트레이닝', '운동 프로그램 제공'],
  },
];

export const MOCK_PT_SESSIONS: PTSession[] = [
  {
    id: 'session1',
    trainerId: 'trainer1',
    memberId: 'member1',
    packageId: 'pkg1',
    date: '2025-01-16',
    startTime: '10:00',
    endTime: '11:00',
    status: 'scheduled',
    type: 'pt',
  },
  {
    id: 'session2',
    trainerId: 'trainer1',
    memberId: 'member1',
    packageId: 'pkg1',
    date: '2025-01-14',
    startTime: '10:00',
    endTime: '11:00',
    status: 'completed',
    type: 'pt',
    notes: '스쿼트 자세 교정 완료. 다음 주부터 중량 증가 예정.',
  },
];

export const MOCK_PT_CONTRACT: PTContract = {
  id: 'contract1',
  memberId: 'member1',
  trainerId: 'trainer1',
  packageId: 'pkg1',
  totalSessions: 16,
  remainingSessions: 12,
  startDate: '2025-01-05',
  endDate: '2025-03-05',
  status: 'active',
};

Task 9.2: 트레이너 추천 화면
파일: app/pt/page.tsx
typescript'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Star, Award, TrendingUp, Users } from 'lucide-react';
import { MOCK_TRAINERS } from '@/data/mock/trainers';

export default function TrainerRecommendPage() {
  const router = useRouter();

  // AI 매칭 순으로 정렬
  const topTrainers = [...MOCK_TRAINERS].sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0)).slice(0, 3);

  return (
    <div className="min-h-screen bg-cyber-dark">
      <Header title="PT/OT 예약" showBack={false} showNotification={true} />

      <div className="p-4 space-y-6">
        {/* AI 매칭 헤더 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card variant="hologram">
            <div className="text-center">
              <div className="text-4xl mb-3">🤖</div>
              <h2 className="text-2xl font-bold text-gradient-premium mb-2">
                AI 트레이너 매칭
              </h2>
              <p className="text-gray-400">
                회원님의 목표와 체력 수준을 분석하여
                <br />
                최적의 트레이너를 추천합니다
              </p>
            </div>
          </Card>
        </motion.div>

        {/* TOP 3 트레이너 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-lg font-bold text-white mb-3">추천 트레이너 TOP3</h3>
          <div className="space-y-4">
            {topTrainers.map((trainer, idx) => (
              <motion.div
                key={trainer.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
              >
                <Card
                  variant={idx === 0 ? 'hologram' : 'default'}
                  glow
                  onClick={() => router.push(`/pt/trainer/${trainer.id}`)}
                >
                  {idx === 0 && (
                    <div className="flex items-center justify-between mb-3">
                      <Badge type="premium" glow>
                        BEST MATCH
                      </Badge>
                      <div className="flex items-center gap-1">
                        <TrendingUp size={16} className="text-tech-purple" />
                        <span className="text-tech-purple font-bold">
                          {trainer.matchScore}% 매칭
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    {/* 프로필 이미지 */}
                    <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                      {trainer.profileImage ? (
                        <img
                          src={trainer.profileImage}
                          alt={trainer.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-premium flex items-center justify-center text-white text-2xl font-bold">
                          {trainer.name[0]}
                        </div>
                      )}
                    </div>

                    {/* 정보 */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-xl font-bold text-white">{trainer.name}</h4>
                        {idx === 0 && <span className="text-2xl">👑</span>}
                      </div>

                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-1">
                          <Star size={14} className="text-cyber-yellow fill-cyber-yellow" />
                          <span className="text-white font-bold">{trainer.rating}</span>
                          <span className="text-gray-400 text-sm">
                            ({trainer.reviewCount})
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-400">
                          <Award size={14} />
                          <span>{trainer.experience}년</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {trainer.specialty.slice(0, 3).map((spec, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-electric-blue/10 text-electric-blue rounded text-xs"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>

                      <p className="text-sm text-gray-300 line-clamp-2">{trainer.bio}</p>
                    </div>
                  </div>

                  {idx !== 0 && trainer.matchScore && (
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">AI 매칭률</span>
                        <span className="font-bold text-electric-blue">
                          {trainer.matchScore}%
                        </span>
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 전체 트레이너 보기 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            variant="ghost"
            size="lg"
            className="w-full"
            onClick={() => router.push('/pt/trainers')}
          >
            <Users size={20} className="mr-2" />
            전체 트레이너 보기
          </Button>
        </motion.div>

        {/* PT 현황 (계약이 있을 경우) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card variant="glass" className="gradient-border">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-400 mb-1">현재 PT 현황</div>
                <div className="text-2xl font-bold text-white">12회 남음</div>
              </div>
              <Button
                variant="premium"
                size="sm"
                onClick={() => router.push('/pt/status')}
              >
                상세 보기
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

Task 9.3: 트레이너 상세 프로필
파일: app/pt/trainer/[id]/page.tsx
typescript'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Star, Award, TrendingUp, CheckCircle } from 'lucide-react';
import { MOCK_TRAINERS } from '@/data/mock/trainers';

export default function TrainerDetailPage() {
  const router = useRouter();
  const params = useParams();
  const trainerId = params.id as string;

  const trainer = MOCK_TRAINERS.find((t) => t.id === trainerId);

  if (!trainer) {
    return (
      <div className="min-h-screen bg-cyber-dark flex items-center justify-center">
        <p className="text-white">트레이너를 찾을 수 없습니다</p>
      </div>
    );
  }

  // Mock reviews
  const reviews = [
    {
      id: 'rev1',
      memberName: '김*수',
      rating: 5,
      comment: '3개월만에 -10kg 감량 성공! 정말 감사합니다.',
      date: '2025-01-10',
      before: 75,
      after: 65,
    },
    {
      id: 'rev2',
      memberName: '이*영',
      rating: 5,
      comment: '친절하고 세심하게 봐주셔서 좋았어요. 강추!',
      date: '2025-01-05',
    },
    {
      id: 'rev3',
      memberName: '박*현',
      rating: 4,
      comment: '운동 강도가 딱 적당해요. 꾸준히 할 수 있을 것 같아요.',
      date: '2025-01-01',
    },
  ];

  return (
    <div className="min-h-screen bg-cyber-dark pb-24">
      <Header title="트레이너 프로필" showBack={true} showNotification={false} />

      <div className="p-4 space-y-6">
        {/* 프로필 헤더 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card variant="hologram">
            <div className="flex gap-4 mb-4">
              <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                {trainer.profileImage ? (
                  <img
                    src={trainer.profileImage}
                    alt={trainer.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-premium flex items-center justify-center text-white text-3xl font-bold">
                    {trainer.name[0]}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">{trainer.name} 트레이너</h2>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-cyber-yellow fill-cyber-yellow" />
                    <span className="text-white font-bold">{trainer.rating}</span>
                    <span className="text-gray-400 text-sm">({trainer.reviewCount})</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400">
                    <Award size={16} />
                    <span>{trainer.experience}년 경력</span>
                  </div>
                </div>
                {trainer.matchScore && (
                  <div className="flex items-center gap-2">
                    <TrendingUp size={16} className="text-tech-purple" />
                    <span className="text-tech-purple font-bold">
                      AI 매칭률 {trainer.matchScore}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* 전문 분야 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <h3 className="font-bold text-white mb-3">전문 분야</h3>
            <div className="flex flex-wrap gap-2">
              {trainer.specialty.map((spec, idx) => (
                <Badge key={idx} type="growth">
                  {spec}
                </Badge>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* 자격증 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <h3 className="font-bold text-white mb-3 flex items-center gap-2">
              <Award size={20} className="text-cyber-yellow" />
              보유 자격증
            </h3>
            <div className="space-y-2">
              {trainer.certifications.map((cert, idx) => (
                <div key={idx} className="flex items-center gap-2 text-gray-300">
                  <CheckCircle size={16} className="text-neon-green" />
                  {cert}
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* 소개 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <h3 className="font-bold text-white mb-3">트레이너 소개</h3>
            <p className="text-gray-300 leading-relaxed">{trainer.bio}</p>
          </Card>
        </motion.div>

        {/* 회원 후기 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white">회원 후기</h3>
              <div className="flex items-center gap-1">
                <Star size={16} className="text-cyber-yellow fill-cyber-yellow" />
                <span className="font-bold text-white">{trainer.rating}</span>
              </div>
            </div>
            <div className="space-y-3">
              {reviews.map((review) => (
                <div key={review.id} className="p-4 glass-dark rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{review.memberName}</span>
                      {review.before && review.after && (
                        <Badge type="energy">
                          {review.before}kg → {review.after}kg
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className="text-cyber-yellow fill-cyber-yellow"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{review.comment}</p>
                  <span className="text-xs text-gray-500">
                    {new Date(review.date).toLocaleDateString('ko-KR')}
                  </span>
                </div>
              ))}
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
          onClick={() => router.push('/pt/booking')}
          glow
          shine
        >
          이 트레이너와 예약하기
        </Button>
      </div>
    </div>
  );
}

🏋️ PANDO Fitness - PHASE 9 계속 (PT/OT 시스템 완성)

Task 9.4: PT 예약 캘린더
파일: app/pt/booking/page.tsx
typescript'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import { Calendar, Clock, Star, CheckCircle } from 'lucide-react';
import { MOCK_TRAINERS } from '@/data/mock/trainers';

export default function PTBookingPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedType, setSelectedType] = useState<'pt' | 'ot1' | 'ot2'>('pt');
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const trainer = MOCK_TRAINERS[0]; // 선택된 트레이너

  // 월 생성
  const generateCalendar = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();

    const calendar = [];
    let week = new Array(startDayOfWeek).fill(null);

    for (let day = 1; day <= daysInMonth; day++) {
      week.push(day);
      if (week.length === 7) {
        calendar.push(week);
        week = [];
      }
    }

    if (week.length > 0) {
      while (week.length < 7) {
        week.push(null);
      }
      calendar.push(week);
    }

    return calendar;
  };

  const calendar = generateCalendar();

  // 시간 슬롯 생성
  const timeSlots = [
    { time: '06:00', available: true, recommended: false },
    { time: '07:00', available: true, recommended: false },
    { time: '08:00', available: false, recommended: false },
    { time: '09:00', available: true, recommended: false },
    { time: '10:00', available: true, recommended: true },
    { time: '11:00', available: true, recommended: false },
    { time: '12:00', available: false, recommended: false },
    { time: '13:00', available: true, recommended: false },
    { time: '14:00', available: true, recommended: true },
    { time: '15:00', available: true, recommended: false },
    { time: '16:00', available: true, recommended: false },
    { time: '17:00', available: false, recommended: false },
    { time: '18:00', available: true, recommended: false },
    { time: '19:00', available: true, recommended: false },
    { time: '20:00', available: true, recommended: false },
    { time: '21:00', available: false, recommended: false },
  ];

  const handlePrevMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day: number | null) => {
    if (!day) return;
    const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
    setSelectedDate(newDate);
  };

  const handleConfirmBooking = () => {
    alert('예약이 완료되었습니다!');
    setShowConfirmModal(false);
    router.push('/pt/status');
  };

  const isToday = (day: number | null) => {
    if (!day) return false;
    const today = new Date();
    return (
      day === today.getDate() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getFullYear() === today.getFullYear()
    );
  };

  const isSelectedDay = (day: number | null) => {
    if (!day) return false;
    return day === selectedDate.getDate();
  };

  const sessionTypes = [
    { value: 'pt', label: 'PT (1:1)', duration: 60 },
    { value: 'ot1', label: 'OT1 (1:2)', duration: 60 },
    { value: 'ot2', label: 'OT2 (1:3)', duration: 60 },
  ];

  return (
    <div className="min-h-screen bg-cyber-dark pb-24">
      <Header title="PT 예약" showBack={true} showNotification={false} />

      <div className="p-4 space-y-6">
        {/* 트레이너 정보 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                {trainer.profileImage ? (
                  <img
                    src={trainer.profileImage}
                    alt={trainer.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-premium flex items-center justify-center text-white font-bold">
                    {trainer.name[0]}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white mb-1">{trainer.name} 트레이너</h3>
                <div className="flex items-center gap-1">
                  <Star size={12} className="text-cyber-yellow fill-cyber-yellow" />
                  <span className="text-sm text-gray-400">{trainer.rating}</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* 세션 타입 선택 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-lg font-bold text-white mb-3">세션 타입</h3>
          <div className="grid grid-cols-3 gap-2">
            {sessionTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setSelectedType(type.value as any)}
                className={`p-4 rounded-lg transition-all ${
                  selectedType === type.value
                    ? 'bg-gradient-energy text-white shadow-glow-orange'
                    : 'bg-cyber-mid text-gray-400 hover:text-white'
                }`}
              >
                <div className="font-bold mb-1">{type.label}</div>
                <div className="text-xs">{type.duration}분</div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* 캘린더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <div className="flex items-center justify-between mb-4">
              <button onClick={handlePrevMonth} className="text-gray-400 hover:text-white">
                ←
              </button>
              <h3 className="font-bold text-white">
                {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월
              </h3>
              <button onClick={handleNextMonth} className="text-gray-400 hover:text-white">
                →
              </button>
            </div>

            {/* 요일 */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['일', '월', '화', '수', '목', '금', '토'].map((day, idx) => (
                <div
                  key={idx}
                  className={`text-center text-xs font-bold ${
                    idx === 0 ? 'text-power-pink' : idx === 6 ? 'text-electric-blue' : 'text-gray-400'
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* 날짜 */}
            <div className="space-y-2">
              {calendar.map((week, weekIdx) => (
                <div key={weekIdx} className="grid grid-cols-7 gap-2">
                  {week.map((day, dayIdx) => {
                    const today = isToday(day);
                    const selected = isSelectedDay(day);

                    return (
                      <button
                        key={dayIdx}
                        onClick={() => handleDateClick(day)}
                        disabled={!day}
                        className={`aspect-square rounded-lg flex items-center justify-center text-sm transition-all ${
                          !day
                            ? 'invisible'
                            : selected
                            ? 'bg-electric-blue text-white font-bold shadow-glow-blue'
                            : today
                            ? 'bg-energy-orange/20 text-energy-orange font-bold'
                            : 'bg-cyber-mid text-gray-300 hover:bg-cyber-light'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* 시간 선택 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-bold text-white mb-3">시간 선택</h3>
          <div className="grid grid-cols-4 gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot.time}
                onClick={() => slot.available && setSelectedTime(slot.time)}
                disabled={!slot.available}
                className={`p-3 rounded-lg transition-all relative ${
                  selectedTime === slot.time
                    ? 'bg-gradient-energy text-white shadow-glow-orange'
                    : slot.available
                    ? 'bg-cyber-mid text-gray-300 hover:bg-cyber-light'
                    : 'bg-cyber-mid/30 text-gray-600 cursor-not-allowed'
                }`}
              >
                {slot.time}
                {slot.recommended && slot.available && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyber-yellow rounded-full animate-pulse" />
                )}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-cyber-yellow rounded-full" />
              <span>추천 시간</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-cyber-mid/30 rounded-full" />
              <span>예약 불가</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-16 left-0 right-0 max-w-[425px] mx-auto p-4 bg-gradient-to-t from-cyber-dark via-cyber-dark to-transparent">
        <Button
          variant="energy"
          size="lg"
          className="w-full"
          onClick={() => setShowConfirmModal(true)}
          disabled={!selectedTime}
          glow
          shine
        >
          <Calendar size={20} className="mr-2" />
          예약 확인
        </Button>
      </div>

      {/* 예약 확인 모달 */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="예약 확인"
      >
        <div className="space-y-4">
          <Card>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">트레이너</span>
                <span className="text-white font-bold">{trainer.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">세션 타입</span>
                <span className="text-white">
                  {sessionTypes.find((t) => t.value === selectedType)?.label}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">날짜</span>
                <span className="text-white">{selectedDate.toLocaleDateString('ko-KR')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">시간</span>
                <span className="text-white">{selectedTime}</span>
              </div>
            </div>
          </Card>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              className="flex-1"
              onClick={() => setShowConfirmModal(false)}
            >
              취소
            </Button>
            <Button variant="energy" className="flex-1" onClick={handleConfirmBooking} glow shine>
              <CheckCircle size={20} className="mr-2" />
              예약 완료
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

Task 9.5: 패키지 선택
파일: app/pt/package/page.tsx
typescript'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { CheckCircle, Award, Zap, TrendingUp } from 'lucide-react';
import { MOCK_PT_PACKAGES } from '@/data/mock/trainers';

export default function PackageSelectPage() {
  const router = useRouter();
  const [selectedPackage, setSelectedPackage] = useState('pkg1');

  const selectedPkg = MOCK_PT_PACKAGES.find((p) => p.id === selectedPackage);

  return (
    <div className="min-h-screen bg-cyber-dark pb-24">
      <Header title="패키지 선택" showBack={true} showNotification={false} />

      <div className="p-4 space-y-6">
        {/* AI 추천 안내 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card variant="hologram">
            <div className="flex items-center gap-3">
              <Zap size={32} className="text-cyber-yellow" />
              <div>
                <h3 className="font-bold text-white mb-1">AI 맞춤 추천</h3>
                <p className="text-sm text-gray-400">
                  회원님의 목표와 예산에 맞는 최적의 패키지를 추천합니다
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* 패키지 카드들 */}
        <div className="space-y-4">
          {MOCK_PT_PACKAGES.map((pkg, idx) => {
            const isRecommended = pkg.type === 'recommended';
            const isSelected = selectedPackage === pkg.id;

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.1 }}
              >
                <Card
                  variant={isRecommended ? 'hologram' : 'default'}
                  className={`relative ${
                    isSelected ? 'ring-2 ring-electric-blue' : ''
                  }`}
                  onClick={() => setSelectedPackage(pkg.id)}
                >
                  {isRecommended && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge type="premium" glow>
                        <Award size={14} className="mr-1" />
                        AI BEST
                      </Badge>
                    </div>
                  )}

                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-3xl font-bold text-gradient-energy">
                          {(pkg.price / 10000).toFixed(0)}
                        </span>
                        <span className="text-white">만원</span>
                      </div>
                      <div className="flex gap-3 text-sm text-gray-400">
                        <span>총 {pkg.sessions}회</span>
                        <span>·</span>
                        <span>{pkg.duration}분/회</span>
                      </div>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected
                          ? 'border-electric-blue bg-electric-blue'
                          : 'border-gray-600'
                      }`}
                    >
                      {isSelected && <CheckCircle size={16} className="text-white" />}
                    </div>
                  </div>

                  {/* 혜택 */}
                  <div className="space-y-2">
                    {pkg.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <CheckCircle size={16} className="text-neon-green flex-shrink-0 mt-0.5" />
                        {benefit}
                      </div>
                    ))}
                  </div>

                  {/* 1회당 가격 */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">1회당 가격</span>
                      <span className="font-bold text-electric-blue">
                        {Math.round(pkg.price / pkg.sessions / 1000)}천원
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* 패키지 비교 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={20} className="text-electric-blue" />
              <h3 className="font-bold text-white">패키지 비교</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 text-gray-400 font-normal">구분</th>
                    <th className="text-center py-2 text-white">16회</th>
                    <th className="text-center py-2 text-white">8회</th>
                    <th className="text-center py-2 text-white">4회</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="py-2 text-gray-400">1회당 가격</td>
                    <td className="text-center py-2 text-neon-green font-bold">75천원</td>
                    <td className="text-center py-2 text-white">80천원</td>
                    <td className="text-center py-2 text-white">85천원</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 text-gray-400">식단 관리</td>
                    <td className="text-center py-2">
                      <CheckCircle size={16} className="text-neon-green mx-auto" />
                    </td>
                    <td className="text-center py-2 text-gray-600">기본</td>
                    <td className="text-center py-2 text-gray-600">-</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-400">InBody</td>
                    <td className="text-center py-2 text-neon-green">무제한</td>
                    <td className="text-center py-2 text-white">월 1회</td>
                    <td className="text-center py-2 text-gray-600">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-16 left-0 right-0 max-w-[425px] mx-auto p-4 bg-gradient-to-t from-cyber-dark via-cyber-dark to-transparent">
        <div className="flex items-center justify-between mb-3 text-sm">
          <span className="text-gray-400">선택한 패키지</span>
          <div className="text-right">
            <div className="text-white font-bold">{selectedPkg?.name}</div>
            <div className="text-electric-blue font-bold">
              {selectedPkg && (selectedPkg.price / 10000).toFixed(0)}만원
            </div>
          </div>
        </div>
        <Button
          variant="energy"
          size="lg"
          className="w-full"
          onClick={() => router.push('/payment/checkout')}
          glow
          shine
        >
          결제하기
        </Button>
      </div>
    </div>
  );
}

Task 9.6: PT 현황
파일: app/pt/status/page.tsx
typescript'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import ProgressBar from '@/components/ui/ProgressBar';
import { Calendar, Clock, User, TrendingUp, Plus, Award } from 'lucide-react';
import { MOCK_PT_CONTRACT, MOCK_PT_SESSIONS, MOCK_TRAINERS } from '@/data/mock/trainers';

export default function PTStatusPage() {
  const router = useRouter();

  const contract = MOCK_PT_CONTRACT;
  const trainer = MOCK_TRAINERS.find((t) => t.id === contract.trainerId);
  const sessions = MOCK_PT_SESSIONS;

  const completedSessions = contract.totalSessions - contract.remainingSessions;
  const percentage = (completedSessions / contract.totalSessions) * 100;

  // 예상 완강일 계산
  const daysLeft = Math.ceil(
    (new Date(contract.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const statusLabels: { [key: string]: { label: string; color: string } } = {
    scheduled: { label: '예약됨', color: 'growth' },
    completed: { label: '완료', color: 'growth' },
    cancelled: { label: '취소', color: 'energy' },
    'no-show': { label: '불참', color: 'premium' },
  };

  return (
    <div className="min-h-screen bg-cyber-dark pb-24">
      <Header title="PT 현황" showBack={true} showNotification={false} />

      <div className="p-4 space-y-6">
        {/* 계약 정보 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card variant="hologram">
            <div className="text-center mb-4">
              <div className="text-sm text-gray-400 mb-2">남은 PT 횟수</div>
              <div className="text-5xl font-bold text-gradient-energy mb-2">
                {contract.remainingSessions}
                <span className="text-2xl text-gray-400">/{contract.totalSessions}</span>
              </div>
              <ProgressBar
                value={completedSessions}
                max={contract.totalSessions}
                color="green"
                className="mt-4"
              />
            </div>
          </Card>
        </motion.div>

        {/* 트레이너 정보 */}
        {trainer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <div className="flex items-center gap-3 mb-3">
                <User size={20} className="text-electric-blue" />
                <h3 className="font-bold text-white">담당 트레이너</h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  {trainer.profileImage ? (
                    <img
                      src={trainer.profileImage}
                      alt={trainer.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-premium flex items-center justify-center text-white text-xl font-bold">
                      {trainer.name[0]}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-white mb-1">{trainer.name} 트레이너</h4>
                  <div className="flex flex-wrap gap-2">
                    {trainer.specialty.slice(0, 2).map((spec, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-electric-blue/10 text-electric-blue rounded text-xs"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* 계약 기간 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 glass-dark rounded-lg">
                <Calendar size={20} className="text-neon-green mx-auto mb-2" />
                <div className="text-sm text-gray-400 mb-1">계약 기간</div>
                <div className="text-white font-bold">
                  {new Date(contract.startDate).toLocaleDateString('ko-KR', {
                    month: 'short',
                    day: 'numeric',
                  })}{' '}
                  ~{' '}
                  {new Date(contract.endDate).toLocaleDateString('ko-KR', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
              </div>
              <div className="text-center p-3 glass-dark rounded-lg">
                <TrendingUp size={20} className="text-electric-blue mx-auto mb-2" />
                <div className="text-sm text-gray-400 mb-1">예상 완강일</div>
                <div className="text-white font-bold">{daysLeft}일 남음</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* 예정된 세션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-white">예정된 세션</h3>
            <Button variant="ghost" size="sm" onClick={() => router.push('/pt/booking')}>
              <Plus size={16} className="mr-1" />
              예약 추가
            </Button>
          </div>
          {sessions.filter((s) => s.status === 'scheduled').length > 0 ? (
            <div className="space-y-2">
              {sessions
                .filter((s) => s.status === 'scheduled')
                .map((session) => (
                  <Card key={session.id}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-energy rounded-lg flex items-center justify-center">
                          <Calendar size={24} className="text-white" />
                        </div>
                        <div>
                          <div className="font-bold text-white mb-1">
                            {new Date(session.date).toLocaleDateString('ko-KR', {
                              month: 'long',
                              day: 'numeric',
                              weekday: 'short',
                            })}
                          </div>
                          <div className="text-sm text-gray-400">
                            {session.startTime} - {session.endTime}
                          </div>
                        </div>
                      </div>
                      <Badge type="growth">예약됨</Badge>
                    </div>
                  </Card>
                ))}
            </div>
          ) : (
            <Card>
              <div className="text-center py-8 text-gray-400">
                예정된 세션이 없습니다
                <br />
                <Button
                  variant="energy"
                  size="sm"
                  className="mt-4"
                  onClick={() => router.push('/pt/booking')}
                >
                  예약하기
                </Button>
              </div>
            </Card>
          )}
        </motion.div>

        {/* 지난 세션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-bold text-white mb-3">지난 세션</h3>
          <div className="space-y-2">
            {sessions
              .filter((s) => s.status === 'completed')
              .map((session) => (
                <Card key={session.id}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock size={16} className="text-neon-green" />
                        <span className="font-bold text-white">
                          {new Date(session.date).toLocaleDateString('ko-KR')}
                        </span>
                        <Badge type="growth">완료</Badge>
                      </div>
                      <div className="text-sm text-gray-400 mb-2">
                        {session.startTime} - {session.endTime}
                      </div>
                      {session.notes && (
                        <p className="text-sm text-gray-300 p-3 glass-dark rounded-lg">
                          {session.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </motion.div>

        {/* 추가 구매 안내 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card variant="glass" className="gradient-border">
            <div className="flex items-center gap-3">
              <Award size={32} className="text-tech-purple" />
              <div className="flex-1">
                <h4 className="font-bold text-white mb-1">추가 구매 혜택</h4>
                <p className="text-sm text-gray-400">
                  현재 패키지 기간 내 추가 구매 시 10% 할인 혜택을 드립니다
                </p>
              </div>
            </div>
            <Button
              variant="premium"
              size="md"
              className="w-full mt-4"
              onClick={() => router.push('/pt/package')}
            >
              패키지 추가 구매
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

✅ PHASE 9 완료 체크리스트:

 트레이너 추천 (AI 매칭)
 트레이너 상세 프로필
 PT 예약 캘린더 (월별, 시간 슬롯)
 패키지 선택 및 비교
 PT 현황 (남은 횟수, 예정/완료 세션)