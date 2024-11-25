using MachineAPI.Domain.Entities;

namespace MachineAPI.Domain.Interfaces
{
    public interface IPlaceRepository
    {
        Task<IEnumerable<Place>> GetAllAsync();
        Task<Place> GetByIdAsync(int id);
        Task AddAsync(Place place);
    }
}
