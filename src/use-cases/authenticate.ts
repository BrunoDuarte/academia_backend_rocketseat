import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credential-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";


interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(
    private usersRepository: PrismaUsersRepository
  ) { }

  async execute({ email, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.find_by_email(email)

    if (!user) throw new InvalidCredentialsError()

    const doesPasswordMatch = await compare(password, user.password_hash)

    if (!doesPasswordMatch) throw new InvalidCredentialsError()

    return { user }
  }
}