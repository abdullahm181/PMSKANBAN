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

        public UserRepository(MyContext myContext) : base(myContext)
        {

        }


    }


}
