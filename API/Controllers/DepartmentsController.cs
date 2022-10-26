using API.Base;
using API.Models;
using API.Repositories.Data;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class DepartmentsController : BaseController<Departments, DepartmentsRepository>
    {
        public DepartmentsController(DepartmentsRepository departmentsRepository):base(departmentsRepository)
        {

        }
    }
}
