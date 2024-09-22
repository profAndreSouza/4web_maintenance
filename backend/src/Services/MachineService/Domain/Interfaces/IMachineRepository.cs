using MachineService.Domain.Entities;

namespace MachineService.Domain.Interfaces
{
    public interface IMachineRepository
    {
        void AddMachine(Machine machine);
        Machine? GetMachineById(int id);
    }
}
