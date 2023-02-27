export const getGraphQLBodyRequest = (query: string, variables?: unknown) => {
    return JSON.stringify(
        {
            query,
            variables
        });
}