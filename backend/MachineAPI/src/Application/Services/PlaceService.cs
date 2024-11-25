using MachineAPI.Application.Interfaces;
using MachineAPI.API.DTOs;
using MachineAPI.API.Extensions;
using MachineAPI.Domain.Entities;
using MachineAPI.Domain.Interfaces;

namespace MachineAPI.Application.Services
{
    public class PlaceService : IPlaceService
    {
        private readonly IPlaceRepository _placeRepository;

        public PlaceService(IPlaceRepository placeRepository)
        {
            _placeRepository = placeRepository;
        }

        public async Task<IEnumerable<PlaceDTO>> GetAllPlaces()
        {
            var places = await _placeRepository.GetAllAsync();
            return places.Select(p => p.ToDto());
        }

        public async Task<PlaceDTO> AddPlace(PlaceDTO placeDto)
        {
            var place = placeDto.ToEntity();
            await _placeRepository.AddAsync(place);
            return place.ToDto();
        }
    }
}
