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
		this.queued = [];
		this.destination = null;
		
		return true;
	},
	move:function( q ) {
		this.destination = this.dock;
		this.dock.boatIsDeparting( this );
		
		this.queued = q.slice();
		this.in_transit = true;
		this.moveNext();
	},
	moveNext:function() {
		if ( this.queued.length > 0 ) {
			var next = this.queued[0];
			this.queued.shift();
			
			this.setPosition( next.getEndpoint( this.destination ) );
			this.destination = next.getOther( this.destination );
			
			var posother = next.getEndpoint( this.destination );
			this.runAction(
				cc.sequence(
					cc.moveTo( next.getFullLength() / this.speed, cc.p(posother.x,posother.y),0 ),
					cc.callFunc( this.moveNext, this )
				)
			);
		} else {
			this.destination.boatIsDocking( this );
		}
	},
	setHovered:function() {
		this.setScale( 0.8 );
		this.hovered = true;
	},
	setNotHovered:function() {
		if ( !this.selected ) {
			this.setScale( 0.6 );
			this.hovered = false;
		}
	},
	checkMouseOver:function( pt ) {
		var frame = this.getSpriteFrame();
		if ( ( !this.in_transit ) &&
			 ( Math.abs( pt.x - this.x ) < frame.getRectInPixels().width * this.getScaleX() / 2 &&
			   Math.abs( pt.y - this.y ) < frame.getRectInPixels().height * this.getScaleY() / 2 ) ) {
			this.setHovered();
			return true;
		} else {
			this.setNotHovered();
			return false;
		}
	}
});