// Local imports
import { extractProperties } from './extractProperties.js'





/**
 *
 * @param event
 */
export function objectifyExtensionBitsTransactionEvent(event) {
	return extractProperties(event, [
		'broadcasterDisplayName',
		'broadcasterId',
		'broadcasterName',
		'clientId',
		'id',
		'productCost',
		'productInDevelopment',
		'productName',
		'productSku',
		'userDisplayName',
		'userId',
		'userName',
	])
}
