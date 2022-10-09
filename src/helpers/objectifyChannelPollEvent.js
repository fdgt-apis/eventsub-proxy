// Local imports
import { extractProperties } from './extractProperties.js'





/**
 *
 * @param event
 */
export function objectifyChannelPollEvent(event) {
	return extractProperties(event, [
		'bitsPerVote',
		'broadcasterDisplayName',
		'broadcasterId',
		'broadcasterName',
		'channelPointsPerVote',
		'choices',
		'endDate',
		'id',
		'isBitsVotingEnabled',
		'isChannelPointsVotingEnabled',
		'startDate',
		'status',
		'title',
	])
}
