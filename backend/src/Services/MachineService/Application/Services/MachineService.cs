using MachineService.Application.DTOs;
using MachineService.Application.Interfaces;
using MachineService.Domain.Entities;
using MachineService.Domain.Interfaces;

namespace MachineService.Application.Services
{
    public class MachineService : IMachineService
    {
        private readonly IMachineRepository _machineRepository;

        public MachineService(IMachineRepository machineRepository)
        {
            _machineRepository = machineRepository;
        }

        public void RegisterMachine(MachineDto machineDto)
        {
            var machine = new Machine
            {
                Name = machineDto.Name,
                Model = machineDto.Model,
                SerialNumber = machineDto.SerialNumber,
                Location = machineDto.Location
            };

            _machineRepository.AddMachine(machine);
        }

        public MachineDto GetMachineDetails(int id)
        {
            var machine = _machineRepository.GetMachineById(id);
            if (machine == null) return null;

            return new MachineDto
            {
                Name = machine.Name,
                Model = machine.Model,
                SerialNumber = machine.SerialNumber,
                Location = machine.Location
            };
        }
    }
}
