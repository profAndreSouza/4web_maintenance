using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class MaintenanceController : ControllerBase
{
    private readonly RabbitMQPublisher _rabbitMqPublisher;

    public MaintenanceController(RabbitMQPublisher rabbitMqPublisher)
    {
        _rabbitMqPublisher = rabbitMqPublisher;
    }

    [HttpGet("publish")]
    public IActionResult PublishMessage()
    {
        var routingKey = "stock.update";
        var message = new
        {
            maintenanceId = "12345",
            usedParts = new[]
            {
                new { partId = "111", quantity = 2 },
                new { partId = "222", quantity = 1 }
            }
        };

        Console.WriteLine("Publising");
        _ = _rabbitMqPublisher.PublishMessageAsync(routingKey, message);

        return Ok(new { routingKey = routingKey, success = true, message = "Message published successfully!" });
    }
}
