using client.Models;

namespace client.Repositories.Data
{
    public class RoleRepository:GeneralRepository<Role>
    {
        public RoleRepository(string request = "Role/") : base(request)
        {

        }
    }
}
