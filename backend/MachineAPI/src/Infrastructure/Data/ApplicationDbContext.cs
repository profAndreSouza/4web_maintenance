using Microsoft.EntityFrameworkCore;
using MachineAPI.Domain.Entities;

namespace MachineAPI.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Machine> Machines { get; set; }
        public DbSet<Place> Places { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Place>()
                .HasMany(p => p.Machines)
                .WithOne(m => m.Place)
                .HasForeignKey(m => m.PlaceId)
                .OnDelete(DeleteBehavior.Cascade);
                
        }
    }
}
