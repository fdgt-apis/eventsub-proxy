// Local imports
import { extractProperties } from './extractProperties.js'





/**
 *
 * @param event
 */
export function objectifyChannelCheerEvent(event) {
	return extractProperties(event, [
		'bits',
		'broadcasterDisplayName',
		'broadcasterId',
		'broadcasterName',
		'isAnonymous',
		'message',
		'userDisplayName',
		'userId',
		'userName',
	])
}
