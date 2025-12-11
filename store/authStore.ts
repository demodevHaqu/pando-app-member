import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Member } from '@/types';

interface AuthState {
  isAuthenticated: boolean;
  member: Member | null;
  login: (member: Member) => void;
  logout: () => void;
  updateMember: (member: Partial<Member>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      member: null,
      login: (member) => set({ isAuthenticated: true, member }),
      logout: () => set({ isAuthenticated: false, member: null }),
      updateMember: (updatedMember) =>
        set((state) => ({
          member: state.member ? { ...state.member, ...updatedMember } : null,
        })),
    }),
    {
      name: 'auth-storage',
    }
  )
);
