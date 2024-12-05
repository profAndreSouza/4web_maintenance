using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Text.Json;

namespace UserAuth.Application.Services
{
    public class Rabbit : IDisposable
    {
        private const string _exchangeName = "maintenance_exchange";
        private const string _exchangeType = "topic";
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

            // Declaração da exchange e fila
            await _channel.ExchangeDeclareAsync(_exchangeName, _exchangeType, durable: true);
            await _channel.QueueDeclareAsync(_queueName, durable: true, exclusive: false, autoDelete: false);
            await _channel.QueueBindAsync(_queueName, _exchangeName, routingKey: "#");
        }

        public async Task<string> PublishMessage(string routingKey, object message)
        {
            var body = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(message));

            await _channel.BasicPublishAsync(
                exchange: _exchangeName,
                routingKey: routingKey,
                mandatory: false,
                body: body
            );

            return $"Message sent: {routingKey} -> {JsonSerializer.Serialize(message)}";
        }

        public async Task<string> ConsumerMessage()
        {
            var tcs = new TaskCompletionSource<string>();

            var consumer = new AsyncEventingBasicConsumer(_channel);
            consumer.ReceivedAsync += async (ch, ea) =>
            {
                try
                {
                    var body = ea.Body.ToArray();
                    var message = Encoding.UTF8.GetString(body);

                    // Confirmação da mensagem
                    await _channel.BasicAckAsync(ea.DeliveryTag, false);

                    tcs.TrySetResult(message);
                }
                catch (Exception ex)
                {
                    tcs.TrySetException(ex);
                }
            };

            await _channel.BasicConsumeAsync(_queueName, autoAck: false, consumer);

            return await tcs.Task;
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







// using RabbitMQ.Client;
// using RabbitMQ.Client.Events;
// using System.Text;
// using System.Text.Json;

// namespace UserAuth.Application.Services
// {
//     public class Rabbit : IDisposable
//     {
//         private const string _exchangeName = "maintenance_exchange";
//         private const string _exchangeType = "topic";
//         private const string _queueName = "stock_update_queue";
//         private IConnection _connection;
//         private IChannel _channel;

//         public async Task InitializeAsync()
//         {
//             var factory = new ConnectionFactory
//             {    
//                 HostName = "host.docker.internal",
//                 Port = 5672,
//                 UserName = "guest",
//                 Password = "guest"
//             };
//             _connection = await factory.CreateConnectionAsync();
//             _channel = await _connection.CreateChannelAsync();
//         }

//         public async Task<string> PublishMessage(string routingKey, object message)
//         {
//             await _channel.ExchangeDeclareAsync(exchange: _exchangeName, type: _exchangeType, durable: true);
//             var body = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(message));
//             await _channel.BasicPublishAsync(
//                 exchange: _exchangeName,
//                 routingKey: routingKey,
//                 mandatory: false,
//                 body: body
//             );
//             return $"Message sent: {routingKey} -> {JsonSerializer.Serialize(message)}";
//         }

//         public async Task<string> ConsumerMessage()
//         {
//             var tcs = new TaskCompletionSource<string>();
//             var consumer = new AsyncEventingBasicConsumer(_channel);
//             var message = "";

//             try {
//                 consumer.ReceivedAsync += async (ch, ea) =>
//                 {
//                     var body = ea.Body.ToArray();
//                     message = Encoding.UTF8.GetString(body);
//                     await _channel.BasicAckAsync(ea.DeliveryTag, false);
//                 };
//                 tcs.TrySetResult(message);
//             } catch (Exception e) {
//                 tcs.TrySetException(e);
//             }

//             string consumerTag = await _channel.BasicConsumeAsync(_queueName, false, consumer);
//             return $"Message received: {consumerTag} -> {JsonSerializer.Serialize(message)}";
//         }

//         public void Dispose()
//         {
//             _channel?.CloseAsync();
//             _channel?.Dispose();
//             _connection?.CloseAsync();
//             _connection?.Dispose();
//         }

//     }
// }