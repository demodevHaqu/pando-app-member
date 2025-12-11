🎯 PHASE 4: 홈 화면 (대시보드)
Task 4.1: 타입 정의 및 Mock 데이터
파일: types/index.ts
typescriptexport interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: 'male' | 'female';
  birthDate: string;
  profileImage?: string;
  membershipType: 'basic' | 'premium' | 'vip';
  membershipStartDate: string;
  membershipEndDate: string;
  lockerNumber?: string;
  lockerEndDate?: string;
  points: number;
  badges: Badge[];
  goals: string[];
  preferences: string[];
  painAreas?: string[];
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedAt: string;
  type: 'energy' | 'growth' | 'premium';
}

export interface Notification {
  id: string;
  type: 'renewal' | 'pt' | 'gx' | 'at-risk' | 'event' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}
파일: data/mock/members.ts
typescriptimport { Member, Badge } from '@/types';

export const MOCK_BADGES: Badge[] = [
  {
    id: 'badge1',
    name: '온보딩 완료',
    icon: '🎯',
    description: '첫 루틴을 시작했어요',
    earnedAt: '2025-01-05',
    type: 'growth',
  },
  {
    id: 'badge2',
    name: '7일 연속',
    icon: '🔥',
    description: '7일 연속 출석했어요',
    earnedAt: '2025-01-12',
    type: 'energy',
  },
  {
    id: 'badge3',
    name: 'PT 시작',
    icon: '💪',
    description: '첫 PT 세션을 완료했어요',
    earnedAt: '2025-01-08',
    type: 'premium',
  },
];

export const MOCK_MEMBER: Member = {
  id: 'member1',
  name: '김철수',
  email: 'kimcs@example.com',
  phone: '010-1234-5678',
  gender: 'male',
  birthDate: '1990-05-15',
  profileImage: 'https://i.pravatar.cc/150?img=12',
  membershipType: 'premium',
  membershipStartDate: '2025-01-01',
  membershipEndDate: '2025-12-31',
  lockerNumber: 'A-42',
  lockerEndDate: '2025-12-31',
  points: 3450,
  badges: MOCK_BADGES,
  goals: ['체중 감량', '근비대', '체력 향상'],
  preferences: ['코칭 선호', '활기찬 분위기'],
  painAreas: ['허리', '무릎'],
};
파일: data/mock/notifications.ts
typescriptimport { Notification } from '@/types';

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'noti1',
    type: 'renewal',
    title: '회원권 만료 7일 전',
    message: '회원권이 2025-01-22에 만료됩니다. 지금 재등록하고 10% 할인 받으세요!',
    isRead: false,
    createdAt: '2025-01-15T09:00:00Z',
    actionUrl: '/payment/renewal',
  },
  {
    id: 'noti2',
    type: 'pt',
    title: 'PT 예약 확정',
    message: '1월 16일 10:00 강동원 트레이너님과의 PT 세션이 예약되었습니다.',
    isRead: false,
    createdAt: '2025-01-15T14:30:00Z',
    actionUrl: '/pt/status',
  },
  {
    id: 'noti3',
    type: 'gx',
    title: 'GX 대기 → 확정',
    message: '오늘 19:00 저녁 필라테스 수업에 자리가 생겼습니다!',
    isRead: true,
    createdAt: '2025-01-15T16:00:00Z',
    actionUrl: '/gx',
  },
];

Task 4.2: 홈 화면
파일: app/page.tsx
typescript'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import ProgressBar from '@/components/ui/ProgressBar';
import { MOCK_MEMBER } from '@/data/mock/members';
import { MOCK_NOTIFICATIONS } from '@/data/mock/notifications';

