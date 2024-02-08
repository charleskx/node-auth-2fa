import { FastifyInstance } from 'fastify'

import { healthRoutes } from '@/module/health/infra/http/routes/heath.routes'
import { usersRoutes } from '@/module/users/infra/http/routes/users.routes'
import { sessionsRoutes } from '@/module/sessions/infra/http/routes/sessions.route'
import { usersTwoFactorAuthRoutes } from '@/module/userTwoFactorAuth/infra/http/routes/usersTwoFactorAuth.routes'

export async function routes(app: FastifyInstance) {
  app.register(healthRoutes, { prefix: 'health' })
  app.register(usersRoutes, { prefix: 'users' })
  app.register(sessionsRoutes, { prefix: 'sessions' })
  app.register(usersTwoFactorAuthRoutes, { prefix: 'sessions/two-factor' })
}
