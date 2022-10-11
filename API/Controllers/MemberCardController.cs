using API.Base;
using API.Models;
using API.Repositories.Data;

namespace API.Controllers
{

    public class MemberCardController : BaseController<MemberCard,MemberCardRepository>
    {
        public MemberCardController(MemberCardRepository memberCardRepository) : base(memberCardRepository)
        {
        }
        }
}
