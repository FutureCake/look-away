import * as SplashScreenWorker from 'expo-splash-screen';

SplashScreenWorker.setOptions({
    duration: 250,
    fade: true
});

export const SplashScreen = {
    hide: SplashScreenWorker.hideAsync,
    preventAutoHide: SplashScreenWorker.preventAutoHideAsync
}