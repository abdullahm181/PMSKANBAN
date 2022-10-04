using API.Base;
using API.Models;
using API.Repositories.Data;

namespace API.Controllers
{
    public class RoleController : BaseController<Role, RoleRepository>
    {
        public RoleController(RoleRepository roleRepository):base(roleRepository)
        {
            
        }
    }
}
