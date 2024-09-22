using MachineService.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MachineService.Infrastructure.Configurations
{
    public class MachineConfiguration : IEntityTypeConfiguration<Machine>
    {
        public void Configure(EntityTypeBuilder<Machine> builder)
        {
            builder.HasKey(m => m.Id);
            builder.Property(m => m.Name).IsRequired().HasMaxLength(100);
            builder.Property(m => m.SerialNumber).IsRequired();
        }
    }
}
