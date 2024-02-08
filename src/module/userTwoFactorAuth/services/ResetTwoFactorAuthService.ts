/* eslint-disable camelcase */
import { inject, injectable } from 'tsyringe'

import { IUserTwoFactorAuthRepository } from '../interfaces/IUserTwoFactorAuthRepository'
import { AppError } from '@/shared/utility/AppError'
import { ITwoFactorProvider } from '@/shared/container/providers/TwoFactorProvider/interfaces/ITwoFactorProvider'
import { env } from '@/shared/infra/env'

@injectable()
class ResetTwoFactorAuthService {
  constructor(
    @inject('UserTwoFactorAuthRepository')
    private userTwoFactorRepository: IUserTwoFactorAuthRepository,
    @inject('TwoFactorProvider') private twoFactorProvider: ITwoFactorProvider,
  ) {}

  public async handle(user: string): Promise<string | undefined> {
    const factor = await this.userTwoFactorRepository.findByUser(user)

    if (!factor) {
      throw new AppError('User without registered authenticator')
    }

    const { ascii, otpauth_url } = this.twoFactorProvider.generate(
      env.APPLICATION_NAME,
    )

    await this.userTwoFactorRepository.reset({ key: ascii, user })

    return otpauth_url
  }
}

export { ResetTwoFactorAuthService }
