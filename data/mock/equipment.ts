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
    youtubeVideos: {
      basic: 'Dy28eq2PjcM',      // 스쿼트 기초
      intermediate: 'ultWZbUMPL8', // 스쿼트 중급
      advanced: 'bEv6CCg2BC8',    // 스쿼트 고급
    },
    recommendedTraining: {
      beginner: {
        sets: 3,
        reps: '8-10',
        weight: '맨몸 또는 빈 바',
        restSeconds: 90,
        tips: ['발 너비는 어깨 너비로', '무릎이 발끝을 넘지 않게', '허리를 곧게 유지'],
      },
      intermediate: {
        sets: 4,
        reps: '8-12',
        weight: '체중의 50-80%',
        restSeconds: 90,
        tips: ['코어에 힘을 주고 내려가기', '허벅지가 바닥과 평행이 될 때까지', '호흡 패턴 유지'],
      },
      advanced: {
        sets: 5,
        reps: '5-8',
        weight: '체중의 100% 이상',
        restSeconds: 120,
        tips: ['파워리프팅 자세 적용', '벨트 착용 권장', '스포터 동반 권장'],
      },
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
    youtubeVideos: {
      basic: 'gRVjAtPip0Y',       // 벤치프레스 기초
      intermediate: '4Y2ZdHCOXok', // 벤치프레스 중급
      advanced: 'vcBig73ojpE',     // 벤치프레스 고급
    },
    recommendedTraining: {
      beginner: {
        sets: 3,
        reps: '10-12',
        weight: '20-30kg',
        restSeconds: 60,
        tips: ['어깨뼈를 모아서 가슴을 펴기', '팔꿈치 각도 45도 유지', '바벨을 천천히 내리기'],
      },
      intermediate: {
        sets: 4,
        reps: '8-10',
        weight: '40-60kg',
        restSeconds: 90,
        tips: ['발을 바닥에 단단히 고정', '등 아치 자세 유지', '가슴 하단까지 내리기'],
      },
      advanced: {
        sets: 5,
        reps: '3-6',
        weight: '70kg 이상',
        restSeconds: 120,
        tips: ['파워리프팅 아치 자세', '손목 위치 고정', '스포터 필수'],
      },
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
    youtubeVideos: {
      basic: 'Iwe6AmxVf7o',       // 케이블 머신 기초
      intermediate: 'taI4XduLpTk', // 케이블 머신 중급
      advanced: 'WEM9FCIPlxQ',     // 케이블 머신 고급
    },
    recommendedTraining: {
      beginner: {
        sets: 3,
        reps: '12-15',
        weight: '10-15kg',
        restSeconds: 45,
        tips: ['케이블 높이 조절 확인', '움직임 천천히 컨트롤', '등을 곧게 유지'],
      },
      intermediate: {
        sets: 4,
        reps: '10-12',
        weight: '20-30kg',
        restSeconds: 60,
        tips: ['피크 수축 유지', '반동 사용하지 않기', '전체 가동 범위 사용'],
      },
      advanced: {
        sets: 4,
        reps: '8-10',
        weight: '35-50kg',
        restSeconds: 75,
        tips: ['드롭 세트 적용', '슈퍼세트 가능', '타임 언더 텐션 증가'],
      },
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
