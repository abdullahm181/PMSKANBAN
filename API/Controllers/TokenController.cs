using API.Models;
using API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private IConfiguration config;

        public TokenController(IConfiguration config)
        {
            this.config = config;
        }

        [HttpGet]
        public string GetRandomToken()
        {
            var jwt = new JwtService(config);
            var token = jwt.GenerateSecurityToken(1, "fake@email.com", "FakeName", "FakeRole");
            return token;
        }
    }
}
