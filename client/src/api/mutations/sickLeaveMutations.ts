import {AddSickLeaveType, UpdateSickLeaveType} from "../../types/sickLeaveTypes";
import {getGraphQLRequestParams} from "../common/getGraphQLRequestParams";

export const addSickLeaveMutation = (payload: AddSickLeaveType, feature: string) => {
    const query: string = `
        mutation createSickLeave ($sickLeave: CreateSickLeaveInput!) {
            sickLeave {
                create (sickLeave: $sickLeave) {
                    id
                    startDate
                    endDate
                }
            }
        }`;

    const variables = {
        sickLeave: payload
    }

    return getGraphQLRequestParams(query, feature, variables);
}


export const editSickLeaveMutation = (payload: UpdateSickLeaveType, feature: string) => {
    const query: string = `
        mutation updateSickLeave ($sickLeave: UpdateSickLeaveInput!) {
            sickLeave {
                update (sickLeave: $sickLeave) {
                    id
                    startDate
                    endDate
                }
            }
        }`;

    const variables = {
        sickLeave: payload
    }

    return getGraphQLRequestParams(query, feature, variables);
}


export const deleteSickLeaveMutation = (payload: number, feature: string) => {
    const query: string = `
        mutation deleteSickLeave($id: Int!) {
            sickLeave {
                delete (sickLeaveId: $id)
            }
        }`;

    const variables = {
        id: payload
    }

    return getGraphQLRequestParams(query, feature, variables);
}