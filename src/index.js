import 'dotenv/config'

// Module imports
import { WebSocketServer } from 'ws'





// Local imports
import { cleanup } from './helpers/cleanup.js'
import { Connection } from './structures/Connection.js'
import { Twitch } from './structures/Twitch.js'





// Local constants
const {
	WS_PORT = 3000,
} = process.env





process.on('exit', cleanup)
process.on('SIGINT', cleanup)
process.on('SIGTERM', cleanup)

const wsServer = new WebSocketServer({ port: WS_PORT })

Twitch.initialiseEventsub()
wsServer.on('connection', (...args) => new Connection(...args))

console.log('Server started.')
console.log(`Listening for WebSocket connections on port ${WS_PORT}.`)
