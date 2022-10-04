using API.Base;
using API.Models;
using API.Repositories.Data;

namespace API.Controllers
{
    public class UserRoleController : BaseController<UserRole, UserRoleRepository>
    {
        public UserRoleController(UserRoleRepository userRoleRepository):base(userRoleRepository)
        {

        }
    }
}
