import { env } from '@config'

export const appConfig = {
  apiPrefix: '/speakaccent/api',
  cors: {
    origin: env.CORS_ORIGIN,
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
  },
}
