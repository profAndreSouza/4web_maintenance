
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using System.Text;
using MachineAPI.API.Extensions;
using MachineAPI.Application.Interfaces;
using MachineAPI.Application.Services;
using MachineAPI.Domain.Interfaces;
using MachineAPI.Infrastructure.Repositories;
using MachineAPI.Infrastructure.Data;


public class Startup
{
    private readonly IConfiguration _configuration;

    public Startup(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(_configuration.GetConnectionString("DefaultConnection"))
        );
 
        services.AddScoped<IMachineService, MachineService>();
        services.AddScoped<IPlaceService, PlaceService>();
        services.AddScoped<IMachineRepository, MachineRepository>();
        services.AddScoped<IPlaceRepository, PlaceRepository>();
 

        services.AddCors(options =>
        {
            options.AddPolicy("AllowAPIGateway",
                builder =>
                {
                    builder.WithOrigins("http://localhost:3002") 
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                });
        });

        services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { 
                Title = "Machines API", 
                Version = "v1" });
        });  

        services.AddAuthentication();
        services.AddAuthorization();

        services.AddSingleton<IConfiguration>(_configuration);
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {

        app.UseCors("AllowAPIGateway");

        app.UseSwagger();
        app.UseSwaggerUI(c =>
        {
            
            c.SwaggerEndpoint("/swagger/v1/swagger.json", "Machine API V1"); // Set up the Swagger UI
            c.RoutePrefix = string.Empty; // Set Swagger UI at the app's root
        });
        app.ApplyMigrations();
            

        // app.UseHttpsRedirection();

        app.UseRouting();

        app.UseAuthentication();
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
}
