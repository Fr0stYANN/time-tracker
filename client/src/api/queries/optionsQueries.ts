import { getGraphQLRequestParams } from '../common/getGraphQLRequestParams';

export const getOptionsQuery = (feature: string) => {
    const query: string = `
        query GetAllOptions {
            option {
                getAll {
                    id
                    name
                    code
                }
            }
        }
    `;

    return getGraphQLRequestParams(query, feature);
}
