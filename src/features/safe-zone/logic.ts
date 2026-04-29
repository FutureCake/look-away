
export const renderHM = (timestamp: number, use24h: boolean) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');

    if (use24h) {
        return `${hours.toString().padStart(2, '0')}:${minutes}`;
    }

    const period = hours >= 12 ? 'PM' : 'AM';
    const h12 = hours % 12 || 12;
    return `${h12}:${minutes} ${period}`;
}