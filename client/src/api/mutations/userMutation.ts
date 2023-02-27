import { LoginUserInputType, LoginUserWithGoogleInputType } from '../../types/userTypes';
import { getGraphQLRequestParams } from '../common/getGraphQLRequestParams';

export const loginUserMutation = (payload: LoginUserInputType, feature: string) => {
    const query: string = `
        mutation AuthMutations($user: LoginUserInput!) {
            auth {
                login (loginUserInput: $user) {
                    accessToken
                    refreshToken
                    user {
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
        }`

    const variables = {
        user: payload
    }

    return getGraphQLRequestParams(query, feature, variables);
}

export const loginUserWithGoogleMutation = (payload: LoginUserWithGoogleInputType, feature: string) => {
    const query: string = `
        mutation GoogleLogin($loginUserWithGoogleInput: LoginUserWithGoogleInput!) {
            auth {
                googleLogin(loginUserWithGoogleInput: $loginUserWithGoogleInput) {
                    accessToken
                    refreshToken
                    user {
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
        }
    `;

    const variables = {
        loginUserWithGoogleInput: payload
    }

    return getGraphQLRequestParams(query, feature, variables);
}

export const refreshUserMutation = (refreshToken: string, feature: string) => {
    const query: string = `
        mutation refreshToken ($refreshToken: String!) {
            auth {
                refresh (refreshToken: $refreshToken) {
                    accessToken
                    refreshToken
                    user {
                        id
                        email
                        firstname
                        lastname
                        vacationDays
                        employmentDate
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
        }`;

    const variables = {
        refreshToken: refreshToken
    }

    return {
        ...getGraphQLRequestParams(query, feature, variables),
        refreshToken: refreshToken
    };
}

export const revokeUserMutation = (refreshToken: string, feature: string) => {
    const query: string = `
        mutation revokeUser {
            auth {
              revoke
            }
        }`

    return { ...getGraphQLRequestParams(query, feature), refreshToken: refreshToken };
}
