
export const ONE_SECOND = 1000;
export const ONE_MINUTE = 60 * ONE_SECOND;

export enum DayPeriod {
    Morning = 'morning',
    Afternoon = 'afternoon',
    Evening = 'evening',
    Night = 'night',
}

const TIME_SLOTS: { maxHour: number; slot: DayPeriod }[] = [
    { maxHour: 6, slot: DayPeriod.Night },
    { maxHour: 12, slot: DayPeriod.Morning },
    { maxHour: 18, slot: DayPeriod.Afternoon },
    { maxHour: 21, slot: DayPeriod.Evening },
] as const;

export const getCurrentSlot = (): DayPeriod => {
    const hour = new Date().getHours();
    return TIME_SLOTS.find(({ maxHour }) => hour < maxHour)?.slot ?? DayPeriod.Night;
};
