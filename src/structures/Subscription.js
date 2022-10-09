// Module imports
import { v4 as uuid } from 'uuid'





// Local imports
import { OBJECTIFIERS } from '../helpers/objectifiers.js'
import { Twitch } from './Twitch.js'
import { TwitchUser } from './TwitchUser.js'





/**
 *
 */
export class Subscription {
	/****************************************************************************\
	 * Public static properties
	\****************************************************************************/

	static collection = {}





	/****************************************************************************\
	 * Private instance properties
	\****************************************************************************/

	#id = uuid()

	#isActive = false

	#listener = null

	#options = null

	#user = null





	/****************************************************************************\
	 * Constructor
	\****************************************************************************/

	/**
	 *
	 * @param options
	 */
	constructor(options) {
		this.#options = options

		Subscription.collection[this.id] = this
	}





	/****************************************************************************\
	 * Private instance methods
	\****************************************************************************/

	/**
	 *
	 * @param event
	 */
	#handleEvent(event) {
		console.log(OBJECTIFIERS[this.event](event))

		this.connection.send({
			action: 'EVENT',
			event: this.event,
			data: OBJECTIFIERS[this.event](event),
		})
	}





	/****************************************************************************\
	 * Public instance methods
	\****************************************************************************/

	/**
	 *
	 */
	async initialise() {
		try {
			this.#user = await TwitchUser.getUser(this.channel)
		} catch (error) {
			return this.connection.send({
				action: this.message.action,
				status: 'error',
				data: {
					message: error.message,
				},
				meta: {
					originalPayload: this.message,
				},
			})
		}

		if (!this.user) {
			return this.connection.send({
				action: this.message.action,
				status: 'error',
				data: {
					message: `Failed to find a Twitch with either a username or an ID of ${this.channel}`,
				},
				meta: {
					originalPayload: this.message,
				},
			})
		}

		try {
			this.#listener = await Twitch.subscribe({
				...this.message,
				user: this.user,
				// eslint-disable-next-line jsdoc/require-jsdoc
				handler: (...args) => this.#handleEvent(...args),
			})

			this.#isActive = true

			console.log(`Connected listener for ${this.event} events on ${this.user.displayName}'s channel`)
		} catch (error) {
			this.connection.send({
				action: this.message.action,
				status: 'error',
				data: {
					message: error.message,
				},
				meta: {
					originalPayload: this.message,
				},
			})
		}
	}

	/**
	 *
	 */
	unsubscribe() {
		console.log(`Disconnected listener for ${this.event} events on ${this.user.displayName}'s channel`)
		this.#listener.stop()
		this.#isActive = false
		delete Subscription.collection[this.id]
	}





	/****************************************************************************\
	 * Public instance getters/setters
	\****************************************************************************/

	/**
	 *
	 */
	get channel() {
		return this.message.channel
	}

	/**
	 *
	 */
	get connection() {
		return this.options.connection
	}

	/**
	 *
	 */
	get event() {
		return this.message.event
	}

	/**
	 *
	 */
	get id() {
		return this.#id
	}

	/**
	 *
	 */
	get isActive() {
		return this.#isActive
	}

	/**
	 *
	 */
	get message() {
		return this.options.message
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
	get user() {
		return this.#user
	}
}
