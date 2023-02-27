import {getGraphQLRequestParams} from '../common/getGraphQLRequestParams';
import {GetTimeTracksByUserIdAndDateRangePayload} from 'types/timeTracksTypes';


export const getTimeTracksByUserIdAndDateRangeQuery = (payload: GetTimeTracksByUserIdAndDateRangePayload, feature: string) => {
    const query: string = `
        query GetAllUserTimeTracks($getByUserIdAndDateRange: GetByUserIdAndDateRangeInput!) {
            timeTrack {
                getByUserIdAndDateRange(timetrack: $getByUserIdAndDateRange) {
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
        getByUserIdAndDateRange: payload
    }

    return getGraphQLRequestParams(query, feature, variables);
}

export const getUnfinishedTimeTracksByUserId = (payload: number) => {
    const query: string = `
        query GetUnfinishedTimeTrack($getUnfinishedTimeTrack: Int!) {
            timeTrack {
                getUnfinishedTimeTrackByUserId(userId: $getUnfinishedTimeTrack) {
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
        getUnfinishedTimeTrack: payload
    };

    return getGraphQLRequestParams(query, undefined, variables);
}

