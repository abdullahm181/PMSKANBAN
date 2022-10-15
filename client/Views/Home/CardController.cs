using client.Base;
using client.Models;
using client.Repositories.Data;
using Microsoft.AspNetCore.Mvc;

namespace client.Views.Home
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
