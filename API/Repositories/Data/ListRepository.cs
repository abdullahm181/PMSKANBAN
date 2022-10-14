using API.Context;
using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Repositories.Data
{
    public class ListRepository : GeneralRepository<List, MyContext>
    {
        MyContext myContext;
        public ListRepository(MyContext myContext) : base(myContext)
        {
            this.myContext = myContext;
        }

        public List<List> GetByBoardId(int BoardId)
        {
            var data = myContext.List.Where(a => a.Board_Id == BoardId).ToList();
            return data;
        }
    }
}
