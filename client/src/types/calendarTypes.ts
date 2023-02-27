import type { Moment } from 'moment';

export type CalendarSingleInputType = {
    startDate?: string | null;
    endDate?: string | null;
    dayTypeId: number;
    hoursToWork?: number;
}

export type CalendarRangeInputType = {
    startDate?: string | null;
    endDate?: string | null;
    dayTypeId: number;
    hoursToWork?: number;
}

export type CalendarInputType = {
    id: number;
    date: string;
    dayTypeId: number;
    hoursToWork: number;
}

export type CalendarDataType = {
    id: number;
    date: Moment;
    dayType: DayType;
    hoursToWork: number;
}

export type DayType = {
    id: number;
    name: string;
}
