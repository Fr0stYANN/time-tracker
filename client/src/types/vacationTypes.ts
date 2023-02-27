import { User } from "./userTypes"
import { Moment } from "moment";

export type RequestVacationType = {
    startDate?: string | null
    endDate?: string | null
    comment?: string | null
    userId?: number
}

export type UpdateVacationType = {
    startDate?: string | null
    endDate?: string | null
    comment?: string | null
    userId?: number
    id: number
}

export type CreateVacationFormType = {
    rangeDate: [Moment | null, Moment | null] | null
    userId: number
    comment?: string | null
}

export type UpdateVacationFormType = {
    rangeDate: [Moment | null, Moment | null] | null
    userId: number
    id: number
    comment?: string
}


export type VacationType = {
    id: number
    user: User
    startDate?: string | null
    endDate?: string | null
    isApproved: boolean
    comment?: string | null
    approveRecords?: ApproveRecordType[]
}

export type ApproveVacationType = {
    vacationRecordId: number
    comment?: string
}

export type RequestedVacationType = {
    vacation: VacationType
    approveRecords?: ApproveRecordType [] | null
}

export type ApproveRecordType = {
    id: number
    approver: User
    isApproved: boolean
    comment?: string
}