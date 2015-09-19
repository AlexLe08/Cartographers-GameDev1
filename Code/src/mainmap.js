// Map Object
// controls all inputs and manipulations of the game world
var MapObject = cc.Layer.extend ({
	ctor: function ( _name ) {
		this._super();
		
		this.name = _name;
		this.close_location = null; // closest location to the mouse
		this.hover_location = null; // location over which the mouse is hovering
		this.hover_boat = null;		// boat over which the mouse is hovering
		this.select_boat = null;	// boat that is currently selected
		
		this.movables = [];	   // list of boats and caravans
		this.locations = [];   // list of locations
		this.connections = []; // list of connections
		
		this.persistent = []; // records moves explicitly desired by the player
		this.temporary = [];  // records the shortest path from one location to another
		
		cc.eventManager.addListener (
			cc.EventListener.create ({
				event: cc.EventListener.MOUSE,
				onMouseMove: this.onMouseOver,
				onMouseUp: this.onMouseUp,
			}), this);
			
		cc.eventManager.addListener(
			cc.EventListener.create ({
				event: cc.EventListener.KEYBOARD,
				onKeyPressed: this.onKeyPressed,
				onKeyReleased: this.onKeyReleased
			}), this);
		
		return true;
	},
	addBoat:function( butt ) {
		butt.setScale( 0.6 );
		this.movables.push( butt );
		this.addChild( butt,this.movables.length + 10 );
	},
	addLocation:function( loc ) {
		this.locations.push( loc );
		this.addChild( loc,9 );
	},
	addConnection:function( _con ) {
		this.connections.push( _con );
		this.addChild( _con,1 );
	},
	pathBoat:function( boat, location ) {
		if ( boat.dock == null ) {
			return null;
		} else {
			return location.seekConnection( boat.dock );
		}
	},
	
	__deselectBoat:function() {
		if ( this.select_boat != null ) {
			var butt = this.select_boat;
			butt.selected = false;
			butt.runAction( cc.tintTo(0.05,255,255,255) );
		}
	},
	selectBoat:function() {
		this.__deselectBoat();
		this.hover_boat.runAction( cc.tintTo(0.05,255,125,0) );
		this.select_boat = this.hover_boat;
		this.select_boat.selected = true;
	},
	deselectBoat:function() {
		this.__deselectBoat();
		this.select_boat = null;
	},
	selectPath:function() {
		for ( var i=0;i<this.temporary.length;i++ )
			this.temporary[i].setHighlighted( true );
	},
	deselectPath:function() {
		for ( var i=0;i<this.temporary.length;i++ )
			this.temporary[i].setHighlighted( false );
		this.temporary = [];
	},
	
	// Control what happens on the map when the mouse is moved
	onMouseOver:function(event) {
		var self = this._node;
		var pt = event.getLocation();
		var i = 0;
		
		//------------------------------------------------------------------
		// control what happens when you hover over a location node
		var arr = self.locations;
		var closedst;
		var workingloc;
		
		var oldloc = self.hover_location;
		self.hover_location = null;
		
		for ( ;i<arr.length;i++ ) {
			var tup = arr[i].checkMouseOver( pt );
			if ( self.hover_location == null ) {
				if ( closedst == undefined || tup[1] < closedst ) {
					closedst = tup[1];
					workingloc = arr[i];
				} if ( tup[0] ) {
					self.hover_location = arr[i];
					if ( self.select_boat != null && self.hover_location != oldloc ) {
						if ( self.persistent.length == 0 ) {
							self.temporary = pathObject( self.select_boat.dock, self.hover_location );
							console.log( "Path Length: "+self.temporary.length );
						}
						self.selectPath();
					}
				}
			}
		}
		if ( self.hover_location == null ) {
			self.deselectPath();
		}
		//------------------------------------------------------------------
		
		// determine if the mouse is hovering over any boats
		arr = workingloc.boats;
		self.hover_boat = null;
		
		for ( i=0;i<arr.length;i++ ) {
			if ( arr[i] != null && arr[i].checkMouseOver( pt ) ) {
				self.hover_boat = arr[i];
				i ++ ;
				break;
			}
		}
		for ( ;i<arr.length;i++ )
			if ( arr[i] != null )
				arr[i].setNotHovered();
	},
	
	
	// Control what happens on the map when the mouse is released
	onMouseUp:function(event) {
		var self = this._node;
		if ( self.temporary.length > 0 && self.select_boat != null ) {
			
			var butt = self.select_boat;
			
			butt.move( self.temporary );
			
			self.deselectBoat();
			butt.setNotHovered();
			self.deselectPath();
			self.temporary = [];
			
		} else if ( self.hover_boat != null && self.select_boat != self.hover_boat ) {
			self.selectBoat();
		} else {
			self.deselectBoat();
		}
	},
	
	
	
	onKeyPressed:function(kc,event) {
	},
	
	onKeyReleased:function(kc,event) {
		
	}
	
});