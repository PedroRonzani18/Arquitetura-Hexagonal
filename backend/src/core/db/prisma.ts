import { PrismaClient } from '@prisma/client'
import { withPulse } from '@prisma/extension-pulse'
import { env } from '../env'

const prisma = new PrismaClient()
    .$extends(
        withPulse({
            apiKey: env.PULSE_API_KEY
        })
    )

export { prisma }