using MachineService.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace MachineService.Infrastructure.Data
{
    public class MachineDbContext : DbContext
    {
        public DbSet<Machine> Machines { get; set; }

        public MachineDbContext(DbContextOptions<MachineDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new MachineConfiguration());
        }
    }
}
