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
            var data = myContext.List.Where(a => a.Board_Id == BoardId).OrderBy(a => a.Order).ToList();
            return data;
        }

        public List GetByName(string ListName, int BoardId)
        {
            var ListScoped = GetByBoardId(BoardId);
            var data = ListScoped.FirstOrDefault(a => a.Name.Equals(ListName));
            return data;
        }

        public int Create(List list)
        {
            var result = -1;
            var ListDonePut = GetByName("Done",list.Board_Id);
            ListDonePut.Order = list.Order + 1;
            var resultListDonePut = Put(ListDonePut.Id,ListDonePut);
            if (resultListDonePut > 0) {
                var lists = GetByBoardId(list.Board_Id);
                if (lists.Any(x => x.Name == list.Name))
                    return -2;
                myContext.Set<List>().Add(list);
                result = myContext.SaveChanges();
            }

            return result;
        }

    }
}
