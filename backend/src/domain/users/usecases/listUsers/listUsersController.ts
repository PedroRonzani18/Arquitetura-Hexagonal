import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { UsersPrismaRepository } from '../../repositories/userPrismaRepository';
import { ListUsersUseCase } from './listUsersUseCase';

export async function listUsersController(request: FastifyRequest, reply: FastifyReply) {

	const UsersRepository = new UsersPrismaRepository()
	const listUsersUseCase = new ListUsersUseCase(UsersRepository)

	const user = await listUsersUseCase.execute();

	if (user.isLeft())
		return reply
			.status(404)
			.send(user.value.error)

	return reply
		.status(200)
		.send(user.value.users);
}
