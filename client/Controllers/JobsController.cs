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
 
    public class JobsController : BaseController<Jobs, JobsRepository>
    {
        public JobsController(JobsRepository jobsRepository):base(jobsRepository)
        {
                
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
