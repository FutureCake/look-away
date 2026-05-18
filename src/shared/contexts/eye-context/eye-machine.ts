import { eyeMachineSetup } from './eye-machine-setup';
import { updatePrimaryAction } from './helpers';

export const eyeMachine = eyeMachineSetup.createMachine({
    initial: 'dormant',
    context: ({ input }) => ({
        stateMessage: undefined,
        cta: 'Help your eyes',
        deps: input
    }),
    states: {
        dormant: {
            invoke: {
                src: 'checkPermissions',
                onDone: [
                    {
                        guard: ({ event }) => event.output === 'granted',
                        target: 'alerting',
                        actions: updatePrimaryAction({ cta: 'Pause alerts', userAction: 'PAUSE' }),
                    },
                    {
                        guard: ({ event }) => event.output === 'denied',
                        target: 'alerting_denied',
                        actions: updatePrimaryAction({ cta: 'Go to settings', stateMessage: 'Allow notifications, its pointless otherwise...' }),
                    },
                ],
            },
            on: {
                NC_REQUEST: {
                    target: 'requesting_permissions',
                },
                NC_ALLOWED: {
                    target: 'alerting',
                    actions: updatePrimaryAction({ cta: 'Pause alerts', userAction: 'PAUSE' })

                },
                NC_DENIED: {
                    target: 'alerting_denied',
                    actions: updatePrimaryAction({ cta: 'Go to settings', stateMessage: 'Allow notifications, its pointless otherwise...' }),
                }
            },
        },
        requesting_permissions: {
            invoke: {
                src: 'setupNotifications',
                onDone: [
                    {
                        guard: ({ event }) => event.output === true,
                        target: 'alerting',
                        actions: updatePrimaryAction({ cta: 'Pause alerts', userAction: 'PAUSE' }),
                    },
                    {
                        target: 'alerting_denied',
                        actions: updatePrimaryAction({ cta: 'Go to settings', stateMessage: 'Allow notifications, its pointless otherwise...' }),
                    },
                ],
                onError: {
                    target: 'alerting_denied',
                    actions: updatePrimaryAction({ cta: 'Go to settings', stateMessage: 'Something weird happened... go to settings to enable notifications' }),
                },
            },
        },
        alerting_denied: {
            on: {
                NC_REQUEST: {
                    actions: 'openSettings',
                },
                NC_ALLOWED: {
                    target: 'alerting',
                    actions: updatePrimaryAction({ cta: 'Pause alerts' })
                },
            }
        },
        alerting: {
            on: {
                PAUSE: {
                    target: 'paused',
                    actions: updatePrimaryAction({ cta: 'Resume alerts', stateMessage: 'Alerts paused' })
                },
                NC_DENIED: {
                    target: 'alerting_denied',
                    actions: updatePrimaryAction({ cta: 'Go to settings', stateMessage: 'Allow notifications, its pointless otherwise...' }),
                },
                SHOULD_LOOK_AWAY: {
                    target: 'should_look_away',
                    actions: updatePrimaryAction({ cta: 'Hold while looking away', stateMessage: 'Hold while looking away' }),
                },
                ENABLE_SCHEDULED_PAUSE: {
                    target: 'scheduled_pause',
                    actions: updatePrimaryAction({ cta: 'Scheduled pause enabled', stateMessage: 'Scheduled pause enabled' }),
                },
            }
        },
        paused: {
            on: {
                RESUME: {
                    target: 'alerting',
                    actions: updatePrimaryAction({ cta: 'Pause alerts' })
                },
                NC_DENIED: {
                    target: 'alerting_denied',
                    actions: updatePrimaryAction({ cta: 'Go to settings', stateMessage: 'Allow notifications, its pointless otherwise...' }),
                },
            }
        },
        scheduled_pause: {
            on: {
                NC_DENIED: {
                    target: 'alerting_denied',
                    actions: updatePrimaryAction({ cta: 'Go to settings', stateMessage: 'Allow notifications, its pointless otherwise...' }),
                },
                RESUME: {
                    target: 'alerting',
                    actions: updatePrimaryAction({ cta: 'Pause alerts' })
                },
            }
        },
        should_look_away: {
            on: {
                LOOKING_AWAY: {
                    target: 'looking_away',
                    actions: updatePrimaryAction({ cta: 'Yes me', stateMessage: 'Hold the button while looking away' }),
                },
            }
        },
        looking_away: {
            on: {
                RESUME: {
                    target: 'alerting',
                    actions: updatePrimaryAction({ cta: 'Pause alerts' })
                },
            }
        }
    },
});