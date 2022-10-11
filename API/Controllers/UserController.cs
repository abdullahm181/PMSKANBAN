using API.Models;
using API.Repositories.Data;
using Microsoft.AspNetCore.Authorization;
using API.Base;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[AllowAnonymous]
    [Authorize]
    public class UserController : BaseController<User, UserRepository>
    {

        public UserController(UserRepository userRepository) : base(userRepository)
        {

        }

    }
}
