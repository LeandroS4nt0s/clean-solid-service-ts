import { env } from '@config'
import { DatabaseConfig, DatabaseTypes } from '@infra/database/interface/DatabaseInterface'

export const databaseConfig: DatabaseConfig = {
  client: env.DB_CLIENT as DatabaseTypes,
  url: env.DB_URL,
  connection: {
    type: env.DB_CLIENT as DatabaseTypes,
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
  },
}
