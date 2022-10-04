using API.Context;
using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Repositories.Data
{
    public class DepartmentsRepository : GeneralRepository<Departments, MyContext>
    {
        public DepartmentsRepository(MyContext myContext) : base(myContext)
        {

        }
    }
}
