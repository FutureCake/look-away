
export function toMinutesOfDay(timestamp: number): number {
    const date = new Date(timestamp);
    return date.getHours() * 60 + date.getMinutes();
}