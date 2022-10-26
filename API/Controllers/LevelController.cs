using API.Base;
using API.Models;
using API.Repositories.Data;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Authorize]
    public class LevelController : BaseController<Level, LevelRepository>
    {
        public LevelController(LevelRepository levelRepository) : base(levelRepository)
        {

        }
    }
}
