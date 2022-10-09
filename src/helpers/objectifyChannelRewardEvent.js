// Local imports
import { extractProperties } from './extractProperties.js'





/**
 *
 * @param event
 */
export function objectifyChannelRewardEvent(event) {
	return extractProperties(event, [
		'autoApproved',
		'backgroundColor',
		'broadcasterDisplayName',
		'broadcasterId',
		'broadcasterName',
		'cooldownExpiryDate',
		'cost',
		'globalCooldown',
		'id',
		'isEnabled',
		'isInStock',
		'isPaused',
		'maxRedemptionsPerStream',
		'maxRedemptionsPerUserPerStream',
		'prompt',
		'redemptionsThisStream',
		'title',
		'userInputRequired',
	])
}
