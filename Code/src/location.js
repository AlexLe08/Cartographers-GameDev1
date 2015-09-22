var LocationHover = cc.DrawNode.extend({
	ctor:function() {
		this._super();
	},
	onEnter:function() {
		this.drawDot( cc.p( 0, 0 ),
					  this.parent.radius + LocationIncrease,
					  new cc.Color( 60,180,60,255 ) );
		this.drawCircle( cc.p( 0, 0 ),
						 this.parent.radius + LocationIncrease,
						 Math.PI * 2,
						 this.parent.radius * 2,
						 false,
						 4,
						 new cc.Color( 90,120,200,255 ) );
	}
});
var LocationNoHover = cc.DrawNode.extend({
	ctor:function() {
		this._super();
	},
	onEnter:function() {
		this.drawDot( cc.p( 0, 0 ),
					  this.parent.radius,
					  new cc.Color( 0,180,0,255 ) );
		this.drawCircle( cc.p( 0, 0 ),
						 this.parent.radius,
						 Math.PI * 2,
						 this.parent.radius * 2,
						 false,
						 4,
						 new cc.Color( 30,40,90,255 ) );
	}
});
var LocationPin = cc.Sprite.extend({
	ctor:function() {
		this._super( res.land_marker_png );
	},
	onEnter:function() {
		this.setScale( this.parent.calcScale( 1 ) );
	}
});
var LocationNode = cc.Layer.extend({
	ctor:function (_name, _type, _x, _y, _r) {
		this._super();
		
		this.name = _name;
		this.type = _type;
		this.x = _x;
		this.y = _y;
		this.radius = _r;
		this.real_scale = _r / 320.0;
		
		this.setAnchorPoint( 0.38157894736842105263157894736842, 0 );
		
		this.boatslots = [];
		this.boats = [];
		this.caravans = [];
		this.connections = [];
		
		// for BFS
		this.prev = null;
		this.cref = null;
		
		// text label
		this.namelabel = new cc.LabelTTF( this.name, "Arial", 16, cc.size(0,0), cc.TEXT_ALIGNMENT_CENTER );
		
		this.namelabel.setOpacity( 0 );
		this.namelabel.enableStroke( new cc.Color( 0,0,0,255 ), 2 );
		
		this.namelabel.setString( this.name );
		
		this.pin = new LocationPin();
		
		this.is_hovering = false;
		
		this.addChild( this.namelabel, 9999 );
		this.addChild( this.pin );
		
		return true;
		
	},
	calcScale:function( mod, shift ) {
		return mod * this.real_scale;
		/*var rshift;
		if ( shift == undefined )
			rshift = 0.5;
		else
			rshift = shift;
		var rs = mod * this.real_scale;
		return rshift * rs + ( 1 - rshift ) * rs / this.parent.scaleX;*/
	},
	updateScale:function() {
		if ( this.is_hovering ) {
			this.pin.setScale( this.calcScale( 1.4 ) );
		} else {
			this.pin.setScale( this.calcScale( 1.0 ) );
		}
		this.namelabel.setScale( this.calcScale() );
	},
	setHovered:function( dist, bool ) {
		if ( bool == undefined || bool ) {
			if ( !this.is_hovering ) {
				this.is_hovering = true;
				this.pin.setScale( this.calcScale( 1.4 ) );
				this.namelabel.setOpacity( 255 );
			}
		} else {
			var rdist = dist - this.radius;
			if ( rdist <= LocationVisibleHover ) {
				var opac = rdist / LocationVisibleHover;
				this.namelabel.setOpacity( 255 * (1-opac) );
			} else
				this.namelabel.setOpacity( 0 );
			if ( this.is_hovering ) {
				this.is_hovering = false;
				this.pin.setScale( this.calcScale( 1.0 ) );
			}
		}
	},
	seekConnection:function( other ) {
		for ( var i=0;i<this.connections.length;i++ ) {
			if ( this.connections[i].getOther( this ) == other ) {
				return this.connections[i];
			}
		} return null;
	},
	boatIsDocking:function( boat ) {
		if ( this.boats.length < nslot )
			console.log( "CRITICAL ERROR CANNOT DOCK BOAT: "+this.boats.length+" "+nslot );
		else if ( this.boatslots.length == 0 ) {
			boat.docking_position = this.boats.length;
			this.boats.push( boat );
		} else {
			var nslot = this.boatslots[this.boatslots.length-1];
			this.boatslots.pop();
			boat.docking_position = nslot;
			this.boats[nslot] = boat;
		}
		boat.dock = this;
		boat.in_transit = false;
		
		boat.x = this.x + ( this.radius + LocationMovableDistance ) * Math.cos( Math.PI / 4 * ( 1 - boat.docking_position) );
		boat.y = this.y + ( this.radius + LocationMovableDistance ) * Math.sin( Math.PI / 4 * ( 1 - boat.docking_position ) );
		
		console.log( boat.name+" docks at "+this.name+": "+boat.docking_position );
		return true;
	},
	boatIsDeparting:function( boat ) {
		
		if ( boat.docking_position == -1 || boat.dock == null )
			return false;
		
		this.boats[boat.docking_position] = null;
		this.boatslots.push( boat.docking_position );
		
		console.log( boat.name+" departs from "+this.name+": "+boat.docking_position );
		
		boat.dock = null;
		boat.in_transit = true;
		boat.docking_position = -1;
		
		return true;
		
	},
	checkMouseOver:function( pt ) {
		var dst = ptdistance( cc.p( this.x, this.y+this.radius/2 ), pt );
		if ( dst < this.radius ) {
			this.setHovered( dst, true );
			return [true,dst];
		} else {
			this.setHovered( dst, false );
			return [false,dst];
		}
	}
	
});