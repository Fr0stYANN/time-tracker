using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController : ControllerBase
    {
        [HttpGet]
        public string Get()
        {
            return "Hello World";
        }
    }
}
