/* eslint-disable camelcase */
import { inject, injectable } from 'tsyringe'

import { IUserTwoFactorAuthRepository } from '../interfaces/IUserTwoFactorAuthRepository'
import { AppError } from '@/shared/utility/AppError'
import { ITwoFactorProvider } from '@/shared/container/providers/TwoFactorProvider/interfaces/ITwoFactorProvider'
import { env } from '@/shared/infra/env'

@injectable()
class CreateUserTwoFactorAuth {
  constructor(
    @inject('UserTwoFactorAuthRepository')
    private userTwoFactorRepository: IUserTwoFactorAuthRepository,
    @inject('TwoFactorProvider') private twoFactorProvider: ITwoFactorProvider,
  ) {}

  public async handle(user: string): Promise<string | undefined> {
    const factorExists = await this.userTwoFactorRepository.findByUser(user)

    if (factorExists) {
      throw new AppError('Authenticator already registered in the system')
    }

    const { ascii, otpauth_url } = this.twoFactorProvider.generate(
      env.APPLICATION_NAME,
    )

    await this.userTwoFactorRepository.create({
      key: ascii,
      user,
    })

    return otpauth_url
  }
}

export { CreateUserTwoFactorAuth }
