using API.Models;
using API.Repositories.Data;
using Microsoft.AspNetCore.Authorization;
using API.Base;
namespace API.Controllers
{
    [Authorize]
    public class UserController : BaseController<User, UserRepository>
    {

        public UserController(UserRepository userRepository) : base(userRepository)
        {

        }

    }
}
