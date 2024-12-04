using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Text.Json;

namespace UserAuth.Application.Services
{
    public class Rabbit : IDisposable
    {
        private const string _exchangeName = "maintenance_exchange";
        private const string _queueName = "stock_update_queue";
        private IConnection _connection;
        private IChannel _channel;

        public async Task InitializeAsync()
        {
            var factory = new ConnectionFactory
            {    
                HostName = "host.docker.internal",
                Port = 5672,
                UserName = "guest",
                Password = "guest"
            };
            _connection = await factory.CreateConnectionAsync();
            _channel = await _connection.CreateChannelAsync();
            // _channel = _connection.CreateModel();
        }

        public async Task<string> PublishMessage(string routingKey, object message)
        {
            await _channel.ExchangeDeclareAsync(exchange: _exchangeName, type: "topic");
            var body = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(message));
            return "ok";
            await _channel.BasicPublishAsync(
                exchange: _exchangeName,
                routingKey: routingKey,
                mandatory: false,
                body: body
            );
            return $"Message sent: {routingKey} -> {JsonSerializer.Serialize(message)}";
        }

        public async Task<string> ConsumeMessage(string routingKey)
        {
            var consumer = new AsyncEventingBasicConsumer(_channel);
            consumer.ReceivedAsync += async (ch, ea) =>
                {
                    var body = ea.Body.ToArray();
                    await _channel.BasicAckAsync(ea.DeliveryTag, false);
                };
            string consumerTag = await _channel.BasicConsumeAsync(_queueName, false, consumer);
            return $"Message received: {routingKey} -> {JsonSerializer.Serialize(consumerTag)}";
        }

        public void Dispose()
        {
            _channel?.CloseAsync();
            _channel?.Dispose();
            _connection?.CloseAsync();
            _connection?.Dispose();
        }

    }
}