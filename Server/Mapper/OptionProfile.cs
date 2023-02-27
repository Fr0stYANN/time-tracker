using AutoMapper;
using Server.Business.Entities;


namespace Server.Mapper
{
    public class OptionProfile : Profile
    {
        public OptionProfile()
        {
            CreateMap<int, OptionModel>()
                .AfterMap((src, dest) => 
                {
                    dest.Id = src;
                });
			
            CreateMap<OptionModel, int>()
                .ConstructUsing(src => src.Id);
        }
    }
}