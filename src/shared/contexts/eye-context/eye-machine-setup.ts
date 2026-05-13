import { assign, setup } from "xstate";

type Input = {
    dispatchHaptics: () => void;
    onCtaChange: (cta: string) => void;
    onStateMessageChange: (message: string | undefined) => void;
};

export const eyeMachineSetup = setup({
    types: {
        input: {} as Input,
        context: {} as {
            stateMessage: string | undefined,
            cta: string,
            deps: Input,
        },
        events: {} as
            | { type: 'NC_ALLOWED' }
            | { type: 'NC_DENIED' }
            | { type: 'PAUSE' }
            | { type: 'RESUME' }
            | { type: 'SHOULD_LOOK_AWAY' }
            | { type: 'LOOKING_AWAY' }
            | { type: 'ENABLE_SCHEDULED_PAUSE' },
    },
    actions: {
        onStateMessageChange: ({ context }, params: { message: string | undefined }) => {
            context.deps.onStateMessageChange(params.message);
        },
        onCtaChange: ({ context }, params: { cta: string }) => {
            context.deps.onCtaChange(params.cta);
        },
        updatePrimary: assign(
            ({ context }, params: { cta: string; stateMessage: string | undefined }) => {
                context.deps.onCtaChange(params.cta);
                context.deps.onStateMessageChange(params.stateMessage);
                return {
                    cta: params.cta,
                    stateMessage: params.stateMessage,
                };
            }
        ),
    },
});