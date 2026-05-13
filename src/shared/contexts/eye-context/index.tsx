import { useMachine } from '@xstate/react';
import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { EventFrom, SnapshotFrom } from 'xstate';
import { eyeMachine } from './eye-machine';

type EyeMachineContextType = {
    state: SnapshotFrom<typeof eyeMachine>;
    send: (event: EventFrom<typeof eyeMachine>) => void;
    stateMsg: string | undefined;
    cta: string;
};

const EyeMachineContext = createContext<EyeMachineContextType | null>(null);

export function EyeMachineProvider({ children }: PropsWithChildren) {

    const [stateMsg, setStateMsg] = useState<string | undefined>(undefined);
    const [cta, setCta] = useState<string>('Help your eyes');

    const [state, send] = useMachine(eyeMachine, {
        input: {
            dispatchHaptics: () => {
                console.log('Dispatching haptics');
            },
            onCtaChange: setCta,
            onStateMessageChange: setStateMsg
        },
    });

    return (
        <EyeMachineContext.Provider value={{ state, send, stateMsg, cta }}>
            {children}
        </EyeMachineContext.Provider>
    );
}

export function useEyeMachine() {
    const context = useContext(EyeMachineContext);
    if (!context) throw new Error('useEyeMachine must be inside EyeMachine');
    return context;
}