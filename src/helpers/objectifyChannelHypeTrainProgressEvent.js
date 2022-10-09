// Local imports
import { extractProperties } from './extractProperties.js'





/**
 *
 * @param event
 */
export function objectifyChannelHypeTrainProgressEvent(event) {
	return extractProperties(event, [
		'broadcasterDisplayName',
		'broadcasterId',
		'broadcasterName',
		'expiryDate',
		'goal',
		'id',
		'lastContribution',
		'level',
		'progress',
		'startDate',
		'topContributors',
		'total',
	])
}
