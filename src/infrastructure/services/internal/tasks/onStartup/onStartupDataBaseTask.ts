import { DataBaseInterface } from '@infra/database/interface/DatabaseInterface'
import { container } from 'tsyringe'
import { DataSource } from 'typeorm'

export async function onStartupDataBaseTask() {
  const DataBaseService = container.resolve<DataBaseInterface<DataSource>>('DataBaseService')
  await DataBaseService.start()
}
