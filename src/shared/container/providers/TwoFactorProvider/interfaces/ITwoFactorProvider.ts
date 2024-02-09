export interface IVerify {
  secret: string
  token: string
}

export interface IGenerateOTPAuthUrl {
  user: string
  application: string
  secret: string
}

export interface ITwoFactorProvider {
  generateSecret(): string
  generateOTPAuthUrl(payload: IGenerateOTPAuthUrl): string
  verify(payload: IVerify): boolean
}
