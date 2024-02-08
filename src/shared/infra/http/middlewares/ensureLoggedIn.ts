import { FastifyRequest } from 'fastify'

import { AppError } from '@/shared/utility/AppError'

export async function ensureLoggedIn(request: FastifyRequest) {
  try {
    await request.jwtVerify()
  } catch (error) {
    throw new AppError('Unauthorized', 401)
  }
}
