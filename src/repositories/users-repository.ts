import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  find_by_email(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
}