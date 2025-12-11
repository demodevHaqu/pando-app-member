import { create } from 'zustand';

interface UIState {
  isSidebarOpen: boolean;
  isLoading: boolean;
  activeModal: string | null;
  bottomNavVisible: boolean;

  toggleSidebar: () => void;
  setLoading: (isLoading: boolean) => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
  setBottomNavVisible: (visible: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: false,
  isLoading: false,
  activeModal: null,
  bottomNavVisible: true,

  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setLoading: (isLoading) => set({ isLoading }),
  openModal: (modalId) => set({ activeModal: modalId }),
  closeModal: () => set({ activeModal: null }),
  setBottomNavVisible: (visible) => set({ bottomNavVisible: visible }),
}));
