import { useEffect } from 'react';
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { EyeMachineProvider } from './shared/contexts/eye-context';
import useAppSetup from './shared/hooks/app-setup';
import { Navigation } from './shared/libs/navigation';
import { SplashScreen } from './shared/libs/splash-screen';

SplashScreen.preventAutoHide();

export default function App() {

    const appState = useAppSetup();

    useEffect(() => {
        SplashScreen.hide();
    }, [appState])

    return (
        <KeyboardProvider>
            <SafeAreaProvider>
                <EyeMachineProvider>
                    <Navigation />
                </EyeMachineProvider>
            </SafeAreaProvider>
        </KeyboardProvider>
    );
}