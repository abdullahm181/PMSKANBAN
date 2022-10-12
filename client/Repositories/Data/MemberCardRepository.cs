using client.Models;

namespace client.Repositories.Data
{
    public class MemberCardRepository:GeneralRepository<MemberCard>
    {
        public MemberCardRepository(string request = "MemberCard/") : base(request)
        {

        }
    }
}
