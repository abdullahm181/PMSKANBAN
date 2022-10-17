using API.Context;
using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Repositories.Data
{
    public class MemberBoardRepository : GeneralRepository<MemberBoard, MyContext>
    {
        MyContext myContext;
        public MemberBoardRepository(MyContext myContext) : base(myContext)
        {
            this.myContext = myContext;
        }
        public List<MemberBoard> GetByBoardId(int BoardId)
        {

            var data = myContext.MemberBoard.Where(a => a.Board_Id == BoardId).ToList();
            return data;
        }
    }
}
