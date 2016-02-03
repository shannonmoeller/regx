import test from 'blue-tape';
import {rx} from '../src/regx';

test('should work', async assert => {
	// flags on partials are ignored
	const open = /\/\*\*/i;
	const close = /\*\//m;

	const expression = rx('gm')`
		# Match a non-recursive block comment
		(
			# Must be first thing on a line
			^[\t ]*
			${open} # Trailing comment
			(
				# Match any character including newlines (non-greedy)
				[\s\S]*?
			)
			${close}
		)
		# Grab trailing newlines and discard them
		[\r\n]*
	`;

	assert.same(expression, /(^[\t ]*\/\*\*([\s\S]*?)\*\/)[\r\n]*/gm);
});

if (process.browser) {
	test.onFinish(window.close);
}
