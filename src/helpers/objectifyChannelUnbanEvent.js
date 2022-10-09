// Local imports
import { extractProperties } from './extractProperties.js'





/**
 *
 * @param event
 */
export function objectifyChannelUnbanEvent(event) {
	return extractProperties(event, [
		'broadcasterDisplayName',
		'broadcasterId',
		'broadcasterName',
		'moderatorDisplayName',
		'moderatorId',
		'moderatorName',
		'userDisplayName',
		'userId',
		'userName',
	])
}
