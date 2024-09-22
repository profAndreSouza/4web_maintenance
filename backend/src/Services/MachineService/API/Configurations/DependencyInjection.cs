using MachineService.Application.Interfaces;
using MachineService.Domain.Interfaces;
using MachineService.Infrastructure.Repositories;

namespace MachineService.API.Configurations
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddMachineService(this IServiceCollection services)
        {
            services.AddScoped<IMachineService, Application.Services.MachineService>();
            services.AddScoped<IMachineRepository, MachineRepository>();
            return services;
        }
    }
}
