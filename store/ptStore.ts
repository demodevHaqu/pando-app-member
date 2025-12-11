import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
interface Trainer {
  id: string;
  name: string;
  profileImageUrl?: string;
  title: string;
  specialties: string[];
  rating: number;
  totalReviews: number;
  experience: number; // years
  bio?: string;
  certifications?: string[];
  hourlyRate?: number;
  availableSlots?: TimeSlot[];
}

interface TimeSlot {
  date: Date;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

interface PTSession {
  id: string;
  trainerId: string;
  trainerName: string;
  trainerImageUrl?: string;
  date: Date;
  startTime: string;
  endTime: string;
  type: 'pt' | 'ot' | 'consultation';
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
  notes?: string;
  rating?: number;
  review?: string;
}

interface PTPackage {
  id: string;
  name: string;
  sessions: number;
  remainingSessions: number;
  trainerId?: string;
  trainerName?: string;
  purchasedAt: Date;
  expiresAt: Date;
  price: number;
  status: 'active' | 'expired' | 'completed';
}

interface PTState {
  // Trainers
  trainers: Trainer[];
  selectedTrainer: Trainer | null;
  recommendedTrainers: Trainer[];

  // Sessions
  sessions: PTSession[];

  // Packages
  packages: PTPackage[];
  activePackage: PTPackage | null;

  // Booking state
  selectedDate: Date | null;
  selectedTimeSlot: TimeSlot | null;

  // Favorites
  favoriteTrainerIds: string[];

  // Actions - Trainers
  setTrainers: (trainers: Trainer[]) => void;
  setSelectedTrainer: (trainer: Trainer | null) => void;
  setRecommendedTrainers: (trainers: Trainer[]) => void;

  // Actions - Sessions
  bookSession: (session: Omit<PTSession, 'id' | 'status'>) => PTSession;
  cancelSession: (sessionId: string) => void;
  completeSession: (sessionId: string) => void;
  rateSession: (sessionId: string, rating: number, review?: string) => void;
  getUpcomingSessions: () => PTSession[];
  getPastSessions: () => PTSession[];

  // Actions - Packages
  setPackages: (packages: PTPackage[]) => void;
  purchasePackage: (pkg: Omit<PTPackage, 'id' | 'status' | 'purchasedAt'>) => PTPackage;
  useSession: (packageId: string) => void;
  getActivePackage: () => PTPackage | null;

  // Actions - Booking
  setSelectedDate: (date: Date | null) => void;
  setSelectedTimeSlot: (slot: TimeSlot | null) => void;

  // Actions - Favorites
  toggleFavoriteTrainer: (trainerId: string) => void;
  isTrainerFavorite: (trainerId: string) => boolean;

  // Getters
  getTrainerById: (id: string) => Trainer | undefined;
  getSessionsByTrainer: (trainerId: string) => PTSession[];
  getTotalSessionsCompleted: () => number;
}

export const usePTStore = create<PTState>()(
  persist(
    (set, get) => ({
      // Initial state
      trainers: [],
      selectedTrainer: null,
      recommendedTrainers: [],
      sessions: [],
      packages: [],
      activePackage: null,
      selectedDate: null,
      selectedTimeSlot: null,
      favoriteTrainerIds: [],

      // Trainer actions
      setTrainers: (trainers) => set({ trainers }),

      setSelectedTrainer: (trainer) => set({ selectedTrainer: trainer }),

      setRecommendedTrainers: (trainers) => set({ recommendedTrainers: trainers }),

      // Session actions
      bookSession: (sessionData) => {
        const session: PTSession = {
          ...sessionData,
          id: `pt-session-${Date.now()}`,
          status: 'scheduled',
        };

        set((state) => ({
          sessions: [...state.sessions, session],
        }));

        // Decrement package sessions if active
        const activePackage = get().activePackage;
        if (activePackage && activePackage.remainingSessions > 0) {
          get().useSession(activePackage.id);
        }

        return session;
      },

      cancelSession: (sessionId) =>
        set((state) => ({
          sessions: state.sessions.map((s) =>
            s.id === sessionId ? { ...s, status: 'cancelled' as const } : s
          ),
        })),

      completeSession: (sessionId) =>
        set((state) => ({
          sessions: state.sessions.map((s) =>
            s.id === sessionId ? { ...s, status: 'completed' as const } : s
          ),
        })),

      rateSession: (sessionId, rating, review) =>
        set((state) => ({
          sessions: state.sessions.map((s) =>
            s.id === sessionId ? { ...s, rating, review } : s
          ),
        })),

      getUpcomingSessions: () => {
        const now = new Date();
        return get()
          .sessions.filter(
            (s) => s.status === 'scheduled' && new Date(s.date) >= now
          )
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      },

      getPastSessions: () => {
        const now = new Date();
        return get()
          .sessions.filter(
            (s) => s.status === 'completed' || new Date(s.date) < now
          )
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      },

      // Package actions
      setPackages: (packages) => {
        const active = packages.find((p) => p.status === 'active');
        set({ packages, activePackage: active || null });
      },

      purchasePackage: (pkgData) => {
        const pkg: PTPackage = {
          ...pkgData,
          id: `pkg-${Date.now()}`,
          status: 'active',
          purchasedAt: new Date(),
        };

        set((state) => ({
          packages: [...state.packages, pkg],
          activePackage: pkg,
        }));

        return pkg;
      },

      useSession: (packageId) =>
        set((state) => {
          const updatedPackages = state.packages.map((p) => {
            if (p.id === packageId) {
              const remaining = p.remainingSessions - 1;
              return {
                ...p,
                remainingSessions: remaining,
                status: remaining <= 0 ? ('completed' as const) : p.status,
              };
            }
            return p;
          });

          const active = updatedPackages.find((p) => p.status === 'active');

          return {
            packages: updatedPackages,
            activePackage: active || null,
          };
        }),

      getActivePackage: () => {
        return get().packages.find((p) => p.status === 'active') || null;
      },

      // Booking actions
      setSelectedDate: (date) => set({ selectedDate: date }),

      setSelectedTimeSlot: (slot) => set({ selectedTimeSlot: slot }),

      // Favorites actions
      toggleFavoriteTrainer: (trainerId) =>
        set((state) => ({
          favoriteTrainerIds: state.favoriteTrainerIds.includes(trainerId)
            ? state.favoriteTrainerIds.filter((id) => id !== trainerId)
            : [...state.favoriteTrainerIds, trainerId],
        })),

      isTrainerFavorite: (trainerId) =>
        get().favoriteTrainerIds.includes(trainerId),

      // Getters
      getTrainerById: (id) => get().trainers.find((t) => t.id === id),

      getSessionsByTrainer: (trainerId) =>
        get().sessions.filter((s) => s.trainerId === trainerId),

      getTotalSessionsCompleted: () =>
        get().sessions.filter((s) => s.status === 'completed').length,
    }),
    {
      name: 'pt-storage',
      partialize: (state) => ({
        sessions: state.sessions,
        packages: state.packages,
        favoriteTrainerIds: state.favoriteTrainerIds,
      }),
    }
  )
);
