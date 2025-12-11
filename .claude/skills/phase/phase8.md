🎯 PHASE 8: GX 스케줄 및 예약
Task 8.1: 타입 정의 및 Mock 데이터
파일: types/gx.ts
typescriptexport interface GXClass {
  id: string;
  name: string;
  instructor: Instructor;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  capacity: number;
  enrolled: number;
  waitlist: number;
  type: 'yoga' | 'pilates' | 'spinning' | 'zumba' | 'crossfit' | 'boxing';
  level: 'beginner' | 'intermediate' | 'advanced';
  location: string;
  description: string;
  imageUrl?: string;
}

export interface Instructor {
  id: string;
  name: string;
  profileImage?: string;
  specialty: string[];
  experience: number;
  rating: number;
  reviewCount: number;
  bio: string;
}

export interface GXAttendance {
  id: string;
  memberId: string;
  classId: string;
  status: 'enrolled' | 'waitlist' | 'attended' | 'cancelled' | 'no-show';
  enrolledAt: string;
  rating?: number;
  review?: string;
}
파일: data/mock/gxClasses.ts
typescriptimport { GXClass, Instructor, GXAttendance } from '@/types/gx';

export const MOCK_INSTRUCTORS: Instructor[] = [
  {
    id: 'instructor1',
    name: '박지현',
    profileImage: 'https://i.pravatar.cc/150?img=5',
    specialty: ['요가', '필라테스'],
    experience: 8,
    rating: 4.9,
    reviewCount: 127,
    bio: '국제 요가 자격증 보유. 10년 경력의 베테랑 강사입니다. 초보자도 쉽게 따라할 수 있는 친절한 수업으로 유명합니다.',
  },
  {
    id: 'instructor2',
    name: '이민호',
    profileImage: 'https://i.pravatar.cc/150?img=13',
    specialty: ['스피닝', '크로스핏'],
    experience: 5,
    rating: 4.7,
    reviewCount: 89,
    bio: '체육교육과 출신. 고강도 운동 전문가입니다. 에너지 넘치는 수업으로 참여자들의 동기부여를 이끌어냅니다.',
  },
  {
    id: 'instructor3',
    name: '최수영',
    profileImage: 'https://i.pravatar.cc/150?img=9',
    specialty: ['줌바', '복싱'],
    experience: 6,
    rating: 4.8,
    reviewCount: 156,
    bio: '댄스 전공 출신의 열정적인 강사. 즐거운 운동 경험을 선사합니다.',
  },
];

export const MOCK_GX_CLASSES: GXClass[] = [
  {
    id: 'gx1',
    name: '아침 요가',
    instructor: MOCK_INSTRUCTORS[0],
    date: '2025-01-16',
    startTime: '10:00',
    endTime: '11:00',
    duration: 60,
    capacity: 15,
    enrolled: 12,
    waitlist: 0,
    type: 'yoga',
    level: 'beginner',
    location: 'GX룸 A',
    description: '하루를 시작하는 부드러운 요가 클래스. 스트레칭과 호흡에 집중합니다.',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
  },
  {
    id: 'gx2',
    name: '파워 스피닝',
    instructor: MOCK_INSTRUCTORS[1],
    date: '2025-01-16',
    startTime: '14:00',
    endTime: '14:45',
    duration: 45,
    capacity: 20,
    enrolled: 18,
    waitlist: 0,
    type: 'spinning',
    level: 'intermediate',
    location: '스피닝룸',
    description: '고강도 인터벌 사이클링. 짧은 시간에 최대 칼로리 소모!',
    imageUrl: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400',
  },
  {
    id: 'gx3',
    name: '저녁 필라테스',
    instructor: MOCK_INSTRUCTORS[0],
    date: '2025-01-16',
    startTime: '19:00',
    endTime: '20:00',
    duration: 60,
    capacity: 15,
    enrolled: 15,
    waitlist: 2,
    type: 'pilates',
    level: 'intermediate',
    location: 'GX룸 B',
    description: '코어 강화 필라테스. 체형 교정과 근력 향상에 효과적입니다.',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400',
  },
  {
    id: 'gx4',
    name: '점심 줌바',
    instructor: MOCK_INSTRUCTORS[2],
    date: '2025-01-16',
    startTime: '12:30',
    endTime: '13:15',
    duration: 45,
    capacity: 20,
    enrolled: 15,
    waitlist: 0,
    type: 'zumba',
    level: 'beginner',
    location: 'GX룸 A',
    description: '신나는 음악과 함께하는 댄스 운동! 누구나 쉽게 따라할 수 있습니다.',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400',
  },
  {
    id: 'gx5',
    name: '새벽 크로스핏',
    instructor: MOCK_INSTRUCTORS[1],
    date: '2025-01-17',
    startTime: '06:00',
    endTime: '07:00',
    duration: 60,
    capacity: 12,
    enrolled: 10,
    waitlist: 0,
    type: 'crossfit',
    level: 'advanced',
    location: '크로스핏존',
    description: '하루를 활기차게 시작하는 고강도 크로스핏. 중급자 이상 권장.',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
  },
];

