import { RabbitMQClient } from "@/utils/rabbitmq-message"

interface ConsumeQueueUseCaseRequest {
  queueName: string
}

interface ConsumeQueueUseCaseReply {
  message: string
}

export class ConsumeQueueUseCase {
  async execute({ queueName }: ConsumeQueueUseCaseRequest): Promise<void> {

    const rabbitMQClient = new RabbitMQClient()
    await rabbitMQClient.connect(process.env.RABBITMQ_URL as string)
    // const queueMessage = await rabbitMQClient.consumeMessage(queueName, (message) => {
    //   console.log(message.content.toString())
    // })

    const queueMessage = await rabbitMQClient.consumeMessage(queueName, (message) => {
      // console.log(message.content.toString())
      return message.content.toString()
    })
    // const queueMessage = await rabbitMQClient.consumeMessage(queueName)

    if (!queueMessage) throw Error()
    // console.log(queueMessage)
    return queueMessage

    // return { message.content.toString() }
  }
}