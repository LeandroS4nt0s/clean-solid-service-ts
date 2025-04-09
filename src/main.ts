import 'reflect-metadata'
import '@infra/container'
import { Server } from '@presentation/http/Server'

export function main() {
  const server = new Server()
  server.initialize()
  server.start()
}

main()
