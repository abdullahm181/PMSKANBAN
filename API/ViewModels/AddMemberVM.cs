using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.ViewModels
{
    public class AddMemberVM
    {
        public string Status = "member";

        public int User_Id { get; set; }
        public int Board_Id { get; set; }
    }
}
