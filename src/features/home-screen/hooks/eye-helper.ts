import { useState } from "react";
import { notifications } from "../../../shared/libs/notifications";
import { useAppStore } from "../../../shared/stores/app";

const NOTIFICATION_INTERVAL = 20 * 60 * 1000; // 20 minutes

export type EyeState = 'disabled' | 'alerting' | 'alerting_paused' | 'looking_away' | 'help_denied' | 'eye_safe_zone';

export default function useEyeHelper() {

    const { status, eyeSafeZones } = useAppStore();
    const [eyeState, setEyeState] = useState<EyeState>(status);

    const scheduleNotifications = async () => {
        const now = new Date().getTime();
        let lastScheduledTime = now;
        eyeSafeZones.forEach(safeZone => {
            const nextNotificationTime = lastScheduledTime + NOTIFICATION_INTERVAL;

            if (nextNotificationTime >= safeZone.start) {
                lastScheduledTime = safeZone.end;
                return;
            }


        });
    }

    const help = async () => {
        if (eyeState === 'disabled') {
            const success = await notifications.setupNotifications();
            if (!success) {
                setEyeState('help_denied');
                return;
            }

            await scheduleNotifications();
            setEyeState('alerting');
        }
    }

    const pause = async () => {
    }

    return {
        eyeState,
        help,
        pause,
    }
}