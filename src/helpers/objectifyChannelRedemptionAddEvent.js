// Local imports
import { extractProperties } from './extractProperties.js'





/**
 *
 * @param event
 */
export function objectifyChannelRedemptionAddEvent(event) {
	return extractProperties(event, [
		'broadcasterDisplayName',
		'broadcasterId',
		'broadcasterName',
		'id',
		'input',
		'redeemedAt',
		'rewardCost',
		'rewardId',
		'rewardPrompt',
		'rewardTitle',
		'status',
		'userDisplayName',
		'userId',
		'userName',
	])
}
