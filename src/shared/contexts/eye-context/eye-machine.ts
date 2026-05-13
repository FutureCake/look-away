import { StateFrom } from 'xstate';
import { eyeMachineSetup } from './eye-machine-setup';
import { updatePrimaryAction } from './helpers';

export type EyeState = StateFrom<typeof eyeMachine>['value'];

export const eyeMachine = eyeMachineSetup.createMachine({
    initial: 'dormant',
    context: ({ input }) => ({
        stateMessage: undefined,
        cta: 'Help your eyes',
        deps: input
    }),
    states: {
        dormant: {
            on: {
                NC_ALLOWED: {
                    target: 'alerting',
                    actions: updatePrimaryAction('Pause alerts', undefined)

                },
                NC_DENIED: {
                    target: 'alerting_denied',
                    actions: updatePrimaryAction('Go to settings', 'Allow notifications, its pointless otherwise...'),
                }
            },
        },
        alerting_denied: {
            on: {
                NC_ALLOWED: {
                    target: 'alerting',
                    actions: updatePrimaryAction('Pause alerts', undefined)
                },
            }
        },
        alerting: {
            on: {
                PAUSE: {
                    target: 'paused',
                    actions: updatePrimaryAction('Resume alerts', 'Alerts paused')
                },
                NC_DENIED: {
                    target: 'alerting_denied',
                    actions: updatePrimaryAction('Go to settings', 'Allow notifications, its pointless otherwise...'),
                },
                SHOULD_LOOK_AWAY: {
                    target: 'should_look_away',
                    actions: updatePrimaryAction('Hold while looking away', 'Hold while looking away'),
                },
                ENABLE_SCHEDULED_PAUSE: {
                    target: 'scheduled_pause',
                    actions: updatePrimaryAction('Scheduled pause enabled', 'Scheduled pause enabled'),
                },
            }
        },
        paused: {
            on: {
                RESUME: {
                    target: 'alerting',
                    actions: updatePrimaryAction('Pause alerts', undefined)
                },
                NC_DENIED: {
                    target: 'alerting_denied',
                    actions: updatePrimaryAction('Go to settings', 'Allow notifications, its pointless otherwise...'),
                },
            }
        },
        scheduled_pause: {
            on: {
                NC_DENIED: 'alerting_denied',
                RESUME: 'alerting',
            }
        },
        should_look_away: {
            on: {
                LOOKING_AWAY: 'looking_away',
            }
        },
        looking_away: {
            on: {
                RESUME: 'alerting',
            }
        }
    },
});