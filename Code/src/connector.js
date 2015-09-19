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
	ctor:function( _name, _node1, _node2 ) {
		this._super();
		
		this.name = _name;
		
		this.node1 = _node1;
		this.node2 = _node2;
		
		var N1ToN2 = Math.atan2( _node2.posy - _node1.posy, _node2.posx - _node1.posx );
		var N2ToN1 = Math.atan2( _node1.posy - _node2.posy, _node1.posx - _node2.posx );
		
		var n1x = _node1.posx + ( 16 + 2 * ConnectionWidth + _node1.radius ) * Math.cos( N1ToN2 );
		var n1y = _node1.posy + ( 16 + 2 * ConnectionWidth + _node1.radius ) * Math.sin( N1ToN2 );
		var n2x = _node2.posx + ( 16 + 2 * ConnectionWidth + _node2.radius ) * Math.cos( N2ToN1 );
		var n2y = _node2.posy + ( 16 + 2 * ConnectionWidth + _node2.radius ) * Math.sin( N2ToN1 );
		
		this.pos1 = new cc.Point( n1x, n1y );
		this.pos2 = new cc.Point( n2x, n2y );
		
		this.highlighted = new ConnectionHighlighted( cc.p(n1x,n1y), cc.p(n2x,n2y) );
		this.unhighlighted = new ConnectionUnhighlighted( cc.p(n1x,n1y), cc.p(n2x,n2y) );
		
		this.is_highlighted = false;
		this.addChild( this.highlighted );
		this.addChild( this.unhighlighted );
		this.highlighted.setVisible( false );
		
		this.node1.connections.push( this );
		this.node2.connections.push( this );
		
		return true;
	},
	setHighlighted:function( bool ) {
		if ( bool == undefined || bool ) {
			if ( !this.is_highlighted ) {
				this.is_highlighted = true;
				this.highlighted.setVisible( true );
				this.unhighlighted.setVisible( false );
			}
		} else {
			if ( this.is_highlighted ) {
				this.is_highlighted = false;
				this.highlighted.setVisible( false );
				this.unhighlighted.setVisible( true );
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
		
		return ptdistance( cc.p( this.node1.posx, this.node1.posy), 
						   cc.p( this.node2.posx, this.node2.posy) );
	}
});

// returns an array of connectors that will connect location 1 and 2
// if no path can be found then a "null" is passed
var pathObject = function( location1, location2 ) {
	var stack_store = [];
	var q = new search_t();
	var tmp = location1;
	
	stack_store.push( tmp );
	tmp.prev = tmp;
	while ( tmp != location2 ) {
		for ( var i=0;i<tmp.connections.length;i++ ) {
			var other = tmp.connections[i].getOther( tmp );
			if ( other.prev == null ) {
				stack_store.push( other );
				q.push( tmp.connections[i],
						tmp.connections[i].getFullLength() );
			}
		}
		if ( q.size() == 0 ) {
			return null;
		} else {
			var connect = q.pop();
			if ( connect.node1.prev == null ) {
				tmp = connect.node1;
				tmp.prev = connect.node2;
			} else {
				tmp = connect.node2;
				tmp.prev = connect.node1;
			}
		}
	}
	var ret = [];
	while ( tmp != location1 ) {
		ret.push( tmp.seekConnection( tmp.prev ) );
		tmp = tmp.prev;
	}
	for ( var i=0;i<stack_store.length;i++ ) {
		stack_store[i].prev = null;
	}
	return ret.reverse();
};