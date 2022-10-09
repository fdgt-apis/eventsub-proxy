// Local imports
import { extractProperties } from './extractProperties.js'





/**
 *
 * @param event
 */
export function objectifyUserUpdateEvent(event) {
	return extractProperties(event, [
		'userDescription',
		'userDisplayName',
		'userEmail',
		'userEmailIsVerified',
		'userId',
		'userName',
	])
}
