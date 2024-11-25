using MachineAPI.API.DTOs;

namespace MachineAPI.Application.Interfaces
{
    public interface IMachineService
    {
        Task<IEnumerable<MachineDTO>> GetAllMachines();
        Task<MachineDTO> AddMachine(MachineDTO machineDto);
    }
}
