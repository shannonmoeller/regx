(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.regx = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.rx = rx;
function rx(flags) {
	var trailingComments = /\s+#.*$/gm;
	var surroundingWhitespace = /^\s+|\s+$/gm;
	var literalNewlines = /[\r\n]/g;

	return function (_ref) {
		for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			values[_key - 1] = arguments[_key];
		}

		var strings = _ref.raw;

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

		var compiledPattern = strings.reduce(toPattern, '').replace(trailingComments, '').replace(surroundingWhitespace, '').replace(literalNewlines, '');

		return new RegExp(compiledPattern, flags);
	};
}

},{}]},{},[1])(1)
});