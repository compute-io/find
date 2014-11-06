'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	find = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-find', function tests() {

	it( 'should export a function', function test() {
		expect( find ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided an array', function test() {
		var values = [
			'5',
			5,
			true,
			NaN,
			null,
			undefined,
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				find( value, {}, function(){} );
			};
		}
	});

	it( 'should throw an error if the callback is not a function', function test() {
		var values = [
			'5',
			5,
			true,
			NaN,
			null,
			undefined,
			{},
			[]
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue1( values[i] ) ).to.throw( TypeError );
			expect( badValue2( values[i] ) ).to.throw( TypeError );
		}

		function badValue1( value ) {
			return function() {
				find( [], {}, value );
			};
		}
		function badValue2( value ) {
			return function() {
				find( [], value );
			};
		}
	});

	it( 'should throw an error if provided options are not an object', function test() {
		var values = [
			'5',
			5,
			true,
			NaN,
			null,
			undefined,
			[],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				find( [], value, function(){} );
			};
		}
	});

	it( 'should throw an error if the option to limit the number of found values is not an integer', function test() {
		var values = [
			'5',
			3.14,
			[],
			true,
			NaN,
			null,
			undefined,
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				find( [], { 'k': value }, function(){} );
			};
		}
	});

	it( 'should throw an error if the option to specify the return values is not a string', function test() {
		var values = [
			5,
			[],
			true,
			NaN,
			null,
			undefined,
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				find( [], { 'returns': value }, function(){} );
			};
		}
	});

	it( 'should throw an error if the option to specify the return values is not recognized', function test() {
		expect( foo ).to.throw( TypeError );

		function foo() {
			find( [], { 'returns': 'unknown_values_beep' }, function(){} );
		}
	});

	it( 'should return indices of array elements which satisfy a test condition', function test() {
		var data, expected, actual;

		function condition( val ) {
			return val < 5;
		}

		data = [ 3, 2, 5, 3, 2 ];
		expected = [ 0, 1, 3, 4 ];

		actual = find( data, { 'returns': 'indices' }, condition );

		assert.deepEqual( actual, expected );

	});

	it( 'should return values of array elements which satisfy a test condition', function test() {
		var data, expected, actual;

		function condition( val ) {
			return val < 5;
		}

		data = [ 3, 2, 5, 3, 2 ];
		expected = [ 3, 2, 3, 2 ];

		actual = find( data, { 'returns': 'values' }, condition );

		assert.deepEqual( actual, expected );

	});

	it( 'should return a limited number of indices or values', function test() {
		var data, expected, actual;

		function condition( val ) {
			return val < 5;
		}

		data = [ 3, 2, 5, 3, 2 ];

		// Indices:
		expected = [ 0, 1 ];
		actual = find( data, { 'returns': 'indices', 'k': 2 }, condition );

		assert.deepEqual( actual, expected );

		// Values:
		expected = [ 3, 2 ];
		actual = find( data, { 'returns': 'values', 'k': 2 }, condition );

		assert.deepEqual( actual, expected );

	});

	it( 'should return indices/values in reverse order', function test() {
		var data, expected, actual;

		function condition( val ) {
			return val < 5;
		}

		data = [ 3, 2, 5, 3, 2 ];

		// Indices:
		expected = [ 4, 3, 1, 0 ];
		actual = find( data, { 'returns': 'indices', 'k': -4 }, condition );

		assert.deepEqual( actual, expected );

		// Values:
		expected = [ 2, 3, 2, 3 ];
		actual = find( data, { 'returns': 'values', 'k': -4 }, condition );

		assert.deepEqual( actual, expected );

	});

	it( 'should return a limited number of indices or values when searching in reverse order', function test() {
		var data, expected, actual;

		function condition( val ) {
			return val < 5;
		}

		data = [ 3, 2, 5, 3, 2 ];

		// Indices:
		expected = [ 4, 3 ];
		actual = find( data, { 'returns': 'indices', 'k': -2 }, condition );

		assert.deepEqual( actual, expected );

		// Values:
		expected = [ 2, 3 ];
		actual = find( data, { 'returns': 'values', 'k': -2 }, condition );

		assert.deepEqual( actual, expected );

	});

	it( 'should return an empty array if no elements satisfy the condition', function test() {
		var data, expected, actual;

		function condition( val ) {
			return val > 5;
		}

		data = [ 3, 2, 5, 3, 2 ];

		expected = [];
		actual = find( data, condition );

		assert.deepEqual( actual, expected );

	});

	it( 'should return an empty array if the options to limit results is 0', function test() {
		var data, expected, actual;

		function condition( val ) {
			return val < 5;
		}

		data = [ 3, 2, 5, 3, 2 ];

		expected = [];
		actual = find( data, { 'k': 0 }, condition );

	});

});
