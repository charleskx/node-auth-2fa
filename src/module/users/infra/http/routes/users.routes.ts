import { FastifyInstance } from 'fastify'

import { UsersController } from '../controller/UsersController'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/', UsersController.create)
}
