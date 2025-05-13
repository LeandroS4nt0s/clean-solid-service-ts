import 'reflect-metadata'
import { appConfig, env } from '@config'
import { onStartupDataBaseTask } from '@infra/services/internal/tasks/onStartup/onStartupDataBaseTask'
import { AppRoutes } from '@presentation/http/routes/AppRoutes'
import { errorMiddleware } from '@shared/middlewares/errorMiddleware'
import logger from '@shared/utils/logger'
import cors from 'cors'
import express, { Express } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import http from 'http'

export class Server {
  private app: Express
  private port: number
  private serverInstance?: http.Server

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
      process.exit(1)
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
    this.serverInstance = this.app.listen(this.port, () => {
      logger.info(`✅ Server is running on PORT:${this.port}`)
    })
  }

  public async stop(): Promise<void> {
    if (this.serverInstance) {
      this.serverInstance.close(() => {
        logger.info('✅ Server has been stopped successfully')
      })
    }
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
