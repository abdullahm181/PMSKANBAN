using API.Models;
using API.Context;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Base;
using API.Repositories.Data;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Authorize]
    public class CommentsController : BaseController<Comments, CommentsRepository>
    {
        CommentsRepository commentsRepository;
        public CommentsController(CommentsRepository commentsRepository) : base(commentsRepository)
        {
            this.commentsRepository = commentsRepository;
        }
        [HttpGet("GetByCardId")]
        public IActionResult GetByCardId(int CardId)
        {
            if (string.IsNullOrWhiteSpace(CardId.ToString()))
            {
                return BadRequest();
            }

            var data = commentsRepository.GetByCardId(CardId);

            return Ok(new { result = 200, data = data });
        }

    }
}
