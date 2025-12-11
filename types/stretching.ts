export interface StretchingVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: number; // seconds
  category: 'neck' | 'shoulder' | 'back' | 'hip' | 'leg' | 'full-body';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  targetMuscles: string[];
  views: number;
  likes: number;
  isRecommended?: boolean;
  createdAt: string;
}

export interface StretchingRoutine {
  id: string;
  title: string;
  description: string;
  videos: StretchingVideo[];
  duration: number; // seconds
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  type: 'quick' | 'recovery' | 'full-body' | 'targeted';
  createdAt: string;
}

export interface StretchingHistory {
  id: string;
  videoId: string;
  completedAt: string;
  duration: number; // seconds
  intensity: 'low' | 'medium' | 'high';
}
