namespace Server.Business.Entities;

public class FilterModel
{
    public string Field { get; set; }
    
    public string[] Values { get; set; }

    public void Deconstruct(out object field, out object values)
    {
        throw new NotImplementedException();
    }
}