using client.Models;

namespace client.Repositories.Data
{
    public class MemberBoardRepository:GeneralRepository<MemberBoard>
    {
        public MemberBoardRepository(string request = "MemberBoard/") : base(request)
        {

        }
    }
}
