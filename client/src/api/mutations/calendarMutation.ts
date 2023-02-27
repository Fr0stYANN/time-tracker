import {getGraphQLRequestParams} from 'api/common/getGraphQLRequestParams';
import {CalendarInputType, CalendarRangeInputType, CalendarSingleInputType} from "types/calendarTypes";

export const addSingleDayMutation = (payload: CalendarSingleInputType, feature: string) => {
    const query = `
        mutation insertSingle($singleCalendarInput: InsertSingleCalendarInput!) {
            calendar {
                insertSingle(singleCalendarInput: $singleCalendarInput) {
                    id
                    date
                    dayType{
                        id
                        name
                    }
                    hoursToWork
                }
            }
        }`;

    const variables = {
        singleCalendarInput: payload
    };

    return {...getGraphQLRequestParams(query, feature, variables)};
}

export const deleteDayMutation = (payload: string, feature: string) => {
    const query = `
        mutation DeleteByDate($date: Date!){
            calendar{
                deleteByDate(date: $date)
            }
        }
    `;

    const variables = {
        date: payload
    };

    return {...getGraphQLRequestParams(query, feature, variables)};
}


export const editDayMutation = (payload: CalendarInputType, feature: string) => {
    const query = `
        mutation Update($calendarDay: UpdateCalendarInput!){
            calendar{
                update(calendarDay: $calendarDay)
            }
        }
    `;

    const variables = {
        calendarDay: payload
    };

    return {...getGraphQLRequestParams(query, feature, variables)};
}

export const addRangeDayMutation = (payload: CalendarRangeInputType, feature: string) => {
    const query = `
        mutation insertRange($rangeCalendarInput: InsertRangeCalendarInput!){
            calendar{
                insertRange(rangeCalendarInput: $rangeCalendarInput){
                    id
                    date
                    dayType{
                        id
                        name
                    }
                    hoursToWork
                }
            }
        }`;

    const variables = {
        rangeCalendarInput: payload
    };

    return { ...getGraphQLRequestParams(query, feature, variables)};
}
