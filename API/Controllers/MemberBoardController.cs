using API.Base;
using API.Models;
using API.Repositories.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class MemberBoardController : BaseController<MemberBoard, MemberBoardRepository>
    {
        MemberBoardRepository memberBoardRepository;
        public MemberBoardController(MemberBoardRepository memberBoardRepository) : base(memberBoardRepository)
        {
            this.memberBoardRepository = memberBoardRepository;
        }
        [HttpGet("GetByBoardId")]
        public IActionResult GetByBoardId(int BoardId)
        {
            if (string.IsNullOrWhiteSpace(BoardId.ToString()))
            {
                return BadRequest();
            }

            var data = memberBoardRepository.GetByBoardId(BoardId);

            return Ok(new { result = 200, data = data });
        }
        [HttpGet("GetOwnerByBoardId")]
        public IActionResult GetOwnerByBoardId(int BoardId)
        {
            if (string.IsNullOrWhiteSpace(BoardId.ToString()))
            {
                return BadRequest();
            }

            var data = memberBoardRepository.GetOwnerByBoardId(BoardId);

            return Ok(new { result = 200, data = data });
        }
    }
}
