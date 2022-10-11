using API.Base;
using API.Models;
using API.Repositories.Data;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class CardController : BaseController<Card,CardRepository>
    {
        public CardController(CardRepository cardRepository) : base(cardRepository)
        {
        }

    }
}
