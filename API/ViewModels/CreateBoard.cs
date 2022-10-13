using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.ViewModels
{
    public class CreateBoard
    {
        public int User_Id { get; set; }
        public string Status = "owner";
        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime CreateDate { get; set; }
    }
}
