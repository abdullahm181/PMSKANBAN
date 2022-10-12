using client.Models;

namespace client.Repositories.Data
{
    public class JobsRepository:GeneralRepository<Jobs>
    {
        public JobsRepository(string request = "Jobs/") : base(request)
        {

        }
    }
}
