using MachineService.Application.DTOs;
using MachineService.Application.Interfaces;
using MachineService.Domain.Entities;
using MachineService.Domain.Interfaces;
using System.Threading.Tasks;

namespace MachineService.Application.Services
{
    public class MachineService : IMachineService
    {
        private readonly IMachineRepository _machineRepository;

        public MachineService(IMachineRepository machineRepository)
        {
            _machineRepository = machineRepository;
        }

        public async Task<bool> RegisterMachine(MachineDto machineDto)
        {
            var machine = new Machine
            {
                Name = machineDto.Name,
                Status = machineDto.Status
            };

            return await _machineRepository.AddAsync(machine);
        }

        public async Task<MachineDto> GetMachineDetails(int id)
        {
            var machine = await _machineRepository.GetByIdAsync(id);
            if (machine == null) return null;

            return new MachineDto
            {
                Id = machine.Id,
                Name = machine.Name,
                Status = machine.Status
            };
        }
    }
}
