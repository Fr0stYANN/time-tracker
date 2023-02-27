import {getGraphQLRequestParams} from '../common/getGraphQLRequestParams';
import {CreateTimeTrackPayload, DeleteTimeTrackPayload, UpdateTimeTrackPayload} from "types/timeTracksTypes";

export const createTimeTrackMutation = (payload: CreateTimeTrackPayload) => {
    const query: string = `
        mutation CreateTimeTrack($createTimeTrack: CreateTimeTrackInput!) {
            timeTrack {
                create(timetrack: $createTimeTrack) {
                    id
                    startDate
                    endDate
                    totalTime
                    timeTrackType {
                        id
                        name
                    }
                    creationType {
                        id
                        name
                    }
                    timeTrackUpdateHistory {
                        id,
                        date
                        user {
                            id
                            firstname
                            lastname
                            email
                        }
                    }
                }
            }
        }
    `;

    const variables = {
        createTimeTrack: payload
    }

    return getGraphQLRequestParams(query, undefined, variables);
}

export const createForUserTimeTrackMutation = (payload: CreateTimeTrackPayload) => {
    const query: string = `
        mutation CreateForUserTimeTrack($createTimeTrack: CreateTimeTrackInput!) {
            timeTrack {
                createForUser(timetrack: $createTimeTrack) {
                    id
                    startDate
                    endDate
                    totalTime
                    timeTrackType {
                        id
                        name
                    }
                    creationType {
                        id
                        name
                    }
                    timeTrackUpdateHistory {
                        id,
                        date
                        user {
                            id
                            firstname
                            lastname
                            email
                        }
                    }
                }
            }
        }
    `;

    const variables = {
        createTimeTrack: payload
    }

    return getGraphQLRequestParams(query, undefined, variables);
}

export const updateTimeTrackMutation = (payload: UpdateTimeTrackPayload) => {
    const query: string = `
        mutation UpdateTimeTrack($updateTimeTrack: UpdateTimeTrackInput!) {
            timeTrack {
                update(timetrack: $updateTimeTrack) {
                    id
                    startDate
                    endDate
                    totalTime
                    timeTrackType {
                        id
                        name
                    }
                    creationType {
                        id
                        name
                    }
                    timeTrackUpdateHistory {
                        id,
                        date
                        user {
                            id
                            firstname
                            lastname
                            email
                        }
                    }
                }
            }
        }
    `;

    const variables = {
        updateTimeTrack: payload
    }

    return getGraphQLRequestParams(query, undefined, variables);
}

export const updateForUserTimeTrackMutation = (payload: UpdateTimeTrackPayload) => {
    const query: string = `
        mutation UpdateForUserTimeTrack($updateTimeTrack: UpdateTimeTrackInput!) {
            timeTrack {
                updateForUser(timetrack: $updateTimeTrack) {
                    id
                    startDate
                    endDate
                    totalTime
                    timeTrackType {
                        id
                        name
                    }
                    creationType {
                        id
                        name
                    }
                    timeTrackUpdateHistory {
                        id,
                        date
                        user {
                            id
                            firstname
                            lastname
                            email
                        }
                    }
                }
            }
        }
    `;

    const variables = {
        updateTimeTrack: payload
    }

    return getGraphQLRequestParams(query, undefined, variables);
}


export const deleteTimeTrackMutation = (payload: DeleteTimeTrackPayload) => {
    const query: string = `
        mutation DeleteTimeTrack($deleteTimeTrack: Int!) {
            timeTrack {
                delete(trackId: $deleteTimeTrack)
            }
        }
    `;

    const variables = {
        deleteTimeTrack: payload
    }

    return getGraphQLRequestParams(query, undefined, variables);
}

export const deleteForUserTimeTrackMutation = (payload: DeleteTimeTrackPayload) => {
    const query: string = `
        mutation DeleteUserTimeTrack($deleteTimeTrack: Int!) {
            timeTrack {
                deleteForUser(trackId: $deleteTimeTrack)
            }
        }
    `;

    const variables = {
        deleteTimeTrack: payload
    }

    return getGraphQLRequestParams(query, undefined, variables);
}

export const startTimeTrackMutation = (payload: number) => {
    const query: string = `
        mutation StartTimeTrack($startTimeTrack: Int!) {
            timeTrack {
                start(userId: $startTimeTrack) {
                    id
                    startDate
                    endDate
                    totalTime
                    timeTrackType {
                        id
                        name
                    }
                    creationType {
                        id
                        name
                    }
                    timeTrackUpdateHistory {
                        id,
                        date
                        user {
                            id
                            firstname
                            lastname
                            email
                        }
                    }
                }
            }
        }
    `;

    const variables = {
        startTimeTrack: payload
    }

    return getGraphQLRequestParams(query, undefined, variables);
}

export const stopTimeTrackMutation = (payload: number) => {
    const query: string = `
        mutation StopTimeTrack($stopTimeTrack: Int!) {
            timeTrack {
                stop (id: $stopTimeTrack) {
                    id
                    startDate
                    endDate
                    totalTime
                    timeTrackType {
                        id
                        name
                    }
                    creationType {
                        id
                        name
                    }
                    timeTrackUpdateHistory {
                        id,
                        date
                        user {
                            id
                            firstname
                            lastname
                            email
                        }
                    }
                }
            }
        }
    `;

    const variables = {
        stopTimeTrack: payload
    }

    return getGraphQLRequestParams(query, undefined, variables);
}
