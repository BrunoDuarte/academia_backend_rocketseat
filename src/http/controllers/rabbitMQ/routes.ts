import { FastifyInstance } from "fastify";
import { sendQueue } from "../rabbitMQ/sendQueue";
import { consumeQueue } from "../rabbitMQ/consumeQueue";

export async function rmqRoutes(app: FastifyInstance) {
  app.post('/sendqueuemessage', sendQueue)
  app.post('/consumequeuemessage', consumeQueue)
}