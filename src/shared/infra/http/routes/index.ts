import { FastifyInstance } from 'fastify'

import { healthRoutes } from '@/module/health/infra/http/routes/heath.routes'

export async function routes(app: FastifyInstance) {
  app.register(healthRoutes, { prefix: 'health' })
}
