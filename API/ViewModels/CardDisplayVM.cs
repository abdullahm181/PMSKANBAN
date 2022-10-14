using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.ViewModels
{
    public class CardDisplayVM
    {
        //id,name, numberTaskItem,numbercomment, personInchargeName
        public int Id { get; set; }
        public string Name { get; set; }
        public int numberTaskItem { get; set; }
        public int numbercomment { get; set; }
        public int personIncharge { get; set; }
    }
}
