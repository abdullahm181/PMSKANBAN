
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
    public class ListController : BaseController<List, ListRepository>
    {
        ListRepository listRepository;
        public ListController(ListRepository listRepository):base(listRepository)
        {
            this.listRepository = listRepository;
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult GetByBoardId(int BoardId)
        {
            var result = listRepository.GetByBoardId(BoardId);
            return Json(result);
        }
    }
}
