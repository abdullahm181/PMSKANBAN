using API.Base;
using API.Models;
using API.Repositories.Data;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Authorize]
    public class UserRoleController : BaseController<UserRole, UserRoleRepository>
    {
        public UserRoleController(UserRoleRepository userRoleRepository):base(userRoleRepository)
        {

        }
    }
}
