import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { User } from "@/domain/users/@entities/user"
import { UsersRepository } from "../../repositories/userInterfaceRepository"

interface FindUserByEmailUseCaseRequest {
    email: string
}

type FindUserByEmailUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { user: User }
>

export class FindUserByEmailUseCase {

    constructor(private usersRepository: UsersRepository) { }

    async execute({ email }: FindUserByEmailUseCaseRequest): Promise<FindUserByEmailUseCaseResponse> {

        const user = await this.usersRepository.findByEmail(email)

        if (!user)
            return left({error: new ResourceNotFoundError(`User with email '${email}'`)})

        return right({ user })
    }
}