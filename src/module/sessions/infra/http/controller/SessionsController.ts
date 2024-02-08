import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'

import { SignInWithCredentialService } from '@/module/sessions/services/SignInWithCredentialService'
import { AppError } from '@/shared/utility/AppError'
import { ResponseHandler } from '@/shared/utility/ResponseHandler'

class SessionsController {
  static async credentials(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    const schema = z.object({ email: z.string().email(), password: z.string() })

    const { email, password } = schema.parse(request.body)

    const signInWithCredentialService = container.resolve(
      SignInWithCredentialService,
    )

    const user = await signInWithCredentialService.handle({ email, password })

    if (!user) {
      throw new AppError('Invalid credentials', 401)
    }

    const token = await reply.jwtSign(
      {},
      { sign: { sub: user.id, expiresIn: '30m' } },
    )

    return ResponseHandler.json({ token }, reply)
  }
}

export { SessionsController }
