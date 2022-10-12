using client.Models;

namespace client.Repositories.Data
{
    public class UserRepository:GeneralRepository<User>
    {
        public UserRepository(string request = "User/") : base(request)
        {

        }
    }
}
