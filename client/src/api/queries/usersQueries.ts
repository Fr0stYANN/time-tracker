import { GetUsersParametersType } from '../../types/userTypes';
import { getGraphQLRequestParams } from '../common/getGraphQLRequestParams';

export const getUsersQuery = (payload: GetUsersParametersType, feature: string) => {
    const query: string = `
        query GetAllUsers ($params: GetAllUsersParamsInput) {
            user {
                getAll(params: $params) {
                    records,
                    users {
                        id
                        firstname,
                        lastname,
                        email
                        employmentDate,
                        isActivated
                        workType {
                            id
                            name
                        }
                        options {
                            id
                            name
                            code
                        }
                    }
                }
            }        
        }
    `;

    const variables: any = {
        params: payload
    }

    return getGraphQLRequestParams(query, feature, variables);
}

export const getUserByIdQuery = (payload: number, feature?: string) => {
    const query: string = `
        query getUserById($id: Int!) {
            user {
                getById(id: $id) {
                    id
                    firstname,
                    lastname,
                    email,
                    vacationDays,
                    employmentDate,
                    isActivated
                    workType {
                        id
                        name
                    }
                    options {
                        id
                        name
                        code
                    }
                }
            }
        }  
    `;

    const variables = {
        id: payload
    };

    return getGraphQLRequestParams(query, feature, variables);
}
