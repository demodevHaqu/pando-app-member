import { PoseLandmark, PoseDetectionResult, POSE_LANDMARKS } from '@/types/pose-tracking';

// Types for pose analysis
export interface JointAngle {
  joint: string;
  angle: number;
  isValid: boolean;
}

export interface PoseAnalysisResult {
  angles: JointAngle[];
  score: number;
  feedbacks: FormFeedbackItem[];
  phase: 'idle' | 'descending' | 'bottom' | 'ascending';
  repCompleted: boolean;
}

export interface FormFeedbackItem {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  bodyPart: 'head' | 'shoulders' | 'back' | 'hips' | 'knees' | 'feet' | 'arms' | 'core';
  message: string;
  suggestion?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'rotate';
}

// Exercise form requirements
export interface ExerciseFormRequirements {
  name: string;
  nameKo: string;
  angles: {
    joint: string;
    minAngle: number;
    maxAngle: number;
    phase: 'all' | 'bottom' | 'top';
  }[];
  checkpoints: FormCheckpoint[];
}

export interface FormCheckpoint {
  bodyPart: 'head' | 'shoulders' | 'back' | 'hips' | 'knees' | 'feet' | 'arms' | 'core';
  check: (landmarks: PoseLandmark[]) => CheckResult;
  message: string;
  suggestion: string;
}

interface CheckResult {
  passed: boolean;
  severity?: 'warning' | 'error';
  direction?: 'up' | 'down' | 'left' | 'right' | 'rotate';
}

// Calculate angle between three points
export function calculateAngle(
  pointA: PoseLandmark,
  pointB: PoseLandmark,
  pointC: PoseLandmark
): number {
  const radians = Math.atan2(pointC.y - pointB.y, pointC.x - pointB.x) -
                  Math.atan2(pointA.y - pointB.y, pointA.x - pointB.x);
  let angle = Math.abs((radians * 180) / Math.PI);

  if (angle > 180) {
    angle = 360 - angle;
  }

  return angle;
}

// Calculate distance between two points
export function calculateDistance(pointA: PoseLandmark, pointB: PoseLandmark): number {
  return Math.sqrt(
    Math.pow(pointB.x - pointA.x, 2) +
    Math.pow(pointB.y - pointA.y, 2)
  );
}

// Check if landmark is visible
export function isLandmarkVisible(landmark: PoseLandmark | undefined, threshold = 0.5): boolean {
  return landmark !== undefined && (landmark.visibility ?? 0) >= threshold;
}

