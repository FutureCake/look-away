import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandPersist } from '../libs/persistent-storage';
import { EyeState } from '../types';

interface AppStorage {
    status: EyeState;
    use24h: boolean;
    eyeSafeZones: { start: number, end: number }[];
    set24h: (use24h: boolean) => void;
    setStatus: (status: EyeState) => void;
}

export const useAppStore = create<AppStorage>()(
    persist(
        (set) => ({
            status: 'disabled',
            use24h: true,
            eyeSafeZones: [
                { start: 1777400916352, end: 1777436946554 },
                { start: 1777400916352, end: 1777436946554 },
                { start: 1777400916352, end: 1777436946554 }
            ],
            set24h: (use24h) => set({ use24h }),
            setStatus: (status) => set({ status }),
        }),
        {
            name: 'app-storagee',
            storage: createJSONStorage(() => zustandPersist),
        }
    )
);