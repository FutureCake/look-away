import { useMachine } from '@xstate/react';
import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { EventFrom, SnapshotFrom } from 'xstate';
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
    const [userAction, setUserAction] = useState<EyeAction>('NC_REQUEST');

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