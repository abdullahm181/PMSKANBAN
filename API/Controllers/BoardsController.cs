using API.Base;
using API.Models;
using API.Repositories.Data;
using API.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace API.Controllers
{

    public class BoardsController : BaseController<Boards,BoardsRepository>
    {
        BoardsRepository boardsRepository;
        public BoardsController(BoardsRepository boardsRepository) : base(boardsRepository)
        {
            this.boardsRepository = boardsRepository;

        }
        [HttpPost("Create")]
        public IActionResult Create(CreateBoardVM createBoard)
        {
            Boards boards = null;
            if (ModelState.IsValid)
            {
                var (resultCreateBoard,data) = boardsRepository.Create(createBoard);
                if (resultCreateBoard > 0)
                {
                    return Ok(new { result = 200, message = "successfully inserted",data= data });
                }
                else if(resultCreateBoard == -2) {
                    return BadRequest(new { result = 400, message = "Error Duplicate Name of Board", data = boards });
                }
                
            }
            return BadRequest(new { result = 400, message = "Error", data = boards });

        }
        [HttpGet("GetbyOwner")]
        public IActionResult GetbyOwner(int OwnerId)
        {
            if (string.IsNullOrWhiteSpace(OwnerId.ToString()))
            {
                return BadRequest();
            }

            var data = boardsRepository.GetbyOwner(OwnerId);

            return Ok(new { result=200,data=data});

        }
        [HttpGet("GetbyMember")]
        public IActionResult GetbyMember(int MemberId)
        {
            if (string.IsNullOrWhiteSpace(MemberId.ToString()))
            {
                return BadRequest();
            }

            var data = boardsRepository.GetbyMember(MemberId);

            return Ok(new { result = 200, data = data });

        }
    }
}
