import {User} from "./userTypes";

export type CreationTypeTimeTrack = {
    id: number,
    name: string
}

export type TimeTrackUpdateHistory = {
    id: number
    date: string
    user: User
}

export type TimeTrackType = {
    id: number
    name: string
}

export type TimeTrack = {
    id: number
    startDate: string
    endDate: string
    totalMinutes: number
    typeCreation: CreationTypeTimeTrack
    timeTrackUpdateHistory: TimeTrackUpdateHistory
    timeTrackType: TimeTrackType
}

export type GetTimeTracksByUserIdAndDateRangePayload = {
    startDate: string
    endDate: string
    userId: number
}

export type CreateTimeTrackPayload = {
    userId: number
    startDate: string
    endDate: string
    timeTrackTypeId: number
}

export type UpdateTimeTrackPayload = {
    id: number
    startDate: string
    endDate: string
    timeTrackTypeId: number
}

export type DeleteTimeTrackPayload = number;

