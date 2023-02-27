import { User } from './userTypes';

export type SickLeaveType = {
    id: number
    startDate: string
    endDate: string
}

export type AddSickLeaveType = {
    userId: number
    startDate: string
    endDate: string
}

export type UpdateSickLeaveType = {
    id: number
    startDate: string
    endDate: string
}