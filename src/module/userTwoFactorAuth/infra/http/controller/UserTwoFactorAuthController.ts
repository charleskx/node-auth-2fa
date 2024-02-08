import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

import { CreateUserTwoFactorAuth } from '@/module/userTwoFactorAuth/services/CreateUserTwoFactorAuth'

class UserTwoFactorAuthController {
  static async create(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    const { sub: id } = request.user

    const createUserTwoFactorAuthService = container.resolve(
      CreateUserTwoFactorAuth,
    )

    const url = await createUserTwoFactorAuthService.handle(id)

    return reply.code(201).send({ url })
  }
}

export { UserTwoFactorAuthController }
