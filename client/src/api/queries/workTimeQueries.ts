import {getGraphQLRequestParams} from "../common/getGraphQLRequestParams";
import {GetWorkDaysByUserIdAndDateRangeType, GetWorkTimeUserType} from "types/workTimeType";

export const getWorkTimeUserQuery = (payload: GetWorkTimeUserType, feature: string) => {
    const query: string = `
        query ($params: GetWorkTimeUserInput){
            workTime{
                getWorkTimeUserByRangeOfDate(params: $params){
                    workedMinutes
                    totalWorkHours
                }
            }
        }
    `;

    const variables: any = {
        params: payload
    }

    return getGraphQLRequestParams(query, feature, variables);
}

export const getUserWorkDaysQuery = (payload: GetWorkDaysByUserIdAndDateRangeType, feature: string) => {
    const query: string = `
        query getWorkDaysByUserIdAndDateRange($params: GetDailyWorkTimeUserInput!) {
            workTime {
                getDailyWorkTimeUserByRangeOfDate(params: $params) {
                    date
                    workedMinutes
                }
            }
        }`;

    const variables = {
        params: payload
    }

    return getGraphQLRequestParams(query, feature, variables);
}