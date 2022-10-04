using API.Context;
using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Repositories.Data
{
    public class JobsRepository : GeneralRepository<Jobs, MyContext>
    {
        public JobsRepository(MyContext myContext) : base(myContext)
        {

        }
    }
}
