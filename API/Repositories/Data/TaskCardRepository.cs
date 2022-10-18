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
        MyContext myContext;
        public TaskCardRepository(MyContext myContext) : base(myContext)
        {
            this.myContext = myContext;
        }

        public List<TaskCard> GetByCardId(int CardId)
        {
            var data = myContext.TaskCard.Where(a => a.Card_Id == CardId).ToList();
            return data;
        }
    }

}

