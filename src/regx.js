export function rx(flags) {
	const trailingComments = /\s+#.*$/gm;
	const surroundingWhitespace = /^\s+|\s+$/gm;
	const literalNewlines = /[\r\n]/g;

	return ({raw: strings}, ...values) => {
		function toPattern(pattern, rawString, i) {
			var value = values[i];

			if (value == null) {
				return pattern + rawString;
			}

			if (value instanceof RegExp) {
				value = value.source;
			}

			return pattern + rawString + value;
		}

		const compiledPattern = strings
			.reduce(toPattern, '')
			.replace(trailingComments, '')
			.replace(surroundingWhitespace, '')
			.replace(literalNewlines, '');

		return new RegExp(compiledPattern, flags);
	};
}
