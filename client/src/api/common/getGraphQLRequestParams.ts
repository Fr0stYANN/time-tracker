import { getGraphQLBodyRequest } from './getGraphQLBodyRequest';

export const getGraphQLRequestParams = (query: string, feature?: string, variables?: unknown) => {
    const urlGraphQl = process.env.REACT_APP_API_URL! as string;
    const bodyRequest = getGraphQLBodyRequest(query, variables);

    return {
        url: urlGraphQl,
        body: bodyRequest,
        feature: feature
    };
}

