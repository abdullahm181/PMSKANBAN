using API.Context;
using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using API.ViewModels;

namespace API.Repositories.Data
{
    public class UserRepository : GeneralRepository<User, MyContext>
    {
        MyContext myContext;
        public UserRepository(MyContext myContext) : base(myContext)
        {
            this.myContext = myContext;
        }
        public List<User> GetUserLeftByBoardId(int BoardId)
        {
            var dataMember = myContext.MemberBoard.Where(a => a.Board_Id == BoardId).ToList();
            var dataPendingMember = myContext.InvitedMembers.Where(a => a.Board_Id == BoardId).ToList();
            var data = myContext.User.ToList();
            foreach (var member in dataMember)
            {
                var userMember = myContext.User.FirstOrDefault(x => x.Id == member.User_Id);
                data.Remove(userMember);
            }
            foreach (var pendingMember in dataPendingMember)
            {
                var UserPendingMember = myContext.User.FirstOrDefault(x => x.Id == pendingMember.User_Id);
                data.Remove(UserPendingMember);
            }
            return data;
        }


    }


}
