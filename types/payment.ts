export type PaymentMethod = 'card' | 'account' | 'kakao' | 'naver';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type PaymentCategory = 'membership' | 'pt' | 'coupon' | 'other';

export interface Payment {
  id: string;
  memberId: string;
  orderId: string;
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  category: PaymentCategory;
  description: string;
  createdAt: string;
  completedAt?: string;
  receiptUrl?: string;
  refundedAt?: string;
  refundReason?: string;
}

export interface PaymentHistory {
  id: string;
  payments: Payment[];
  totalAmount: number;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  maxUses: number;
  usedCount: number;
  expiryDate: string;
  minAmount?: number;
  isActive: boolean;
  description: string;
}
