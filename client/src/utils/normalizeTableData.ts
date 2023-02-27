import {FilterType, SorterType} from '../types/parameterTypes';

const normalizeTableData: any = (
    pagination: any,
    filters: any,
    sorter: any,
) => {
    delete filters.firstname;
    delete filters.lastname;
    delete filters.email;

    return {
        pagination: {
            page: pagination.current,
            pageSize: pagination.pageSize
        },
        filters: getNormalizedFilters(filters),
        sort: getNormalizedSorts(sorter)
    }
}

const getNormalizedFilters = (filters: any): FilterType[] | null => {
    const filter: FilterType[] = [];

    if (filters.workTypeId !== null) {
        filter.push({
            field: 'workTypeId',
            values: filters.workTypeId
        });
    }

    return filter.length === 0 ? null : filter;
}

const getNormalizedSorts = (sorter: any): SorterType[] | null => {
    const sort: SorterType[] = [];

    if (Array.isArray(sorter)) {
        for (const s of sorter) {
            if (s.order !== undefined) {
                sort.push({
                    field: s.field,
                    order: s.order?.replace('end', '').toUpperCase()
                })
            }
        }
    } else {
        if (sorter.order !== undefined) {
            sort.push({
                field: sorter.field,
                order: sorter.order?.replace('end', '').toUpperCase()
            })
        }
    }

    return sort.length === 0 ? null : sort;
}

export default normalizeTableData;
