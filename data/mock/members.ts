import { Member, Badge } from '@/types';

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
  level: 5,
  badges: MOCK_BADGES,
  goals: ['체중 감량', '근비대', '체력 향상'],
  preferences: ['코칭 선호', '활기찬 분위기'],
  painAreas: ['허리', '무릎'],
  injuries: [],
};