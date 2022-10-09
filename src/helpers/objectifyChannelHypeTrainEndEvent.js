// Local imports
import { extractProperties } from './extractProperties.js'





/**
 *
 * @param event
 */
export function objectifyChannelHypeTrainEndEvent(event) {
	return extractProperties(event, [
		'broadcasterDisplayName',
		'broadcasterId',
		'broadcasterName',
		'cooldownEndDate',
		'endDate',
		'id',
		'level',
		'startDate',
		'topContributors',
		'total',
	])
}
