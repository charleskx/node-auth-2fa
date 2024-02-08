import { FastifyInstance } from 'fastify'

import { UsersController } from '../controller/UsersController'
import { ensureLoggedIn } from '@/shared/infra/http/middlewares/ensureLoggedIn'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/', UsersController.create)
  app.get('/me', { onRequest: ensureLoggedIn }, UsersController.get)
}
