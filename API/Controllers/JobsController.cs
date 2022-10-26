using API.Base;
using API.Models;
using API.Repositories.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class JobsController : BaseController<Jobs, JobsRepository>
    {
        public JobsController(JobsRepository jobsRepository):base(jobsRepository)
        {

        }
    }
}
