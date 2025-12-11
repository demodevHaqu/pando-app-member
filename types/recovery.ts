export interface RecoveryZone {
  id: string;
  name: string;
  icon: string;
  description: string;
  benefits: string[];
  recommendedDuration: number;
  maxDuration: number;
  temperature?: number;
}

export interface SaunaSession {
  id: string;
  memberId: string;
  zoneId: string;
  startTime: string;
  endTime?: string;
  duration?: number;
  rating?: number;
}

export interface RecoveryRecommendation {
  id: string;
  title: string;
  reason: string;
  duration: number;
  zoneId: string;
}
