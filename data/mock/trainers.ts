import { Trainer, PTPackage, PTSession } from '@/types/pt';

// 회원의 PT 멤버십 정보
export interface PTMembership {
  memberId: string;
  trainerId: string;
  packageId: string;
  totalSessions: number;
  usedSessions: number;
  remainingSessions: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'paused';
}

// 회원의 PT 멤버십 mock 데이터
export const MOCK_PT_MEMBERSHIP: PTMembership = {
  memberId: 'member1',
  trainerId: 'trainer1',
  packageId: 'pkg1',
  totalSessions: 16,
  usedSessions: 12,
  remainingSessions: 4,
  startDate: '2025-01-01',
  endDate: '2025-06-30',
  status: 'active',
};

// PT 예약 세션 mock 데이터
export const MOCK_PT_SESSIONS: PTSession[] = [
  {
    id: 'session1',
    trainerId: 'trainer1',
    memberId: 'member1',
    packageId: 'pkg1',
    date: '2025-01-10',
    startTime: '10:00',
    endTime: '11:00',
    status: 'completed',
    type: 'pt',
    notes: '스쿼트 자세 교정 완료',
  },
  {
    id: 'session2',
    trainerId: 'trainer1',
    memberId: 'member1',
    packageId: 'pkg1',
    date: '2025-01-13',
    startTime: '14:00',
    endTime: '15:00',
    status: 'completed',
    type: 'pt',
  },
  // 다음 예약이 있는 경우 - 이 데이터를 주석 처리하면 "예약 없음" 상태 테스트 가능
  // {
  //   id: 'session3',
  //   trainerId: 'trainer1',
  //   memberId: 'member1',
  //   packageId: 'pkg1',
  //   date: '2025-01-20',
  //   startTime: '10:00',
  //   endTime: '11:00',
  //   status: 'scheduled',
  //   type: 'pt',
  // },
];

// 다음 PT 예약 가져오기 헬퍼 함수
export const getNextPTSession = (memberId: string): PTSession | null => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingSessions = MOCK_PT_SESSIONS
    .filter(session =>
      session.memberId === memberId &&
      session.status === 'scheduled' &&
      new Date(session.date) >= today
    )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return upcomingSessions.length > 0 ? upcomingSessions[0] : null;
};

// PT 잔여 회차 가져오기 헬퍼 함수
export const getPTRemainingSessions = (memberId: string): number => {
  if (MOCK_PT_MEMBERSHIP.memberId === memberId && MOCK_PT_MEMBERSHIP.status === 'active') {
    return MOCK_PT_MEMBERSHIP.remainingSessions;
  }
  return 0;
};

// PT 멤버십 보유 여부 확인 헬퍼 함수
export const hasPTMembership = (memberId: string): boolean => {
  return MOCK_PT_MEMBERSHIP.memberId === memberId && MOCK_PT_MEMBERSHIP.status === 'active';
};

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
    bio: '10년 경력의 다이어트 전문 트레이너입니다.',
    certifications: ['NSCA-CPT', 'ACSM-CPT'],
    matchScore: 95,
  },
  {
    id: 'trainer2',
    name: '이효리',
    profileImage: 'https://i.pravatar.cc/150?img=8',
    gender: 'female',
    specialty: ['근비대', '파워리프팅'],
    experience: 7,
    rating: 4.8,
    reviewCount: 89,
    bio: '파워리프팅 대회 입상 경력.',
    certifications: ['NSCA-CSCS'],
    matchScore: 88,
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
    benefits: ['주 2-3회 트레이닝', '식단 관리 포함', 'InBody 측정 무제한'],
  },
  {
    id: 'pkg2',
    name: '균형형',
    sessions: 8,
    price: 640000,
    duration: 30,
    type: 'balanced',
    benefits: ['주 1-2회 트레이닝', '기본 식단 가이드'],
  },
];