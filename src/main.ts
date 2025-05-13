import 'reflect-metadata'
import '@infra/container'
import { Server } from '@presentation/http/Server'
import logger from '@shared/utils/logger'
import { onShutdownDataBaseTask } from '@infra/services/internal/tasks/onShutdown/onShutdownDataBaseTask'

const server = new Server()
export function main() {
  server.initialize()
  server.start()
}

main()

let isShuttingDown = false
const shutdown = async () => {
  if (isShuttingDown) return
  isShuttingDown = true
  try {
    logger.info('🔥 Gracefully shutting down.......')
    await server.stop()
    await onShutdownDataBaseTask()
    process.exit(0)
  } catch (error) {
    logger.error('❌ Error during shutdown:', error)
    process.exit(1)
  }
}

process.on('SIGINT', () => {
  logger.info('🛑 SIGINT received')
  shutdown()
})

process.on('SIGTERM', () => {
  logger.info('🛑 SIGTERM received')
  shutdown()
})
