import { Client } from 'pg'

export const postgresCreateDatabase = async (
  host: string,
  port: number,
  username: string,
  password: string,
  database: string
): Promise<void> => {
  const client = new Client({
    host,
    port,
    user: username,
    password,
    database: 'postgres',
  })

  await client.connect()
  const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [database])
  if (res.rowCount === 0) {
    await client.query(`CREATE DATABASE "${database}"`)
  }
  await client.end()
}
