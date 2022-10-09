/**
 * Extracts properties from an object into a new object. Useful for objects with ephemeral properties that need to be included in JSON.
 *
 * @param {object} item The item from which to extract properties.
 * @param {string[]} propertiesToExtract An array of properties to be extracted.
 * @returns {object} The new object with all extracted properties.
 */
export function extractProperties(item, propertiesToExtract) {
	// eslint-disable-next-line jsdoc/require-jsdoc
	function reducer(accumulator, property) {
		accumulator[property] = item[property]
		return accumulator
	}

	return propertiesToExtract.reduce(reducer, {})
}