// Get key joint angles from pose
export function getJointAngles(landmarks: PoseLandmark[]): JointAngle[] {
  const angles: JointAngle[] = [];

  // Left elbow angle
  const leftShoulder = landmarks[POSE_LANDMARKS.LEFT_SHOULDER];
  const leftElbow = landmarks[POSE_LANDMARKS.LEFT_ELBOW];
  const leftWrist = landmarks[POSE_LANDMARKS.LEFT_WRIST];

  if (isLandmarkVisible(leftShoulder) && isLandmarkVisible(leftElbow) && isLandmarkVisible(leftWrist)) {
    angles.push({
      joint: 'leftElbow',
      angle: calculateAngle(leftShoulder, leftElbow, leftWrist),
      isValid: true,
    });
  }

  // Right elbow angle
  const rightShoulder = landmarks[POSE_LANDMARKS.RIGHT_SHOULDER];
  const rightElbow = landmarks[POSE_LANDMARKS.RIGHT_ELBOW];
  const rightWrist = landmarks[POSE_LANDMARKS.RIGHT_WRIST];

  if (isLandmarkVisible(rightShoulder) && isLandmarkVisible(rightElbow) && isLandmarkVisible(rightWrist)) {
    angles.push({
      joint: 'rightElbow',
      angle: calculateAngle(rightShoulder, rightElbow, rightWrist),
      isValid: true,
    });
  }

  // Left knee angle
  const leftHip = landmarks[POSE_LANDMARKS.LEFT_HIP];
  const leftKnee = landmarks[POSE_LANDMARKS.LEFT_KNEE];
  const leftAnkle = landmarks[POSE_LANDMARKS.LEFT_ANKLE];

  if (isLandmarkVisible(leftHip) && isLandmarkVisible(leftKnee) && isLandmarkVisible(leftAnkle)) {
    angles.push({
      joint: 'leftKnee',
      angle: calculateAngle(leftHip, leftKnee, leftAnkle),
      isValid: true,
    });
  }

  // Right knee angle
  const rightHip = landmarks[POSE_LANDMARKS.RIGHT_HIP];
  const rightKnee = landmarks[POSE_LANDMARKS.RIGHT_KNEE];
  const rightAnkle = landmarks[POSE_LANDMARKS.RIGHT_ANKLE];

  if (isLandmarkVisible(rightHip) && isLandmarkVisible(rightKnee) && isLandmarkVisible(rightAnkle)) {
    angles.push({
      joint: 'rightKnee',
      angle: calculateAngle(rightHip, rightKnee, rightAnkle),
      isValid: true,
    });
  }

  // Left hip angle
  if (isLandmarkVisible(leftShoulder) && isLandmarkVisible(leftHip) && isLandmarkVisible(leftKnee)) {
    angles.push({
      joint: 'leftHip',
      angle: calculateAngle(leftShoulder, leftHip, leftKnee),
      isValid: true,
    });
  }

  // Right hip angle
  if (isLandmarkVisible(rightShoulder) && isLandmarkVisible(rightHip) && isLandmarkVisible(rightKnee)) {
    angles.push({
      joint: 'rightHip',
      angle: calculateAngle(rightShoulder, rightHip, rightKnee),
      isValid: true,
    });
  }

  // Left shoulder angle
  if (isLandmarkVisible(leftHip) && isLandmarkVisible(leftShoulder) && isLandmarkVisible(leftElbow)) {
    angles.push({
      joint: 'leftShoulder',
      angle: calculateAngle(leftHip, leftShoulder, leftElbow),
      isValid: true,
    });
  }

  // Right shoulder angle
  if (isLandmarkVisible(rightHip) && isLandmarkVisible(rightShoulder) && isLandmarkVisible(rightElbow)) {
    angles.push({
      joint: 'rightShoulder',
      angle: calculateAngle(rightHip, rightShoulder, rightElbow),
      isValid: true,
    });
  }

  return angles;
}

// Squat form requirements
export const SQUAT_FORM: ExerciseFormRequirements = {
  name: 'squat',
  nameKo: '스쿼트',
  angles: [
    { joint: 'leftKnee', minAngle: 70, maxAngle: 110, phase: 'bottom' },
    { joint: 'rightKnee', minAngle: 70, maxAngle: 110, phase: 'bottom' },
    { joint: 'leftHip', minAngle: 70, maxAngle: 100, phase: 'bottom' },
    { joint: 'rightHip', minAngle: 70, maxAngle: 100, phase: 'bottom' },
  ],
  checkpoints: [
    {
      bodyPart: 'knees',
      check: (landmarks) => {
        const leftKnee = landmarks[POSE_LANDMARKS.LEFT_KNEE];
        const leftAnkle = landmarks[POSE_LANDMARKS.LEFT_ANKLE];
        const rightKnee = landmarks[POSE_LANDMARKS.RIGHT_KNEE];
        const rightAnkle = landmarks[POSE_LANDMARKS.RIGHT_ANKLE];

        if (!isLandmarkVisible(leftKnee) || !isLandmarkVisible(leftAnkle)) {
          return { passed: true };
        }

        // Check if knees go too far past toes
        const leftKneeForward = leftKnee.x - leftAnkle.x;
        const rightKneeForward = rightKnee.x - rightAnkle.x;

        const tooForward = Math.abs(leftKneeForward) > 0.1 || Math.abs(rightKneeForward) > 0.1;

        return { passed: !tooForward, severity: 'warning', direction: 'down' };
      },
      message: '무릎이 발끝을 넘어갔습니다',
      suggestion: '무릎을 발끝 라인에 맞춰주세요',
    },
    {
      bodyPart: 'back',
      check: (landmarks) => {
        const shoulder = landmarks[POSE_LANDMARKS.LEFT_SHOULDER];
        const hip = landmarks[POSE_LANDMARKS.LEFT_HIP];

        if (!isLandmarkVisible(shoulder) || !isLandmarkVisible(hip)) {
          return { passed: true };
        }

        // Check if back is too rounded (shoulder too far forward relative to hip)
        const forwardLean = shoulder.x - hip.x;

        return { passed: forwardLean < 0.15, severity: 'error', direction: 'up' };
      },
      message: '상체가 너무 앞으로 기울어졌습니다',
      suggestion: '가슴을 펴고 허리를 곧게 유지하세요',
    },
    {
      bodyPart: 'hips',
      check: (landmarks) => {
        const leftHip = landmarks[POSE_LANDMARKS.LEFT_HIP];
        const rightHip = landmarks[POSE_LANDMARKS.RIGHT_HIP];

        if (!isLandmarkVisible(leftHip) || !isLandmarkVisible(rightHip)) {
          return { passed: true };
        }

        // Check if hips are level
        const hipDiff = Math.abs(leftHip.y - rightHip.y);

        return {
          passed: hipDiff < 0.05,
          severity: 'warning',
          direction: leftHip.y > rightHip.y ? 'up' : 'down'
        };
      },
      message: '골반이 한쪽으로 기울어졌습니다',
      suggestion: '골반을 수평으로 유지하세요',
    },
  ],
};

