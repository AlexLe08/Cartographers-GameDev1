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
// find the distance between two points
var ptdistance = function ( a, b ) {
	return Math.sqrt( Math.pow(b.x-a.x,2)+Math.pow(b.y-a.y,2) );
}
var randomInt = function(min,max) {
	return Math.floor(Math.random() * (max - min)) + min;
}