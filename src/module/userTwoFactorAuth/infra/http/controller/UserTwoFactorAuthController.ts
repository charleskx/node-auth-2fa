import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

import { CreateTwoFactorAuthService } from '@/module/userTwoFactorAuth/services/CreateTwoFactorAuthService'
import { ActiveTwoFactorAuthService } from '@/module/userTwoFactorAuth/services/ActiveTwoFactorAuthService'
import { ResetTwoFactorAuthService } from '@/module/userTwoFactorAuth/services/ResetTwoFactorAuthService'
import { z } from 'zod'
import { VerifyTwoFactorAuthService } from '@/module/userTwoFactorAuth/services/VerifyTwoFactorAuthService'

class UserTwoFactorAuthController {
  static async create(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    const { sub: id } = request.user

    const createUserTwoFactorAuthService = container.resolve(
      CreateTwoFactorAuthService,
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
      ActiveTwoFactorAuthService,
    )

    await activeUserTwoFactorAuthService.handle(id)

    return reply
      .code(202)
      .send({ message: 'Authenticator successfully activated.' })
  }

  static async reset(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    const { sub: id } = request.user

    const resetUserTwoFactorAuthService = container.resolve(
      ResetTwoFactorAuthService,
    )

    const url = await resetUserTwoFactorAuthService.handle(id)

    return reply.code(202).send({ url })
  }

  static async verify(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    const { sub: id } = request.user

    const schema = z.object({
      token: z.string().regex(/^\d{6}$/),
    })

    const { token } = schema.parse(request.body)

    const verifyUserTwoFactorAuthService = container.resolve(
      VerifyTwoFactorAuthService,
    )

    const verified = await verifyUserTwoFactorAuthService.handle({
      token,
      user: id,
    })

    if (verified === true) {
      return reply.code(202).send({ message: 'Code successfully validated!' })
    }

    return reply.code(406).send({ message: 'Code entered is invalid!' })
  }
}

export { UserTwoFactorAuthController }
