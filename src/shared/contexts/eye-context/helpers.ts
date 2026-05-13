export function updatePrimaryAction(cta: string, stateMessage: string | undefined) {
    return [
        {
            type: 'updatePrimary' as const,
            params: { cta, stateMessage },
        },
    ];
}