using API.Context;
using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Repositories.Data
{
    public class InvitedMembersRepository : GeneralRepository<InvitedMembers, MyContext>
    {
        MyContext myContext;
        public InvitedMembersRepository(MyContext myContext) : base(myContext)
        {
            this.myContext = myContext;
            //Id,InvitedDate,Status,Board_Id,User_Id
        }
        public List<InvitedMembers> GetRequestByUserId(int UserId)
        {

            var data = myContext.InvitedMembers.Where(a =>( a.User_Id == UserId&&a.Status== "request")).ToList();
            return data;
        }
        public List<InvitedMembers> GetHistoryByUserId(int UserId)
        {

            var data = myContext.InvitedMembers.Where(a => (a.User_Id == UserId && a.Status != "request")).ToList();
            return data;
        }
    }
}
