export interface Equipment {
  id: string;
  name: string;
  category: 'strength' | 'cardio' | 'functional';
  location: string;
  qrCode: string;
  status: 'available' | 'in-use' | 'maintenance';
  videoUrls: {
    basic?: string;
    intermediate?: string;
    advanced?: string;
  };
  youtubeVideos?: {
    basic?: string;      // YouTube Video ID
    intermediate?: string;
    advanced?: string;
  };
  recommendedTraining?: RecommendedTraining;
  exercises: EquipmentExercise[];
}

export interface RecommendedTraining {
  beginner: TrainingRecommendation;
  intermediate: TrainingRecommendation;
  advanced: TrainingRecommendation;
}

export interface TrainingRecommendation {
  sets: number;
  reps: string;           // "8-12" 형태
  weight: string;         // "체중의 50%" 또는 "20-30kg"
  restSeconds: number;
  tips: string[];
}

export interface EquipmentExercise {
  id: string;
  name: string;
  nameKo: string;
  difficulty: 1 | 2 | 3 | 4;
  muscleGroups: string[];
}

export interface ScannedItem {
  id: string;
  equipmentId: string;
  equipmentName: string;
  scannedAt: string;
  location: string;
}
