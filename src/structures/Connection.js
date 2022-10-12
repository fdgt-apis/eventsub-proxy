// Module imports
import { v4 as uuid } from 'uuid'





// Local imports
import { Subscription } from './Subscription.js'





/**
 *
 */
export class Connection {
	/****************************************************************************\
	 * Public static properties
	\****************************************************************************/

	static collection = {}





	/****************************************************************************\
	 * Private instance properties
	\****************************************************************************/

	#closeTimeoutID = null

	#id = uuid()

	#isAlive = true

	#options = null

	#pingIntervalID = null

	#subscriptionsByChannel = {}

	#subscriptionsByEvent = {}

	#subscriptionsByID = {}





	/****************************************************************************\
	 * Constructor
	\****************************************************************************/

	/**
	 *
	 * @param socket
	 * @param request
	 */
	constructor(socket, request) {
		this.options = {
			request,
			socket,
		}

		Connection.collection[this.id] = this

		console.log(`Established connection ${this.id} from ${request.headers.host}`)

		this.socket.on('message', message => this.#handleMessage(message))

		this.#startPing()
	}





	/****************************************************************************\
	 * Private instance methods
	\****************************************************************************/

	/**
	 *
	 * @param message
	 */
	#handleMessage(message) {
		let parsedMessage = null

		try {
			parsedMessage = JSON.parse(message.toString('utf8'))
		} catch (error) {
			return this.send({
				status: 'error',
				data: {
					message: 'Invalid JSON.',
				},
				meta: {
					originalPayload: message,
				},
			})
		}

		console.log(`Received message from ${this.id}:`, parsedMessage)

		const handlerMethodName = `handle${parsedMessage.action}`

		if (typeof this[handlerMethodName] === 'undefined') {
			return console.log(`Received unrecognised action (${parsedMessage.action}) from connection ${this.id}:`, parsedMessage)
		}

		this[handlerMethodName](parsedMessage)
	}

	/**
	 *
	 */
	#ping() {
		console.log(`Pinging connection ${this.id}`)

		this.send({ action: 'PING' })

		this.#closeTimeoutID = setTimeout(() => this.close('missing heartbeat'), process.env.CONNECTION_PING_RESPONSE_TIMEOUT)
	}

	/**
	 *
	 * @param subscription
	 */
	#removeSubscription(subscription) {
		subscription.unsubscribe()
		delete this.#subscriptionsByChannel[subscription.channel][subscription.event]
		delete this.#subscriptionsByEvent[subscription.event][subscription.channel]
		delete this.#subscriptionsByID[subscription.id]
	}

	/**
	 *
	 */
	#startPing() {
		this.#pingIntervalID = setInterval(() => this.#ping(), process.env.CONNECTION_PING_FREQUENCY)
	}





	/****************************************************************************\
	 * Public instance methods
	\****************************************************************************/

	/**
	 *
	 * @param reason
	 */
	close(reason = 'unknown') {
		console.log(`Closing connection ${this.id}. Reason: ${reason}`)
		delete Connection.collection[this.id]
		clearTimeout(this.#pingIntervalID)
		this.socket.terminate()

		Object
			.values(this.subscriptions)
			.forEach(subscription => {
				subscription.unsubscribe()
				delete this.subscriptions[subscription.id]
			})
	}

	/**
	 *
	 * @param message
	 */
	handlePING(message) {
		const response = {
			action: 'PONG',
		}

		if (message.data) {
			response.data = message.data
		}

		this.send(response)
	}

	/**
	 *
	 */
	handlePONG() {
		clearTimeout(this.#closeTimeoutID)
	}

	/**
	 *
	 * @param message
	 */
	async handleSUBSCRIBE(message) {
		const subscription = new Subscription({
			connection: this,
			message,
		})

		await subscription.initialise()

		if (subscription.isActive) {
			// Track subscriptions by ID
			this.#subscriptionsByID[subscription.id] = subscription

			// Track subscriptions by channel
			if (!this.#subscriptionsByChannel[subscription.channel]) {
				this.#subscriptionsByChannel[subscription.channel] = {}
			}

			this.#subscriptionsByChannel[subscription.channel][subscription.event] = subscription

			// Track subscriptions by event type
			if (!this.#subscriptionsByEvent[subscription.event]) {
				this.#subscriptionsByEvent[subscription.event] = {}
			}

			this.#subscriptionsByEvent[subscription.event][subscription.channel] = subscription
		}
	}

	/**
	 *
	 * @param message
	 */
	handleUNSUBSCRIBE(message = {}) {
		let subscriptions = []
		let unsubscribes = 0

		if (message.channel && message.event) {
			// Unsubscribe from a specific event in a specific channel
			subscriptions.push(this.#subscriptionsByChannel[message.channel]?.[message.event])
		} else if (message.channel && !message.event) {
			// Unsubscribe from all events in a specific channel
			subscriptions = Object.values(this.#subscriptionsByChannel[message.channel])
		} else if (!message.channel && message.event) {
			// Unsubscribe from an events in all channels
			subscriptions = Object.values(this.#subscriptionsByEvent[message.event])
		} else if (!message.channel && !message.event) {
			// Unsubscribe from all events in all channels
			subscriptions = Object.values(this.#subscriptionsByID)
		}

		if (subscriptions) {
			subscriptions.forEach(subscription => {
				if (subscription) {
					this.#removeSubscription(subscription)
					unsubscribes += 1
				}
			})
		}

		this.send({
			action: message.action,
			data: {
				totalEventsUnsubscribed: unsubscribes,
			},
		})
	}

	/**
	 *
	 * @param data
	 */
	send(data) {
		const fullMessage = {
			...data,
			status: data.status ?? 'success',
			meta: {
				...(data.meta || {}),
				sentAt: Date.now(),
			},
		}
		const stringifiedData = JSON.stringify(fullMessage)

		console.log(`Sending message to connection ${this.id}:`, fullMessage)

		this.socket.send(stringifiedData)
	}





	/****************************************************************************\
	 * Public instance getters/setters
	\****************************************************************************/

	/**
	 *
	 */
	get id() {
		return this.#id
	}

	/**
	 *
	 */
	get isAlive() {
		return this.#isAlive
	}

	/**
	 *
	 */
	get options() {
		return this.#options
	}

	/**
	 *
	 */
	set options(value) {
		if (!this.#options) {
			this.#options = value
		} else {
			throw new Error('Options have already been set for this connection.')
		}
	}

	/**
	 *
	 */
	get socket() {
		return this.#options.socket
	}

	/**
	 *
	 */
	get subscriptions() {
		return Object.values(this.#subscriptionsByID)
	}
}
