using client.Base;
using client.Models;
using client.Repositories.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace client.Controllers
{
    //[Authorize(Roles = "Admin")]
    [Authorize]
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
        [Authorize(Roles = "Manager")]
        public IActionResult Managers()
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
