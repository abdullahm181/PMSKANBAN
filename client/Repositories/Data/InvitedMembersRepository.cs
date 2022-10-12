using client.Models;

namespace client.Repositories.Data
{
    public class InvitedMembersRepository:GeneralRepository<InvitedMembers>
    {
        public InvitedMembersRepository(string request = "InvitedMembers/") : base(request)
        {

        }
    }
}
