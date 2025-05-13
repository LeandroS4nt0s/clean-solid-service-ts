import { env } from '@config'
import { InternalServerError } from '@domain/model/erros/InternalServerError'
import { mysqlCreateDatabase } from '@infra/services/internal/database/utils/createDatabase/mysqlCreateDatabase'
import { postgresCreateDatabase } from '@infra/services/internal/database/utils/createDatabase/postgresCreateDatabase'

export const createDatabaseIfNotExists = async (
  host: string,
  port: number,
  username: string,
  password: string,
  database: string
): Promise<void> => {
  switch (env.DB_CLIENT) {
    case 'mysql':
      return mysqlCreateDatabase(host, port, username, password, database)
    case 'postgres':
      return postgresCreateDatabase(host, port, username, password, database)
    default:
      throw new InternalServerError(`Unsupported DB_CLIENT: ${env.DB_CLIENT}`)
  }
}
