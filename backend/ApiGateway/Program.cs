using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using System.Text;
using MMLib.SwaggerForOcelot.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer("JwtBearer", options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = "emissor",
            ValidAudience = "destinatario",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("CLyuqWAaoBZIFSzkfworDetPz4YinvqG"))
        };
    });

builder.Services.AddOcelot();
builder.Services.AddSwaggerForOcelot(builder.Configuration);

builder.Services.AddEndpointsApiExplorer();


builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "API Gateway",
        Version = "v1",
        Description = "API Gateway para rotear requisições para as APIs downstream"
    });
    
    // Configurações adicionais podem ser adicionadas aqui, como esquemas de segurança, se necessário.
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Insira o token JWT",
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
            },
            new string[] {}
        }
    });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "API Gateway");
    c.SwaggerEndpoint("http://localhost:3000/swagger/v1/swagger.json", "User API");
    c.SwaggerEndpoint("http://localhost:3001/swagger/v1/swagger.json", "Machine API");
    c.RoutePrefix = string.Empty; 
});

app.UseSwaggerForOcelotUI(options =>
{
    options.PathToSwaggerGenerator = "/swagger/docs";
});

// app.UseHttpsRedirection();


await app.UseOcelot();

app.Run();
