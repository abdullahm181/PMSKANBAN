using client.Base;
using client.Models;
using client.Repositories.Data;
using Microsoft.AspNetCore.Mvc;

namespace client.Controllers
{
    public class UserController : BaseController<User, UserRepository>
    {
        UserRepository userRepository;
        public UserController(UserRepository userRepository):base(userRepository)
        {
            this.userRepository = userRepository;
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult GetUserLeftByBoardId(int BoardId)
        {
            var result = userRepository.GetUserLeftByBoardId(BoardId);
            return Json(result);
        }
    }
}
