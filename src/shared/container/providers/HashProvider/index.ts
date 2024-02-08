import { container } from 'tsyringe'

import { IHashProvider } from './interfaces/IHashProvider'
import { BCryptJSProvider } from './infra/BCryptJSProvider'

container.registerSingleton<IHashProvider>('HashProvider', BCryptJSProvider)
