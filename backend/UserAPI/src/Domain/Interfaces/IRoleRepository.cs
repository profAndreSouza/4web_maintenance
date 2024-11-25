using UserAuth.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace UserAuth.Domain.Interfaces
{
    public interface IRoleRepository
    {
        Task<IEnumerable<Role>> GetAllRoles();
        Task<Role> GetRoleById(int id);
        Task<Role> GetRoleByName(string roleName);
        Task AddRole(Role role);
        Task UpdateRole(Role role);
        Task DeleteRole(int id); 
    }
}
