// GLOBAL Variable Values
var ConnectionWidth = 6; 	// size of the connecting lines
var LocationIncrease = 4; 	// increase in size of a slot on hover

// find the distance between two points
var ptdistance = function ( a, b ) {
	return Math.sqrt( Math.pow(b.x-a.x,2)+Math.pow(b.y-a.y,2) );
}