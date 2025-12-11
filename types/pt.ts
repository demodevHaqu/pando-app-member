export interface Trainer {
  id: string;
  name: string;
  profileImage?: string;
  gender: 'male' | 'female';
  specialty: string[];
  experience: number;
  rating: number;
  reviewCount: number;
  bio: string;
  certifications: string[];
  matchScore?: number;
}

export interface PTPackage {
  id: string;
  name: string;
  sessions: number;
  price: number;
  duration: number;
  type: 'recommended' | 'balanced' | 'economy';
  benefits: string[];
}

export interface PTSession {
  id: string;
  trainerId: string;
  memberId: string;
  packageId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  type: 'pt' | 'ot1' | 'ot2';
  notes?: string;
}