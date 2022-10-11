using API.Context;
using API.Models;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Repositories.Data
{
    public class AccountRepository
    {
        MyContext myContext;
        public AccountRepository(MyContext myContext)
        {
            this.myContext = myContext;
        }

    }
}
