using MachineAPI.API.DTOs;
using MachineAPI.Domain.Entities;

namespace MachineAPI.API.Extensions
{
    public static class MappingExtensions
    {
        public static MachineDTO ToDto(this Machine machine)
        {
            return new MachineDTO
            {
                Id = machine.Id,
                Name = machine.Name,
                Type = machine.Type,
                Model = machine.Model,
                ManufactureDate = machine.ManufactureDate,
                SerialNumber = machine.SerialNumber,
                Status = machine.Status,
                PlaceId = machine.PlaceId
            };
        }

        public static PlaceDTO ToDto(this Place place)
        {
            return new PlaceDTO
            {
                Id = place.Id,
                Name = place.Name,
                Description = place.Description,
                Observation = place.Observation,
                Machines = place.Machines?.Select(m => m.ToDto()).ToList()
            };
        }

        public static Machine ToEntity(this MachineDTO machineDto)
        {
            return new Machine
            {
                Id = machineDto.Id,
                Name = machineDto.Name,
                Type = machineDto.Type,
                Model = machineDto.Model,
                ManufactureDate = machineDto.ManufactureDate,
                SerialNumber = machineDto.SerialNumber,
                Status = machineDto.Status,
                PlaceId = machineDto.PlaceId
            };
        }

        public static Place ToEntity(this PlaceDTO placeDto)
        {
            return new Place
            {
                Id = placeDto.Id,
                Name = placeDto.Name,
                Description = placeDto.Description,
                Observation = placeDto.Observation,
            };
        }
    }
}
