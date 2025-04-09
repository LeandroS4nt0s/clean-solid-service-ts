import { env } from '@config'
import winston from 'winston'

const { combine, timestamp, printf, colorize } = winston.format

const customFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`
})

const logger = winston.createLogger({
  level: env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: combine(colorize(), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), customFormat),
  transports: [new winston.transports.Console()],
})

export default logger
