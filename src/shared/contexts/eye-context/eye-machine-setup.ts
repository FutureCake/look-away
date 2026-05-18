import { Linking } from "react-native";
import { assign, fromPromise, setup } from "xstate";
import { notifications } from "../../libs/notifications";
import { EyeAction, EyeEvent } from "../../types";

type Input = {
    dispatchHaptics: () => void;
    onCtaChange: (cta: string) => void;
    onStateMessageChange: (message?: string) => void;
    onUserActionChange: (userAction?: EyeAction) => void;
};

export const eyeMachineSetup = setup({
    types: {
        input: {} as Input,
        context: {} as {
            stateMessage: string | undefined,
            cta: string,
            deps: Input,
        },
        events: {} as EyeEvent,
    },
    actors: {
        checkPermissions: fromPromise(async () => {
            return await notifications.hasPermissions();
        }),
        setupNotifications: fromPromise(async () => {
            return await notifications.setup();
        }),
    },
    actions: {
        onStateMessageChange: ({ context }, params: { message?: string }) => {
            context.deps.onStateMessageChange(params.message);
        },
        onCtaChange: ({ context }, params: { cta: string }) => {
            context.deps.onCtaChange(params.cta);
        },
        onUserActionChange: ({ context }, params: { userAction?: EyeAction }) => {
            context.deps.onUserActionChange(params.userAction);
        },
        openSettings: () => {
            Linking.openSettings();
        },
        updatePrimary: assign(
            ({ context }, params: { cta: string; stateMessage?: string, userAction?: EyeAction }) => {
                context.deps.onCtaChange(params.cta);
                context.deps.onStateMessageChange(params.stateMessage);
                context.deps.onUserActionChange(params.userAction);
                return {
                    cta: params.cta,
                    stateMessage: params.stateMessage,
                };
            }
        ),
    },
});