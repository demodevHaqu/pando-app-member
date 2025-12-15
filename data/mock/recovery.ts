import { RecoveryZone, SaunaSession } from '@/types/recovery';

export const MOCK_RECOVERY_ZONES: RecoveryZone[] = [
  {
    id: 'sauna',
    name: '사우나',
    icon: '🧖',
    description: '혈액순환 촉진 및 근육 이완',
    benefits: ['근육 회복', '스트레스 해소', '수면 개선'],
    recommendedDuration: 15,
    maxDuration: 20,
    temperature: 80,
  },
  {
    id: 'ice-bath',
    name: '아이스 배스',
    icon: '❄️',
    description: '염증 감소 및 빠른 회복',
    benefits: ['염증 감소', '통증 완화', '회복 촉진'],
    recommendedDuration: 10,
    maxDuration: 15,
    temperature: 10,
  },
  {
    id: 'massage',
    name: '마사지 존',
    icon: '💆',
    description: '근막 이완 및 통증 완화',
    benefits: ['근막 이완', '통증 완화', '순환 개선'],
    recommendedDuration: 20,
    maxDuration: 30,
  },
  {
    id: 'meditation',
    name: '명상/휴식 존',
    icon: '🧘',
    description: '정신적 회복 및 릴랙스',
    benefits: ['스트레스 해소', '집중력 향상', '정신 회복'],
    recommendedDuration: 15,
    maxDuration: 30,
  },
];

export const MOCK_SAUNA_SESSION: SaunaSession | null = null;

export const MOCK_RECOVERY_RECOMMENDATIONS = [
  {
    id: 'rec1',
    title: '사우나 추천',
    reason: '오늘 고강도 하체 운동을 하셨네요',
    duration: 15,
    zoneId: 'sauna',
  },
  {
    id: 'rec2',
    title: '스트레칭 권장',
    reason: '어깨 가동성 개선이 필요합니다',
    duration: 20,
    zoneId: 'stretching',
  },
];

// 리커버리 프로그램 데이터
export interface RecoveryProgram {
  id: string;
  name: string;
  icon: string;
  type: 'stretching' | 'foam-roller' | 'breathing' | 'meditation';
  duration: number;
  description: string;
  steps: RecoveryStep[];
  youtubeId?: string;
}

export interface RecoveryStep {
  step: number;
  title: string;
  duration: number;
  description: string;
}

export const MOCK_RECOVERY_PROGRAMS: RecoveryProgram[] = [
  {
    id: 'prog1',
    name: '하체 스트레칭 루틴',
    icon: '🦵',
    type: 'stretching',
    duration: 10,
    description: '하체 운동 후 근육 이완을 위한 스트레칭',
    youtubeId: 'FDwpEdxZ4H4',
    steps: [
      { step: 1, title: '햄스트링 스트레칭', duration: 60, description: '양쪽 다리 번갈아 30초씩' },
      { step: 2, title: '대퇴사두근 스트레칭', duration: 60, description: '서서 뒤로 다리 당기기' },
      { step: 3, title: '고관절 스트레칭', duration: 60, description: '런지 자세로 스트레칭' },
      { step: 4, title: '종아리 스트레칭', duration: 60, description: '벽에 손 짚고 스트레칭' },
    ],
  },
  {
    id: 'prog2',
    name: '폼롤러 전신 릴리즈',
    icon: '🧴',
    type: 'foam-roller',
    duration: 15,
    description: '폼롤러를 이용한 전신 근막 이완',
    youtubeId: 'SxSmBbC5_4o',
    steps: [
      { step: 1, title: '등 롤링', duration: 120, description: '상부-중부-하부 순서대로' },
      { step: 2, title: '햄스트링 롤링', duration: 90, description: '천천히 위아래로 롤링' },
      { step: 3, title: 'IT밴드 롤링', duration: 90, description: '측면 허벅지 롤링' },
      { step: 4, title: '종아리 롤링', duration: 90, description: '가자미근, 비복근 롤링' },
    ],
  },
  {
    id: 'prog3',
    name: '4-7-8 호흡법',
    icon: '🌬️',
    type: 'breathing',
    duration: 5,
    description: '긴장 완화와 수면 유도를 위한 호흡법',
    youtubeId: 'YRPh_GaiL8s',
    steps: [
      { step: 1, title: '자세 잡기', duration: 30, description: '편안한 자세로 앉거나 눕기' },
      { step: 2, title: '4초 들이마시기', duration: 60, description: '코로 4초간 천천히 들이마시기' },
      { step: 3, title: '7초 참기', duration: 60, description: '숨을 7초간 참기' },
      { step: 4, title: '8초 내쉬기', duration: 60, description: '입으로 8초간 천천히 내쉬기' },
    ],
  },
  {
    id: 'prog4',
    name: '상체 스트레칭 루틴',
    icon: '💪',
    type: 'stretching',
    duration: 8,
    description: '상체 운동 후 어깨, 가슴, 팔 스트레칭',
    youtubeId: 'SEdqd1n0cvg',
    steps: [
      { step: 1, title: '어깨 스트레칭', duration: 60, description: '양팔 번갈아 가슴 앞으로' },
      { step: 2, title: '삼두근 스트레칭', duration: 60, description: '팔꿈치 위로 당기기' },
      { step: 3, title: '가슴 스트레칭', duration: 60, description: '벽에 팔 대고 스트레칭' },
      { step: 4, title: '목 스트레칭', duration: 60, description: '좌우, 앞뒤로 천천히' },
    ],
  },
];

// 이용 기록 타입
export interface RecoveryUsageRecord {
  id: string;
  programId: string;
  programName: string;
  zoneId?: string;
  zoneName?: string;
  startedAt: string;
  completedAt?: string;
  duration: number;
  completed: boolean;
}

// 이용 기록 Mock 데이터
export const MOCK_RECOVERY_USAGE_HISTORY: RecoveryUsageRecord[] = [
  {
    id: 'usage1',
    programId: 'prog1',
    programName: '하체 스트레칭 루틴',
    zoneId: 'massage',
    zoneName: '마사지 존',
    startedAt: new Date(Date.now() - 86400000).toISOString(),
    completedAt: new Date(Date.now() - 86400000 + 600000).toISOString(),
    duration: 10,
    completed: true,
  },
  {
    id: 'usage2',
    programId: 'prog3',
    programName: '4-7-8 호흡법',
    zoneId: 'meditation',
    zoneName: '명상/휴식 존',
    startedAt: new Date(Date.now() - 172800000).toISOString(),
    completedAt: new Date(Date.now() - 172800000 + 300000).toISOString(),
    duration: 5,
    completed: true,
  },
];
