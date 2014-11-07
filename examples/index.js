'use strict';

var find = require( './../lib' );

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


