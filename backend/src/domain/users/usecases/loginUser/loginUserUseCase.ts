import { Either, left, right } from "@/core/types/either"
import { ResourceAlreadyExistsError } from "@/core/errors/resource-already-exists-error"
import { User } from "../../@entities/user"
import { UsersRepository } from "../../repositories/userInterfaceRepository"
import { FindUserByEmailUseCase } from "../findUserByEmail/findUserByEmailUseCase"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

interface LoginUserUseCaseRequest {
    email: string
    password: string
}

type LoginUserUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { user: User }
>

export class LoginUserUseCase {

    constructor(private usersRepository: UsersRepository) { }

    async execute({ email, password }: LoginUserUseCaseRequest): Promise<LoginUserUseCaseResponse> {

        const user = await this.usersRepository.login(email, password)
        if (!user)
            return left({error: new ResourceNotFoundError(`User ${email} - ${password}`)})

        return right({ user })
    }
}