// Module imports
import {
	EventSubListener,
	ReverseProxyAdapter,
} from '@twurple/eventsub'
import { ApiClient } from '@twurple/api'
import { ClientCredentialsAuthProvider } from '@twurple/auth'





// Constants
const {
	EVENTSUB_HOSTNAME,
	EVENTSUB_SECRET,
	HTTP_PORT = 3001,
	TWITCH_CLIENT_ID,
	TWITCH_CLIENT_SECRET,
} = process.env





/**
 *
 */
export class TwitchClass {
	/****************************************************************************\
	 * Private instance properties
	\****************************************************************************/

	#apiClient = null

	#authProvider = null

	#eventListener = null

	#eventsubIsInitialised = false





	/****************************************************************************\
	 * Constructor
	\****************************************************************************/

	/**
	 * Creates a new Twitch manager.
	 */
	constructor() {
		this.#authProvider = new ClientCredentialsAuthProvider(
			TWITCH_CLIENT_ID,
			TWITCH_CLIENT_SECRET,
		)

		this.#apiClient = new ApiClient({
			authProvider: this.#authProvider,
		})
	}





	/****************************************************************************\
	 * Public instance methods
	\****************************************************************************/

	/**
	 * Uses a username or ID to get a user from the Twitch API.
	 *
	 * @param {string} usernameOrID The username or ID to be retrieved.
	 */
	async getUser(usernameOrID) {
		let user = await this.#apiClient.users.getUserByName(usernameOrID.toLowerCase())

		if (!user) {
			user = await this.#apiClient.users.getUserById(usernameOrID)
		}

		return user
	}

	/**
	 * Initialises an Eventsub listener.
	 */
	async initialiseEventsub() {
		if (this.#eventsubIsInitialised) {
			return
		}

		this.#eventListener = new EventSubListener({
			apiClient: this.#apiClient,
			adapter: new ReverseProxyAdapter({
				hostName: EVENTSUB_HOSTNAME,
				port: HTTP_PORT,
			}),
			secret: EVENTSUB_SECRET,
		})

		await this.#eventListener.listen()

		this.#eventsubIsInitialised = true
	}

	/**
	 * @typedef {'channel.ban' | 'channel.cheer' | 'channel.channel_points_custom_reward.add' | 'channel.channel_points_custom_reward.update' | 'channel.channel_points_custom_reward.remove' | 'channel.channel_points_custom_reward_redemption.add' | 'channel.channel_points_custom_reward_redemption.update' | 'channel.charity_campaign.donate' | 'channel.follow' | 'channel.goal.begin' | 'channel.goal.end' | 'channel.goal.progress' | 'channel.hype_train.begin' | 'channel.hype_train.end' | 'channel.hype_train.progress' | 'channel.moderator.add' | 'channel.moderator.remove' | 'channel.poll.begin' | 'channel.poll.end' | 'channel.poll.progress' | 'channel.prediction.begin' | 'channel.prediction.end' | 'channel.prediction.lock' | 'channel.prediction.progress' | 'channel.raid' | 'channel.subscribe' | 'channel.subscription.end' | 'channel.subscription.gift' | 'channel.subscription.message' | 'channel.unban' | 'channel.update' | 'drop.entitlement.grant' | 'extension.bits_transaction.create' | 'stream.offline' | 'stream.online' | 'user.authorization.grant' | 'user.authorization.revoke' | 'user.update'} EventsubEventName
	 */

	/**
	 * Subscribes to a particular Eventsub event.
	 *
	 * @param {object} options All options.
	 * @param {EventsubEventName} options.event The type of eent to listen for.
	 * @param {Function} options.handler A function to be invoked when the event is fired.
	 * @param {boolean} options.isRaider Whether or not the selected user is the raider or the raidee.
	 * @param {string} options.rewardID The reward ID for channel point redemptions.
	 * @param {string} options.user The user to which the channel for this subscription belongs.
	 * @returns {Function} A method for unsubscribing the Eventsub listener.
	 */
	subscribe(options) {
		const {
			event,
			handler,
			isRaider,
			rewardID,
			user,
		} = options

		const eventListenerArgs = [user.id]

		let handlerMethodName = null
		let isUnsupported = false

		switch (event) {
			case 'channel.ban':
				handlerMethodName = 'subscribeToChannelBanEvents'
				break

			case 'channel.cheer':
				handlerMethodName = 'subscribeToChannelCheerEvents'
				break

			case 'channel.channel_points_custom_reward.add':
				handlerMethodName = 'subscribeToChannelRewardAddEvents'
				break

			case 'channel.channel_points_custom_reward.update':
				handlerMethodName = 'subscribeToChannelRewardUpdateEvents'

				if (rewardID) {
					handlerMethodName += 'ForReward'
					eventListenerArgs.push(rewardID)
				}
				break

			case 'channel.channel_points_custom_reward.remove':
				handlerMethodName = 'subscribeToChannelRewardRemoveEvents'

				if (rewardID) {
					handlerMethodName += 'ForReward'
					eventListenerArgs.push(rewardID)
				}
				break

			case 'channel.channel_points_custom_reward_redemption.add':
				handlerMethodName = 'subscribeToChannelRedemptionAddEvents'

				if (rewardID) {
					handlerMethodName += 'ForReward'
					eventListenerArgs.push(rewardID)
				}
				break

			case 'channel.channel_points_custom_reward_redemption.update':
				handlerMethodName = 'subscribeToChannelRedemptionUpdateEvents'

				if (rewardID) {
					handlerMethodName += 'ForReward'
					eventListenerArgs.push(rewardID)
				}
				break

			case 'channel.charity_campaign.donate':
				isUnsupported = true
				console.log('charity donation events not yet supported by Twurple. 😔')
				// handlerMethodName = 'subscribeToChannelCharityCampaignDonateEvents'
				break

			case 'channel.follow':
				handlerMethodName = 'subscribeToChannelFollowEvents'
				break

			case 'channel.goal.begin':
				handlerMethodName = 'subscribeToChannelGoalBeginEvents'
				break

			case 'channel.goal.end':
				handlerMethodName = 'subscribeToChannelGoalEndEvents'
				break

			case 'channel.goal.progress':
				handlerMethodName = 'subscribeToChannelGoalProgressEvents'
				break

			case 'channel.hype_train.begin':
				handlerMethodName = 'subscribeToChannelHypeTrainBeginEvents'
				break

			case 'channel.hype_train.end':
				handlerMethodName = 'subscribeToChannelHypeTrainEndEvents'
				break

			case 'channel.hype_train.progress':
				handlerMethodName = 'subscribeToChannelHypeTrainProgressEvents'
				break

			case 'channel.moderator.add':
				handlerMethodName = 'subscribeToChannelModeratorAddEvents'
				break

			case 'channel.moderator.remove':
				handlerMethodName = 'subscribeToChannelModeratorRemoveEvents'
				break

			case 'channel.poll.begin':
				handlerMethodName = 'subscribeToChannelPollBeginEvents'
				break

			case 'channel.poll.end':
				handlerMethodName = 'subscribeToChannelPollEndEvents'
				break

			case 'channel.poll.progress':
				handlerMethodName = 'subscribeToChannelPollProgressEvents'
				break

			case 'channel.prediction.begin':
				handlerMethodName = 'subscribeToChannelPredictionBeginEvents'
				break

			case 'channel.prediction.end':
				handlerMethodName = 'subscribeToChannelPredictionEndEvents'
				break

			case 'channel.prediction.lock':
				handlerMethodName = 'subscribeToChannelPredictionLockEvents'
				break

			case 'channel.prediction.progress':
				handlerMethodName = 'subscribeToChannelPredictionProgressEvents'
				break

			case 'channel.raid':
				handlerMethodName = 'subscribeToChannelRaidEvents'

				if (isRaider) {
					handlerMethodName += 'From'
				} else {
					handlerMethodName += 'To'
				}
				break

			case 'channel.subscribe':
				handlerMethodName = 'subscribeToChannelSubscriptionEvents'
				break

			case 'channel.subscription.end':
				handlerMethodName = 'subscribeToChannelSubscriptionEndEvents'
				break

			case 'channel.subscription.gift':
				handlerMethodName = 'subscribeToChannelSubscriptionGiftEvents'
				break

			case 'channel.subscription.message':
				handlerMethodName = 'subscribeToChannelSubscriptionMessageEvents'
				break

			case 'channel.unban':
				handlerMethodName = 'subscribeToChannelUnbanEvents'
				break

			case 'channel.update':
				handlerMethodName = 'subscribeToChannelUpdateEvents'
				break

			case 'drop.entitlement.grant':
				isUnsupported = true
				console.log('drop entitlement grant events not yet supported by Twurple. 😔')
				// handlerMethodName = 'subscribeToDropEntitlementGrantEvents'
				break

			case 'extension.bits_transaction.create':
				handlerMethodName = 'subscribeToExtensionBitsTransactionCreateEvents'
				break

			case 'stream.offline':
				handlerMethodName = 'subscribeToStreamOfflineEvents'
				break

			case 'stream.online':
				handlerMethodName = 'subscribeToStreamOnlineEvents'
				break

			case 'user.authorization.grant':
				handlerMethodName = 'subscribeToUserAuthorizationGrantEvents'
				break

			case 'user.authorization.revoke':
				handlerMethodName = 'subscribeToUserAuthorizationRevokeEvents'
				break

			case 'user.update':
				handlerMethodName = 'subscribeToUserUpdateEvents'
				break

			default:
				isUnsupported = true
				break
		}

		if (isUnsupported) {
			throw new Error(`The ${event} event is currently unsupported.`)
		}

		return this.#eventListener[handlerMethodName](...eventListenerArgs, handler)
	}





	/****************************************************************************\
	 * Public instance getters/setters
	\****************************************************************************/

	/**
	 * @returns {boolean} Whether or not the Eventsub listener has been initialised.
	 */
	get eventsubIsInitialised() {
		return this.#eventsubIsInitialised
	}
}

export const Twitch = new TwitchClass
