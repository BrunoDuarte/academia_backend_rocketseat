import { Gym, Prisma } from '@prisma/client'

export interface GymsRepository {
  find_by_id(id: string): Promise<Gym | null>
  searchMany(query: string, page: number): Promise<Gym[]>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}