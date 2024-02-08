import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import { ZodError } from 'zod'

import '@/shared/container'

import { env } from '../env'
import { routes } from './routes'
import { AppError } from '@/shared/utility/AppError'
import { ResponseHandler } from '@/shared/utility/ResponseHandler'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifyCors, {
  origin: true,
})

app.register(routes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ error: true, message: 'Validation error', issue: error.format() })
  }

  if (error instanceof AppError) {
    return ResponseHandler.json(
      { error: true, message: error.message },
      reply,
      error.code,
    )
  }

  return ResponseHandler.json(
    {
      error: true,
      message: 'Internal server error',
      issue: error.message,
    },
    reply,
    500,
  )
})
