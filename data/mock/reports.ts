import { InBodyReport, FMSReport, PScoreReport } from '@/types/report';

export const MOCK_INBODY_REPORT: InBodyReport = {
  id: 'inbody1',
  memberId: 'member1',
  measuredAt: '2025-01-15T10:30:00Z',
  weight: 75.2,
  muscleMass: 34.5,
  bodyFatMass: 12.8,
  bodyFatPercent: 17.0,
  bmi: 23.5,
  bmr: 1680,
  bodyWater: 45.2,
  protein: 13.2,
  minerals: 4.1,
  visceralFatLevel: 8,
  segmentalAnalysis: {
    rightArm: { muscle: 3.2, fat: 1.1 },
    leftArm: { muscle: 3.1, fat: 1.0 },
    trunk: { muscle: 24.5, fat: 8.2 },
    rightLeg: { muscle: 9.8, fat: 2.5 },
    leftLeg: { muscle: 9.7, fat: 2.4 },
  },
  history: [
    { date: '2025-01-01', weight: 76.5, bodyFatPercent: 18.2, muscleMass: 33.8 },
    { date: '2025-01-08', weight: 75.8, bodyFatPercent: 17.5, muscleMass: 34.2 },
    { date: '2025-01-15', weight: 75.2, bodyFatPercent: 17.0, muscleMass: 34.5 },
  ],
};

export const MOCK_FMS_REPORT: FMSReport = {
  id: 'fms1',
  memberId: 'member1',
  measuredAt: '2025-01-10T14:00:00Z',
  totalScore: 16,
  scores: {
    deepSquat: 2,
    hurdleStep: 2,
    inlineLunge: 2,
    shoulderMobility: 3,
    activeStraightLegRaise: 2,
    trunkStability: 3,
    rotaryStability: 2,
  },
  painFlags: ['무릎', '허리'],
  recommendations: [
    '스쿼트 동작 시 무릎 정렬에 주의하세요',
    '코어 강화 운동을 추가로 수행하세요',
    '어깨 가동성 개선을 위한 스트레칭을 하세요',
  ],
  nextTestDate: '2025-04-10',
};

export const MOCK_PSCORE_REPORT: PScoreReport = {
  id: 'pscore1',
  memberId: 'member1',
  calculatedAt: '2025-01-15T23:59:00Z',
  totalScore: 78,
  categories: {
    strength: 82,
    endurance: 75,
    flexibility: 70,
    balance: 80,
    posture: 76,
  },
  trend: 'increasing',
  previousScore: 75,
  rank: 'B+',
  recommendations: [
    '유연성 개선을 위해 매일 15분 이상 스트레칭을 하세요',
    '유산소 운동 시간을 주 2회에서 3회로 늘려보세요',
    '현재 근력 수준이 우수합니다. 유지하세요!',
  ],
  goalProgress: {
    current: 78,
    goal: 85,
    deadline: '2025-03-31',
  },
};
