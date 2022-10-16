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
    public class CardController : BaseController<Card, CardRepository>
    {
        public CardController(CardRepository cardRepository):base(cardRepository)
        {

        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
