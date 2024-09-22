using MachineService.Application.DTOs;

namespace MachineService.Application.Interfaces
{
    public interface IMachineService
    {
        void RegisterMachine(MachineDto machineDto);
        MachineDto GetMachineDetails(int id);
    }
}
