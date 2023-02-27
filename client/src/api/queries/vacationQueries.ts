import { getGraphQLRequestParams } from '../common/getGraphQLRequestParams';

export const getRequestedVacationQuery = (payload: number, feature: string) => {
    let query: string = `
        query getUserVacationRequestsById($userId: Int!) {
            vacation {
                getByUserId(userId: $userId) {
                    id
                    startDate
                    endDate
                    user {
                      id
                      email
                      firstname
                      lastname
                      vacationDays
                      isActivated
                    }
                    comment
                    isApproved
                    approveRecords {
                      id
                      approver {
                        id
                        firstname
                        lastname
                      }
                      isApproved
                      comment
                    }
                }
            }
        }`;

    const variables = {
        userId: payload
    }

    return getGraphQLRequestParams(query, feature, variables);
}

export const getUserVacationApprovers = (payload: number, feature: string) => {
    let query: string = `
                        query getUserVacationApprovers($userId: Int!) {
                            vacation {
                                userApprovers(userId: $userId) {
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
                        `

    const variables = {
        userId: payload
    }

    return getGraphQLRequestParams(query, feature, variables);
}

export const getVacationsToApproveQuery = (payload: number, feature: string) => {
    let query: string = `
                        query getVacationsToApprove($approverId: Int!) {
                            vacation {
                                getNeedsToApprove(approverId: $approverId) {
                                    id
                                    startDate
                                    endDate
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
                                    comment
                                    isApproved
                                    approveRecords {
                                      id
                                      approver {
                                        id
                                        firstname
                                        lastname
                                      }
                                      isApproved
                                      comment
                                    }
                                }
                            }
                        }`

    const variables = {
        approverId: payload
    }

    return getGraphQLRequestParams(query, feature, variables);
}

export const getVacationByIdQuery = (payload: number, feature: '') => {
    const query: string = `
                          query getVacationById($id: Int!) {
                           vacation {
                                getById(id: $id) {
                                    vacation {
                                    id
                                    userId
                                    startDate
                                    endDate
                                    comment
                                    isApproved
                                    }
                                    approveRecords {
                                        id
                                        approver {
                                        firstname
                                        lastname
                                        id
                                    }
                                    isApproved
                                }
                            }
                        }
                    }`

    const variables = {
        id: payload
    }

    return getGraphQLRequestParams(query, feature, variables);
}
