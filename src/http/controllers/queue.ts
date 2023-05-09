import { SendMessageQueueUseCase } from "@/use-cases/send-message-queue";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function queue(request: FastifyRequest, reply: FastifyReply) {
  const queueSchema = z.object({
    queueName: z.string(),
    message: z.string()
  })

  const { queueName, message } = queueSchema.parse(request.body)

  try {

    const sendMessageQueue = new SendMessageQueueUseCase()

    await sendMessageQueue.execute({
      queueName,
      message
    })

  } catch (err) {
    throw err
  }

  return reply.status(201).send()
}