import { env } from '@config'

export const appConfig = {
  apiPrefix: '/api',
  cors: {
    origin: env.CORS_ORIGIN,
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
  },
}
