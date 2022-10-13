using API.Base;
using API.Models;
using API.Repositories.Data;
using API.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class BoardsController : BaseController<Boards,BoardsRepository>
    {
        BoardsRepository boardsRepository;
        MemberBoardRepository memberBoardRepository;
        public BoardsController(BoardsRepository boardsRepository, MemberBoardRepository memberBoardRepository) : base(boardsRepository)
        {
            this.boardsRepository = boardsRepository;
            this.memberBoardRepository = memberBoardRepository;

        }
        [HttpPost("Create")]
        public IActionResult Create(CreateBoard createBoard)
        {
            if (ModelState.IsValid)
            {
                var resultCreateBoard = boardsRepository.Create(createBoard);
                if (resultCreateBoard > 0)
                {
                    return Ok(new { result = 200, message = "successfully inserted" });
                }
                else if(resultCreateBoard == -2) {
                    return BadRequest(new { result = 400, message = "Error Duplicate Name of Board" });
                }
                
            }
            return BadRequest(new { result = 400, message = "Error" });

        }
        [HttpGet("GetbyUserId")]
        public IActionResult GetbyUserId(int UserId)
        {
            if (string.IsNullOrWhiteSpace(UserId.ToString()))
            {
                return BadRequest();
            }

            var data = boardsRepository.Get().FindAll(a => a.Owner_Id == UserId);

            if (data == null)
            {
                return NotFound();
            }

            return Ok(new { result=200,data=data});

        }
    }
}
