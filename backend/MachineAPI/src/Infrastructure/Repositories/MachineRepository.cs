using Microsoft.EntityFrameworkCore;
using MachineAPI.Domain.Entities;
using MachineAPI.Domain.Interfaces;
using MachineAPI.Infrastructure.Data;

namespace MachineAPI.Infrastructure.Repositories
{
    public class MachineRepository : IMachineRepository
    {
        private readonly ApplicationDbContext _context;

        public MachineRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Machine>> GetAllAsync()
        {
            return await _context.Machines.Include(m => m.Place).ToListAsync();
        }

        public async Task<Machine> GetByIdAsync(int id)
        {
            return await _context.Machines.Include(m => m.Place).FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task AddAsync(Machine machine)
        {
            await _context.Machines.AddAsync(machine);
            await _context.SaveChangesAsync();
        }
    }
}
