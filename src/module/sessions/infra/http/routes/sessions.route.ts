import { FastifyInstance } from 'fastify'

import { SessionsController } from '../controller/SessionsController'

export async function sessionsRoutes(app: FastifyInstance) {
  app.post('/', SessionsController.credentials)
}
