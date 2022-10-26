using client.Base;
using client.Models;
using client.Repositories.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace client.Controllers
{
    public class EmployeesController : BaseController<Employees, EmployeesRepository>
    {
        public EmployeesController(EmployeesRepository employeesRepository):base(employeesRepository)
        {

        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
