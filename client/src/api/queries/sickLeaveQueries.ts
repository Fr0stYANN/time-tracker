import { getGraphQLRequestParams } from '../common/getGraphQLRequestParams';

export const getSickLeavesByUserIdQuery = (payload: number, feature: string) => {
    const query: string = `
        query getSickLeaves($id: Int!) {
            sickLeave {
                getAllByUserId(userId: $id) {
                    id
                    startDate
                    endDate
                }
            }
        }`;

    const variables = {
        id: payload
    }

    return getGraphQLRequestParams(query , feature, variables);
}