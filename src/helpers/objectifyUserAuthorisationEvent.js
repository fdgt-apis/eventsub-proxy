// Local imports
import { extractProperties } from './extractProperties.js'





/**
 *
 * @param event
 */
export function objectifyUserAuthorisationEvent(event) {
	return extractProperties(event, [
		'clientId',
		'userDisplayName',
		'userId',
		'userName',
	])
}
