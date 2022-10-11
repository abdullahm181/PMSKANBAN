using API.Base;
using API.Models;
using API.Repositories.Data;

namespace API.Controllers
{
    public class ActivitiesController : BaseController<Activities, ActivitiesRepository>
    {
        public ActivitiesController(ActivitiesRepository activitiesRepository) : base(activitiesRepository)
        {

        }
    }
}
