import { compare, hash } from 'bcryptjs'

import { IHashProvider } from '../interfaces/IHashProvider'

class BCryptJSProvider implements IHashProvider {
  public compare(s: string, hash: string): Promise<boolean> {
    return compare(s, hash)
  }

  public hash(s: string, salt: number): Promise<string> {
    return hash(s, salt)
  }
}

export { BCryptJSProvider }
