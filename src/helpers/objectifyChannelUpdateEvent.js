// Local imports
import { extractProperties } from './extractProperties.js'





/**
 *
 * @param event
 */
export function objectifyChannelUpdateEvent(event) {
	return extractProperties(event, [
		'broadcasterDisplayName',
		'broadcasterId',
		'broadcasterName',
		'categoryId',
		'categoryName',
		'isMature',
		'streamLanguage',
		'streamTitle',
	])
}
