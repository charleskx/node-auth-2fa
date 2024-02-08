import { FastifyInstance } from 'fastify'

import { UserTwoFactorAuthController } from '../controller/UserTwoFactorAuthController'
import { ensureLoggedIn } from '@/shared/infra/http/middlewares/ensureLoggedIn'

export async function usersTwoFactorAuthRoutes(app: FastifyInstance) {
  app.addHook('onRequest', ensureLoggedIn)

  app.post('/', UserTwoFactorAuthController.create)
}
