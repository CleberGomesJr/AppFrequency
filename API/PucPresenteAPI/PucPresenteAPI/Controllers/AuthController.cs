using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using PucPresenteAPI.Services;
using BCrypt.Net;
using PucPresenteAPI.Models;

namespace PucPresenteAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly appServices _appServices;

        public AuthController(IConfiguration config, appServices appServices)
        {
            _config = config;
            _appServices = appServices;
        }
        
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
                return BadRequest(new { message = "E-mail e senha são obrigatórios." });

            var user = await _appServices.GetUserByEmailAsync(request.Email);

            if (user == null)
                return Unauthorized(new { message = "Credenciais inválidas." });

            // Validando HASH da senha (bcrypt)
            bool isPasswordCorrect = BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash);
            if (!isPasswordCorrect)
                return Unauthorized(new { message = "Credenciais inválidas." });

            // Gera JWT
            string token = GenerateJwtToken(user);

            return Ok(new
            {
                token,
                user = new
                {
                    user.Id,
                    user.FullName,
                    user.Email,
                    role = user.UserRole
                }
            });
        }
        
        private string GenerateJwtToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim("id", user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.UserRole),
                new Claim("full_name", user.FullName)
            };

            var token = new JwtSecurityToken(
                issuer:   _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(6),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        
        [HttpGet("is-professor/{userId}")]
        public async Task<IActionResult> IsProfessor(int userId)
        {
            bool result = await _appServices.IsProfessorAsync(userId);

            return Ok(new
            {
                userId,
                isProfessor = result
            });
        }
    }
    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
