import {getFormatTimeFromMinutes} from "./getFormatTimeFromMinutes";
import {DisplayHoursWorkDayType, WorkDayType} from "../types/workTimeType";

export const getWorkDaysInHours = (workDays: WorkDayType[]): DisplayHoursWorkDayType[] => {
    const workDaysInHour: DisplayHoursWorkDayType[] = [];

    for (const workDay of workDays) {
        const workedTime = getFormatTimeFromMinutes(workDay.workedMinutes);

        const hourPart = (Number(workedTime.minutes) / 6).toFixed();

        workDaysInHour.push({
            date: workDay.date.split('-')[2],
            workedHours: parseFloat(workedTime.hours + '.' + hourPart),
            name: 'Worked Hours'
        } as DisplayHoursWorkDayType);
    }

    return workDaysInHour;
}