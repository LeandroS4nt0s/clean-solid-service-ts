export type DatabaseTypes = 'mysql' | 'postgres'

export type DatabaseConfig = {
  client: DatabaseTypes
  url: string
  connection: {
    type: DatabaseTypes
    host: string
    port: number
    username: string
    password: string
    database: string
  }
}

export interface DataBaseInterface<INSTANCE> {
  start(): Promise<void>
  getInstance(): INSTANCE
  stop(): Promise<void>
}
