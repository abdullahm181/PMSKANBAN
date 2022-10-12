using System;

namespace client.ViewModels
{
    public class Register
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime HireDate { get; set; }
        public int Salary { get; set; }
        public int Job_Id { get; set; }
        public int Department_Id { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }

    }
}
