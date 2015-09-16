// Movable Object
// extends sprite
var Boat = cc.Sprite.extend ({
	ctor: function ( _name, _speed ) {
		this._super(res.boat_png);
		
		// user input
		this.name = _name;
		if ( _speed == undefined )
			this.speed = 64;
		else
			this.speed = _speed;
		
		// defined later
		this.x = 0;
		this.y = 0;
		this.docking_position = -1;
		this.dock = null;
		this.hovered = false;
		this.selected = false;
		this.in_transit = false;
		
		return true;
	},
	
	// redundant calls for docking and undocking
	// operation takes place in the dock
	unDock:function() {
		this.dock.boatIsDeparting( this );
	},
	Dock:function( ndock ) {
		ndock.boatIsDocking( this );
	},
	// this function is used for boats in transit
	syncDock:function() {
		if ( !this.in_transit )
			console.log( "WARNING: calling dock sync while boat "+this.name+" not in transit" );
		this.dock.boatIsDocking( this );
	},
});