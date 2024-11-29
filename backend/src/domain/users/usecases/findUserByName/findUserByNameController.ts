import { FastifyReply, FastifyRequest } from 'fastify';
import { UsersPrismaRepository } from '../../repositories/userPrismaRepository';
import { FindUserByNameUseCase } from './findUserByNameUseCase';
import { z } from 'zod';

export const createUserBodySchema = z.object({
	name: z.string(),
});

export async function findUserByNameController(request: FastifyRequest, reply: FastifyReply) {

    const { name } = createUserBodySchema.parse(request.params);

	const usersRepository = new UsersPrismaRepository()
    const findUserByNameUseCase = new FindUserByNameUseCase(usersRepository)

	const user = await findUserByNameUseCase.execute({ name });

	if (user.isLeft())
		return reply
			.status(404)
			.send(user.value.error)

	return reply
		.status(200)
		.send(user.value.user);
}
