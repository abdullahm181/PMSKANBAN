using System;

namespace client.ViewModels
{
    public class CardDisplayVM
    {
        //id,name, numberTaskItem,numbercomment, personInchargeName
        public int Id { get; set; }
        public string Name { get; set; }
        public int Order { get; set; }
        public string Description { get; set; }
        public DateTime DeadLine { get; set; }
        public int numberTaskItem { get; set; }
        public int numbercomment { get; set; }
        public int personIncharge { get; set; }
        public string List_Name { get; set; }
        public int List_Id { get; set; }
    }
}
