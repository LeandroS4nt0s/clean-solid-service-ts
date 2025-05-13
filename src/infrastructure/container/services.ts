import { MySQLImplementation } from '@infra/services/internal/database/implementation'
import { DataBaseInterface } from '@infra/services/internal/database/interface/DatabaseInterface'
import { container } from 'tsyringe'

container.registerSingleton<DataBaseInterface<unknown>>('DataBaseService', MySQLImplementation)
