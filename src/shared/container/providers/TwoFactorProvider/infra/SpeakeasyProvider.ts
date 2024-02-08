import type { GeneratedSecret } from 'speakeasy'
import * as speakeasy from 'speakeasy'

import { ITwoFactorProvider, IVerify } from '../interfaces/ITwoFactorProvider'

class SpeakeasyProvider implements ITwoFactorProvider {
  verify({ secret, token }: IVerify): boolean {
    return speakeasy.totp.verify({
      secret,
      token,
      encoding: 'ascii',
    })
  }

  generate(name: string): GeneratedSecret {
    const code = speakeasy.generateSecret({ name })

    return code
  }
}

export { SpeakeasyProvider }
