const RX_COMMENTS_TRAILING = /\s+\/\/.*$/gm;
const RX_WHITESPACE_SURROUNDING = /^\s+|\s+$/gm;
const RX_LINES_NEW = /[\r\n]/g;

export default function regx(flags) {
	return (strings, ...values) => {
		function toPattern(pattern, rawString, i) {
			let value = values[i];

			if (value === null || value === undefined) {
				return pattern + rawString;
			}

			if (value instanceof RegExp) {
				value = value.source;
			}

			return pattern + rawString + value;
		}

		const compiledPattern = strings.raw
			.reduce(toPattern, '')
			.replace(RX_COMMENTS_TRAILING, '')
			.replace(RX_WHITESPACE_SURROUNDING, '')
			.replace(RX_LINES_NEW, '');

		return new RegExp(compiledPattern, flags);
	};
}
