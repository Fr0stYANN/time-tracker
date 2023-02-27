import {FilterType, SearchType, SorterType} from "./parameterTypes";

export type GetUserListFileParametersType = {
    startDate: string | null
    endDate: string | null
    filters: FilterType[] | null
    sort: SorterType[] | null
    search: SearchType | null
    fileType: string
}


export type UsersListResponseType = {
    fileType: string
    fileContent: string
}