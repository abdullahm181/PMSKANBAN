using API.Context;
using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Repositories.Data
{
    public class CommentsRepository : GeneralRepository<Comments, MyContext>
    {
        MyContext myContext;
        public CommentsRepository(MyContext myContext) : base(myContext)
        {
            this.myContext = myContext;
        }
        public List<Comments> GetByCardId(int CardId)
        {
            var data = myContext.Comments.Where(a => a.Card_Id == CardId).ToList();
            return data;
        }

    }
}
