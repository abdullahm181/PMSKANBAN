
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

        [HttpPost]
        public JsonResult Create(List list)
        {
            var result = listRepository.Create(list);
            return Json(result);
        }

        [HttpGet]
        public JsonResult GetByBoardId(int BoardId)
        {
            var result = listRepository.GetByBoardId(BoardId);
            return Json(result);
        }


        [HttpGet]
        public JsonResult GetByName(string ListName, int BoardId)
        {
            var result = listRepository.GetByName(ListName,BoardId);
            return Json(result);
        }

        [HttpGet]
        public JsonResult GetCardByListId(int ListId)
        {
            var result = cardRepository.GetByListId(ListId);
            return Json(result);
        }

        [HttpGet]
        public JsonResult GetCard(int CardId)
        {
            var result = cardRepository.Get(CardId);
            return Json(result);
        }
        [HttpPut]
        public JsonResult EditCard(Card card)
        {
            var result = cardRepository.Put(card);
            return Json(result);
        }
    }
}
