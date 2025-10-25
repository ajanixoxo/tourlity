import { create } from 'zustand';
import { fetchExploreTours, ExploreToursParams } from '@/lib/api/explore-tours';
import type { Tour } from '@/types/tour';

interface ExploreToursState {
  tours: Tour[];
  isLoading: boolean;
  error: string | null;
  totalTours: number;
  currentPage: number;
  filters: ExploreToursParams;
  setFilters: (filters: ExploreToursParams) => void;
  fetchTours: (params?: ExploreToursParams) => Promise<void>;
  fetchInitialTours: () => Promise<void>;
}export const useExploreTourStore = create<ExploreToursState>((set, get) => ({
    tours: [],
    isLoading: false,
    error: null,
    totalTours: 0,
    currentPage: 1,
    filters: {
        page: 1,
        limit: 12,
    },

    setFilters: (newFilters) => {
        set((state) => ({
            filters: {
                ...state.filters,
                ...newFilters,
                page: 1, // Reset to first page when filters change
            },
        }));
        get().fetchTours();
    },

    fetchTours: async (params) => {
        try {
            set({ isLoading: true, error: null });
            const currentFilters = params || get().filters;

            const data = await fetchExploreTours(currentFilters);

            set({
                tours: data.tours,
                totalTours: data.total,
                currentPage: currentFilters.page || 1,
                filters: currentFilters,
            });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Failed to fetch tours' });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchInitialTours: async () => {
        try {
            set({ isLoading: true, error: null });
            const data = await fetchExploreTours({
                page: 1,
                limit: 12,
            });

            set({
                tours: data.tours,
                totalTours: data.total,
                currentPage: 1,
                filters: {
                    page: 1,
                    limit: 12,
                },
            });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Failed to fetch tours' });
        } finally {
            set({ isLoading: false });
        }
    },
}));