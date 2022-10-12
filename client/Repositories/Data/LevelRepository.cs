using client.Models;

namespace client.Repositories.Data
{
    public class LevelRepository:GeneralRepository<Level>
    {
        public LevelRepository(string request = "Level/") : base(request)
        {

        }
    }
}
