using API.Context;
using API.Models;

namespace API.Repositories.Data
{
    public class UserRoleRepository : GeneralRepository<UserRole, MyContext>
    {
        public UserRoleRepository(MyContext myContext) : base(myContext)
        {

        }
    }
}
