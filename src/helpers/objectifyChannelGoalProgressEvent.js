// Local imports
import { extractProperties } from './extractProperties.js'





/**
 *
 * @param event
 */
export function objectifyChannelGoalProgressEvent(event) {
	return extractProperties(event, [
		'broadcasterDisplayName',
		'broadcasterId',
		'broadcasterName',
		'currentAmount',
		'description',
		'id',
		'startDate',
		'targetAmount',
		'type',
	])
}
