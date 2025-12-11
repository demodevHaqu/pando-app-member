export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: 'male' | 'female';
  birthDate: string;
  profileImage?: string;
  membershipType: 'basic' | 'premium' | 'vip';
  membershipStartDate: string;
  membershipEndDate: string;
  lockerNumber?: string;
  lockerEndDate?: string;
  points: number;
  level: number;
  badges: Badge[];
  goals: string[];
  preferences: string[];
  painAreas?: string[];
  injuries?: string[];
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedAt: string;
  type: 'energy' | 'growth' | 'premium';
}

export interface Notification {
  id: string;
  type: 'renewal' | 'pt' | 'gx' | 'at-risk' | 'event' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}