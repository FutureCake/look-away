import { useMachine } from '@xstate/react';
import { addNotificationResponseReceivedListener } from 'expo-notifications';
import { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';
import { EventFrom, SnapshotFrom } from 'xstate';
import { notifications } from '../../libs/notifications';
import { EyeAction } from '../../types';
import { eyeMachine } from './eye-machine';

type EyeMachineContextType = {
    state: SnapshotFrom<typeof eyeMachine>;
    send: (event: EventFrom<typeof eyeMachine>) => void;
    stateMsg: string | undefined;
    cta: string;
    userAction?: EyeAction;
};

const EyeMachineContext = createContext<EyeMachineContextType | null>(null);

export function EyeMachineProvider({ children }: PropsWithChildren) {

    const [stateMsg, setStateMsg] = useState<string | undefined>(undefined);
    const [cta, setCta] = useState<string>('Save your eyes');
    const [userAction, setUserAction] = useState<EyeAction>('START');

    const [state, send] = useMachine(eyeMachine, {
        input: {
            dispatchHaptics: () => {
                console.log('Dispatching haptics');
            },
            onCtaChange: setCta,
            onStateMessageChange: setStateMsg,
            onUserActionChange: (action?: EyeAction) => {
                if (!action) return;
                setUserAction(action);
            }
        },
    });

    const appState = useRef(AppState.currentState);

    useEffect(() => {
        const sub = AppState.addEventListener('change', (nextState) => {
            if (appState.current.match(/inactive|background/) && nextState === 'active') {
                notifications.hasPermissions().then((status) => {
                    send({ type: status === 'granted' ? 'NC_ALLOWED' : 'NC_DENIED' });
                });
            }
            appState.current = nextState;
        });
        return () => sub.remove();
    }, [send]);

    useEffect(() => {
        const sub = addNotificationResponseReceivedListener(response => {
            const type = response.notification.request.content.data?.type;
            if (type) {
                send({ type } as EventFrom<typeof eyeMachine>);
            }
        });
        return () => sub.remove();
    }, [send]);

    return (
        <EyeMachineContext.Provider value={{ state, send, stateMsg, cta, userAction }}>
            {children}
        </EyeMachineContext.Provider>
    );
}

export function useEyeMachine() {
    const context = useContext(EyeMachineContext);
    if (!context) throw new Error('useEyeMachine must be inside EyeMachine');
    return context;
}