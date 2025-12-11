export interface PoseLandmark {
  x: number;
  y: number;
  z: number;
  visibility: number;
}

export interface PoseDetectionResult {
  landmarks: PoseLandmark[];
  worldLandmarks?: PoseLandmark[];
}

export interface ExerciseFormState {
  isCorrect: boolean;
  feedback: string[];
  score: number;
  repCount: number;
  currentPhase: 'idle' | 'descending' | 'bottom' | 'ascending';
}

export interface ExerciseTemplate {
  id: string;
  name: string;
  nameKo: string;
  type: 'compound' | 'isolation';
  muscleGroups: string[];
  keyAngles: KeyAngle[];
  commonMistakes: CommonMistake[];
}

export interface KeyAngle {
  joint: string;
  minAngle: number;
  maxAngle: number;
  phase: 'idle' | 'descending' | 'bottom' | 'ascending';
}

export interface CommonMistake {
  name: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

export const POSE_LANDMARKS = {
  NOSE: 0,
  LEFT_SHOULDER: 11,
  RIGHT_SHOULDER: 12,
  LEFT_ELBOW: 13,
  RIGHT_ELBOW: 14,
  LEFT_WRIST: 15,
  RIGHT_WRIST: 16,
  LEFT_HIP: 23,
  RIGHT_HIP: 24,
  LEFT_KNEE: 25,
  RIGHT_KNEE: 26,
  LEFT_ANKLE: 27,
  RIGHT_ANKLE: 28,
} as const;