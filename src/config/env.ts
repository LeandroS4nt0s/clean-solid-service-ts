import dotenv from 'dotenv'

dotenv.config()

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PORT: Number(process.env.PORT ?? 3000),

  DB_CLIENT: process.env.DB_CLIENT ?? 'mysql', // knex, prisma e etc
  DB_URL: process.env.DATABASE_URL ?? '',

  DB_HOST: process.env.DB_HOST ?? 'localhost',
  DB_PORT: Number(process.env.DB_PORT ?? 3306),
  DB_USER: process.env.DB_USER ?? 'root',
  DB_PASSWORD: process.env.DB_PASSWORD ?? 'root',
  DB_NAME: process.env.DB_NAME ?? 'mydb',
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? 'http://localhost:8080',
}
