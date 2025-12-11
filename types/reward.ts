export interface Reward {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  image?: string;
  expiryDate?: string;
}

export interface RewardBadge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedAt: string;
  type: 'energy' | 'growth' | 'premium';
  condition: string;
}

export interface PointHistory {
  id: string;
  amount: number;
  type: 'earn' | 'use';
  category: 'routine' | 'gx' | 'pt' | 'challenge' | 'purchase' | 'event';
  description: string;
  createdAt: string;
  expiryDate?: string;
}

export interface RewardCoupon {
  id: string;
  code: string;
  title: string;
  discount: number;
  discountType: 'percentage' | 'fixed';
  expiryDate: string;
  maxUses: number;
  usedCount: number;
  description: string;
  status: 'available' | 'used' | 'expired';
}

export interface RewardSummary {
  totalPoints: number;
  usablePoints: number;
  expiringPoints: number;
  expiringAt?: string;
  badges: RewardBadge[];
  coupons: RewardCoupon[];
}
