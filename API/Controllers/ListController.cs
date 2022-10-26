using API.Base;
using API.Models;
using API.Repositories.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class ListController : BaseController<List, ListRepository>
    {
        ListRepository listRepository;
        public ListController(ListRepository ListRepository) : base(ListRepository)
        {
            this.listRepository = ListRepository;
        }
        /*[HttpPost("Create")]
        public IActionResult Create(List list)
        {
            if (ModelState.IsValid)
            {
                list.Board_Id
                var resultCreateBoard = listRepository.Post(list);
                if (resultCreateBoard > 0)
                {
                    return Ok(new { result = 200, message = "successfully inserted" });
                }
            }
            return BadRequest(new { result = 400, message = "Error" });

        }*/
        [HttpGet("GetByBoardId")]
        public IActionResult GetByBoardId(int BoardId) 
        {
            if (string.IsNullOrWhiteSpace(BoardId.ToString()))
            {
                return BadRequest();
            }

            var data = listRepository.GetByBoardId(BoardId);

            return Ok(new { result = 200, data = data });
        }

        [HttpGet("GetByName")]
        public IActionResult GetByName(string ListName, int BoardId)
        {
            if (string.IsNullOrWhiteSpace(ListName))
            {
                return BadRequest();
            }

            var data = listRepository.GetByName(ListName,BoardId);

            return Ok(new { result = 200, data = data });
        }

        [HttpPost("Create")]
        public IActionResult Create(List list)
        {
            if (ModelState.IsValid)
            {

                var result = listRepository.Create(list);
                if (result > 0)
                    return Ok(new { result = 200, message = "successfully inserted" });
                else if(result==-2)
                    return BadRequest(new { result = 400, message = "title already exist in this board" });
            }
            return BadRequest();

        }


    }
}
