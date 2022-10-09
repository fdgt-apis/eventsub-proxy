// Local imports
import { extractProperties } from './extractProperties.js'





/**
 *
 * @param event
 */
export function objectifyChannelGoalEndEvent(event) {
	return extractProperties(event, [
		'broadcasterDisplayName',
		'broadcasterId',
		'broadcasterName',
		'currentAmount',
		'description',
		'endDate',
		'id',
		'isAchieved',
		'startDate',
		'targetAmount',
		'type',
	])
}
