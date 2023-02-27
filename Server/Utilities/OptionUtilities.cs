using Server.Business.Entities;
using Server.MSSQL.Models;

namespace Server.Utilities;

public static class OptionUtilities
{
    public static string[] GetArrayCodes(this IEnumerable<OptionModel> options)
    {
        var codesList = new List<string>();

        foreach (var option in options)
        {
            codesList.Add(option.Code);
        }

        return codesList.ToArray();
    }
}