export interface InBodyReport {
  id: string;
  memberId: string;
  measuredAt: string;
  weight: number;
  muscleMass: number;
  bodyFatMass: number;
  bodyFatPercent: number;
  bmi: number;
  bmr: number;
  bodyWater: number;
  protein: number;
  minerals: number;
  visceralFatLevel: number;
  segmentalAnalysis: {
    rightArm: SegmentData;
    leftArm: SegmentData;
    trunk: SegmentData;
    rightLeg: SegmentData;
    leftLeg: SegmentData;
  };
  history: InBodyHistory[];
}

export interface SegmentData {
  muscle: number;
  fat: number;
}

export interface InBodyHistory {
  date: string;
  weight: number;
  bodyFatPercent: number;
  muscleMass: number;
}

export interface FMSReport {
  id: string;
  memberId: string;
  measuredAt: string;
  totalScore: number;
  scores: {
    deepSquat: number;
    hurdleStep: number;
    inlineLunge: number;
    shoulderMobility: number;
    activeStraightLegRaise: number;
    trunkStability: number;
    rotaryStability: number;
  };
  painFlags: string[];
  recommendations: string[];
  nextTestDate: string;
}

export interface PScoreReport {
  id: string;
  memberId: string;
  calculatedAt: string;
  totalScore: number;
  categories: {
    strength: number;
    endurance: number;
    flexibility: number;
    balance: number;
    posture: number;
  };
  trend: 'increasing' | 'stable' | 'decreasing';
  previousScore: number;
  rank: 'S' | 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D';
  recommendations: string[];
  goalProgress: {
    current: number;
    goal: number;
    deadline: string;
  };
}
