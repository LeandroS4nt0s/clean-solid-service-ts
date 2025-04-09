import { MySQLImplementation } from '@infra/database/implementation'
import { DataBaseInterface } from '@infra/database/interface/DatabaseInterface'
import { container } from 'tsyringe'

container.registerSingleton<DataBaseInterface<unknown>>('DataBaseService', MySQLImplementation)
