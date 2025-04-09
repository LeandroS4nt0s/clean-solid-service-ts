import { DataSource } from 'typeorm'

export const mysqlCreateDatabase = async (
  host: string,
  port: number,
  username: string,
  password: string,
  database: string
): Promise<void> => {
  const tempConnection = new DataSource({
    type: 'mysql',
    host,
    port,
    username,
    password,
    database: 'mysql',
  })

  await tempConnection.initialize()
  await tempConnection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`)
  await tempConnection.destroy()
}
