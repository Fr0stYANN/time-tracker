export type WorkTimeType = {
    workedMinutes: number
    totalWorkHours: number
}

export type GetWorkTimeUserType = {
    userId: number
    startDate: string
    endDate: string
}

export type WorkDayType = {
    date: string
    workedMinutes: number
}

export type DisplayHoursWorkDayType = {
    date: string
    workedHours: number
    name: string
}

export type GetWorkDaysByUserIdAndDateRangeType = {
    userId: number
    startDate: string
    endDate: string
    isWeekendShows: boolean
}