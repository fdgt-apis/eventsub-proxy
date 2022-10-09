// Local imports
import { Connection } from '../structures/Connection.js'
import { Subscription } from '../structures/Subscription.js'





/**
 * Cleans up all Eventsub listeners and websocket connections before shutting down.
 *
 * @param {number} code The exit code of the process.
 */
export function cleanup(code = 0) {
	const allConnections = Object.values(Connection.collection)
	const allSubscriptions = Object.values(Subscription.collection)

	allSubscriptions.forEach(subscription => subscription.unsubscribe())
	allConnections.forEach(connection => connection.close('system shutting down'))

	process.exit(code)
}
