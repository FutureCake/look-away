import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandPersist } from '../libs/persistent-storage';

export interface EyeSafeZone {
    start: number;
    end: number;
}

interface AppStorage {
    use24h: boolean;
    eyeSafeZones: Record<string, EyeSafeZone>;
    addEyeSafeZone: (start: number, end: number) => string;
    removeEyeSafeZone: (id: string) => void;
    updateEyeSafeZone: (id: string, start: number, end: number) => void;
    set24h: (use24h: boolean) => void;
}

export const useAppStore = create<AppStorage>()(
    persist(
        (set) => ({
            use24h: true,
            eyeSafeZones: {},
            set24h: (use24h) => set({ use24h }),
            addEyeSafeZone: (start, end) => {
                const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
                set((state) => ({
                    eyeSafeZones: { ...state.eyeSafeZones, [id]: { start, end } },
                }));
                return id;
            },
            removeEyeSafeZone: (id) => set((state) => {
                const { [id]: _, ...rest } = state.eyeSafeZones;
                return { eyeSafeZones: rest };
            }),
            updateEyeSafeZone: (id, start, end) => set((state) => ({
                eyeSafeZones: { ...state.eyeSafeZones, [id]: { start, end } },
            })),
        }),
        {
            name: 'app-storagee',
            storage: createJSONStorage(() => zustandPersist),
        }
    )
);