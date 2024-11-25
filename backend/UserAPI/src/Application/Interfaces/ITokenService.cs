using Microsoft.AspNetCore.Mvc;
using UserAuth.API.DTOs;
using UserAuth.Domain.Entities;

namespace UserAuth.Application.Interfaces
{
    public interface ITokenService
    {
        public string GenerateToken(UserDTO userDTO);

        public string RefreshToken(string authorizationHeader);
    }
}
