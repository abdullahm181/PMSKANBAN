using API.Context;
using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Repositories.Data
{
    public class TaskCardRepository : GeneralRepository<TaskCard, MyContext>
    {
        public TaskCardRepository(MyContext myContext) : base(myContext)
        {
        }
            
    }
}
