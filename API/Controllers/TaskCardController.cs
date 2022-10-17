using API.Base;
using API.Models;
using API.Repositories.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TaskCardController : BaseController<TaskCard,TaskCardRepository>
    {
        TaskCardRepository taskCardRepository;
        public TaskCardController(TaskCardRepository taskCardRepository) : base(taskCardRepository)
        {
            this.taskCardRepository = taskCardRepository;
        }
        [HttpGet("GetByCardId")]
        public IActionResult GetByCardId(int CardId)
        {
            if (string.IsNullOrWhiteSpace(CardId.ToString()))
            {
                return BadRequest();
            }

            var data = taskCardRepository.GetByCardId(CardId);

            return Ok(new { result = 200, data = data });
        }
    }
}
