using API.Base;
using API.Models;
using API.Repositories.Data;

namespace API.Controllers
{
    public class LevelController : BaseController<Level, LevelRepository>
    {
        public LevelController(LevelRepository levelRepository) : base(levelRepository)
        {

        }
    }
}
