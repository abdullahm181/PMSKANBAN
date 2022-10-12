using client.Models;

namespace client.Repositories.Data
{
    public class BoardsRepository:GeneralRepository<Boards>
    {
        public BoardsRepository(string request = "Boards/") : base(request)
        {

        }
    }
}
