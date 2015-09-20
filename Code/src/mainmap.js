var MapMoveSpeed = 16;

var MoveMapUp = 0;
var MoveMapDown = 1;
var MoveMapLeft = 2;
var MoveMapRight = 3;
var MoveMapZoomIn = 3;
var MoveMapZoomOut = 3;

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
		
		this.mousepos = cc.p(0,0);
		
		this.boat_label = new cc.LabelTTF( "Hello World",
										   "Arial", 
										   16, 
										   cc.size(0,0), 
										   cc.TEXT_ALIGNMENT_LEFT );
		this.boat_label.x = 60;
		this.boat_label.y = cc.winSize.height - 16;
		this.addChild( this.boat_label );
		this.boat_label.enableStroke( new cc.Color( 0,0,0,255 ), 2 );
		
		this.movables = [];	   // list of boats and caravans
		this.locations = [];   // list of locations
		this.connections = []; // list of connections
		
		this.persistent = []; // records moves explicitly desired by the player
		this.temporary = [];  // records the shortest path from one location to another
		this.tempcap = null;  // the endpoint of the temporary list
		this.perscap = null;  // the endpoint of the persistent list
		
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
		
		this.shift_held = false;
		
		this.going = [false,false,false,false,false,false];
		this.goact = [ cc.RepeatForever.create( cc.sequence( 
							cc.moveBy( 0, cc.p(0,-MapMoveSpeed) ), 
							cc.callFunc( this.handleHovering,this ) ) ),   //
					   cc.RepeatForever.create( cc.sequence( 
							cc.moveBy( 0, cc.p(0,MapMoveSpeed) ), 
							cc.callFunc( this.handleHovering,this ) ) ),    //
					   cc.RepeatForever.create( cc.sequence( 
							cc.moveBy( 0, cc.p(MapMoveSpeed,0) ), 
							cc.callFunc( this.handleHovering,this ) ) ),    //
					   cc.RepeatForever.create( cc.sequence( 
							cc.moveBy( 0, cc.p(-MapMoveSpeed,0) ), 
							cc.callFunc( this.handleHovering,this ) ) ),   //
					   cc.RepeatForever.create( cc.sequence( 
							cc.scaleTo( 10, cc.p(0.95,0.95) ), 
							cc.callFunc( this.handleHovering,this ) ) ),   //
					   cc.RepeatForever.create( cc.sequence( 
							cc.scaleTo( 10, cc.p(1.05,1.05) ), 
							cc.callFunc( this.handleHovering,this ) ) ) ]; //
		return true;
	},
	addMovable:function( butt ) {
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
	
	__deselectMovable:function() {
		if ( this.select_boat != null ) {
			var butt = this.select_boat;
			butt.selected = false;
			butt.setNotHovered();
			butt.runAction( cc.tintTo(0.05,255,255,255) );
		}
	},
	selectMovable:function() {
		this.__deselectMovable();
		this.hover_boat.runAction( cc.tintTo(0.05,255,125,0) );
		this.select_boat = this.hover_boat;
		this.select_boat.selected = true;
	},
	deselectMovable:function() {
		this.__deselectMovable();
		this.select_boat = null;
	},
	selectPath:function() {
		console.log( "Set Path" );
		for ( var i=0;i<this.temporary.length;i++ )
			this.temporary[i].setHighlighted( BIT_TEMPORARY, true );
	},
	selectFullPath:function() {
		this.selectPath();
		for ( var i=0;i<this.persistent.length;i++ )
			this.persistent[i].setHighlighted( BIT_PERSISTENT, true );
	},
	deselectPath:function() {
		for ( var i=0;i<this.temporary.length;i++ )
			this.temporary[i].setHighlighted( BIT_TEMPORARY, false );
		this.temporary = [];
		this.tempcap = null;
	},
	deselectFullPath:function() {
		this.deselectPath();
		for ( var i=0;i<this.persistent.length;i++ )
			this.persistent[i].setHighlighted( BIT_PERSISTENT, false );
		this.persistent = [];
		this.perscap = null;
	},
	setBoatPath:function() {
		var full_path = this.persistent.concat( this.temporary );
		if ( full_path.length > 0 ) {
			var butt = this.select_boat;
			
			butt.move( full_path );
			
			this.deselectMovable();
			butt.setNotHovered();
			this.deselectFullPath();
		}
	},
	
	handleHovering:function( mpt ) {
		console.log( "HANDLE" );
		var pt = cc.p( this.mousepos.x-this.x, this.mousepos.y-this.y );
		var i = 0;
		
		//------------------------------------------------------------------
		// control what happens when you hover over a location node
		var arr = this.locations;
		var closedst;
		var workingloc;
		
		var oldloc = this.hover_location;
		this.hover_location = null;
		
		for ( ;i<arr.length;i++ ) {
			var tup = arr[i].checkMouseOver( pt );
			if ( this.hover_location == null ) {
				if ( closedst == undefined || tup[1] < closedst ) {
					closedst = tup[1];
					workingloc = arr[i];
				} if ( tup[0] ) {
					this.hover_location = arr[i];
					if ( this.select_boat != null && this.hover_location != oldloc ) {
						if ( this.persistent.length == 0 ) {
							this.temporary = pathObject( this.select_boat.type, this.select_boat.dock, this.hover_location );
							this.tempcap = this.hover_location;
						} else {
							console.log( "get temp from end" );
							console.log( this.perscap.name );
							this.temporary = pathObject( this.select_boat.type, this.perscap, this.hover_location );
							this.tempcap = this.hover_location;
						}
						console.log( "Path Length: "+this.temporary.length );
						this.selectPath();
					}
				}
			}
		}
		if ( this.hover_location == null ) {
			this.deselectPath();
		}
		//------------------------------------------------------------------
		// determine if the mouse is hovering over any boats
		if ( workingloc ) {
			arr = workingloc.boats;
			this.hover_boat = null;
			
			for ( i=0;i<arr.length;i++ ) {
				if ( arr[i] != null && arr[i].checkMouseOver( pt ) ) {
					this.hover_boat = arr[i];
					this.boat_label.setString( arr[i].name );
					i ++ ;
					break;
				}
			}
			for ( ;i<arr.length;i++ )
				if ( arr[i] != null )
					arr[i].setNotHovered();
		}
	},
	
	// Control what happens on the map when the mouse is moved
	onMouseOver:function(event) {
		var self = this._node;
		self.mousepos = event.getLocation();
		self.handleHovering();
	},
	
	
	// Control what happens on the map when the mouse is released
	onMouseUp:function(event) {
		var self = this._node;
		if ( self.temporary.length > 0 && self.select_boat != null ) {
			
			if ( self.shift_held ) {
				
				self.persistent = self.persistent.concat( self.temporary );
				self.perscap = self.tempcap;
				self.tempcap = null;
				self.deselectPath();
				self.selectFullPath();
				
			} else
				self.setBoatPath();
			
		} else if ( self.hover_boat != null && self.select_boat != self.hover_boat ) {
			self.selectMovable();
		} else {
			self.deselectMovable();
		}
	},
	
	handleMapMove:function( evnum, bool ) {
		if ( bool == undefined || bool ) {
			if ( !this.going[evnum] )
				this.runAction( this.goact[evnum] );
			this.going[evnum] = true;
		} else {
			if ( this.going[evnum] )
				this.getActionManager().removeAction( this.goact[evnum] );
			this.going[evnum] = false;
		}
	},
	
	onKeyPressed:function(kc,event) {
		console.log( "PR "+kc );
		var self = this._node;
		switch( kc ) {
			case 38: // up
				self.handleMapMove( MoveMapUp, true );
				break;
			case 40: // down
				self.handleMapMove( MoveMapDown, true );
				break;
			case 37: // left
				self.handleMapMove( MoveMapLeft, true );
				break;
			case 39: // right
				self.handleMapMove( MoveMapRight, true );
				break;
			case 190: // zoom in
				self.handleMapMove( MoveMapZoomIn, true );
				break;
			case 188: // zoom out
				self.handleMapMove( MoveMapZoomOut, true );
				break;
			case 16:
				self.shift_held = true;
				break;
		}
	},
	
	onKeyReleased:function(kc,event) {
		console.log( "RE "+kc );
		var self = this._node;
		switch( kc ) {
			case 38: // up
				self.handleMapMove( MoveMapUp, false );
				break;
			case 40: // down
				self.handleMapMove( MoveMapDown, false );
				break;
			case 37: // left
				self.handleMapMove( MoveMapLeft, false );
				break;
			case 39: // right
				self.handleMapMove( MoveMapRight, false );
				break;
			case 190: // zoom in
				self.handleMapMove( MoveMapZoomIn, false );
				break;
			case 188: // zoom out
				self.handleMapMove( MoveMapZoomOut, false );
				break;
			case 16:
				self.shift_held = false;
				self.setBoatPath();
				break;
		}
	}
	
});