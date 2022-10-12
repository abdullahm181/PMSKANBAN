using client.Models;

namespace client.Repositories.Data
{
    public class TaskCardRepository:GeneralRepository<TaskCard>
    {
        public TaskCardRepository(string request = "TaskCard/") : base(request)
        {

        }
    }
}
