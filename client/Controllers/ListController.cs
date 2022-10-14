
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
        CardRepository cardRepository;
        public ListController(ListRepository listRepository, CardRepository cardRepository) :base(listRepository)
        {
            this.listRepository = listRepository;
            this.cardRepository = cardRepository;
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
        [HttpGet]
        public JsonResult GetCardByListId(int ListId)
        {
            var result = cardRepository.GetByListId(ListId);
            return Json(result);
        }
    }
}
