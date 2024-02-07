import { FastifyReply, FastifyRequest } from 'fastify'

import { ResponseHandler } from '@/shared/utility/ResponseHandler'

class HealthController {
  static async index(
    _: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    return ResponseHandler.json(
      { success: true, message: 'server working correctly' },
      reply,
    )
  }
}

export { HealthController }
