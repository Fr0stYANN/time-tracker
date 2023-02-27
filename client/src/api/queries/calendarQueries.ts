import {getGraphQLRequestParams} from 'api/common/getGraphQLRequestParams';
import {CalendarDataType} from "types/calendarTypes";

export const fetchDayTypeQuery = (feature: string) => {
    const query = `
        query DayType{
            dayType{
                getAll{
                    id
                    name
                }
            }
        }
    `;

    return {...getGraphQLRequestParams(query, feature)};
}

export const fetchDataCalendarQuery = (payload: CalendarDataType, feature: string) => {
    const query = `
        query Calendar{
            calendar{
                getAll{
                    id
                    date
                    dayType{
                        id
                        name
                    }
                hoursToWork
                }
            }
        }
    `;

    return {...getGraphQLRequestParams(query, feature)};
}
