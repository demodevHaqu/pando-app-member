export interface GXClass {
  id: string;
  name: string;
  instructor: Instructor;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  capacity: number;
  enrolled: number;
  waitlist: number;
  type: 'yoga' | 'pilates' | 'spinning' | 'zumba' | 'crossfit' | 'boxing';
  level: 'beginner' | 'intermediate' | 'advanced';
  location: string;
  description: string;
  imageUrl?: string;
}

export interface Instructor {
  id: string;
  name: string;
  profileImage?: string;
  specialty: string[];
  experience: number;
  rating: number;
  bio: string;
}

export interface GXAttendance {
  id: string;
  memberId: string;
  classId: string;
  status: 'enrolled' | 'waitlist' | 'attended' | 'cancelled' | 'no-show';
  enrolledAt: string;
  rating?: number;
  review?: string;
}