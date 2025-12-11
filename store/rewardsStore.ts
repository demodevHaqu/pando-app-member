import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: 'workout' | 'streak' | 'challenge' | 'social' | 'special';
  unlockedAt?: Date;
  progress?: number;
  maxProgress?: number;
}

interface PointTransaction {
  id: string;
  amount: number;
  type: 'earn' | 'spend';
  category: 'workout' | 'challenge' | 'referral' | 'purchase' | 'reward';
  description: string;
  createdAt: Date;
}

interface Coupon {
  id: string;
  code: string;
  name: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minPurchase?: number;
  expiresAt: Date;
  usedAt?: Date;
  status: 'available' | 'used' | 'expired';
}

interface Challenge {
  id: string;
  name: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'special';
  targetValue: number;
  currentValue: number;
  rewardPoints: number;
  rewardBadgeId?: string;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'completed' | 'expired';
}

interface RewardsState {
  // Points
  totalPoints: number;
  lifetimePoints: number;
  transactions: PointTransaction[];

  // Badges
  badges: Badge[];
  unlockedBadgeIds: string[];

  // Coupons
  coupons: Coupon[];

  // Challenges
  challenges: Challenge[];

  // Streaks
  currentStreak: number;
  longestStreak: number;
  lastWorkoutDate: Date | null;

  // Actions - Points
  addPoints: (amount: number, category: PointTransaction['category'], description: string) => void;
  spendPoints: (amount: number, category: PointTransaction['category'], description: string) => boolean;
  getTransactionHistory: (limit?: number) => PointTransaction[];

  // Actions - Badges
  setBadges: (badges: Badge[]) => void;
  unlockBadge: (badgeId: string) => void;
  updateBadgeProgress: (badgeId: string, progress: number) => void;
  getUnlockedBadges: () => Badge[];
  getLockedBadges: () => Badge[];
  getBadgesByCategory: (category: Badge['category']) => Badge[];

  // Actions - Coupons
  setCoupons: (coupons: Coupon[]) => void;
  addCoupon: (coupon: Coupon) => void;
  useCoupon: (couponId: string) => void;
  getAvailableCoupons: () => Coupon[];

  // Actions - Challenges
  setChallenges: (challenges: Challenge[]) => void;
  updateChallengeProgress: (challengeId: string, value: number) => void;
  completeChallenge: (challengeId: string) => void;
  getActiveChallenges: () => Challenge[];
  getCompletedChallenges: () => Challenge[];

  // Actions - Streaks
  recordWorkout: () => void;
  resetStreak: () => void;

  // Utility
  checkExpiredItems: () => void;
}

