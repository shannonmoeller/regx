# `regx`

[![NPM version][npm-img]][npm-url] [![Downloads][downloads-img]][npm-url] [![Tip][amazon-img]][amazon-url]

Tagged template string [regular expression][guide] compiler. Supports multiline expressions, partials, and embedded comments.

## Install

    $ npm install --save regx

## Example

```js
import regx from 'regx';

// RegExp partial to match opening block comment (flags ignored)
const openPartial = /\/\*\*/i;

// String partial to match closing block comment (extra escaping required)
const closePartial = '\\*\\/';

// Time to write a human-readable expression
const expression = regx('gm')`
    // Match a non-recursive block comment
    (
        // Must be first thing on a line
        ^[\t ]*

        ${openPartial} // Block opener

        // Capture content independently
        (
            // Match any character including newlines (non-greedy)
            [\s\S]*?
        )

        ${closePartial} // Block closer
    )

    // Grab trailing newlines and discard them
    [\r\n]*
`;

// The result is the same as if you had written the following
const expression = /(^[\t ]*\/\*\*([\s\S]*?)\*\/)[\r\n]*/gm;
```

## API

### `regx([flags]) : regxTagFunction`

Creates a template-string tag function. Optionally accepts RegExp [flags][flags].

```js
const a = regx('gm')`
    ^  // start of line
    a+ // one or more 'a' characters
    $  // end of line
`; // result: /^a$/gm
```

### `regxTagFunction(strings, ...values) : String`

The functions returned by `regx()` may be cached and reused.

```js
const rxgm = regx('gm');

const a = rxgm`
    ^  // start of line
    a+ // one or more 'a' characters
    $  // end of line
`; // result: /^a$/gm

const b = rxgm`
    ^  // start of line
    b+ // one or more 'a' characters
    $  // end of line
`; // result: /^b$/gm
```

All whitespace at the beginning and end of lines is ignored. To match literal whitespace at the beginning or end of a line you must use a character set.

```js
const rxgm = regx('i');

const spaceBefore = rxgm`
    [ ]foo
`; // result: /[ ]foo/i

const spaceAfter = rxgm`
    foo[ ]
`; // result: /foo[ ]/i
```

----

© 2016 Shannon Moeller <me@shannonmoeller.com>

Licensed under [MIT](http://shannonmoeller.com/mit.txt)

[guide]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[flags]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Advanced_searching_with_flags

[amazon-img]:    https://img.shields.io/badge/amazon-tip_jar-yellow.svg?style=flat-square
[amazon-url]:    https://www.amazon.com/gp/registry/wishlist/1VQM9ID04YPC5?sort=universal-price
[downloads-img]: http://img.shields.io/npm/dm/regx.svg?style=flat-square
[npm-img]:       http://img.shields.io/npm/v/regx.svg?style=flat-square
[npm-url]:       https://npmjs.org/package/regx
