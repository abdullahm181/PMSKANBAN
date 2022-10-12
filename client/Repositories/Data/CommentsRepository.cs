using client.Models;

namespace client.Repositories.Data
{
    public class CommentsRepository:GeneralRepository<Comments>
    {
        public CommentsRepository(string request = "Comments/") : base(request)
        {

        }
    }
}
