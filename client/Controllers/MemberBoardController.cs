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
    public class MemberBoardController : BaseController<MemberBoard, MemberBoardRepository>
    {
        MemberBoardRepository memberBoardRepository;
        public MemberBoardController(MemberBoardRepository memberBoardRepository):base(memberBoardRepository)
        {
            this.memberBoardRepository = memberBoardRepository;
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult GetByBoardId(int BoardId)
        {
            var result = memberBoardRepository.GetByBoardId(BoardId);
            return Json(result);
        }
        [HttpGet]
        public JsonResult GetOwnerByBoardId(int BoardId)
        {
            var result = memberBoardRepository.GetOwnerByBoardId(BoardId);
            return Json(result);
        }
    }
}
