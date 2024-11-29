import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { UsersPrismaRepository } from '../../repositories/userPrismaRepository';
import { LoginUserUseCase } from './loginUserUseCase';

export const loginUserBodySchema = z.object({
	email: z.string(),
	password: z.string(),
});

export async function loginUserController(request: FastifyRequest, reply: FastifyReply) {

	const { email, password } = loginUserBodySchema.parse(request.body);

	const UsersRepository = new UsersPrismaRepository()
	const loginUserUseCase = new LoginUserUseCase(UsersRepository)

	const user = await loginUserUseCase.execute({ email, password });

	if (user.isLeft())
		return reply
			.status(404)
			.send(user.value.error)

	return reply
		.status(200)
		.send(user.value.user);
}
