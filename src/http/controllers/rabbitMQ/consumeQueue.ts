import { ConsumeQueueUseCase } from "@/use-cases/consume-message-queue";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function consumeQueue(request: FastifyRequest, reply: FastifyReply) {
  const queueSchema = z.object({
    queueName: z.string()
  })

  const { queueName } = queueSchema.parse(request.body)

  try {
    const consumeMessageQueue = new ConsumeQueueUseCase()
    const message = await consumeMessageQueue.execute({ queueName })

    console.log(message)

    return reply.status(201).send({ message })
  } catch (err) {
    throw err
  }

}