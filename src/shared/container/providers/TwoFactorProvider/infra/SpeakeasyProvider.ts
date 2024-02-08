import type { GeneratedSecret } from 'speakeasy'
import { generateSecret, totp } from 'speakeasy'

import { ITwoFactorProvider, IVerify } from '../interfaces/ITwoFactorProvider'

class SpeakeasyProvider implements ITwoFactorProvider {
  verify({ secret, token }: IVerify): boolean {
    return totp.verify({
      secret,
      token,
      encoding: 'ascii',
    })
  }

  generate(name: string): GeneratedSecret {
    return generateSecret({ name })
  }
}

export { SpeakeasyProvider }
