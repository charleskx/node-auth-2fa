import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'

import { CreateUserService } from '@/module/users/services/CreateUserService'

class UsersController {
  static async create(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    const schema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { email, name, password } = schema.parse(request.body)

    const createUserService = container.resolve(CreateUserService)

    await createUserService.handle({ email, name, password })

    return reply.code(201).send()
  }
}

export { UsersController }
