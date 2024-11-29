import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { UsersPrismaRepository } from '../../repositories/userPrismaRepository';
import { CreateUserUseCase } from './createUserUseCase';

export const createUserBodySchema = z.object({
	name: z.string(),
	email: z.string(),
	password: z.string(),
});

export async function createUserController(request: FastifyRequest, reply: FastifyReply) {

	const { name, email, password } = createUserBodySchema.parse(request.body);

	const UsersRepository = new UsersPrismaRepository()
	const createUserUseCase = new CreateUserUseCase(UsersRepository)

	const user = await createUserUseCase.execute({ name, email, password });

	if (user.isLeft())
		return reply
			.status(409)
			.send(user.value.error)

	return reply
		.status(201)
		.send(user.value.user);
}
