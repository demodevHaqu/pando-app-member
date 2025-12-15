export interface Routine {
  id: string;
  name: string;
  description: string;
  duration: number;
  exercises: Exercise[];
  difficulty: 1 | 2 | 3 | 4;
  calories: number;
  type: 'ai-generated' | 'custom';
  createdAt: string;
}

export interface Exercise {
  id: string;
  name: string;
  nameKo: string;
  category: 'strength' | 'cardio' | 'flexibility' | 'core' | 'stretching';
  muscleGroups: string[];
  equipmentId?: string;
  equipmentName?: string;
  sets: number;
  reps: number;
  weight?: number;
  restTime: number;
  videoUrl?: string;
  thumbnailUrl?: string;
  instructions: string[];
  difficulty: 1 | 2 | 3 | 4;
}

export interface WorkoutRecord {
  id: string;
  routineId: string;
  exerciseId: string;
  memberId: string;
  date: string;
  sets: SetRecord[];
  totalDuration: number;
  painLevel: number;
  difficultyRating: number;
  notes?: string;
}

export interface SetRecord {
  setNumber: number;
  reps: number;
  weight?: number;
  completed: boolean;
  formScore?: number;
}