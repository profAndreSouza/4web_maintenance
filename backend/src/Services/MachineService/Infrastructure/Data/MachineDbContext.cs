using MachineService.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace MachineService.Infrastructure.Data
{
    public class MachineDbContext : DbContext
    {
        public MachineDbContext(DbContextOptions<MachineDbContext> options) : base(options)
        {
        }

        public DbSet<Machine> Machines { get; set; }

        public override int SaveChanges()
        {
            return base.SaveChanges();
        }
    }
}
