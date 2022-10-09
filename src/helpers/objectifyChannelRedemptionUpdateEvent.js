// Local imports
import { extractProperties } from './extractProperties.js'





/**
 *
 * @param event
 */
export function objectifyChannelRedemptionUpdateEvent(event) {
	return extractProperties(event, [
		'broadcasterDisplayName',
		'broadcasterId',
		'broadcasterName',
		'id',
		'input',
		'redemptionDate',
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
