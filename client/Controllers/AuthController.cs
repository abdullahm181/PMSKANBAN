using client.Models;
using client.Repositories.Data;
using client.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;

namespace client.Controllers
{
    [Route("Auth")]
    public class AuthController : Controller
    {
        AuthRepository authRepository;
        public AuthController(AuthRepository authRepository)
        {
            this.authRepository = authRepository;
        }
        public IActionResult Index()
        {
            return View();
        }
        [Route("login")]
        [HttpPost]
        public JsonResult Login(LoginVM login)
        {
            var result = authRepository.Auth(login);
            if (result.result == 200) {
                var tokenHandler = new JwtSecurityTokenHandler();
                JwtSecurityToken DecodeToken = tokenHandler.ReadJwtToken(result.token);
                var NameToken = DecodeToken.Claims.FirstOrDefault(claim => claim.Type.Equals("unique_name")).Value;
                var IdToken = DecodeToken.Claims.FirstOrDefault(claim => claim.Type.Equals("nameid")).Value;
                var RoleToken = DecodeToken.Claims.FirstOrDefault(claim => claim.Type.Equals("role")).Value;
                var ExpToken = DecodeToken.Claims.FirstOrDefault(claim => claim.Type.Equals("exp")).Value;
                HttpContext.Session.SetString("Token", result.token.ToString());
                HttpContext.Session.SetString("Name", NameToken.ToString());
                HttpContext.Session.SetString("Id", IdToken.ToString());
                HttpContext.Session.SetString("Role", RoleToken.ToString());
                HttpContext.Session.SetString("Exp", ExpToken.ToString());
            }
            return Json(result);
        }
        [Route("register")]
        [HttpPost]
        public JsonResult Register(RegisterVM register)
        {
            var result = authRepository.Register(register);
            return Json(result);
        }

        [Route("logout")]
        [HttpGet]
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Index");
        }
        [Authorize]
        [Route("ChangePassword")]
        [HttpPut]
        public JsonResult ChangePassword(User user)
        {
            var result = authRepository.ChangePassword(user);
            return Json(result);
        }

    }
}
