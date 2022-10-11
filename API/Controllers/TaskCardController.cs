using API.Base;
using API.Models;
using API.Repositories.Data;

namespace API.Controllers
{
    public class TaskCardController : BaseController<TaskCard,TaskCardRepository>
    {
        public TaskCardController(TaskCardRepository taskCardRepository) : base(taskCardRepository)
        {
        }
    }
}
