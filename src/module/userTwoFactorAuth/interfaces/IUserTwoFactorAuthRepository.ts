import { UserTwoFactorAuth } from '@prisma/client'

export interface ICreateDTO {
  user: string
  key: string
}

export interface IUpdateDTO {
  user: string
  key: string
}

export interface IUserTwoFactorAuthRepository {
  create(payload: ICreateDTO): Promise<UserTwoFactorAuth>
  findByUser(user: string): Promise<UserTwoFactorAuth | null>
  update(payload: IUpdateDTO): Promise<UserTwoFactorAuth>
  validate(user: string): Promise<void>
}
