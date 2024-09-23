using MachineService.Domain.Entities;
using System.Threading.Tasks;

namespace MachineService.Domain.Interfaces
{
    public interface IMachineRepository
    {
        Task<bool> AddAsync(Machine machine);
        Task<Machine> GetByIdAsync(int id);
    }
}
