using MachineService.Application.DTOs;
using System.Threading.Tasks;

namespace MachineService.Application.Interfaces
{
    public interface IMachineService
    {
        Task<bool> RegisterMachine(MachineDto machineDto);
        Task<MachineDto> GetMachineDetails(int id);
    }
}