// Deadlift form requirements
export const DEADLIFT_FORM: ExerciseFormRequirements = {
  name: 'deadlift',
  nameKo: '데드리프트',
  angles: [
    { joint: 'leftKnee', minAngle: 140, maxAngle: 175, phase: 'top' },
    { joint: 'leftHip', minAngle: 160, maxAngle: 180, phase: 'top' },
  ],
  checkpoints: [
    {
      bodyPart: 'back',
      check: (landmarks) => {
        const shoulder = landmarks[POSE_LANDMARKS.LEFT_SHOULDER];
        const hip = landmarks[POSE_LANDMARKS.LEFT_HIP];

        if (!isLandmarkVisible(shoulder) || !isLandmarkVisible(hip)) {
          return { passed: true };
        }

        // Check for rounded back
        const spineAngle = Math.atan2(shoulder.y - hip.y, shoulder.x - hip.x) * (180 / Math.PI);

        return {
          passed: spineAngle > -100 && spineAngle < -60,
          severity: 'error',
          direction: 'up'
        };
      },
      message: '등이 둥글게 말렸습니다',
      suggestion: '척추 중립을 유지하고 코어에 힘을 주세요',
    },
    {
      bodyPart: 'shoulders',
      check: (landmarks) => {
        const leftShoulder = landmarks[POSE_LANDMARKS.LEFT_SHOULDER];
        const rightShoulder = landmarks[POSE_LANDMARKS.RIGHT_SHOULDER];

        if (!isLandmarkVisible(leftShoulder) || !isLandmarkVisible(rightShoulder)) {
          return { passed: true };
        }

        // Check shoulder alignment
        const shoulderDiff = Math.abs(leftShoulder.y - rightShoulder.y);

        return { passed: shoulderDiff < 0.04, severity: 'warning' };
      },
      message: '어깨가 비대칭입니다',
      suggestion: '양쪽 어깨를 수평으로 유지하세요',
    },
  ],
};

