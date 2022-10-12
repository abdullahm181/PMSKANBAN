using client.Models;

namespace client.Repositories.Data
{
    public class ListRepository:GeneralRepository<List>
    {
        public ListRepository(string request = "List/") : base(request)
        {

        }
    }
}
