import { container } from 'tsyringe'

import { ITwoFactorProvider } from './interfaces/ITwoFactorProvider'
import { OTPLibProvider } from './infra/OTPLibProvider'

container.registerSingleton<ITwoFactorProvider>(
  'TwoFactorProvider',
  OTPLibProvider,
)
