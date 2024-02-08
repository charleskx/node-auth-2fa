import { injectable } from 'tsyringe'
import { Prisma, User } from '@prisma/client'

import { IUsersRepository } from '../../interfaces/IUsersRepository'
import { prisma } from '@/shared/infra/prisma'

@injectable()
class UsersRepository implements IUsersRepository {
  public async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findFirst({ where: { email } })
  }

  public async create(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({ data })
  }
}

export { UsersRepository }