// Lunge form requirements
export const LUNGE_FORM: ExerciseFormRequirements = {
  name: 'lunge',
  nameKo: '런지',
  angles: [
    { joint: 'leftKnee', minAngle: 80, maxAngle: 100, phase: 'bottom' },
    { joint: 'rightKnee', minAngle: 80, maxAngle: 100, phase: 'bottom' },
  ],
  checkpoints: [
    {
      bodyPart: 'knees',
      check: (landmarks) => {
        const frontKnee = landmarks[POSE_LANDMARKS.LEFT_KNEE];
        const frontAnkle = landmarks[POSE_LANDMARKS.LEFT_ANKLE];

        if (!isLandmarkVisible(frontKnee) || !isLandmarkVisible(frontAnkle)) {
          return { passed: true };
        }

        // Check if front knee goes past ankle
        const kneeOverAnkle = frontKnee.x - frontAnkle.x;

        return { passed: kneeOverAnkle < 0.08, severity: 'warning', direction: 'down' };
      },
      message: '앞 무릎이 발목을 넘어갔습니다',
      suggestion: '무릎을 발목 위에 유지하세요',
    },
    {
      bodyPart: 'core',
      check: (landmarks) => {
        const shoulder = landmarks[POSE_LANDMARKS.LEFT_SHOULDER];
        const hip = landmarks[POSE_LANDMARKS.LEFT_HIP];

        if (!isLandmarkVisible(shoulder) || !isLandmarkVisible(hip)) {
          return { passed: true };
        }

        // Check torso is upright
        const torsoLean = Math.abs(shoulder.x - hip.x);

        return { passed: torsoLean < 0.08, severity: 'warning', direction: 'up' };
      },
      message: '상체가 기울어졌습니다',
      suggestion: '상체를 수직으로 세우세요',
    },
  ],
};

// Get exercise form by name
export function getExerciseForm(exerciseName: string): ExerciseFormRequirements | null {
  const forms: Record<string, ExerciseFormRequirements> = {
    squat: SQUAT_FORM,
    deadlift: DEADLIFT_FORM,
    lunge: LUNGE_FORM,
  };

  return forms[exerciseName.toLowerCase()] || null;
}

// Main analysis function
export function analyzePose(
  pose: PoseDetectionResult,
  exerciseForm: ExerciseFormRequirements,
  previousPhase: 'idle' | 'descending' | 'bottom' | 'ascending' = 'idle'
): PoseAnalysisResult {
  const { landmarks } = pose;
  const angles = getJointAngles(landmarks);
  const feedbacks: FormFeedbackItem[] = [];
  let score = 100;

  // Run checkpoints
  exerciseForm.checkpoints.forEach((checkpoint, index) => {
    const result = checkpoint.check(landmarks);

    if (!result.passed) {
      feedbacks.push({
        id: `checkpoint-${index}`,
        type: result.severity || 'warning',
        bodyPart: checkpoint.bodyPart,
        message: checkpoint.message,
        suggestion: checkpoint.suggestion,
        direction: result.direction,
      });

      // Reduce score based on severity
      if (result.severity === 'error') {
        score -= 15;
      } else {
        score -= 8;
      }
    }
  });

  // Check angle requirements
  exerciseForm.angles.forEach((angleReq) => {
    const foundAngle = angles.find(a => a.joint === angleReq.joint);

    if (foundAngle && foundAngle.isValid) {
      if (foundAngle.angle < angleReq.minAngle || foundAngle.angle > angleReq.maxAngle) {
        score -= 5;
      }
    }
  });

  // Determine current phase based on knee angle
  const kneeAngle = angles.find(a => a.joint === 'leftKnee' || a.joint === 'rightKnee');
  let currentPhase = previousPhase;
  let repCompleted = false;

  if (kneeAngle) {
    const angle = kneeAngle.angle;

    if (previousPhase === 'idle' && angle < 160) {
      currentPhase = 'descending';
    } else if (previousPhase === 'descending' && angle < 100) {
      currentPhase = 'bottom';
    } else if (previousPhase === 'bottom' && angle > 100) {
      currentPhase = 'ascending';
    } else if (previousPhase === 'ascending' && angle > 160) {
      currentPhase = 'idle';
      repCompleted = true;
    }
  }

  // Add success feedback if form is good
  if (feedbacks.length === 0) {
    feedbacks.push({
      id: 'success',
      type: 'success',
      bodyPart: 'core',
      message: '자세가 좋습니다!',
      suggestion: '현재 자세를 유지하세요',
    });
  }

  return {
    angles,
    score: Math.max(0, Math.min(100, score)),
    feedbacks,
    phase: currentPhase,
    repCompleted,
  };
}

// Export exercise forms map
export const EXERCISE_FORMS: Record<string, ExerciseFormRequirements> = {
  squat: SQUAT_FORM,
  deadlift: DEADLIFT_FORM,
  lunge: LUNGE_FORM,
};
