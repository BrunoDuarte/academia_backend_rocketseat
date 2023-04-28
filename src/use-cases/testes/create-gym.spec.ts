import { expect, describe, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from '../create-gym'

describe('Create Gym Use Case', () => {
  it('should be able to create a gym', async () => {
    const gymsRepository = new InMemoryGymsRepository()
    const createGymUseCase = new CreateGymUseCase(gymsRepository)

    const { gym } = await createGymUseCase.execute({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -3.741906,
      longitude: -38.537535
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})