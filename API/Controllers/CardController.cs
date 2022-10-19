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
        CardRepository cardRepository;
        public CardController(CardRepository cardRepository) : base(cardRepository)
        {
            this.cardRepository = cardRepository;
        }
        [HttpGet("GetByListId")]
        public IActionResult GetByListId(int ListId)
        {
            if (string.IsNullOrWhiteSpace(ListId.ToString()))
            {
                return BadRequest();
            }

            var data = cardRepository.GetByListId(ListId);

            return Ok(new { result = 200, data = data });
        }
        [HttpGet("GetByBoardId")]
        public IActionResult GetByBoardId(int BoardId)
        {
            if (string.IsNullOrWhiteSpace(BoardId.ToString()))
            {
                return BadRequest();
            }

            var data = cardRepository.GetByBoardId(BoardId);

            return Ok(new { result = 200, data = data });
        }
        [HttpGet("GetCard")]
        public IActionResult GetCard(int CardId)
        {
            if (string.IsNullOrWhiteSpace(CardId.ToString()))
            {
                return BadRequest();
            }

            var data = cardRepository.GetCard(CardId);
            if (data == null)
            {
                return NotFound();
            }
            return Ok(new { result = 200, data = data });
        }
        
    }
}
