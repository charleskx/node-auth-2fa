import { FastifyInstance } from 'fastify'

import { healthRoutes } from '@/module/health/infra/http/routes/heath.routes'
import { usersRoutes } from '@/module/users/infra/http/routes/users.routes'
import { sessionsRoutes } from '@/module/sessions/infra/http/routes/sessions.route'

export async function routes(app: FastifyInstance) {
  app.register(healthRoutes, { prefix: 'health' })
  app.register(usersRoutes, { prefix: 'users' })
  app.register(sessionsRoutes, { prefix: 'sessions' })
}