export const useRewardsStore = create<RewardsState>()(
  persist(
    (set, get) => ({
      // Initial state
      totalPoints: 0,
      lifetimePoints: 0,
      transactions: [],
      badges: [],
      unlockedBadgeIds: [],
      coupons: [],
      challenges: [],
      currentStreak: 0,
      longestStreak: 0,
      lastWorkoutDate: null,

      // Points actions
      addPoints: (amount, category, description) => {
        const transaction: PointTransaction = {
          id: `txn-${Date.now()}`,
          amount,
          type: 'earn',
          category,
          description,
          createdAt: new Date(),
        };

        set((state) => ({
          totalPoints: state.totalPoints + amount,
          lifetimePoints: state.lifetimePoints + amount,
          transactions: [transaction, ...state.transactions],
        }));
      },

      spendPoints: (amount, category, description) => {
        const { totalPoints } = get();
        if (totalPoints < amount) return false;

        const transaction: PointTransaction = {
          id: `txn-${Date.now()}`,
          amount,
          type: 'spend',
          category,
          description,
          createdAt: new Date(),
        };

        set((state) => ({
          totalPoints: state.totalPoints - amount,
          transactions: [transaction, ...state.transactions],
        }));

        return true;
      },

      getTransactionHistory: (limit = 50) => {
        return get().transactions.slice(0, limit);
      },

      // Badge actions
      setBadges: (badges) => set({ badges }),

      unlockBadge: (badgeId) => {
        const { unlockedBadgeIds, badges } = get();
        if (unlockedBadgeIds.includes(badgeId)) return;

        const badge = badges.find((b) => b.id === badgeId);
        if (!badge) return;

        set((state) => ({
          unlockedBadgeIds: [...state.unlockedBadgeIds, badgeId],
          badges: state.badges.map((b) =>
            b.id === badgeId ? { ...b, unlockedAt: new Date() } : b
          ),
        }));

        // Award points based on rarity
        const points = {
          common: 50,
          rare: 100,
          epic: 250,
          legendary: 500,
        };
        get().addPoints(points[badge.rarity], 'reward', `${badge.name} 뱃지 획득`);
      },

      updateBadgeProgress: (badgeId, progress) =>
        set((state) => ({
          badges: state.badges.map((b) => {
            if (b.id !== badgeId) return b;

            const newProgress = Math.min(progress, b.maxProgress || progress);

            // Auto-unlock if progress complete
            if (b.maxProgress && newProgress >= b.maxProgress && !b.unlockedAt) {
              setTimeout(() => get().unlockBadge(badgeId), 0);
            }

            return { ...b, progress: newProgress };
          }),
        })),

      getUnlockedBadges: () => {
        const { badges, unlockedBadgeIds } = get();
        return badges.filter((b) => unlockedBadgeIds.includes(b.id));
      },

      getLockedBadges: () => {
        const { badges, unlockedBadgeIds } = get();
        return badges.filter((b) => !unlockedBadgeIds.includes(b.id));
      },

      getBadgesByCategory: (category) => {
        return get().badges.filter((b) => b.category === category);
      },

      // Coupon actions
      setCoupons: (coupons) => set({ coupons }),

      addCoupon: (coupon) =>
        set((state) => ({
          coupons: [...state.coupons, coupon],
        })),

      useCoupon: (couponId) =>
        set((state) => ({
          coupons: state.coupons.map((c) =>
            c.id === couponId
              ? { ...c, status: 'used' as const, usedAt: new Date() }
              : c
          ),
        })),

      getAvailableCoupons: () => {
        const now = new Date();
        return get().coupons.filter(
          (c) => c.status === 'available' && new Date(c.expiresAt) > now
        );
      },

      // Challenge actions
      setChallenges: (challenges) => set({ challenges }),

      updateChallengeProgress: (challengeId, value) =>
        set((state) => ({
          challenges: state.challenges.map((c) => {
            if (c.id !== challengeId || c.status !== 'active') return c;

            const newValue = Math.min(c.currentValue + value, c.targetValue);

            // Auto-complete if target reached
            if (newValue >= c.targetValue) {
              setTimeout(() => get().completeChallenge(challengeId), 0);
            }

            return { ...c, currentValue: newValue };
          }),
        })),

      completeChallenge: (challengeId) => {
        const challenge = get().challenges.find((c) => c.id === challengeId);
        if (!challenge || challenge.status !== 'active') return;

        set((state) => ({
          challenges: state.challenges.map((c) =>
            c.id === challengeId ? { ...c, status: 'completed' as const } : c
          ),
        }));

        // Award points
        get().addPoints(challenge.rewardPoints, 'challenge', `${challenge.name} 챌린지 완료`);

        // Unlock badge if specified
        if (challenge.rewardBadgeId) {
          get().unlockBadge(challenge.rewardBadgeId);
        }
      },

      getActiveChallenges: () => {
        return get().challenges.filter((c) => c.status === 'active');
      },

      getCompletedChallenges: () => {
        return get().challenges.filter((c) => c.status === 'completed');
      },

      // Streak actions
      recordWorkout: () => {
        const { lastWorkoutDate, currentStreak, longestStreak } = get();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let newStreak = currentStreak;

        if (lastWorkoutDate) {
          const lastDate = new Date(lastWorkoutDate);
          lastDate.setHours(0, 0, 0, 0);

          const diffDays = Math.floor(
            (today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
          );

          if (diffDays === 1) {
            // Consecutive day
            newStreak = currentStreak + 1;
          } else if (diffDays > 1) {
            // Streak broken
            newStreak = 1;
          }
          // diffDays === 0 means same day, keep streak
        } else {
          newStreak = 1;
        }

        const newLongestStreak = Math.max(longestStreak, newStreak);

        set({
          currentStreak: newStreak,
          longestStreak: newLongestStreak,
          lastWorkoutDate: today,
        });

        // Award streak points
        if (newStreak > currentStreak) {
          const streakBonus = Math.min(newStreak * 10, 100);
          get().addPoints(streakBonus, 'workout', `${newStreak}일 연속 출석 보너스`);
        }
      },

      resetStreak: () => set({ currentStreak: 0, lastWorkoutDate: null }),

      // Utility
      checkExpiredItems: () => {
        const now = new Date();

        set((state) => ({
          coupons: state.coupons.map((c) =>
            c.status === 'available' && new Date(c.expiresAt) < now
              ? { ...c, status: 'expired' as const }
              : c
          ),
          challenges: state.challenges.map((c) =>
            c.status === 'active' && new Date(c.endDate) < now
              ? { ...c, status: 'expired' as const }
              : c
          ),
        }));
      },
    }),
    {
      name: 'rewards-storage',
    }
  )
);
