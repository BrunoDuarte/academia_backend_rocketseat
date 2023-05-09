import { RabbitMQClient } from "@/utils/rabbitmq-message"
import 'dotenv/config'

interface SendMessageQueueUseCaseRequest {
  queueName: string
  message: string
}

interface SendMessageQueueUseCaseReply {
  queueName: string
  message: string
}

export class SendMessageQueueUseCase {
  async execute({ queueName, message }: SendMessageQueueUseCaseRequest): Promise<SendMessageQueueUseCaseReply> {
    const rabbitMQClient = new RabbitMQClient()
    await rabbitMQClient.connect(process.env.RABBITMQ_URL as string)
    await rabbitMQClient.sendMessage(queueName, message)
    await rabbitMQClient.close()

    return { queueName, message }
  }

}