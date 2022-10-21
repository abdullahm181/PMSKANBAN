using API.Middleware;
using API.Models;
using API.Repositories.Data;
using API.ViewModel;
using API.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        AccountRepository accountRepository;
        private readonly IConfiguration iconfiguration;
        public AccountController(AccountRepository accountRepository, IConfiguration iconfiguration)
        {
            this.accountRepository = accountRepository;
            this.iconfiguration = iconfiguration;
        }
        [AllowAnonymous]
        [HttpPost("Login")]
        public IActionResult Login(LoginVM login)
        {
            if (string.IsNullOrEmpty(login.Username) || string.IsNullOrEmpty(login.Password))
                return BadRequest(new { result = 400, message = "Username or password is blank" , Token = ""});
            var result = accountRepository.Login(login.Username, login.Password);
            if (result == null)
                return BadRequest(new { result = 400, message = "Username or password is incorrect", Token = "" });
            var userRole = accountRepository.GetRoleById(result.Id);
            var jwt = new JwtService(iconfiguration);
            AccountVM account = new AccountVM
            {
                Id = result.Id,
                FullName = result.Employees.FirstName + " " + result.Employees.LastName,
                Email = result.Employees.Email,
                Role = userRole.Role.Name
            };
            var tokenString = jwt.GenerateToken(account);

            return Ok(new { result = 200, message = "successfully Login", Token = tokenString });
        }
        [AllowAnonymous]
        [HttpPost("Register")]
        public IActionResult Register([FromBody] RegisterVM register)
        {
            if (ModelState.IsValid)
            {
                var result = accountRepository.Register(register);
                if (result > 0)
                    return Ok(new { result = 200, message = "successfully Register" });
                else if (result == -2)
                    return BadRequest(new { result = 400, message = "UserName sudah digunakan" });
            }
            return BadRequest(new { result = 400, message = "Error" });
        }
        [HttpPut("ChangePassword")]
        public IActionResult ChangePassword([FromBody] User user)
        {
            if (ModelState.IsValid)
            {
                var result = accountRepository.ChangePassword(user);
                if (result > 0)
                    return Ok(new { result = 200, message = "successfully Updated" });
                else if (result == -1)
                    return NotFound(new { result = 404, message = "Username not registered" });
                /*else if (result == -2)
                    return BadRequest(new { result = 400, message = "UserName sudah digunakan" });*/
            }
            return BadRequest();
        }


    }
}