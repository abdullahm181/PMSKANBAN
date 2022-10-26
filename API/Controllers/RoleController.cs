using API.Base;
using API.Models;
using API.Repositories.Data;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Authorize]
    public class RoleController : BaseController<Role, RoleRepository>
    {
        public RoleController(RoleRepository roleRepository):base(roleRepository)
        {
            
        }
    }
}
