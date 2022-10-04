using API.Context;
using API.Models;

namespace API.Repositories.Data
{
    public class UserRepository : GeneralRepository<User, MyContext>
    {

        public UserRepository(MyContext myContext) : base(myContext)
        {

        }


    }
}
