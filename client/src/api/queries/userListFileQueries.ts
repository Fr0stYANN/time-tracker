import {GetUserListFileParametersType} from "../../types/userListFileTypes";
import {getGraphQLRequestParams} from "../common/getGraphQLRequestParams";

export const getUserListFileQuery = (payload: GetUserListFileParametersType, feature: string) => {
    const query: string = `
        query UserListFileQuery($params: GetFileByDateInput) {
            usersListFiles {
                getByRangeOfDate(params: $params) {
                    fileContent
                    fileType
                }
            }        
        }
    `;

    const variables: any = {
        params: payload
    }

    return getGraphQLRequestParams(query, feature, variables);
}