using UserAuth.API.DTOs;

namespace UserAuth.Application.Interfaces
{
    public interface IRoleService
    {
        Task<IEnumerable<RoleDTO>> GetAllRoles();
        Task<RoleDTO> GetRoleById(int id);
        Task AddRole(RoleDTO roleDTO);
        Task UpdateRole(int id, RoleDTO roleDTO);
        Task DeleteRole(int id);
    }
}
