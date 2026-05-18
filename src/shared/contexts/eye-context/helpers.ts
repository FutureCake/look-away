import { EyeAction } from "../../types";

export function updatePrimaryAction(props: { cta: string, stateMessage?: string, userAction?: EyeAction }) {
    return [
        {
            type: 'updatePrimary' as const,
            params: props,
        },
    ];
}