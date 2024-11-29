import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { User } from "@/domain/users/@entities/user"
import { UsersRepository } from "../../repositories/userInterfaceRepository"

interface FindUserByNameUseCaseRequest {
    name: string
}

type FindUserByNameUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { user: User }
>

export class FindUserByNameUseCase {

    constructor(private usersRepository: UsersRepository) { }

    async execute({ name }: FindUserByNameUseCaseRequest): Promise<FindUserByNameUseCaseResponse> {

        const user = await this.usersRepository.findByName(name)

        if (!user)
            return left({error: new ResourceNotFoundError(`User ${name}`)})

        return right({ user })
    }
}