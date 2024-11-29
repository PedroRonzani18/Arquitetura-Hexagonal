import { FastifyReply, FastifyRequest } from 'fastify';
import { UsersPrismaRepository } from '../../repositories/userPrismaRepository';
import { z } from 'zod';
import { FindUserByEmailUseCase } from './findUserByEmailUseCase';

export const createUserBodySchema = z.object({
	email: z.string(),
});

export async function findUserByEmailController(request: FastifyRequest, reply: FastifyReply) {

    const { email } = createUserBodySchema.parse(request.params);

	const usersRepository = new UsersPrismaRepository()
    const findUserByEmailUseCase = new FindUserByEmailUseCase(usersRepository)

	const user = await findUserByEmailUseCase.execute({ email });

	if (user.isLeft())
		return reply
			.status(404)
			.send(user.value.error)

	return reply
		.status(200)
		.send(user.value.user);
}
