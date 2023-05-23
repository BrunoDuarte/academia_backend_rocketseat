import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function metric(request: FastifyRequest, reply: FastifyReply) {
  const getUseMetricsUseCase = makeGetUserMetricsUseCase()

  const { checkInsCount } = await getUseMetricsUseCase.execute({
    userId: request.user.sub
  })

  return reply.status(200).send({ checkInsCount })
}