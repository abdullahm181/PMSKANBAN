using API.Context;
using API.Models;

namespace API.Repositories.Data
{
    public class RoleRepository : GeneralRepository<Role, MyContext>
    {
        public RoleRepository(MyContext myContext) : base(myContext)
        {

        }
    }
}
