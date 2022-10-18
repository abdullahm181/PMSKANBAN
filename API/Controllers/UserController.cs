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
        UserRepository userRepository;
        public UserController(UserRepository userRepository) : base(userRepository)
        {
            this.userRepository = userRepository;
        }
        [HttpGet("GetUserLeftByBoardId")]
        public IActionResult GetUserLeftByBoardId(int BoardId)
        {
            if (string.IsNullOrWhiteSpace(BoardId.ToString()))
            {
                return BadRequest();
            }

            var data = userRepository.GetUserLeftByBoardId(BoardId);

            return Ok(new { result = 200, data = data });
        }
    }
}
