using client.Base;
using client.Models;
using client.Repositories.Data;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace client.Controllers
{
    public class TaskCardController : BaseController<TaskCard, TaskCardRepository>
    {
        TaskCardRepository taskCardRepository;
        public TaskCardController(TaskCardRepository taskCardRepository):base(taskCardRepository)
        {
            this.taskCardRepository = taskCardRepository;
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult GetByCardId(int CardId)
        {
            var result = taskCardRepository.GetByCardId(CardId);
            return Json(result);
        }
    }
}
