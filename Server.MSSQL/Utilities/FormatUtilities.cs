using System.Runtime.CompilerServices;
using DapperQueryBuilder;
using Server.Business.Entities;

namespace Server.MSSQL.Utilities;

public static class FormatUtilities
{
    internal static FormattableString GetUserFormatSearch(SearchModel searchModel)
    {
        return FormattableStringFactory.Create(searchModel.Field +  " LIKE CONCAT('%',{0},'%')", searchModel.Like);
    }

    internal static FormattableString GetUserFormatSort(List<SortModel> sortModels)
    {
        string formatSort = "ORDER BY ";

        var lastSortModel = sortModels.Last();
        
        foreach (var sortModel in sortModels)
        {
            formatSort += $"{sortModel.Field} {sortModel.Order}";
                
            if (!lastSortModel.Equals(sortModel))
            {
                formatSort += ", ";
            }
        }

        return FormattableStringFactory.Create(formatSort);
    }
    
    internal static Filters GetFormatFilters(List<FilterModel> filterModels)
    {
        var filters = new Filters(Filters.FiltersType.AND);

        foreach (var filterModel in filterModels)
        {
            filters.Add(GetFormatSubFilters(filterModel));
        }

        return filters;
    }

    private static Filters GetFormatSubFilters(FilterModel filterModel)
    {
        var filters = new Filters(Filters.FiltersType.OR);

        foreach (var value in filterModel.Values)
        {
            var formatString = FormattableStringFactory.Create(filterModel.Field + " = {0}", value);

            filters.Add(new Filter(formatString));
        }

        return filters;
    }
}