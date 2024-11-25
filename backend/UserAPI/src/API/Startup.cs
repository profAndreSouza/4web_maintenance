using Microsoft.EntityFrameworkCore;
using UserAuth.API.Extensions;
using UserAuth.Application.Interfaces;
using UserAuth.Application.Services;
using UserAuth.Domain.Interfaces;
using UserAuth.Infrastructure.Data;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using UserAuth.Infrastructure.Repositories;

public class Startup
{
    private readonly IConfiguration _configuration;

    public Startup(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddDbContext<ApplicationDbContext>(
            options =>options.UseNpgsql(_configuration.GetConnectionString("DefaultConnection"))
        );

        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IRoleRepository, RoleRepository>();

        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IRoleService, RoleService>();
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<ITokenService, TokenService>();


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
                Title = "User Authentication API", 
                Version = "v1" });
            c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme() {
                Name = "Authorization",
                Type = SecuritySchemeType.ApiKey,
                Scheme = "Bearer",
                BearerFormat = "JWT",
                In = ParameterLocation.Header,
                Description = "JWT Authorization Header is using Bearer Schema " +
                              "\n\n Input 'Bearer' + token"
            });
            c.AddSecurityRequirement(new OpenApiSecurityRequirement() 
            {
                {
                    new OpenApiSecurityScheme 
                    {
                        Reference = new OpenApiReference 
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    },
                    Array.Empty<String>()
                }
            });
        });  

        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = _configuration["Jwt:Issuer"],
                ValidAudience = _configuration["Jwt:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]))
            };
        });
        services.AddAuthorization();

        services.AddSingleton<IConfiguration>(_configuration);
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {

        app.UseCors("AllowAPIGateway");

        app.UseSwagger();
        app.UseSwaggerUI(c =>
        {
            
            c.SwaggerEndpoint("/swagger/v1/swagger.json", "User Authentication API V1"); // Set up the Swagger UI
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
