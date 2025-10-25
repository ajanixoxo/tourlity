import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Tour } from '@/types/tour';

interface TourListResponse {
  tours: Tour[];
  total: number;
  hasMore: boolean;
}

interface TourFilters {
  q?: string;
  type?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  language?: string;
}

interface TourStore {
  // Cache states
  exploreTours: Record<string, TourListResponse>;
  homeTours: Tour[] | null;
  userTours: Record<string, TourListResponse>;
  hostTours: Record<string, TourListResponse>;
  tourDetails: Record<string, Tour>;
  
  // Loading states
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchExploreTours: (page: number, limit: number, filters?: TourFilters) => Promise<void>;
  fetchHomeTours: () => Promise<void>;
  fetchUserTours: (userId: string, page: number, limit: number) => Promise<void>;
  fetchHostTours: (hostId: string, page: number, limit: number) => Promise<void>;
  fetchTourDetails: (id: string) => Promise<void>;
  invalidateTour: (id: string) => void;
  clearCache: () => void;
}

export const useTourStore = create<TourStore>()(
  devtools((set, get) => ({
    // Initial state
    exploreTours: {},
    homeTours: null,
    userTours: {},
    hostTours: {},
    tourDetails: {},
    isLoading: false,
    error: null,

    // Actions
    fetchExploreTours: async (page, limit, filters = {}) => {
      try {
        set({ isLoading: true, error: null });
        const queryParams = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          ...Object.fromEntries(
            Object.entries(filters).map(([k, v]) => [k, String(v)])
          )
        });
        
        const response = await fetch(`/api/tours/explore?${queryParams}`);
        if (!response.ok) throw new Error('Failed to fetch tours');
        
        const data = await response.json();
        set(state => ({
          exploreTours: {
            ...state.exploreTours,
            [`${page}-${limit}-${JSON.stringify(filters)}`]: data
          }
        }));
      } catch (error) {
        set({ error: (error as Error).message });
      } finally {
        set({ isLoading: false });
      }
    },

    fetchHomeTours: async () => {
      try {
        set({ isLoading: true, error: null });
        const response = await fetch('/api/tours/home');
        if (!response.ok) throw new Error('Failed to fetch home tours');
        
        const data = await response.json();
        set({ homeTours: data });
      } catch (error) {
        set({ error: (error as Error).message });
      } finally {
        set({ isLoading: false });
      }
    },

    fetchUserTours: async (userId, page, limit) => {
      try {
        set({ isLoading: true, error: null });
        const response = await fetch(`/api/tours/user/${userId}?page=${page}&limit=${limit}`);
        if (!response.ok) throw new Error('Failed to fetch user tours');
        
        const data = await response.json();
        set(state => ({
          userTours: {
            ...state.userTours,
            [`${userId}-${page}-${limit}`]: data
          }
        }));
      } catch (error) {
        set({ error: (error as Error).message });
      } finally {
        set({ isLoading: false });
      }
    },

    fetchHostTours: async (hostId, page, limit) => {
      try {
        set({ isLoading: true, error: null });
        const response = await fetch(`/api/tours/host/${hostId}?page=${page}&limit=${limit}`);
        if (!response.ok) throw new Error('Failed to fetch host tours');
        
        const data = await response.json();
        set(state => ({
          hostTours: {
            ...state.hostTours,
            [`${hostId}-${page}-${limit}`]: data
          }
        }));
      } catch (error) {
        set({ error: (error as Error).message });
      } finally {
        set({ isLoading: false });
      }
    },

    fetchTourDetails: async (id) => {
      try {
        set({ isLoading: true, error: null });
        const response = await fetch(`/api/tours/${id}`);
        if (!response.ok) throw new Error('Failed to fetch tour details');
        
        const data = await response.json();
        set(state => ({
          tourDetails: {
            ...state.tourDetails,
            [id]: data
          }
        }));
      } catch (error) {
        set({ error: (error as Error).message });
      } finally {
        set({ isLoading: false });
      }
    },

    invalidateTour: (id) => {
      set(state => {
        const newState = { ...state };
        delete newState.tourDetails[id];
        return newState;
      });
    },

    clearCache: () => {
      set({
        exploreTours: {},
        homeTours: null,
        userTours: {},
        hostTours: {},
        tourDetails: {}
      });
    }
  }))
);