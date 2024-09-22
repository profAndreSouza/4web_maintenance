using MachineService.Domain.Entities;
using MachineService.Domain.Interfaces;
using MachineService.Infrastructure.Data;

namespace MachineService.Infrastructure.Repositories
{
    public class MachineRepository : IMachineRepository
    {
        private readonly MachineDbContext _context;

        public MachineRepository(MachineDbContext context)
        {
            _context = context;
        }

        public void AddMachine(Machine machine)
        {
            _context.Machines.Add(machine);
            _context.SaveChanges();
        }

        public Machine? GetMachineById(int id)
        {
            return _context.Machines.Find(id);
        }
    }
}
