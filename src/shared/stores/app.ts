import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { EyeState } from '../../features/home-screen/hooks/eye-helper';
import { zustandPersist } from '../libs/persistent-storage';

interface AppStorage {
    status: EyeState;
    eyeSafeZones: { hour: number, minute: number }[];
}

export const useAppStore = create<AppStorage>()(
    persist(
        (set) => ({
            status: 'disabled',
            eyeSafeZones: [],
        }),
        {
            name: 'app-storage',
            storage: createJSONStorage(() => zustandPersist),
        }
    )
);