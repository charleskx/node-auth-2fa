import { inject, injectable } from 'tsyringe'
import { Prisma, User } from '@prisma/client'

import { IUsersRepository } from '../interfaces/IUsersRepository'
import { IHashProvider } from '@/shared/container/providers/HashProvider/interfaces/IHashProvider'
import { env } from '@/shared/infra/env'
import { AppError } from '@/shared/utility/AppError'

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('HashProvider') private hashProvider: IHashProvider,
  ) {}

  public async handle({
    email,
    name,
    password,
  }: Prisma.UserCreateInput): Promise<User> {
    const userExists = await this.usersRepository.findByEmail(email)

    if (userExists) {
      throw new AppError('User already registered in the system.')
    }

    const passwordHash = await this.hashProvider.hash(password, env.HASH)

    const user = await this.usersRepository.create({
      email,
      name,
      password: passwordHash,
    })

    return user
  }
}

export { CreateUserService }
