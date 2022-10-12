using client.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace client.Repositories.Data
{
    public class ActivitiesRepository:GeneralRepository<Activities>
    {
        
        public ActivitiesRepository(string request = "Activities/") : base(request)
        {

        }
    }
}
