import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
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
        <SafeAreaProvider>
            <Navigation />
        </SafeAreaProvider>
    );
}