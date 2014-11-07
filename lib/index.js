/**
*
*	COMPUTE: find
*
*
*	DESCRIPTION:
*		- Finds array elements which satisfy a test condition.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

// MODULES //

var isObject = require( 'validate.io-object' ),
	isInteger = require( 'validate.io-integer' );


// FIND //

/**
* FUNCTION: find( arr, [opts,], clbk )
*	Finds array elements which satisfy a test condition.
*
* @param {Array} arr - array from which elements will be tested
* @param {Object} [opts] - function options
* @param {Number} [opts.k] - limits the number of returned elements (default: `*`)
* @param {String} [opts.returns] - if `values`, values are returned; if `indices`, indices are returned; if `*`, both indices and values are returned (default: `indices`)
* @param {Function} clbk - function invoked for each array element. If the return value is truthy, the value is considered to have satisfied the test condition.
* @returns {Array} array of indices, element values, or arrays of index-value pairs
*/
function find( arr, opts, clbk ) {
	var returns = [ 'values', 'indices', '*' ],
		mode = 0,
		ret,
		len,
		k,
		v,
		i,
		count,
		out;

	if ( !Array.isArray( arr ) ) {
		throw new TypeError( 'find()::invalid input argument. Must provide an array.' );
	}
	len = arr.length;
	if ( arguments.length < 3 ) {
		clbk = opts;
		opts = {};
	}
	if ( typeof clbk !== 'function' ) {
		throw new TypeError( 'find()::invalid input argument. Callback argument must be a function.' );
	}
	if ( !isObject( opts ) ) {
		throw new TypeError( 'find()::invalid input argument. Options must be an object.' );
	}
	if ( opts.hasOwnProperty( 'k' ) ) {
		k = opts.k;
		if ( typeof k !== 'number' || k !== k || !isInteger( k ) ) {
			throw new TypeError( 'find()::invalid input argument. `k` must be an integer.' );
		}
	} else {
		k = len;
	}
	if ( opts.hasOwnProperty( 'returns' ) ) {
		ret = opts.returns;
		if ( typeof ret !== 'string' || returns.indexOf( ret ) === -1 ) {
			throw new TypeError( 'find()::invalid input argument. `returns` option must be a string and have one of the following values: `values`, `indices`, `all`.' );
		}
		if ( ret === 'values' ) {
			mode = 1;
		} else if ( ret === '*' ) {
			mode = 2;
		}
	}
	out = [];
	count = 0;

	if ( k === 0 ) {
		return out;
	}
	if ( k > 0 ) {
		// Search moving from begin-to-end [0,1,...]:
		for ( i = 0; i < len; i++ ) {
			v = arr[ i ];
			if ( clbk( v, i, arr ) ) {
				if ( mode === 2 ) {
					out.push( [ i, v ] );
				} else if ( mode === 1 ) {
					out.push( v );
				} else {
					out.push( i );
				}
				if ( ++count === k ) {
					break;
				}
			}
		}
		return out;
	}
	// Search moving from end-to-begin [...,2,1,0]:
	k = -k;
	for ( i = len-1; i >= 0; i-- ) {
		v = arr[ i ];
		if ( clbk( v, i, arr ) ) {
			if ( mode === 2 ) {
				out.push( [ i, v ] );
			} else if ( mode === 1 ) {
				out.push( v );
			} else {
				out.push( i );
			}
			if ( ++count === k ) {
				break;
			}
		}
	}
	return out;
} // end FUNCTION find()


// EXPORTS //

module.exports = find;
