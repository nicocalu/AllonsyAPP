import { create } from 'zustand';

type AppMode = 'sender' | 'driver';

type AuthProfile = {
  username: string;
  email?: string;
  phone?: string;
  name?: string;
};
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
export interface Delivery {
  id: string;
  from: string;
  to: string;
  distance: number; // in km
  estimatedPrice: number;
  driverEarnings: number;
  pointsReward: number;
  estimatedTime: number; // in minutes
  description?: string;
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
  createdAt: string;
}

interface AppState {
  isAuthenticated: boolean;
  hasSeenOnboarding: boolean;
  mode: AppMode;
  profile: AuthProfile | null;
  lastDelivery: Delivery | null;
  allDeliveries: Delivery[];
  login: () => void;
  authenticate: (profile: AuthProfile) => void;
  completeOnboarding: () => void;
  logout: () => void;
  toggleMode: () => void;

  missions: Mission[];
  addMission: (missiondata: Omit<Mission, 'id' | 'status'>) => void;
  setLastDelivery: (delivery: Delivery) => void;
  addDelivery: (delivery: Delivery) => void;
}

export const useStore = create<AppState>((set) => ({
  isAuthenticated: false,
  hasSeenOnboarding: false,
  mode: 'sender', // Default mode
  profile: null,
  lastDelivery: null,
  allDeliveries: [],
  login: () => set({ isAuthenticated: true }),
  authenticate: (profile) => set({ isAuthenticated: true, profile }),
  completeOnboarding: () => set({ hasSeenOnboarding: true }),
  logout: () => set({ isAuthenticated: false, profile: null }),
  toggleMode: () =>
    set((state) => ({
      mode: state.mode === 'sender' ? 'driver' : 'sender',
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
  })),
  setLastDelivery: (delivery) => set({ lastDelivery: delivery }),
  addDelivery: (delivery) => set((state) => ({
    allDeliveries: [...state.allDeliveries, delivery]
  })),
}));