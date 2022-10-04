using API.Context;
using API.Models;

namespace API.Repositories.Data
{
    public class EmployeesRepository : GeneralRepository<Employees, MyContext>
    {
        public EmployeesRepository(MyContext myContext) : base(myContext)
        {

        }
    }
}
