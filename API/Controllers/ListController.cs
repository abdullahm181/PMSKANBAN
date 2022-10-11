using API.Base;
using API.Models;
using API.Repositories.Data;

namespace API.Controllers
{
    public class ListController : BaseController<List, ListRepository>
    {
        public ListController(ListRepository ListRepository) : base(ListRepository)
        {
        }
        }
}
