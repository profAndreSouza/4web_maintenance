using Microsoft.EntityFrameworkCore;
using MachineAPI.Domain.Entities;
using MachineAPI.Domain.Interfaces;
using MachineAPI.Infrastructure.Data;

namespace MachineAPI.Infrastructure.Repositories
{
    public class PlaceRepository : IPlaceRepository
    {
        private readonly ApplicationDbContext _context;

        public PlaceRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Place>> GetAllAsync()
        {
            return await _context.Places.ToListAsync();
        }

        public async Task<Place> GetByIdAsync(int id)
        {
            return await _context.Places.FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task AddAsync(Place place)
        {
            await _context.Places.AddAsync(place);
            await _context.SaveChangesAsync();
        }
    }
}
