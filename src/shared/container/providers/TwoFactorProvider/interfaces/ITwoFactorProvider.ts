import type { GeneratedSecret } from 'speakeasy'

export interface IVerify {
  secret: string
  token: string
}

export interface ITwoFactorProvider {
  generate(name: string): GeneratedSecret
  verify(payload: IVerify): boolean
}
