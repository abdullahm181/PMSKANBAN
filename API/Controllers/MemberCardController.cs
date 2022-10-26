using API.Base;
using API.Models;
using API.Repositories.Data;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Authorize]
    public class MemberCardController : BaseController<MemberCard,MemberCardRepository>
    {
        public MemberCardController(MemberCardRepository memberCardRepository) : base(memberCardRepository)
        {
        }
        }
}
