import { inject, injectable } from 'tsyringe'
import { User } from '@prisma/client'

import { ICredentialDTO } from '../interfaces/ICredentialDTO'
import { IUsersRepository } from '@/module/users/interfaces/IUsersRepository'
import { IHashProvider } from '@/shared/container/providers/HashProvider/interfaces/IHashProvider'
import { AppError } from '@/shared/utility/AppError'

@injectable()
class SignInWithCredentialService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('HashProvider') private hashProvider: IHashProvider,
  ) {}

  public async handle({
    email,
    password,
  }: ICredentialDTO): Promise<User | null> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Invalid credentials', 401)
    }

    const doesPasswordMatches = await this.hashProvider.compare(
      password,
      user.password,
    )

    if (!doesPasswordMatches) {
      throw new AppError('Invalid credentials', 401)
    }

    return user
  }
}

export { SignInWithCredentialService }