export const MOCK_GX_ATTENDANCE: GXAttendance[] = [
  {
    id: 'attend1',
    memberId: 'member1',
    classId: 'gx1',
    status: 'enrolled',
    enrolledAt: '2025-01-15T09:00:00Z',
  },
  {
    id: 'attend2',
    memberId: 'member1',
    classId: 'gx3',
    status: 'waitlist',
    enrolledAt: '2025-01-15T10:00:00Z',
  },
];

Task 8.2: GX 스케줄 메인
파일: app/gx/page.tsx
typescript'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import ProgressBar from '@/components/ui/ProgressBar';
import { Calendar, Clock, Users, MapPin, ChevronRight } from 'lucide-react';
import { MOCK_GX_CLASSES, MOCK_GX_ATTENDANCE } from '@/data/mock/gxClasses';

export default function GXSchedulePage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'today' | 'week'>('today');

  // 날짜별 필터
  const todayClasses = MOCK_GX_CLASSES.filter((gx) => {
    const classDate = new Date(gx.date);
    return classDate.toDateString() === selectedDate.toDateString();
  });

  const weekClasses = MOCK_GX_CLASSES;

  const displayClasses = viewMode === 'today' ? todayClasses : weekClasses;

  // 내 예약 확인
  const myEnrollments = MOCK_GX_ATTENDANCE;

  const isEnrolled = (classId: string) => {
    return myEnrollments.some((a) => a.classId === classId && a.status === 'enrolled');
  };

  const isWaitlist = (classId: string) => {
    return myEnrollments.some((a) => a.classId === classId && a.status === 'waitlist');
  };

  // 주간 날짜 생성
  const getWeekDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates();

  const getClassStatus = (gx: any) => {
    if (isEnrolled(gx.id)) return { label: '예약완료', color: 'growth' };
    if (isWaitlist(gx.id)) return { label: '대기중', color: 'energy' };
    if (gx.enrolled >= gx.capacity) return { label: '마감', color: 'premium' };
    return { label: '예약가능', color: 'growth' };
  };

  return (
    <div className="min-h-screen bg-cyber-dark">
      <Header title="GX 스케줄" showBack={false} showNotification={true} />

      <div className="p-4 space-y-6">
        {/* 뷰 모드 토글 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('today')}
              className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                viewMode === 'today'
                  ? 'bg-gradient-energy text-white shadow-glow-orange'
                  : 'bg-cyber-mid text-gray-400'
              }`}
            >
              오늘
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                viewMode === 'week'
                  ? 'bg-gradient-energy text-white shadow-glow-orange'
                  : 'bg-cyber-mid text-gray-400'
              }`}
            >
              이번 주
            </button>
          </div>
        </motion.div>

        {/* 날짜 선택 (주간 뷰) */}
        {viewMode === 'week' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
              {weekDates.map((date, idx) => {
                const isSelected = date.toDateString() === selectedDate.toDateString();
                const dayLabel = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];

                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedDate(date)}
                    className={`flex-shrink-0 w-16 py-3 rounded-lg transition-all ${
                      isSelected
                        ? 'bg-electric-blue text-white'
                        : 'bg-cyber-mid text-gray-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs mb-1">{dayLabel}</div>
                    <div className="text-lg font-bold">{date.getDate()}</div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* 내 예약 현황 */}
        {myEnrollments.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card variant="hologram">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <Calendar size={20} className="text-electric-blue" />
                  내 예약
                </h3>
                <button
                  onClick={() => router.push('/gx/history')}
                  className="text-electric-blue text-sm hover:underline"
                >
                  전체 보기 →
                </button>
              </div>
              <div className="space-y-2">
                {myEnrollments.map((attendance) => {
                  const gxClass = MOCK_GX_CLASSES.find((g) => g.id === attendance.classId);
                  if (!gxClass) return null;

                  return (
                    <div
                      key={attendance.id}
                      className="flex items-center justify-between p-3 glass-dark rounded-lg"
                    >
                      <div>
                        <div className="font-bold text-white mb-1">{gxClass.name}</div>
                        <div className="text-sm text-gray-400">
                          {gxClass.startTime} · {gxClass.instructor.name}
                        </div>
                      </div>
                      <Badge
                        type={attendance.status === 'enrolled' ? 'growth' : 'energy'}
                      >
                        {attendance.status === 'enrolled' ? '예약완료' : '대기중'}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </Card>
          </motion.div>
        )}

        {/* 클래스 리스트 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-white">
              {viewMode === 'today' ? '오늘의 클래스' : '이번 주 클래스'}
            </h3>
            <span className="text-sm text-gray-400">{displayClasses.length}개</span>
          </div>

          {displayClasses.length === 0 ? (
            <Card>
              <div className="text-center py-8 text-gray-400">
                선택한 날짜에 예정된 클래스가 없습니다.
              </div>
            </Card>
          ) : (
            <div className="space-y-3">
              {displayClasses.map((gx, idx) => {
                const percentage = (gx.enrolled / gx.capacity) * 100;
                const status = getClassStatus(gx);
                const isFull = gx.enrolled >= gx.capacity;

                return (
                  <motion.div
                    key={gx.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + idx * 0.05 }}
                  >
                    <Card glow onClick={() => router.push(`/gx/${gx.id}`)}>
                      <div className="flex gap-4">
                        {/* 시간 */}
                        <div className="flex-shrink-0">
                          <div className="text-3xl font-bold text-glow-green">
                            {gx.startTime}
                          </div>
                          <div className="text-xs text-gray-400 text-center mt-1">
                            {gx.duration}분
                          </div>
                        </div>

                        {/* 정보 */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-bold text-white mb-1">{gx.name}</h4>
                              <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                                <Users size={14} />
                                <span>{gx.instructor.name}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-400">
                                <MapPin size={14} />
                                <span>{gx.location}</span>
                              </div>
                            </div>
                            <Badge type={status.color as any}>{status.label}</Badge>
                          </div>

                          {/* 정원 현황 */}
                          <div className="mt-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-gray-400">
                                {gx.enrolled}/{gx.capacity}명
                              </span>
                              {gx.waitlist > 0 && (
                                <span className="text-xs text-cyber-yellow">
                                  대기 {gx.waitlist}명
                                </span>
                              )}
                            </div>
                            <ProgressBar
                              value={gx.enrolled}
                              max={gx.capacity}
                              color={percentage > 80 ? 'orange' : 'green'}
                            />
                          </div>
                        </div>

                        <ChevronRight size={20} className="text-gray-500 flex-shrink-0" />
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

Task 8.3: GX 클래스 상세파일: app/gx/[classId]/page.tsxtypescript'use client';

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
}Task 8.4: 내 GX 기록파일: app/gx/history/page.tsxtypescript'use client';

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
}✅ PHASE 8 완료 체크리스트:

 GX 스케줄 메인 (오늘/주간 뷰, 내 예약)
 GX 클래스 상세 (정원, 강사, 리뷰)
 예약/취소 모달
 내 GX 기록 (참여 이력, 출석률, 통계)