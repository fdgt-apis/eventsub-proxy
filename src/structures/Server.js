import 'dotenv/config'

// Module imports
import { createServer } from 'node:http'
import Koa from 'koa'
import KoaRouter from 'koa-router'
import { WebSocketServer } from 'ws'





// Local imports
import { API } from './API.js'
import { Connection } from './Connection.js'
import { Twitch } from './Twitch.js'





// Local constants
const { PORT } = process.env





export class Server {
	/****************************************************************************\
	 * Private instance properties
	\****************************************************************************/

	#api = null

	#httpServer = null

	#websocketServer = null





	/****************************************************************************\
	 * Public instance methods
	\****************************************************************************/

	constructor() {
		this.#api = new API

		this.#api.initialiseMiddleware()

		Twitch.eventsubMiddleware.apply({
			get: (path, handler) => {
				this.#api.router.get(path, (context, next) => {
					return handler()(context.req, context.res, next)
				})
			},
			post: (path, handler) => {
				this.#api.router.post(path, (context, next) => {
					context.req.params = context.params
					return handler(context.req, context.res, next)
				})
			},
		})

		this.#api.router.get('/status', context => (context.status = 204))

		this.#api.initialiseRouter()

		// Create the Websocket server
		this.#websocketServer = new WebSocketServer({ noServer: true })

		// Create the HTTP server, using Koa as the request handler
		this.#httpServer = createServer(this.#api.callback())

		// Proxy connections from the HTTP server to the websocket server
		this.#httpServer.on('upgrade', (...args) => this.handleUpgrade(...args))

		// Handle new connections on the websocket server
		this.#websocketServer.on('connection', (...args) => new Connection(...args))

		// Start handling Eventsub requests
		Twitch.eventsubMiddleware.markAsReady()
	}

	async handleUpgrade(request, socket, head) {
		try {
			this.websocketServer.handleUpgrade(request, socket, head, (ws) => {
				this.websocketServer.emit('connection', ws, request)
			})
		} catch(err) {
			// Socket uprade failed
			// Close socket and clean
			console.log('Socket upgrade failed', err)
			socket.destroy()
		}
	}

	start() {
		this.#httpServer.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`))
	}

	/****************************************************************************\
	 * Public instance getters/setters
	\****************************************************************************/

	get websocketServer() {
		return this.#websocketServer
	}
}
