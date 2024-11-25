using MachineAPI.Application.Interfaces;
using MachineAPI.API.DTOs;
using MachineAPI.API.Extensions;
using MachineAPI.Domain.Entities;
using MachineAPI.Domain.Interfaces;

namespace MachineAPI.Application.Services
{
    public class MachineService : IMachineService
    {
        private readonly IMachineRepository _machineRepository;

        public MachineService(IMachineRepository machineRepository)
        {
            _machineRepository = machineRepository;
        }

        public async Task<IEnumerable<MachineDTO>> GetAllMachines()
        {
            var machines = await _machineRepository.GetAllAsync();
            return machines.Select(m => m.ToDto());
        }

        public async Task<MachineDTO> AddMachine(MachineDTO machineDto)
        {
            var machine = machineDto.ToEntity();
            await _machineRepository.AddAsync(machine);
            return machine.ToDto();
        }
    }
}
