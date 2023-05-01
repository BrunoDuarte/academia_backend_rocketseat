import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { MaxNumberOfCheckInError } from "./errors/max-number-of-check-in-error";
import { MaxDistanceError } from "./errors/max-distance-error";


interface CheckInUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository
  ) { }

  async execute({ userId, gymId, userLatitude, userLongitude }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.find_by_id(gymId)

    // console.log(`GYM ERROR: ${JSON.stringify(gym)}`)

    if (!gym) throw new ResourceNotFoundError()

    // calculate distance between user and gym
    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
    )

    // if distance is greater than 100 meters, throw an distance invalid error
    const MAX_DISTANCE_IN_KILOMETERS = 0.1 // 100 meters
    if (distance > MAX_DISTANCE_IN_KILOMETERS) throw new MaxDistanceError()

    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(userId, new Date())

    if (checkInOnSameDate) throw new MaxNumberOfCheckInError()

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId
    })

    return { checkIn }
  }
}