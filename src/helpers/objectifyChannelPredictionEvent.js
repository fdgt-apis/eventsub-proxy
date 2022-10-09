// Local imports
import { extractProperties } from './extractProperties.js'





/**
 *
 * @param event
 */
export function objectifyChannelPredictionEvent(event) {
	return extractProperties(event, [
		'broadcasterDisplayName',
		'broadcasterId',
		'broadcasterName',
		'id',
		'endDate',
		'lockDate',
		'outcomes',
		'startDate',
		'status',
		'title',
		'winningOutcome',
		'winningOutcomeId',
	])
}
