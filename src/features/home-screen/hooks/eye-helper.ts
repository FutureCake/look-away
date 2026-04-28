import { useState } from "react";
import { notifications } from "../../../shared/libs/notifications";
import { useAppStore } from "../../../shared/stores/app";

export type EyeState = 'disabled' | 'alerting' | 'alerting_paused' | 'looking_away' | 'help_denied' | 'eye_safe_zone';

export default function useEyeHelper() {

    const { } = useAppStore();
    const [eyeState, setEyeState] = useState<EyeState>('disabled');

    const scheduleNotifications = async () => {
        const now = new Date();

    }

    const help = async () => {
        if (eyeState === 'disabled') {
            const success = await notifications.setupNotifications();
            if (success) setEyeState('help_denied');


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