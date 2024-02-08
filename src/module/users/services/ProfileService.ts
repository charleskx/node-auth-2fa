import { inject, injectable } from 'tsyringe'
import { User } from '@prisma/client'

import { IUsersRepository } from '../interfaces/IUsersRepository'
import { AppError } from '@/shared/utility/AppError'

@injectable()
class ProfileService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  public async handle(id: string): Promise<Partial<User>> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new AppError('User not found', 400)
    }

    return { ...user, password: undefined }
  }
}

export { ProfileService }
