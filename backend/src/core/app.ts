import { userRoutes } from '@/domain/users/@routes/user.routes'
import fastify from 'fastify'

export const app = fastify()

app.register(userRoutes, { prefix: 'user' })


