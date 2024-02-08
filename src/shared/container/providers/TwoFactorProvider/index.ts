import { container } from 'tsyringe'

import { ITwoFactorProvider } from './interfaces/ITwoFactorProvider'
import { SpeakeasyProvider } from './infra/SpeakeasyProvider'

container.registerSingleton<ITwoFactorProvider>(
  'TwoFactorProvider',
  SpeakeasyProvider,
)
