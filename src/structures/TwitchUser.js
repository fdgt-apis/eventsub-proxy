// Local imports
import { Twitch } from './Twitch.js'





/**
 * A collection and cache of Twitch users.
 */
export class TwitchUser {
	/****************************************************************************\
	 * Private static properties
	\****************************************************************************/

	static twitchUsersByID = {}

	static twitchUsersByUsername = {}





	/****************************************************************************\
	 * Public static methods
	\****************************************************************************/

	/**
	 * Converts a Twitch username or ID into a TwitchUser.
	 *
	 * @param {string} usernameOrID The username or ID to be converted.
	 */
	static async getUser(usernameOrID) {
		let user = TwitchUser.twitchUsersByID[usernameOrID]

		if (!user) {
			user = TwitchUser.twitchUsersByUsername[usernameOrID]
		}

		if (!user) {
			const twitchUserData = await Twitch.getUser(usernameOrID)

			if (twitchUserData) {
				user = new TwitchUser(twitchUserData)
			}
		}

		return user
	}





	/****************************************************************************\
	 * Private instance properties
	\****************************************************************************/

	#user = null





	/****************************************************************************\
	 * Constructor
	\****************************************************************************/

	/**
	 * @param {object} user The underlying data for this user.
	 */
	constructor(user) {
		this.#user = user
		TwitchUser.twitchUsersByID[this.id] = this
		TwitchUser.twitchUsersByUsername[this.username] = this
	}





	/****************************************************************************\
	 * Public instance getters/setters
	\****************************************************************************/

	/**
	 * @returns {string} The display name of the user.
	 */
	get displayName() {
		return this.user.displayName
	}

	/**
	 * @returns {string} The ID of the user.
	 */
	get id() {
		return this.user.id
	}

	/**
	 * @returns {string} The complete user object.
	 */
	get user() {
		return this.#user
	}

	/**
	 * @returns {string} The username of the user.
	 */
	get username() {
		return this.user.name
	}
}
