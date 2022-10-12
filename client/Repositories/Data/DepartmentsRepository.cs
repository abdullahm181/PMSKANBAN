using client.Models;

namespace client.Repositories.Data
{
    public class DepartmentsRepository:GeneralRepository<Departments>
    {
        public DepartmentsRepository(string request = "Departments/") : base(request)
        {

        }
    }
}
