import OptionType from './optionType';
import moment from 'moment';
import { FilterType, PaginationType, SearchType, SorterType } from './parameterTypes';
import WorkType from "./workType";

export type User = {
    id: number
    email: string
    firstname: string
    lastname: string
    vacationDays: number
    isActivated: boolean
    employmentDate?: Date
    workType: WorkType
    options?: OptionType[]
}

export type LoginUserInputType = {
    email: string
    password: string
}

export type LoginUserWithGoogleInputType = {
    clientId: string
    credential: string
}

export type RevokeUserParamsType = {
    accessToken: string
    refreshToken: string
}

export type GetUsersParametersType = {
    pagination: PaginationType | null
    filters: FilterType[] | null
    sort: SorterType[] | null
    search: SearchType | null
}

export type AddUserType = {
    firstname: string
    lastname: string
    email: string
    workTypeId: number
    vacationApprovers: string[]
    employmentDate: String
    options?: OptionType[]
}

export type AddUserFormType = {
    firstname: string
    lastname: string
    email: string
    workTypeId: number
    employmentDate: moment.Moment
    vacationApprovers: string[]
    options?: OptionType[]
}

export type UpdateUserFormType = {
    id: number
    firstname: string
    lastname: string
    email: string
    employmentDate: moment.Moment
    vacationApprovers: string[]
    workTypeId: number
    options?: OptionType[]
}

export type UpdateUserType = {
    id: number
    firstname: string
    lastname: string
    email: string
    employmentDate: String
    vacationApprovers: string[]
    workTypeId: number
    options?: OptionType[]
}

export type SetActivationStatusType = {
    id: number,
    isActivated: boolean
}
