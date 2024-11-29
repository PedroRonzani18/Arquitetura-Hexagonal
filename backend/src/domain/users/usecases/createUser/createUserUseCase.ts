import { Either, left, right } from "@/core/types/either"
import { ResourceAlreadyExistsError } from "@/core/errors/resource-already-exists-error"
import { User } from "../../@entities/user"
import { UsersRepository } from "../../repositories/userInterfaceRepository"
import { FindUserByEmailUseCase } from "../findUserByEmail/findUserByEmailUseCase"

interface CreateUserUseCaseRequest {
    name: string
    email: string
    password: string
}

type CreateUserUseCaseResponse = Either<
    { error: ResourceAlreadyExistsError },
    { user: User }
>

export class CreateUserUseCase {

    constructor(private usersRepository: UsersRepository) { }

    async execute({ email, name, password }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {

        const findUserByEmailUseCase = new FindUserByEmailUseCase(this.usersRepository)

        const possibleUser = await findUserByEmailUseCase.execute({ email })
        if (possibleUser.isRight())
            return left({ error: new ResourceAlreadyExistsError(`User with email '${email}'`) })

        const user = await this.usersRepository.create({ email, name, password })

        return right({ user })
    }
}