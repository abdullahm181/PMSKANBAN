using API.Context;
using API.Models;

namespace API.Repositories.Data
{
    public class LevelRepository:GeneralRepository<Level, MyContext>
    {

        public LevelRepository(MyContext myContext) : base(myContext)
        {

        }
    }
}
