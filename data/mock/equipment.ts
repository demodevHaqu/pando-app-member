import { Equipment } from '@/types/equipment';

export const MOCK_EQUIPMENT: Equipment[] = [
  {
    id: 'eq1',
    name: '스쿼트 랙',
    category: 'strength',
    location: '웨이트 구역 A',
    qrCode: 'QR-SQ-001',
    status: 'available',
    videoUrls: {
      basic: 'https://example.com/videos/squat-rack-basic.mp4',
      intermediate: 'https://example.com/videos/squat-rack-intermediate.mp4',
      advanced: 'https://example.com/videos/squat-rack-advanced.mp4',
    },
    exercises: [
      {
        id: 'ex1',
        name: 'Barbell Squat',
        nameKo: '바벨 스쿼트',
        difficulty: 3,
        muscleGroups: ['quadriceps', 'glutes', 'hamstrings'],
      },
      {
        id: 'ex1-2',
        name: 'Front Squat',
        nameKo: '프론트 스쿼트',
        difficulty: 4,
        muscleGroups: ['quadriceps', 'core'],
      },
    ],
  },
  {
    id: 'eq2',
    name: '벤치프레스',
    category: 'strength',
    location: '웨이트 구역 B',
    qrCode: 'QR-BP-001',
    status: 'available',
    videoUrls: {
      basic: 'https://example.com/videos/bench-press-basic.mp4',
      intermediate: 'https://example.com/videos/bench-press-intermediate.mp4',
      advanced: 'https://example.com/videos/bench-press-advanced.mp4',
    },
    exercises: [
      {
        id: 'ex3',
        name: 'Bench Press',
        nameKo: '벤치프레스',
        difficulty: 3,
        muscleGroups: ['chest', 'triceps', 'shoulders'],
      },
      {
        id: 'ex3-2',
        name: 'Incline Bench Press',
        nameKo: '인클라인 벤치프레스',
        difficulty: 3,
        muscleGroups: ['chest', 'shoulders'],
      },
    ],
  },
  {
    id: 'eq3',
    name: '케이블 머신',
    category: 'strength',
    location: '웨이트 구역 C',
    qrCode: 'QR-CB-001',
    status: 'available',
    videoUrls: {
      basic: 'https://example.com/videos/cable-basic.mp4',
      intermediate: 'https://example.com/videos/cable-intermediate.mp4',
      advanced: 'https://example.com/videos/cable-advanced.mp4',
    },
    exercises: [
      {
        id: 'ex5',
        name: 'Cable Chest Fly',
        nameKo: '케이블 체스트 플라이',
        difficulty: 2,
        muscleGroups: ['chest'],
      },
      {
        id: 'ex6',
        name: 'Cable Row',
        nameKo: '케이블 로우',
        difficulty: 2,
        muscleGroups: ['back'],
      },
    ],
  },
];

export const MOCK_SCANNED_ITEMS = [
  {
    id: 'scan1',
    equipmentId: 'eq1',
    equipmentName: '스쿼트 랙',
    scannedAt: new Date(Date.now() - 3600000).toISOString(),
    location: '웨이트 구역 A',
  },
  {
    id: 'scan2',
    equipmentId: 'eq2',
    equipmentName: '벤치프레스',
    scannedAt: new Date(Date.now() - 7200000).toISOString(),
    location: '웨이트 구역 B',
  },
];
