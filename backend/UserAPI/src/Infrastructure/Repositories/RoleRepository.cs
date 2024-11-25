using Microsoft.EntityFrameworkCore;
using UserAuth.Domain.Entities;
using UserAuth.Domain.Interfaces;
using UserAuth.Infrastructure.Data;

namespace UserAuth.Infrastructure.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private readonly ApplicationDbContext _context;

        public RoleRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Role>> GetAllRoles()
        {
            return await _context.Roles.ToListAsync();
        }

        public async Task<Role> GetRoleById(int id)
        {
            return await _context.Roles.FindAsync(id);
        }

        public async Task<Role> GetRoleByName(string roleName)
        {
            return await _context.Roles.SingleOrDefaultAsync(r => r.Name == roleName);
        }

        public async Task AddRole(Role role)
        {
            await _context.Roles.AddAsync(role);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateRole(Role role)
        {
            _context.Roles.Update(role);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteRole(int id)
        {
            var role = await _context.Roles.FindAsync(id);
            if (role != null)
            {
                _context.Roles.Remove(role);
                await _context.SaveChangesAsync();
            }
        }
    }
}
