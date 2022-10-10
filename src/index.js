import 'dotenv/config'





// Local imports
import { cleanup } from './helpers/cleanup.js'
import { Server } from './structures/Server.js'





process.on('exit', cleanup)
process.on('SIGINT', cleanup)
process.on('SIGTERM', cleanup)
process.on('uncaughtException', (...args) => console.log(...args))

const server = new Server

server.start()
