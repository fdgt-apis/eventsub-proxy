// Local imports
import { extractProperties } from './extractProperties.js'





/**
 *
 * @param event
 */
export function objectifyChannelRaidEvent(event) {
	return extractProperties(event, [
		'raidedBroadcasterDisplayName',
		'raidedBroadcasterId',
		'raidedBroadcasterName',
		'raidingBroadcasterDisplayName',
		'raidingBroadcasterId',
		'raidingBroadcasterName',
		'viewers',
	])
}
