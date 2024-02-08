import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

import { CreateUserTwoFactorAuth } from '@/module/userTwoFactorAuth/services/CreateUserTwoFactorAuth'
import { ActiveUserTwoFactorAuth } from '@/module/userTwoFactorAuth/services/ActiveUserTwoFactorAuth'

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

  static async active(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    const { sub: id } = request.user

    const activeUserTwoFactorAuthService = container.resolve(
      ActiveUserTwoFactorAuth,
    )

    await activeUserTwoFactorAuthService.handle(id)

    return reply
      .code(202)
      .send({ message: 'Authenticator successfully activated.' })
  }
}

export { UserTwoFactorAuthController }
