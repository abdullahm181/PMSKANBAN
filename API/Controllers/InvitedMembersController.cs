using API.Base;
using API.Models;
using API.Repositories.Data;

namespace API.Controllers
{
    public class InvitedMembersController : BaseController<InvitedMembers, InvitedMembersRepository>
    {
        public InvitedMembersController(InvitedMembersRepository invitedMembersRepository) : base(invitedMembersRepository)
        {
        }
        }
    }
