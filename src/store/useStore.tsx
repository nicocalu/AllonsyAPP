import { create } from 'zustand';

type AppMode = 'sender' | 'driver';

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
  mode: AppMode;
  lastDelivery: Delivery | null;
  allDeliveries: Delivery[];
  login: () => void;
  logout: () => void;
  toggleMode: () => void;
  setLastDelivery: (delivery: Delivery) => void;
  addDelivery: (delivery: Delivery) => void;
}

export const useStore = create<AppState>((set) => ({
  isAuthenticated: false,
  mode: 'sender', // Default mode
  lastDelivery: null,
  allDeliveries: [],
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
  toggleMode: () => set((state) => ({ 
    mode: state.mode === 'sender' ? 'driver' : 'sender' 
  })),
  setLastDelivery: (delivery) => set({ lastDelivery: delivery }),
  addDelivery: (delivery) => set((state) => ({
    allDeliveries: [...state.allDeliveries, delivery]
  })),
}));