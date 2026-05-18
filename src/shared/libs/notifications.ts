import { isDevice } from "expo-device";
import { AndroidImportance, cancelScheduledNotificationAsync, getPermissionsAsync, PermissionStatus, requestPermissionsAsync, SchedulableTriggerInputTypes, scheduleNotificationAsync, setNotificationChannelAsync } from "expo-notifications";
import { Platform } from "react-native";

export const notifications = {

    hasPermissions: async (): Promise<PermissionStatus> => {
        if (isDevice) {
            return (await getPermissionsAsync()).status;
        }
        return PermissionStatus.DENIED;
    },
    setup: async (): Promise<boolean> => {
        if (Platform.OS === 'android') {
            await setNotificationChannelAsync('loveYourEyesNotificationsChannel', {
                name: 'loveYourEyes',
                importance: AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        if (isDevice) {
            const { status: existingStatus } = await getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await requestPermissionsAsync();
                finalStatus = status;
            }
            return (finalStatus === 'granted');
        }
        return false;
    },
    scheduleDailyNotificationAt: async ({ hour, minute }: { hour: number, minute: number }): Promise<string> => {
        return await scheduleNotificationAsync({
            content: {
                title: '👁️ Your eyes! 👁️',
                subtitle: 'It\'s time to look away',
                body: 'Do your eyes a favor and look at something 10 meters away for 20 seconds.',
            },
            trigger: {
                type: SchedulableTriggerInputTypes.DAILY,
                hour,
                minute
            }
        });
    },
    cancelScheduledNotification: async (id: string) => {
        await cancelScheduledNotificationAsync(id);
    }
}