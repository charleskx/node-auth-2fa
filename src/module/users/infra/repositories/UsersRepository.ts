import { injectable } from 'tsyringe'
import { Prisma, User } from '@prisma/client'

import { IUsersRepository } from '../../interfaces/IUsersRepository'
import { prisma } from '@/shared/infra/prisma'

@injectable()
class UsersRepository implements IUsersRepository {
  findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } })
  }

  public async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } })
  }

  public async create(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({ data })
  }
}

export { UsersRepository }
