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
