import { container } from 'tsyringe'

import './providers'

import { UsersRepository } from '@/module/users/infra/repositories/UsersRepository'
import { IUsersRepository } from '@/module/users/interfaces/IUsersRepository'
import { IUserTwoFactorAuthRepository } from '@/module/userTwoFactorAuth/interfaces/IUserTwoFactorAuthRepository'
import { UserTwoFactorAuthRepository } from '@/module/userTwoFactorAuth/infra/repositories/UserTwoFactorAuthRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)

container.registerSingleton<IUserTwoFactorAuthRepository>(
  'UserTwoFactorAuthRepository',
  UserTwoFactorAuthRepository,
)
