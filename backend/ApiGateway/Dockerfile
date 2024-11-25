FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY backend/ApiGateway/ApiGateway.csproj .
RUN dotnet restore
COPY . .
RUN dotnet publish -c release -o /app backend/ApiGateway/ApiGateway.csproj

FROM base AS final
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "ApiGateway.dll"]