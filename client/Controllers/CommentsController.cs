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
    public class CommentsController : BaseController<Comments, CommentsRepository>
    {
        CommentsRepository commentsRepository;
        public CommentsController(CommentsRepository commentsRepository):base(commentsRepository)
        {
            this.commentsRepository = commentsRepository;
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult GetByCardId(int CardId)
        {
            var result = commentsRepository.GetByCardId(CardId);
            return Json(result);
        }
    }
}
