import { Gym } from '@prisma/client'

export interface GymsRepository {
  find_by_id(id: string): Promise<Gym | null>
}