import { DataBaseInterface } from '@infra/database/interface/DatabaseInterface'
import { container } from 'tsyringe'
import { DataSource } from 'typeorm'

export async function onShutdownDataBaseTask() {
  const DataBaseService = container.resolve<DataBaseInterface<DataSource>>('DataBaseService')
  await DataBaseService.stop()
}
