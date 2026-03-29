import { create } from 'zustand';

type AppMode = 'sender' | 'driver';

export interface Mission {
  id: string;
  pickupAddress: string;
  dropoffAddress: string;
  itemDescription: string;
  price: number;
  driverEarnings: number;
  points: number;
  status: 'pending' | 'accepted' | 'completed';
}

interface AppState {
  isAuthenticated: boolean;
  mode: AppMode;
  login: () => void;
  logout: () => void;
  toggleMode: () => void;

  missions: Mission[];
  addMission: (missiondata: Omit<Mission, 'id' | 'status'>) => void;
}

export const useStore = create<AppState>((set) => ({
  isAuthenticated: false,
  mode: 'sender', // Default mode
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
  toggleMode: () => set((state) => ({ 
    mode: state.mode === 'sender' ? 'driver' : 'sender' 
  })),
  missions: [],
  addMission: (missionData) => set((state) => ({
    missions: [
      ...state.missions, 
      { 
        ...missionData, 
        id: Math.random().toString(36).substring(2, 9), // ID temporal para el front
        status: 'pending'
      }
    ]
  }))
}));