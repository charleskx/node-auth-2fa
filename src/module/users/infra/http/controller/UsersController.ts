import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'

import { CreateUserService } from '@/module/users/services/CreateUserService'
import { ProfileService } from '@/module/users/services/ProfileService'
import { ResponseHandler } from '@/shared/utility/ResponseHandler'

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

  static async get(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    const { sub: id } = request.user

    const profileService = container.resolve(ProfileService)
    const profile = await profileService.handle(id)

    return ResponseHandler.json(profile, reply)
  }
}

export { UsersController }
