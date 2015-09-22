// Map Object
// controls all inputs and manipulations of the game world
var MapObject = cc.Layer.extend ({
	ctor: function () {
		this._super();
		
		this.global_hover = null;
		this.global_select = null;
		this.global_highlighted = null;
		this.global_highlighted_select = null;
		
		this.movables = []
		this.locations = [];
		this.connections = [];
		this.storms = [];
		
		this.connection_stack = [];
		
		this.loclabel = new cc.LabelTTF( "", "Arial", 24, cc.size(0,0), cc.TEXT_ALIGNMENT_CENTER );
		this.loclabel.enableStroke( new cc.Color( 0,0,0,255 ), 2 );
		this.addChild( this.loclabel, 9999 );
		this.loclabel.setVisible( false );
		
		cc.eventManager.addListener (
			cc.EventListener.create ({
				event: cc.EventListener.MOUSE,
				onMouseMove: this.onMouseOver,
				onMouseUp: this.onMouseUp,
			}), this);
		
		return true;
	},
	addBoat:function( butt ) {
		butt.setScale( 0.6 );
		this.movables.push( butt );
		this.addChild( butt,this.movables.length + 10 );
	},
	addStorm: function ( storm ) {
		this.storms.push( storm );
		this.addChild( storm, 50 );
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
		if ( this.global_select != null ) {
			var butt = this.global_select;
			butt.selected = false;
			butt.runAction( cc.tintTo(0.05,255,255,255) );
		}
	},
	selectBoat:function() {
		this.__deselectBoat();
		this.global_hover.runAction( cc.tintTo(0.05,255,125,0) );
		this.global_select = this.global_hover; 
	},
	deselectBoat:function() {
		this.__deselectBoat();
		this.global_select = null;
	},
	
	// Control what happens on the map when the mouse is moved
	onMouseOver:function(event) {
		var pt = event.getLocation();
		
		// unhighlight the highlighted connection
		// they will be rehighlighted if need be later
		if ( this._node.global_highlighted != null ) {
			this._node.global_highlighted.setHighlighted( false );
			this._node.global_highlighted = null;
		}
		
		// control what happens when you hover over a location node
		var arr = this._node.locations;
		var labset = false;
		for ( var i=0;i<arr.length;i++ ) {
			// an overlap occurs if the distance between the node
			// 		center and the mouse is less then the radius
			if ( ptdistance( cc.p( arr[i].posx, arr[i].posy ), pt ) < arr[i].radius ) {
				// change the sprite of the node
				arr[i].setHovered( true );
				
				// notify the text label that it needs to be shown
				labset = true;
				
				// change the location and text of the text label
				this._node.loclabel.setString( arr[i].name );
				this._node.loclabel.x = arr[i].posx;
				this._node.loclabel.y = arr[i].posy;
				
				// if a boat is selected, highlight the connection from that boats node
				//		the the currently hovered node
				if ( this._node.global_select != null ) {
					var connect = this._node.pathBoat( this._node.global_select, arr[i] );
					if ( connect != null ) {
						this._node.global_highlighted = connect;
						connect.setHighlighted( true );
					}
				}
				
			} else { // the mouse was not hovering over this node
				arr[i].setHovered( false );
			}
		}
		// show or hide the label
		this._node.loclabel.setVisible( labset );
		
		// determine if the mouse is hovering over any boats
		arr = this._node.movables;
		var hithover = false;
		for ( var i=0;i<arr.length;i++ ) {
			if ( !arr[i].in_transit ) {
				// get the rectangle (in pixels) of the boat sprite
				var frame = arr[i].getSpriteFrame();
				
				// determine if the mouse is inside the above triangle
				if ( Math.abs( pt.x - arr[i].x ) < frame.getRectInPixels().width * arr[i].getScaleX() / 2 &&
					 Math.abs( pt.y - arr[i].y ) < frame.getRectInPixels().height * arr[i].getScaleY() / 2 ) {
					// set the map to hover over this boat
					this._node.global_hover = arr[i];
					// do not unset the current boat hover
					hithover = true;
					// change the boat sprite to alert the player that they are hovering over this boat
					arr[i].setScale( 0.8 );
					arr[i].hovered = true;
				} else if ( this._node.global_select != arr[i] ) {
					// unhover the boat, set the sprite back to its original state
					arr[i].setScale( 0.6 );
					arr[i].hovered = false;
				}
			} else if ( arr[i].getScaleX() != 0.6 ) {
				// unhover the boat, set the sprite back to its original state
				arr[i].setScale( 0.6 );
				arr[i].hovered = false;
			}
		}
		// if no boats were hovered set the global hover to no boats
		if ( !hithover )
			this._node.global_hover = null;
	},
	
	
	// Control what happens on the map when the mouse is released
	onMouseUp:function(event) {
		if ( this._node.global_highlighted != null ) {
			
			var connect = this._node.global_highlighted;
			var butt = this._node.global_select;
			var posbutt = connect.getEndpoint( butt.dock );
			
			butt.setPosition( posbutt );
			
			var other = connect.getOther( butt.dock );
			var posother = connect.getEndpoint( other );
			
			butt.runAction(
				cc.sequence(
					cc.moveTo( connect.getFullLength() / butt.speed, cc.p(posother.x,posother.y),0 ),
					cc.callFunc( butt.syncDock, butt )
				)
			);
			butt.unDock();
			butt.dock = other;
			
			this._node.deselectBoat();
			
			this._node.global_highlighted.setHighlighted( false );
			this._node.global_highlighted = null;
			
		} else if ( this._node.global_hover != null &&
			 this._node.global_select != this._node.global_hover ) {
			this._node.selectBoat();
		} else {
			this._node.deselectBoat();
		}
	}
});