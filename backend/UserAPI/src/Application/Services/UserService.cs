using UserAuth.API.DTOs;
using UserAuth.Application.Helpers;
using UserAuth.Application.Interfaces;
using UserAuth.Domain.Entities;
using UserAuth.Domain.Interfaces;

namespace UserAuth.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IRoleRepository _roleRepository;

        public UserService(IUserRepository userRepository, IRoleRepository roleRepository)
        {
            _userRepository = userRepository;
            _roleRepository = roleRepository;
        }

        public async Task<IEnumerable<UserDTO>> GetAllUsers()
        {
            var users = await _userRepository.GetAllUsers();
            return users.Select(user => new UserDTO
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Username = user.Username,
                Roles = user.UserRoles.Select(userRole => new RoleDTO
                {
                    Id = userRole.Role.Id,
                    Name = userRole.Role.Name
                }).ToList()
            }).ToList();
        }

        public async Task<UserDTO> GetUserById(int id)
        {
            var user = await _userRepository.GetUserById(id);
            if (user == null) return null;

            return new UserDTO
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Username = user.Username,
                Roles = user.UserRoles.Select(userRole => new RoleDTO
                {
                    Id = userRole.Role.Id,
                    Name = userRole.Role.Name
                }).ToList()
            };
        }

        public async Task<UserDTO> GetUserByEmail(string email)
        {
            var user = await _userRepository.GetUserByEmail(email);
            if (user == null) return null;

            return new UserDTO
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Username = user.Username,
                Roles = user.UserRoles.Select(userRole => new RoleDTO
                {
                    Id = userRole.Role.Id, 
                    Name = userRole.Role.Name
                }).ToList()
            };
        }
        public async Task AddUser(UserDTO userDTO)
        {
            var user = new User
            {
                Name = userDTO.Name,
                Email = userDTO.Email,
                Username = userDTO.Username,
                Password = PasswordHelper.HashPassword(userDTO.Password)
            };

            await _userRepository.AddUser(user);

            foreach (var roleDTO in userDTO.Roles)
            {
                var existingRole = await _roleRepository.GetRoleByName(roleDTO.Name);
                if (existingRole == null)
                {
                    existingRole = new Role { Name = roleDTO.Name };
                    await _roleRepository.AddRole(existingRole); // Adicione um método para adicionar role
                }

                await _userRepository.AddRoleToUser(user.Id, existingRole);
            }
        }

        public async Task UpdateUser(int id, UserDTO userDTO)
        {
            var user = await _userRepository.GetUserById(id);
            if (user != null)
            {
                user.Name = userDTO.Name;
                user.Email = userDTO.Email;
                user.Username = userDTO.Username;

                user.UserRoles.Clear();

                foreach (var roleDTO in userDTO.Roles)
                {
                    var existingRole = await _roleRepository.GetRoleByName(roleDTO.Name);
                    if (existingRole == null)
                    {
                        existingRole = new Role { Name = roleDTO.Name };
                        await _roleRepository.AddRole(existingRole);
                    }

                    user.UserRoles.Add(new UserRole { UserId = user.Id, Role = existingRole });
                }

                await _userRepository.UpdateUser(user);
            }
        }


        public async Task DeleteUser(int id)
        {
            await _userRepository.DeleteUser(id);
        }

        public async Task<IEnumerable<RoleDTO>> GetRolesByUserId(int userId)
        {
            var roles = await _userRepository.GetRolesByUserId(userId);
            return roles.Select(role => new RoleDTO
            {
                Id = role.Id,
                Name = role.Name
            }).ToList();
        }

        public async Task AddRoleToUser(int userId, RoleDTO roleDTO)
        {
            var role = new Role
            {
                Name = roleDTO.Name
            };
            await _userRepository.AddRoleToUser(userId, role);
        }

        public async Task RemoveRoleFromUser(int userId, int roleId)
        {
            await _userRepository.RemoveRoleFromUser(userId, roleId);
        }
    }
}
