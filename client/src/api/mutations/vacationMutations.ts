import { getGraphQLRequestParams } from "api/common/getGraphQLRequestParams";
import { ApproveVacationType, RequestVacationType, UpdateVacationType } from "types/vacationTypes";

export const createVacationMutation = (payload: RequestVacationType, feature: string) => {
    const query: string = `
        mutation CreateVacation($createVacation: CreateVacation!) {
            vacation {
                create(vacation: $createVacation) {
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
        }
        `;
    
    const variables = {
        createVacation: payload
    }

    return getGraphQLRequestParams(query, feature, variables);
}

export const approveVacationMutation = (payload: ApproveVacationType, feature: string) => {
    const query: string = `
                        mutation approveVacation($vacationRecordId: Int!, $comment: String) {
                            vacation {
                                approve(vacationRecordId: $vacationRecordId, comment: $comment)
                            }
                        }`

    const variables = {
        vacationRecordId: payload.vacationRecordId,
        comment: payload.comment
    }
    
    return getGraphQLRequestParams(query, feature, variables);
}

export const declineVacationMutation = (payload: ApproveVacationType, feature: string) => {
    const query: string = `
                        mutation approveVacation($vacationRecordId: Int!, $comment: String) {
                            vacation {
                                decline(vacationRecordId: $vacationRecordId, comment: $comment)
                            }
                        }`

    const variables = {
        vacationRecordId: payload.vacationRecordId,
        comment: payload.comment
    }
    
    return getGraphQLRequestParams(query, feature, variables);
}

export const updateVacationMutation = (payload: UpdateVacationType, feature: string) => {
    const query: string = `
                          mutation updateVacation($vacation: UpdateVacationInput!) {
                            vacation {
                                update(vacation: $vacation) {
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
                          }
                          `

    const variables = {
        vacation: payload
    }

    return getGraphQLRequestParams(query, feature, variables);
}

export const deleteVacationMutation = (payload: number, feature: string) => {
    const query: string = `
                           mutation deleteVacation($id: Int!) {
                                vacation {
                                    delete(id: $id)
                                }
                           }`

    const variables = {
        id: payload
    }

    return getGraphQLRequestParams(query, feature, variables);
}