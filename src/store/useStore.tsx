import { create } from 'zustand';

type AppMode = 'sender' | 'driver';

interface AppState {
  isAuthenticated: boolean;
  mode: AppMode;
  login: () => void;
  logout: () => void;
  toggleMode: () => void;
}

export const useStore = create<AppState>((set) => ({
  isAuthenticated: false,
  mode: 'sender', // Default mode
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
  toggleMode: () => set((state) => ({ 
    mode: state.mode === 'sender' ? 'driver' : 'sender' 
  })),
}));