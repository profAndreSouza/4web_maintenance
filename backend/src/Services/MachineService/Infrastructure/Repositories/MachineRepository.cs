using MachineService.Domain.Entities;
using MachineService.Domain.Interfaces;
using MachineService.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace MachineService.Infrastructure.Repositories
{
    public class MachineRepository : IMachineRepository
    {
        private readonly MachineDbContext _context;

        public MachineRepository(MachineDbContext context)
        {
            _context = context;
        }

        public async Task<bool> AddAsync(Machine machine)
        {
            _context.Machines.Add(machine);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Machine> GetByIdAsync(int id)
        {
            return await _context.Machines.FindAsync(id);
        }
    }
}
