import * as amqp from 'amqplib';

interface ConsumeMessage {
  content: Buffer;
  fields: any;
  properties: any;
}

export class RabbitMQClient {
  private connection!: amqp.Connection;
  private channel!: amqp.Channel;

  async connect(url: string): Promise<void> {
    this.connection = await amqp.connect(url);
    this.channel = await this.connection.createChannel();
  }

  async close(): Promise<void> {
    await this.channel.close();
    await this.connection.close();
  }

  async sendMessage(queueName: string, message: any): Promise<void> {
    await this.channel.assertQueue(queueName);
    await this.channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
  }

  async consumeMessage(queueName: string, callback: (message: ConsumeMessage) => void): Promise<void> {
    await this.channel.assertQueue(queueName);
    await this.channel.consume(queueName, (message) => {
      if (message) {
        callback(message);
        this.channel.ack(message);
      }
    });
  }
}