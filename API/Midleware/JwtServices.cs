using API.ViewModels;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace API.Midleware
{
    public interface IJWTHandler
    {
        string GenerateToken(Account account);
        string GetName(string token);
        string GetEmail(string token);
        string GetRole(string token);
    }
    public class JwtServices : IJWTHandler
    {
        private readonly IConfiguration iconfiguration;
        public JwtServices(IConfiguration iconfiguration)
        {
            this.iconfiguration = iconfiguration;
        }
        public string GenerateToken(Account account)
        {
            if (account == null)
            {
                return null;
            }
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.UTF8.GetBytes(iconfiguration["JWT:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier,account.Id.ToString()),
                    new Claim(ClaimTypes.Email, account.Email),
                    new Claim(ClaimTypes.Name, account.FullName),
                    new Claim(ClaimTypes.Role, account.Role)
                }),
                Expires = DateTime.UtcNow.AddMinutes(60),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);

        }
        public string GetName(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            JwtSecurityToken result = tokenHandler.ReadJwtToken(token);

            return result.Claims.FirstOrDefault(claim => claim.Type.Equals("name")).Value;
        }

        public string GetEmail(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            JwtSecurityToken result = tokenHandler.ReadJwtToken(token);

            return result.Claims.FirstOrDefault(claim => claim.Type.Equals("email")).Value;
        }

        public string GetRole(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            JwtSecurityToken result = tokenHandler.ReadJwtToken(token);

            return result.Claims.FirstOrDefault(claim => claim.Type.Equals("email")).Value;
        }
    }
}
