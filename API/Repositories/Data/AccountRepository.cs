using API.Context;
using API.Middleware;
using API.Models;
using API.ViewModel;
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
        public User Login(string username, string password)
        {
            var user = myContext.User.SingleOrDefault(x => x.UserName == username);

            // check if username exists
            if (user == null)
                return null;

            //check if password is correct
            if (!Cryptograph.ValidatePassword(password, user.Password))
                return null;

            // authentication successful
            return user;
        }
        public int Register(RegisterVM register)
        {
            //preparation default role(get the lowest role)
            var LevelMin = myContext.Level.Min(x => x.Value);
            var LevelIdMin = myContext.Level.SingleOrDefault(x => x.Value.Equals(LevelMin)).Id;
            var DefaultRole = myContext.Role.SingleOrDefault(x => x.Level_Id.Equals(LevelIdMin));
            //check if username or email available
            if (myContext.User.Any(x => x.UserName == register.UserName) || myContext.Employees.Any(x => x.Email == register.Email))
                return -2;
            //create model employe 
            Employees employees = new Employees()
            {
                FirstName = register.FirstName,
                LastName = register.LastName,
                Email = register.Email,
                PhoneNumber = register.PhoneNumber,
                HireDate = register.HireDate,
                Salary = register.Salary,
                Job_Id = register.Job_Id,
                Department_Id = register.Department_Id
            };

            //add employee
            myContext.Employees.Add(employees);
            var RegisterEmployeeResult = myContext.SaveChanges();

            //check if adding employee succes
            if (RegisterEmployeeResult > 0)
            {
                var RegisteredEmployee = myContext.Employees.SingleOrDefault(x => x.Email.Equals(register.Email)).Id;

                //Create Bcrypt hasing ppaswrod
                var passwordHash = Cryptograph.HashPassword(register.Password);

                //Adding User
                User user = new User()
                {
                    Id = RegisteredEmployee,
                    UserName = register.UserName,
                    Password = passwordHash
                };

                myContext.User.Add(user);
                var RegisterUserResult = myContext.SaveChanges();
                if (RegisterUserResult > 0)
                {

                    UserRole userRole = new UserRole()
                    {
                        Role_Id = DefaultRole.Id,
                        User_Id = RegisteredEmployee
                    };
                    myContext.UserRole.Add(userRole);
                    var RegisterUserRoleResult = myContext.SaveChanges();
                    if (RegisterUserRoleResult > 0)
                        return RegisterUserRoleResult;
                    else
                    {
                        //Delete User 
                        var DataUser = myContext.User.Find(RegisterEmployeeResult);
                        myContext.User.Remove(DataUser);
                        myContext.SaveChanges();
                    }
                }
                else
                {
                    //Delete Employee
                    var DataUser = myContext.Employees.Find(RegisterEmployeeResult);
                    myContext.Employees.Remove(DataUser);
                    myContext.SaveChanges();
                }
            }
            return 0;
        }
        
        public int Update(User userParam)
        {
            var user = myContext.User.Find(userParam.Id);

            if (user == null)
                return -1;


            if (!string.IsNullOrWhiteSpace(userParam.UserName) && userParam.UserName != user.UserName)
            {

                if (myContext.User.Any(x => x.UserName == userParam.UserName))
                    return -2;

                user.UserName = userParam.UserName;
            }



            if (!string.IsNullOrWhiteSpace(userParam.Password) && userParam.Password != user.Password)
            {
                user.Password = userParam.Password;
            }
            var result = myContext.SaveChanges();
            return result;
        }
        public UserRole GetRoleById(int UserId)
        {
            var user = myContext.UserRole.FirstOrDefault(x => x.User_Id == UserId);

            return user;

        }
        public int ChangePassword(User userParam)
        {
            var user = myContext.User.SingleOrDefault(x => x.UserName == userParam.UserName);
            if (user == null)
                return -1;
            if (!string.IsNullOrWhiteSpace(userParam.Password) && userParam.Password != user.Password)
            {
                //Create Bcrypt hasing ppaswrod
                var passwordHash = Cryptograph.HashPassword(userParam.Password);
                user.Password = passwordHash;
            }
            var result = myContext.SaveChanges();
            return result;
        }

    }
}
