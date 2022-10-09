// Local imports
import { extractProperties } from './extractProperties.js'





/**
 *
 * @param event
 */
export function objectifyChannelSubscriptionEvent(event) {
	return extractProperties(event, [
		'broadcasterDisplayName',
		'broadcasterId',
		'broadcasterName',
		'cumulativeMonths',
		'durationMonths',
		'isGift',
		'messageText',
		'streakMonths',
		'tier',
		'userDisplayName',
		'userId',
		'userName',
	])
}
