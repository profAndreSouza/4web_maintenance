using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using UserAuth.API.DTOs;
using UserAuth.Application.Interfaces;

namespace UserAuth.Application.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _configuration;

        public TokenService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GenerateToken(UserDTO userDTO)
        {
            var secretKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(
                    _configuration["Jwt:Key"] ?? String.Empty
                )
            );
            var issuer = _configuration["Jwt:Issuer"];
            var audience = _configuration["Jwt:Audience"];

            var credentials = new SigningCredentials(
                secretKey,
                SecurityAlgorithms.HmacSha256
            );

            var expires = Convert.ToDouble(_configuration["Jwt:Expires"]);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, userDTO.Name),
                new Claim(ClaimTypes.Email, userDTO.Email)
            };
            claims.AddRange(userDTO.Roles.Select(role => new Claim(ClaimTypes.Role, role.Name)));

            var tokenOptions = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.Now.AddMinutes(expires),
                signingCredentials: credentials
            );

            var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            return token;
        }

        public string RefreshToken(string authorizationHeader)
        {
            if (string.IsNullOrEmpty(authorizationHeader) || !authorizationHeader.StartsWith("Bearer "))
                return null;

            var expiredToken = authorizationHeader.Substring("Bearer ".Length).Trim();

            var tokenHandler = new JwtSecurityTokenHandler();
            var secretKey = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"] ?? string.Empty);
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(secretKey),
                ValidateIssuer = true,
                ValidIssuer = _configuration["Jwt:Issuer"],
                ValidateAudience = true,
                ValidAudience = _configuration["Jwt:Audience"],
                ValidateLifetime = false // Não valida a expiração para tokens expirados
            };

            try
            {
                var principal = tokenHandler.ValidateToken(expiredToken, tokenValidationParameters, out var validatedToken);
                if (validatedToken is not JwtSecurityToken jwtToken ||
                    !jwtToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                {
                    return null;
                }
                var expirationTime = jwtToken.ValidTo;

                // tolerancia de 5 minuto para renovar o token
                if (DateTime.UtcNow > expirationTime.AddMinutes(5))
                {
                    return null;
                }

                var userDTO = new UserDTO
                {
                    Name = principal.FindFirst(ClaimTypes.Name)?.Value,
                    Email = principal.FindFirst(ClaimTypes.Email)?.Value,
                    Roles = principal.FindAll(ClaimTypes.Role).Select(roleClaim => new RoleDTO
                    {
                        Name = roleClaim.Value
                    }).ToList()
                };
                
                return GenerateToken(userDTO);
            }
            catch
            {
                return null;
            }
        }

    }
}
