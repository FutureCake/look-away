import { StaticParamList, createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../features/home-screen";
import SafeZone from "../../features/safe-zone";
import TimeSpan from "../../features/time-span";

const RootStack = createNativeStackNavigator({
    initialRouteName: 'Home',
    screens: {
        Home: HomeScreen,
        SafeZone,
        TimeSpan
    },
    screenOptions: {
        headerShown: false,
    }
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}