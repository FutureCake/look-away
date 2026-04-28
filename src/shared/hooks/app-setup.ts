import { useFonts } from "expo-font";
import { useMemo } from "react";

export type AppState = 'loading' | 'error' | 'ready';

export default function useAppSetup() {

    const [fontsLoaded, fontsError] = useFonts({
        americanTypewriter: require('../../assets/fonts/american-typewriter.ttf'),
        ewert: require('../../assets/fonts/ewert-regular.ttf'),
    });

    const steps = [
        { loaded: fontsLoaded, error: fontsError },
    ];

    const appState = useMemo<AppState>(() => {
        if (steps.some(s => s.error)) return 'error';
        if (steps.every(s => s.loaded)) return 'ready';
        return 'loading';
    }, [steps]);

    return appState;
}