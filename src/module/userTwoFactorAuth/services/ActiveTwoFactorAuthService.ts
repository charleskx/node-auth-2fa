import { inject, injectable } from 'tsyringe'

import { IUserTwoFactorAuthRepository } from '../interfaces/IUserTwoFactorAuthRepository'
import { AppError } from '@/shared/utility/AppError'

@injectable()
class ActiveTwoFactorAuthService {
  constructor(
    @inject('UserTwoFactorAuthRepository')
    private userTwoFactorRepository: IUserTwoFactorAuthRepository,
  ) {}

  public async handle(user: string): Promise<void> {
    const factor = await this.userTwoFactorRepository.findByUser(user)

    if (!factor) {
      throw new AppError('User without registered authenticator')
    }

    if (factor.validated) {
      throw new AppError('User with validated authenticator')
    }

    await this.userTwoFactorRepository.validate(user)
  }
}

export { ActiveTwoFactorAuthService }
