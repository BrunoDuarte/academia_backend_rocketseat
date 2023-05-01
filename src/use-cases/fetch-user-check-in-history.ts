import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";


interface FetchUserCheckInsHisotryUseCaseRequest {
  userId: string
  page: number
}

interface FetchUserCheckInsHisotryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHisotryUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository
  ) { }

  async execute({ userId, page }: FetchUserCheckInsHisotryUseCaseRequest): Promise<FetchUserCheckInsHisotryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)

    return { checkIns }
  }
}