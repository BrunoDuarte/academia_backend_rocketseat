import { Gym } from "@prisma/client";
import { GymsRepository } from "../gyms-repository";

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async find_by_id(id: string) {
    const gym = this.items.find(gym => gym.id === id)
    if (!gym) return null
    return gym
  }
}
