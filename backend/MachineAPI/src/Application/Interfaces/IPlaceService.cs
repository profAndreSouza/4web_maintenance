using MachineAPI.API.DTOs;

namespace MachineAPI.Application.Interfaces
{
    public interface IPlaceService
    {
        Task<IEnumerable<PlaceDTO>> GetAllPlaces();
        Task<PlaceDTO> AddPlace(PlaceDTO placeDto);
    }
}
