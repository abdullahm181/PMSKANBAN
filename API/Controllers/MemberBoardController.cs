using API.Base;
using API.Models;
using API.Repositories.Data;

namespace API.Controllers
{
    public class MemberBoardController : BaseController<MemberBoard, MemberBoardRepository>
    {
        public MemberBoardController(MemberBoardRepository memberBoardRepository) : base(memberBoardRepository)
        {
        }
    }
}
