using client.Models;

namespace client.Repositories.Data
{
    public class UserRoleRepository:GeneralRepository<UserRole>
    {
        public UserRoleRepository(string request = "UserRole/") : base(request)
        {

        }
    }
}
