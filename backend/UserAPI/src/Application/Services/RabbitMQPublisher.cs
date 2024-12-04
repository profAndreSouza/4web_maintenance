using RabbitMQ.Client;
using System.Text;
using System.Text.Json;

public class RabbitMQPublisher
{
    private const string ExchangeName = "maintenance_exchange";

    public async Task PublishMessageAsync(string routingKey, object message)
    {
        var factory = new ConnectionFactory { HostName = "localhost" };
        using var connection = await factory.CreateConnectionAsync();
        using var channel = await connection.CreateChannelAsync();

        // Declare exchange
        _ = channel.ExchangeDeclareAsync(exchange: ExchangeName, type: "topic");

        // Serialize message
        var body = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(message));
        // Publish message
        _ = channel.BasicPublishAsync(
            exchange: ExchangeName,
            routingKey: routingKey,
            body: body
        );

        Console.WriteLine($"Message sent: {routingKey} -> {JsonSerializer.Serialize(message)}");
    }
}
