import { RabbitMQClient } from "@/utils/rabbitmq-message"

interface ConsumeQueueUseCaseRequest {
  queueName: string
}

interface ConsumeQueueUseCaseReply {
  message: string
}

export async function ConsumeQueueUseCase({ queueName }: ConsumeQueueUseCaseRequest): Promise<void> {
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

  // console.log(queueMessage)
  return queueMessage

  // return { message.content.toString() }
}

// call the function passing the queue 'asterisk-calls' and wait 10 seconds to get the next message
ConsumeQueueUseCase({ queueName: 'asterisk-calls' }).then(() => {
  console.log('Message consumed')
  setTimeout(() => {
    process.exit(0)
  }, 10000)
}).catch(error => {
  console.error(error)
  process.exit(1)
})