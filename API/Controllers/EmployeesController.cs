using API.Base;
using API.Models;
using API.Repositories.Data;

namespace API.Controllers
{
    public class EmployeesController : BaseController<Employees, EmployeesRepository>
    {
        public EmployeesController(EmployeesRepository employeesRepository):base(employeesRepository)
        {

        }
    }
}
