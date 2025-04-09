import { databaseConfig } from '@config'
import { env } from '@config/env'
import { InternalServerError } from '@domain/model/erros/InternalServerError'
import { DataBaseInterface } from '@infra/database/interface/DatabaseInterface'
import { InvoiceModel } from '@infra/database/models/invoice/InvoiceModel'
import { createDatabaseIfNotExists } from '@infra/database/utils/createDatabase/createDatabaseIfNotExists'
import logger from '@shared/utils/logger'
import { injectable } from 'tsyringe'
import { DataSource } from 'typeorm'

@injectable()
export class MySQLImplementation implements DataBaseInterface<DataSource> {
  private dataBaseConnection!: DataSource
  private isInitialized = false

  async start(): Promise<void> {
    if (this.isInitialized) return

    const { host, port, username, password, database } = databaseConfig.connection

    try {
      await createDatabaseIfNotExists(host, port, username, password, database)

      this.dataBaseConnection = new DataSource({
        ...databaseConfig.connection,
        entities: [InvoiceModel],
        synchronize: true,
        logging: false,
      })

      await this.dataBaseConnection.initialize()
      this.isInitialized = true

      logger.info(`✅ [${env.DB_CLIENT.toUpperCase()}] Connected to ${database}`)
    } catch (error) {
      logger.error('❌ Failed to initialize database:', error)
      throw new InternalServerError('Failed to initialize database.')
    }
  }

  getInstance(): DataSource {
    if (!this.isInitialized) {
      throw new InternalServerError('Database is not initialized. Call start() first.')
    }
    return this.dataBaseConnection
  }

  async stop(): Promise<void> {
    if (this.isInitialized) {
      await this.dataBaseConnection.destroy()
      logger.info(`✅ [${env.DB_CLIENT.toUpperCase()}] Connection closed.`)
      this.isInitialized = false
    }
  }
}
