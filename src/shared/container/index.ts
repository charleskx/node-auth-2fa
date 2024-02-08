import { container } from 'tsyringe'

import './providers'

import { UsersRepository } from '@/module/users/infra/repositories/UsersRepository'
import { IUsersRepository } from '@/module/users/interfaces/IUsersRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)
