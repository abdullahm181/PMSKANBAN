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
    public class InvitedMembersController : BaseController<InvitedMembers, InvitedMembersRepository>
    {
        InvitedMembersRepository invitedMembersRepository;
        public InvitedMembersController(InvitedMembersRepository invitedMembersRepository):base(invitedMembersRepository)
        {
            this.invitedMembersRepository = invitedMembersRepository;
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult GetRequestByUserId(int UserId)
        {
            var result = invitedMembersRepository.GetRequestByUserId(UserId);
            return Json(result);
        }
        [HttpGet]
        public JsonResult GetHistoryByUserId(int UserId)
        {
            var result = invitedMembersRepository.GetHistoryByUserId(UserId);
            return Json(result);
        }
    }
}
