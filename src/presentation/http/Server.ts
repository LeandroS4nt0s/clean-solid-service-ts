import 'reflect-metadata'
import { appConfig, env } from '@config'
import { onShutdownDataBaseTask } from '@infra/services/internal/tasks/onShutdown/onShutdownDataBaseTask'
import { onStartupDataBaseTask } from '@infra/services/internal/tasks/onStartup/onStartupDataBaseTask'
import { AppRoutes } from '@presentation/http/routes/AppRoutes'
import { errorMiddleware } from '@shared/middlewares/errorMiddleware'
import logger from '@shared/utils/logger'
import cors from 'cors'
import express, { Express } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

export class Server {
  private app: Express
  private port: number

  constructor() {
    this.app = express()
    this.port = env.PORT
  }

  public async initialize(): Promise<void> {
    try {
      this.setup()
      await this.connectDependencies()
    } catch (error) {
      this.handleError(error)
    }
  }

  private setup(): void {
    this.setMiddlewares()
    this.setRoutes()
  }

  private async connectDependencies(): Promise<void> {
    await onStartupDataBaseTask()
  }

  private handleError(error: unknown): void {
    if (error instanceof Error) {
      logger.error(`❌ Error during server initialization: ${error.message}`)
    } else {
      logger.error('❌ Error during server initialization: Unknown error')
    }
  }

  public start(): void {
    this.app.listen(this.port, () => {
      logger.info(`✅ Server is running on PORT:${this.port}`)
    })
  }

  public getApp(): Express {
    return this.app
  }

  private setMiddlewares(): void {
    this.app.use(helmet())
    this.app.use(morgan('dev'))
    this.app.use(cors(appConfig.cors))
    this.app.use(express.json())
    this.app.use(errorMiddleware)
  }

  private setRoutes(): void {
    this.app.use(appConfig.apiPrefix, AppRoutes)
  }
}

let isShuttingDown = false
const shutdown = async () => {
  if (isShuttingDown) return
  isShuttingDown = true
  try {
    logger.info('🔥 Gracefully shutting down...')
    await onShutdownDataBaseTask()
  } catch (error) {
    logger.error('❌ Error during shutdown:', error)
  } finally {
    process.exit(0)
  }
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
