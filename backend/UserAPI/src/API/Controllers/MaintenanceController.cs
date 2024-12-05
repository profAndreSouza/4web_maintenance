using Microsoft.AspNetCore.Mvc;
using UserAuth.Application.Services;

[ApiController]
[Route("api/[controller]")]
public class MaintenanceController : ControllerBase
{
    private readonly Rabbit _rabbit;

    public MaintenanceController(Rabbit rabbit)
    {
        _rabbit = rabbit;
    }

    [HttpGet("publish")]
    public async Task<IActionResult> PublishMessageAsync()
    {
        var routingKey = "stock.update";
        var message = new
        {
            maintenanceId = "12345",
            usedParts = new[]
            {
                new { partId = "111", quantity = 2 },
                new { partId = "222", quantity = 1 }
            },
            timestamp = DateTime.UtcNow
        };
        
        await _rabbit.InitializeAsync();
        var publish = _rabbit.PublishMessage(routingKey, message);

        return Ok(new { message = "Message published successfully!", publish = publish });
    }

    [HttpGet("consumer")]
    public async Task<IActionResult> ConsumeMessageAsync()
    {
        await _rabbit.InitializeAsync();
        var consume =_rabbit.ConsumerMessage();

        return Ok(new { message = "Consumer started successfully.", consume = consume });
    }
}
