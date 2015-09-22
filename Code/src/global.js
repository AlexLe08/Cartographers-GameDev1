// GLOBAL Variable Values
var ConnectionWidth = 6; 	// size of the connecting lines
var LocationIncrease = 4; 	// increase in size of a slot on hover
var _pause = false;

// resources
var _food = 0;
var _gold = 0;
// total player score
var _score = 0;
var _eventTrigger = true;
var _event = null;
var _eventBoat = null;

var LocationVisibleHover = 255;
var LocationMovableDistance = 10;

// Constant bit values
var GLOBAL_WATER 		  = 0x1;
var GLOBAL_LAND 		  = 0x2;
var GLOBAL_WATER_AND_LAND = 0x3;

var BIT_TEMPORARY	= 0x1;
var BIT_PERSISTENT	= 0x2;
var BIT_BOTH		= 0x3;

// find the distance between two points
var ptdistance = function ( a, b ) {
	return Math.sqrt( Math.pow(b.x-a.x,2)+Math.pow(b.y-a.y,2) );
}

var ptdeterminant = function( a, b ) {
	return a.x*b.y - a.y*b.x;
}

var randomInt = function(min,max) {
	return Math.floor(Math.random() * (max - min)) + min;
}