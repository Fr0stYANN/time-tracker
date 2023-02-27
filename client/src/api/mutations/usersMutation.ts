import {AddUserType, SetActivationStatusType, UpdateUserType} from 'types/userTypes';
import { getGraphQLRequestParams } from '../common/getGraphQLRequestParams';

export const addUserMutation = (payload: AddUserType, feature: string) => {
    const query: string = `
        mutation addUser($user: CreateUserInput) {
            user {
                create(user: $user) {
                    id
                    email
                    firstname
                    lastname
                    vacationDays
                    employmentDate
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
        user: payload
    }

    return getGraphQLRequestParams(query, feature, variables);
}

export const updateUserMutation = (payload: UpdateUserType, feature: string) => {
    const query: string = `
        mutation updateUser($user: UpdateUserInput!) {
            user {
                update(user: $user) {
                    id
                    email
                    firstname
                    lastname
                    employmentDate
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
        user: payload
    }

    return getGraphQLRequestParams(query, feature, variables);
}

export const setActivationStatusUserMutation = (payload: SetActivationStatusType, feature: string) => {
    const query: string = `
        mutation setActivationStatus($id: Int!, $isActivated: Boolean!) {
            user {
                setActivationStatus(id: $id, isActivated: $isActivated)
            }
        }
    `;

    const variables = {
        id: payload.id,
        isActivated: payload.isActivated
    }

    return getGraphQLRequestParams(query, feature, variables);
}
