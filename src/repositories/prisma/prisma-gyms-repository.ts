import { Gym, Prisma } from "@prisma/client";
import { FindManyNearbyParams, GymsRepository } from "../gyms-repository";
import { prisma } from "@/lib/prisma";

export class PrismaGymsRepository implements GymsRepository {
  async find_by_id(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id
      }
    })
    return gym
  }

  async searchMany(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })
    return gyms
  }

  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * FROM gyms
      WHERE (
        6371 * 2 * ASIN(
          SQRT(
            POWER(SIN((RADIANS(${latitude}) - RADIANS(latitude)) / 2), 2) +
            COS(RADIANS(${latitude})) * COS(RADIANS(latitude)) *
            POWER(SIN((RADIANS(${longitude}) - RADIANS(longitude)) / 2), 2)
          )
        )
      ) <= 10 -- Distance in kilometers
    `
    return gyms
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data
    })
    return gym
  }

}