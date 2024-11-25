using UserAuth.API.DTOs;
using UserAuth.Application.Interfaces;
using UserAuth.Domain.Entities;
using UserAuth.Domain.Interfaces;

namespace UserAuth.Application.Services
{
    public class RoleService : IRoleService
    {
        private readonly IRoleRepository _roleRepository;

        public RoleService(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }

        public async Task<IEnumerable<RoleDTO>> GetAllRoles()
        {
            var roles = await _roleRepository.GetAllRoles();
            return roles.Select(role => new RoleDTO
            {
                Id = role.Id,
                Name = role.Name
            }).ToList();
        }

        public async Task<RoleDTO> GetRoleById(int id)
        {
            var role = await _roleRepository.GetRoleById(id);
            if (role == null) return null;

            return new RoleDTO
            {
                Id = role.Id,
                Name = role.Name
            };
        }

        public async Task AddRole(RoleDTO roleDTO)
        {
            var role = new Role
            {
                Name = roleDTO.Name
            };
            await _roleRepository.AddRole(role);
        }

        public async Task UpdateRole(int id, RoleDTO roleDTO)
        {
            var role = await _roleRepository.GetRoleById(id);
            if (role != null)
            {
                role.Name = roleDTO.Name;
                await _roleRepository.UpdateRole(role);
            }
        }

        public async Task DeleteRole(int id)
        {
            await _roleRepository.DeleteRole(id);
        }
    }
}
