using client.Base;
using client.Models;
using client.Repositories.Data;
using Microsoft.AspNetCore.Mvc;

namespace client.Controllers
{
    public class UserController : BaseController<User, UserRepository>
    {
        public UserController(UserRepository userRepository):base(userRepository)
        {

        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
