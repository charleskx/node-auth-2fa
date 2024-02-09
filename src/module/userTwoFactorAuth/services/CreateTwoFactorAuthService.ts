import { inject, injectable } from 'tsyringe'

import { IUserTwoFactorAuthRepository } from '../interfaces/IUserTwoFactorAuthRepository'
import { AppError } from '@/shared/utility/AppError'
import { ITwoFactorProvider } from '@/shared/container/providers/TwoFactorProvider/interfaces/ITwoFactorProvider'
import { env } from '@/shared/infra/env'
import { IUsersRepository } from '@/module/users/interfaces/IUsersRepository'

@injectable()
class CreateTwoFactorAuthService {
  constructor(
    @inject('UserTwoFactorAuthRepository')
    private userTwoFactorRepository: IUserTwoFactorAuthRepository,
    @inject('TwoFactorProvider') private twoFactorProvider: ITwoFactorProvider,
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  public async handle(userUuid: string): Promise<string | undefined> {
    const factorExists = await this.userTwoFactorRepository.findByUser(userUuid)

    if (factorExists) {
      throw new AppError('Authenticator already registered in the system')
    }

    const user = await this.usersRepository.findById(userUuid)

    if (!user) {
      throw new AppError('User not found')
    }

    const secret = this.twoFactorProvider.generateSecret()
    const otpAuthUrl = this.twoFactorProvider.generateOTPAuthUrl({
      application: env.APPLICATION_NAME,
      secret,
      user: user.name,
    })

    await this.userTwoFactorRepository.create({
      key: secret,
      user: userUuid,
    })

    return otpAuthUrl
  }
}

export { CreateTwoFactorAuthService }
