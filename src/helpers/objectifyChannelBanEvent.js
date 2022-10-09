// Local imports
import { extractProperties } from './extractProperties.js'





/**
 *
 * @param event
 */
export function objectifyChannelBanEvent(event) {
	return extractProperties(event, [
		'broadcasterDisplayName',
		'broadcasterId',
		'broadcasterName',
		'endDate',
		'isPermanent',
		'moderatorDisplayName',
		'moderatorId',
		'moderatorName',
		'reason',
		'startDate',
		'userDisplayName',
		'userId',
		'userName',
	])
}