export default function HomePage() {
  const router = useRouter();
  const member = MOCK_MEMBER;
  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.isRead).length;

  // Mock data for today
  const todayRoutine = {
    name: '오늘의 AI 루틴',
    exercises: [
      { nameKo: '스쿼트' },
      { nameKo: '데드리프트' },
      { nameKo: '벤치프레스' },
      { nameKo: '플랭크' },
      { nameKo: '버피' },
    ],
    duration: 45,
  };

  const todayGX = [
    {
      id: 'gx1',
      name: '아침 요가',
      instructor: '박지현',
      startTime: '10:00',
      location: 'GX룸 A',
      enrolled: 12,
      capacity: 15,
    },
    {
      id: 'gx2',
      name: '파워 스피닝',
      instructor: '이민호',
      startTime: '14:00',
      location: '스피닝룸',
      enrolled: 18,
      capacity: 20,
    },
    {
      id: 'gx3',
      name: '저녁 필라테스',
      instructor: '박지현',
      startTime: '19:00',
      location: 'GX룸 B',
      enrolled: 15,
      capacity: 15,
    },
  ];

  return (
    <div className="min-h-screen bg-cyber-dark">
      <Header showBack={false} showNotification={true} notificationCount={unreadCount} />

      <div className="p-4 space-y-6 pb-8">
        {/* 인사 */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-gradient-energy mb-1">
            안녕하세요, {member.name}님 💪
          </h1>
          <p className="text-gray-400">오늘도 한계를 뛰어넘어봐요!</p>
        </motion.div>

        {/* 오늘의 AI 루틴 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card variant="hologram" glow className="animate-energy-pulse">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-glow-blue mb-1">🤖 오늘의 AI 루틴</h2>
                <p className="text-sm text-gray-400">
                  {todayRoutine.exercises.length}개 운동 · {todayRoutine.duration}분
                </p>
              </div>
              <Badge type="energy" glow>
                NEW
              </Badge>
            </div>

            <div className="flex gap-2 mb-4 overflow-x-auto pb-2 hide-scrollbar">
              {todayRoutine.exercises.map((exercise, i) => (
                <div key={i} className="px-3 py-2 glass-dark rounded-lg text-sm whitespace-nowrap">
                  {exercise.nameKo}
                </div>
              ))}
            </div>

            <Button
              variant="energy"
              size="lg"
              glow
              shine
              onClick={() => router.push('/routine')}
              className="w-full"
            >
              시작하기 ⚡
            </Button>
          </Card>
        </motion.div>

        {/* PT 예약 */}
        {member.membershipType !== 'basic' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card variant="glass" className="gradient-border">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-white">PT 세션</h3>
                    <Badge type="premium">4회 남음</Badge>
                  </div>
                  <p className="text-sm text-gray-400">다음 PT 예약을 잡아보세요</p>
                </div>
                <Button variant="premium" size="sm" onClick={() => router.push('/pt')}>
                  예약하기
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* 오늘의 GX */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-white text-lg">오늘의 GX 클래스</h3>
            <button
              onClick={() => router.push('/gx')}
              className="text-electric-blue text-sm hover:underline"
            >
              전체 보기 →
            </button>
          </div>

          <div className="space-y-3">
            {todayGX.map((gx) => {
              const percentage = (gx.enrolled / gx.capacity) * 100;
              const isFull = gx.enrolled >= gx.capacity;
              const color = percentage > 80 ? 'orange' : 'green';

              return (
                <Card key={gx.id} glow onClick={() => router.push(`/gx/${gx.id}`)}>
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold text-glow-green">{gx.startTime}</div>
                    <div className="flex-1">
                      <div className="font-bold text-white mb-1">{gx.name}</div>
                      <div className="text-sm text-gray-400 mb-2">
                        {gx.instructor} · {gx.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">
                          {gx.enrolled}/{gx.capacity}
                        </span>
                        <ProgressBar
                          value={gx.enrolled}
                          max={gx.capacity}
                          color={color}
                          className="flex-1"
                        />
                      </div>
                    </div>
                    {isFull && <Badge type="energy">마감</Badge>}
                  </div>
                </Card>
              );
            })}
          </div>
        </motion.div>

        {/* 리커버리 추천 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card variant="hologram">
            <div className="flex items-center gap-4">
              <div className="text-4xl animate-float">🧘‍♂️</div>
              <div className="flex-1">
                <h3 className="font-bold text-white mb-1">AI 추천: 리커버리 데이</h3>
                <p className="text-sm text-gray-400">
                  최근 3일간 고강도 운동을 하셨네요. 오늘은 회복에 집중하세요!
                </p>
              </div>
              <Button variant="growth" size="sm" onClick={() => router.push('/stretching')}>
                시작
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* 포인트/배지 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card glow onClick={() => router.push('/rewards')}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-400 mb-1">보유 포인트</div>
                <div className="text-3xl font-bold text-gradient-energy">
                  {member.points.toLocaleString()} P
                </div>
              </div>
              <div className="flex gap-2">
                {member.badges.slice(0, 3).map((badge, i) => (
                  <div
                    key={badge.id}
                    className="w-12 h-12 glass rounded-full flex items-center justify-center text-2xl animate-scale-pop"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {badge.icon}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

✅ PHASE 4 완료 체크리스트:

 홈 화면 구현
 오늘의 AI 루틴 카드
 PT 예약 배너 (조건부)
 GX 스케줄 미리보기
 리커버리 추천
 포인트/배지 요약