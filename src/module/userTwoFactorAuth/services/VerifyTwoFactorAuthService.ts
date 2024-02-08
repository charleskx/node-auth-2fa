import { inject, injectable } from 'tsyringe'

import { IUserTwoFactorAuthRepository } from '../interfaces/IUserTwoFactorAuthRepository'
import { AppError } from '@/shared/utility/AppError'
import { ITwoFactorProvider } from '@/shared/container/providers/TwoFactorProvider/interfaces/ITwoFactorProvider'

export interface IVerifyDTO {
  user: string
  token: string
}

@injectable()
class VerifyTwoFactorAuthService {
  constructor(
    @inject('UserTwoFactorAuthRepository')
    private userTwoFactorRepository: IUserTwoFactorAuthRepository,
    @inject('TwoFactorProvider') private twoFactorProvider: ITwoFactorProvider,
  ) {}

  public async handle({ token, user }: IVerifyDTO): Promise<boolean> {
    const factor = await this.userTwoFactorRepository.findByUser(user)

    if (!factor) {
      throw new AppError('User without registered authenticator')
    }

    if (!factor.validated) {
      throw new AppError('User does not have a validated authenticator')
    }

    const verify = this.twoFactorProvider.verify({ secret: factor.key, token })

    return verify
  }
}

export { VerifyTwoFactorAuthService }
