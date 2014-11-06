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

Finds `array` elements which satisfy a test condition.

``` javascript
var data = [ 3, 2, 5, 6, 1 ];

var opts = {
	'k': 2,
	'returns': 'values'	
};

function condition( val ) {
	return val > 2;
}

var vals = find( data, opts, condition );
// returns [ 3, 5 ]
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
	'returns': 'values'	
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
