import { injectable } from 'tsyringe'
import { UserTwoFactorAuth } from '@prisma/client'

import {
  ICreateDTO,
  IUpdateDTO,
  IUserTwoFactorAuthRepository,
} from '../../interfaces/IUserTwoFactorAuthRepository'
import { prisma } from '@/shared/infra/prisma'

@injectable()
class UserTwoFactorAuthRepository implements IUserTwoFactorAuthRepository {
  public async update({ key, user }: IUpdateDTO): Promise<UserTwoFactorAuth> {
    return prisma.userTwoFactorAuth.update({
      data: { key },
      where: { user_id: user },
    })
  }

  public async validate(user: string): Promise<void> {
    await prisma.userTwoFactorAuth.update({
      data: { validated: true, validated_at: new Date() },
      where: { user_id: user },
    })
  }

  public async create({ user, key }: ICreateDTO): Promise<UserTwoFactorAuth> {
    return prisma.userTwoFactorAuth.create({ data: { key, user_id: user } })
  }

  public async findByUser(user: string): Promise<UserTwoFactorAuth | null> {
    return prisma.userTwoFactorAuth.findUnique({ where: { user_id: user } })
  }
}

export { UserTwoFactorAuthRepository }
