using FluentValidation;
using Server.Models.User;

namespace Server.Validators.User;

public class GetAllUsersParamsInputModelValidator : AbstractValidator<GetAllUsersParamsInputModel>
{
    private readonly List<string> filterFields = new ()
    {
        "worktypeid"
    };
    
    private readonly List<string> sortFields = new ()
    {
        "firstname",
        "lastname",
        "employmentdate",
    };
    
    private readonly List<string> searchFields = new ()
    {
        "email",
        "firstname",
        "lastname"
    };
    
    private readonly List<string> sortDirections = new ()
    {
        "asc",
        "desc"
    };
    
    public GetAllUsersParamsInputModelValidator()
    {
        RuleFor(x => x.Pagination).ChildRules(pagination =>
        {
            pagination.RuleFor(x => x.Page)
                .NotNull()
                .GreaterThanOrEqualTo(1);

            pagination.RuleFor(x => x.PageSize)
                .NotNull()
                .InclusiveBetween(1, 500);
        });

        RuleFor(x => x.Filters).ForEach(filterRule =>
        {
            filterRule.ChildRules(filter =>
            {
                filter.RuleFor(x => x.Field)
                    .Must(field => filterFields.Contains(field.ToLower()))
                    .WithMessage(field => $"Field '{field}' not allowed for filters users");
            });
        });
        
        RuleFor(x => x.Sort).ForEach(sortRule =>
        {
            sortRule.ChildRules(sort =>
            {
                sort.RuleFor(x => x.Field)
                    .Must(field => sortFields.Contains(field.ToLower()))
                    .WithMessage(field => $"Field '{field}' not allowed for sort users");
                
                sort.RuleFor(x => x.Order)
                    .Must(order => sortDirections.Contains(order.ToLower()))
                    .WithMessage(order => $"Order value '{order}' not allowed. Required 'ASC' or 'DESC' values");
            });
        });

        RuleFor(x => x.Search).ChildRules(search =>
        {
            search.RuleFor(x => x.Field)
                .Must(field => searchFields.Contains(field.ToLower()))
                .WithMessage(field => $"Field '{field}' not allowed for search users");
        });
    }
}