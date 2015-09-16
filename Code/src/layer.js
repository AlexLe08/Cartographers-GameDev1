var GameLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
		
		var size = cc.winSize;
		
		var MainMap = new MapObject();
		
		var loc1 = new LocationNode( "London", 200,300,16 );
		var loc2 = new LocationNode( "France", 500,400,10 );
		var loc3 = new LocationNode( "Underpants", 520,160,18 );
		var loc4 = new LocationNode( "Murrica", 100,200,20 );
		
		var con1 = new ConnectionNode( loc1, loc2 );
		var con2 = new ConnectionNode( loc2, loc3 );
		var con3 = new ConnectionNode( loc3, loc1 );
		var con4 = new ConnectionNode( loc1, loc4 );
		
		var b1 = new Boat( "SS Will",10 );
		var b2 = new Boat( "SS Nick",20 );
		var b3 = new Boat( "SS Giselle",30 );
		var b4 = new Boat( "SS Alex",40 );
		var b5 = new Boat( "SS Tommy",50 );
		
		loc2.boatIsDocking( b1 );
		loc2.boatIsDocking( b2 );
		loc1.boatIsDocking( b3 );
		loc4.boatIsDocking( b4 );
		loc3.boatIsDocking( b5 );
		
		MainMap.addLocation( loc1 );
		MainMap.addLocation( loc2 );
		MainMap.addLocation( loc3 );
		MainMap.addLocation( loc4 );
		
		MainMap.addConnection( con1 );
		MainMap.addConnection( con2 );
		MainMap.addConnection( con3 );
		MainMap.addConnection( con4 );
		
		MainMap.addBoat( b1 );
		MainMap.addBoat( b2 );
		MainMap.addBoat( b3 );
		MainMap.addBoat( b4 );
		MainMap.addBoat( b5 );
		
		this.addChild( MainMap );
		
        return true;
    }
});