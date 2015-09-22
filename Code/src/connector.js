var ConnectionUnhighlighted = cc.DrawNode.extend({
	ctor:function() {
		this._super();
	},
	onEnter:function() {
		this.drawSegment( this.parent.pos1,
						  this.parent.pos2,
						  ConnectionWidth,
						  new cc.Color( 0,0,0,255 ) );
		this.drawSegment( this.parent.pos1,
						  this.parent.pos2,
						  ConnectionWidth - 2,
						  new cc.Color( 120,120,185,255 ) );
	}
});
var ConnectionHighlighted = cc.DrawNode.extend({
	ctor:function() {
		this._super();
	},
	onEnter:function() {
		this.drawSegment( this.parent.pos1,
						  this.parent.pos2,
						  ConnectionWidth,
						  new cc.Color( 0,0,0,255 ) );
		this.drawSegment( this.parent.pos1,
						  this.parent.pos2,
						  ConnectionWidth - 2,
						  new cc.Color( 255,150,120,255 ) );
	}
});
var ConnectionNode = cc.Layer.extend({
	ctor:function( _name, _type, _node1, _node2 ) {
		this._super();
		
		this.name = _name;
		this.type = _type;
		
		this.node1 = _node1;
		this.node2 = _node2;
		
		var N1ToN2 = Math.atan2( _node2.y - _node1.y, _node2.x - _node1.x );
		var N2ToN1 = Math.atan2( _node1.y - _node2.y, _node1.x - _node2.x );
		
		var n1x = _node1.x + ( LocationMovableDistance + 2 * ConnectionWidth ) * Math.cos( N1ToN2 );
		var n1y = _node1.y + ( LocationMovableDistance + 2 * ConnectionWidth ) * Math.sin( N1ToN2 );
		var n2x = _node2.x + ( LocationMovableDistance + 2 * ConnectionWidth ) * Math.cos( N2ToN1 );
		var n2y = _node2.y + ( LocationMovableDistance + 2 * ConnectionWidth ) * Math.sin( N2ToN1 );
		
		this.pos1 = new cc.Point( n1x, n1y );
		this.pos2 = new cc.Point( n2x, n2y );
		
		this.highlighted = new ConnectionHighlighted( cc.p(n1x,n1y), cc.p(n2x,n2y) );
		
		this.is_highlighted = 0;
		this.addChild( this.highlighted );
		this.highlighted.setVisible( false );
		
		this.node1.connections.push( this );
		this.node2.connections.push( this );
		
		return true;
	},
	setHighlighted:function( bits, bool ) {
		if ( bool == undefined || bool ) {
			if ( this.is_highlighted == 0 ) {
				this.highlighted.setVisible( true );
			}
			console.log( "HIGHLIGHT   "+this.is_highlighted );
			this.is_highlighted |= bits;
		} else {
			console.log( "UNHIGHLIGHT "+this.is_highlighted );
			this.is_highlighted &= ~bits;
			if ( this.is_highlighted == 0 ) {
				this.highlighted.setVisible( false );
			}
		}
	},
	getEndpoint:function( self ) {
		if ( self == this.node1 )
			return this.pos1;
		else if ( self == this.node2 )
			return this.pos2;
		else
			return undefined;
	},
	getOther:function( self ) {
		if ( self == this.node1 )
			return this.node2;
		else if ( self == this.node2 )
			return this.node1;
		else
			return undefined;
	},
	getLength:function() {
		return ptdistance( this.pos1, this.pos2 );
	},
	getFullLength:function() {
		
		return ptdistance( cc.p( this.node1.x, this.node1.y), 
						   cc.p( this.node2.x, this.node2.y) );
	}
});

// returns an array of connectors that will connect location 1 and 2
// if no path can be found then an empty array is passed
var pathObject = function( type, location1, location2 ) {
	var stack_store = [];
	var q = new search_t();
	var tmp = location1;
	var pathfailed = false;
	
	stack_store.push( tmp );
	tmp.prev = tmp;
	console.log( "------------------------------------------------" );
	console.log( "Set "+tmp.name );
	while ( tmp != location2 ) {
		for ( var i=0;i<tmp.connections.length;i++ ) {
			console.log( "    Attempt touch" );
			if ( tmp.connections[i].type & type ) {
				var other = tmp.connections[i].getOther( tmp );
				if ( other.prev == null ) {
					stack_store.push( other );
					q.push( tmp.connections[i],
							tmp.connections[i].getFullLength() );
					console.log( "    Touch "+other.name );
				}
			}
		}
		var foundone = false;
		while ( !foundone && q.size() != 0 ) {
			var connect = q.pop();
			if ( connect.node1.prev == null ) {
				tmp = connect.node1;
				tmp.prev = connect.node2;
				foundone = true;
			} else if ( connect.node2.prev == null ){
				tmp = connect.node2;
				tmp.prev = connect.node1;
				foundone = true;
			}
		}
		console.log( "Set "+tmp.name );
		if ( !foundone && q.size() == 0 ) {
			console.log( "Path failed at "+tmp.name );
			pathfailed = true;
			break;
		}
	}
	var ret = [];
	if ( !pathfailed ) {
		while ( tmp != location1 ) {
			ret.push( tmp.seekConnection( tmp.prev ) );
			tmp = tmp.prev;
		}
	}
	for ( var i=0;i<stack_store.length;i++ ) {
		console.log( "Unset "+stack_store[i].name );
		stack_store[i].prev = null;
	}
	return ret.reverse();
};