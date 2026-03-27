import { create } from 'zustand';

type AppMode = 'sender' | 'driver';

type AuthProfile = {
  username: string;
  email?: string;
  phone?: string;
  name?: string;
};

interface AppState {
  isAuthenticated: boolean;
  hasSeenOnboarding: boolean;
  mode: AppMode;
  profile: AuthProfile | null;
  login: () => void;
  authenticate: (profile: AuthProfile) => void;
  completeOnboarding: () => void;
  logout: () => void;
  toggleMode: () => void;
}

export const useStore = create<AppState>((set) => ({
  isAuthenticated: false,
  hasSeenOnboarding: false,
  mode: 'sender', // Default mode
  profile: null,
  login: () => set({ isAuthenticated: true }),
  authenticate: (profile) => set({ isAuthenticated: true, profile }),
  completeOnboarding: () => set({ hasSeenOnboarding: true }),
  logout: () => set({ isAuthenticated: false, profile: null }),
  toggleMode: () =>
    set((state) => ({
      mode: state.mode === 'sender' ? 'driver' : 'sender',
  })),
}));