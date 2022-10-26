using API.Base;
using API.Models;
using API.Repositories.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class InvitedMembersController : BaseController<InvitedMembers, InvitedMembersRepository>
    {
        InvitedMembersRepository invitedMembersRepository;
        public InvitedMembersController(InvitedMembersRepository invitedMembersRepository) : base(invitedMembersRepository)
        {
            this.invitedMembersRepository = invitedMembersRepository;
        }
        [HttpGet("GetRequestByUserId")]
        public IActionResult GetRequestByUserId(int UserId)
        {
            if (string.IsNullOrWhiteSpace(UserId.ToString()))
            {
                return BadRequest();
            }

            var data = invitedMembersRepository.GetRequestByUserId(UserId);

            return Ok(new { result = 200, data = data });
        }
        [HttpGet("GetHistoryByUserId")]
        public IActionResult GetHistoryByUserId(int UserId)
        {
            if (string.IsNullOrWhiteSpace(UserId.ToString()))
            {
                return BadRequest();
            }

            var data = invitedMembersRepository.GetHistoryByUserId(UserId);

            return Ok(new { result = 200, data = data });
        }
    }
}
