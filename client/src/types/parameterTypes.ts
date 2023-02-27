export type PaginationType = {
    page: number
    pageSize: number
}

export type FilterType = {
    field: string
    values: string[]
}

export type SearchType = {
    field: string
    like: string
}

export type SorterType = {
    field: string
    order: string
}
