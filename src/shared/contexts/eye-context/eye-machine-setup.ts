import { Linking } from "react-native";
import { assign, fromPromise, setup } from "xstate";
import { notifications } from "../../libs/notifications";
import { useAppStore } from "../../stores/app";
import { EyeAction, EyeEvent } from "../../types";

type Input = {
    dispatchHaptics: () => void;
};

export const eyeMachineSetup = setup({
    types: {
        input: {} as Input,
        context: {} as {
            stateMessage: string | undefined,
            cta: string,
            userAction: EyeAction | undefined,
            deps: Input,
        },
        events: {} as EyeEvent,
    },
    actors: {
        checkPermissions: fromPromise(async () => {
            // notifications.hasPermissions()
            return await new Promise((resolve) => resolve('granted'));
        }),
        setupNotifications: fromPromise(async () => {
            return await notifications.setup();
        }),
    },
    actions: {
        openSettings: () => {
            Linking.openSettings();
        },
        scheduleNotifications: () => {
            const safezones = Object.values(useAppStore.getState().eyeSafeZones);
            notifications.scheduleDailyNotifications(safezones);
        },
        updatePrimary: assign(
            (_, params: { cta: string; stateMessage?: string, userAction?: EyeAction }) => ({
                cta: params.cta,
                stateMessage: params.stateMessage,
                userAction: params.userAction,
            })
        ),
    },
});