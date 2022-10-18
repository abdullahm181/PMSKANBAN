using System;

namespace client.ViewModels
{
    public class CreateBoardVM
    {
        public int User_Id { get; set; }
        public string Status = "owner";
        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime CreateDate { get; set; }
    }
}
