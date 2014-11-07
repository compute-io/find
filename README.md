Find
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Finds array elements which satisfy a test condition.

A better version than the ECMAScript 6 [proposal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find).


## Installation

``` bash
$ npm install compute-find
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

To use the module,

``` javascript
var find = require( 'compute-find' );
```

#### find( arr, [opts,] clbk )

Finds `array` elements which satisfy a test condition. The function accepts two options: `k` and `returns`.

* 	__k__: an `integer` which limits the number of elements returned and whose sign determines the direction in which to search. If set to a negative `integer`, the function searches from the last element to the first element.

* 	__returns__: specifies the type of result to return and may be one of three options: `indices`, `values`, `*`.
	- 	__indices__: indicates to return the element indices of those elements satisfying the search condition.
	- 	__values__: indicates to return the element values of those elements satisfying the search condition.
	-	__*__: indicates to return both the element indices and values of those elements satisfying the search condition. The returned result is an `array` of `arrays`, where each sub-array is an index-value pair.

The `callback` is provided three arguments:
*	__element__: the current `array` element
*	__index__: the current `array` element's index
*	__array__: the input `array`

By default, `k` is the length of the input `array` and `returns` is set to `indices`.

``` javascript
var data = [ 30, 20, 50, 60, 10 ];

function condition( val ) {
	return val > 20;
}

var vals = find( data, condition );
// returns [ 0, 2, 3 ]
```

To limit the number of results and specify that `values` should be returned,


``` javascript
var data = [ 30, 20, 50, 60, 10 ];

var opts = {
	'k': 2,
	'returns': 'values'	
};

function condition( val ) {
	return val > 20;
}

var vals = find( data, opts, condition );
// returns [ 30, 50 ]
```

If no `array` elements satisfy the test condition, the function returns an empty `array`.

``` javascript
var data = [ 30, 20, 50, 60, 10 ];

var opts = {
	'k': 2,
	'returns': 'values'	
};

function condition( val ) {
	return val > 1000;
}

var vals = find( data, opts, condition );
// returns []
```

To find the last two values satisfying a search condition,

``` javascript
var data = [ 30, 20, 50, 60, 10 ];

var opts = {
	'k': -2,
	'returns': 'values'	
};

function condition( val ) {
	return val > 20;
}

var vals = find( data, opts, condition );
// returns [ 60, 50 ]
```

To explicitly specify that only indices are returned,

``` javascript
var data = [ 30, 20, 50, 60, 10 ];

var opts = {
	'k': -2,
	'returns': 'indices'	
};

function condition( val ) {
	return val > 20;
}

var vals = find( data, opts, condition );
// returns [ 3, 2 ]
```

And to return both indices and values as index-value pairs,

``` javascript
var data = [ 30, 20, 50, 60, 10 ];

var opts = {
	'k': -2,
	'returns': '*'	
};

function condition( val ) {
	return val > 20;
}

var vals = find( data, opts, condition );
// returns [ [3, 60], [2, 50] ]
```



## Examples

``` javascript
var find = require( 'compute-find' );

// Simulate the data...
var data = new Array( 100 );

for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random()*100 );
}

// Find the first 10 values greater than 25...
var opts = {
	'k': 10,
	'returns': '*'	
};

function condition( val ) {
	return val > 25;
}

var vals = find( data, opts, condition );

console.log( vals.join( '\n' ) );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/compute-find.svg
[npm-url]: https://npmjs.org/package/compute-find

[travis-image]: http://img.shields.io/travis/compute-io/find/master.svg
[travis-url]: https://travis-ci.org/compute-io/find

[coveralls-image]: https://img.shields.io/coveralls/compute-io/find/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/find?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/find.svg
[dependencies-url]: https://david-dm.org/compute-io/find

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/find.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/find

[github-issues-image]: http://img.shields.io/github/issues/compute-io/find.svg
[github-issues-url]: https://github.com/compute-io/find/issues
