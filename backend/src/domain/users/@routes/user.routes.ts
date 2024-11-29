import { FastifyInstance } from 'fastify';
import { createUserController } from '../usecases/createUser/createUserController';
import { loginUserController } from '../usecases/loginUser/loginUserController';
import { findUserByNameController } from '../usecases/findUserByName/findUserByNameController';
import { findUserByEmailController } from '../usecases/findUserByEmail/findUserByEmailController';
import { listUsersController } from '../usecases/listUsers/listUsersController';

export async function userRoutes(app: FastifyInstance) {
    app.post('/', createUserController)
    app.post('/login', loginUserController)
    app.get('/name/:name', findUserByNameController)
    app.get('/email/:email', findUserByEmailController)
    app.get('/list', listUsersController)
}