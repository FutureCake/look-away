import { StateFrom } from "xstate";
import { eyeMachine } from "./contexts/eye-context/eye-machine";

export type EyeEvent =
    | { type: 'NC_REQUEST' }
    | { type: 'NC_ALLOWED' }
    | { type: 'NC_DENIED' }
    | { type: 'PAUSE' }
    | { type: 'RESUME' }
    | { type: 'SHOULD_LOOK_AWAY' }
    | { type: 'LOOKING_AWAY' }
    | { type: 'ENABLE_SCHEDULED_PAUSE' };

export type EyeAction = EyeEvent['type'];

export type EyeState = StateFrom<typeof eyeMachine>['value'];