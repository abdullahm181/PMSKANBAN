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
    [Authorize]
    public class CardController : BaseController<Card, CardRepository>
    {
        CardRepository cardRepository;
        public CardController(CardRepository cardRepository):base(cardRepository)
        {
            this.cardRepository = cardRepository;
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult GetByBoardId(int BoardId)
        {
            var result = cardRepository.GetByBoardId(BoardId);
            return Json(result);
        }
    }
}
