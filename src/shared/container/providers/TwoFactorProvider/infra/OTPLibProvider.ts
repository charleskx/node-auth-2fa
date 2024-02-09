import { authenticator } from 'otplib'
import {
  IGenerateOTPAuthUrl,
  ITwoFactorProvider,
  IVerify,
} from '../interfaces/ITwoFactorProvider'

class OTPLibProvider implements ITwoFactorProvider {
  generateSecret(): string {
    return authenticator.generateSecret()
  }

  generateOTPAuthUrl({
    application,
    secret,
    user,
  }: IGenerateOTPAuthUrl): string {
    return authenticator.keyuri(user, application, secret)
  }

  verify({ secret, token }: IVerify): boolean {
    return authenticator.verify({ secret, token })
  }
}

export { OTPLibProvider }
