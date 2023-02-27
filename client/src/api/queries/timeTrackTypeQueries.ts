import {getGraphQLRequestParams} from "../common/getGraphQLRequestParams";

export const getTimeTrackTypesQuery = () => {
    const query: string = `
        query getAll {
            timeTrackType {
                getAll {
                  id
                  name
                }
            }
        }`;

    return getGraphQLRequestParams(query);
}