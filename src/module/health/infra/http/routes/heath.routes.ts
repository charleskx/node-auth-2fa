import { FastifyInstance } from 'fastify'

import { HealthController } from '../controller/HealthController'

export async function healthRoutes(app: FastifyInstance) {
  app.get('/', HealthController.index)
}
