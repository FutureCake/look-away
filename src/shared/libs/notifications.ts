import { isDevice } from "expo-device";
import { AndroidImportance, cancelScheduledNotificationAsync, getPermissionsAsync, PermissionStatus, requestPermissionsAsync, SchedulableTriggerInputTypes, scheduleNotificationAsync, setNotificationChannelAsync } from "expo-notifications";
import { Platform } from "react-native";
import { toMinutesOfDay } from "../business-logic/time";


const NOTIFICATION_INTERVAL_MINUTES = 20;
const MINUTES_IN_DAY = 24 * 60;

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
    scheduleDailyLookAwayAt: async ({ hour, minute }: { hour: number, minute: number }): Promise<string> => {
        return await scheduleNotificationAsync({
            content: {
                title: '👁️ Your eyes! 👁️',
                subtitle: 'It\'s time to look away',
                body: 'Do your eyes a favor and look at something 10 meters away for 20 seconds.',
                data: { type: 'SHOULD_LOOK_AWAY' },
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
    },
    scheduleDailyNotifications: async (safezones: { start: number, end: number }[]) => {

        let minute = 0;
        const ids: string[] = [];
        const safezonesAsMinutes = safezones.map(z => ({
            start: toMinutesOfDay(z.start),
            end: toMinutesOfDay(z.end),
        }));

        while (minute < MINUTES_IN_DAY) {
            const zone = safezonesAsMinutes.find(z => minute >= z.start && minute < z.end);
            if (zone) {
                minute = zone.end + NOTIFICATION_INTERVAL_MINUTES;
                continue;
            }

            const hour = Math.floor(minute / 60);
            const min = minute % 60;

            const id = await notifications.scheduleDailyLookAwayAt({ hour, minute: min });
            ids.push(id);

            minute += NOTIFICATION_INTERVAL_MINUTES;
        }

        safezonesAsMinutes.forEach(safezone => {

        });
        return ids;
    }
};