using Microsoft.AspNetCore.Mvc;
using UserAuth.API.DTOs;
using UserAuth.Application.Helpers;
using UserAuth.Application.Interfaces;
using UserAuth.Domain.Entities;
using UserAuth.Domain.Interfaces;

namespace UserAuth.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;

        public AuthService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<UserDTO?> LoginUser(UserLoginDTO userLoginDTO)
        {
            var user = await _userRepository.FindUserByUsername(userLoginDTO.Username);
            if (user != null)
                if (PasswordHelper.VerifyPassword(userLoginDTO.Password, user.Password))
                    return new UserDTO {
                        Id = user.Id,
                        Name = user.Name,
                        Email = user.Email,
                        Username = user.Username,
                        Roles = user.UserRoles.Select(ur => new RoleDTO
                        {
                            Id = ur.Role.Id,
                            Name = ur.Role.Name
                        }).ToList()
                    };
                    
            return null;
        }
    }
}
