var GameLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
		
		var size = cc.winSize;
		
		var MainMap = new MapObject( "The World" );
		
		var loc = [];
		loc.length = 14;
		loc[ 0] = new LocationNode( "England", 			GLOBAL_WATER_AND_LAND, 	400,400, 12 );
		loc[ 1] = new LocationNode( "France", 			GLOBAL_WATER_AND_LAND, 	410,320, 12 );
		loc[ 2] = new LocationNode( "North America", 	GLOBAL_WATER_AND_LAND, 	250,375, 20 );
		loc[ 3] = new LocationNode( "Central America", 	GLOBAL_WATER_AND_LAND, 	 60,225, 16 );
		loc[ 4] = new LocationNode( "South America", 	GLOBAL_WATER_AND_LAND, 	140, 80, 18 );
		loc[ 5] = new LocationNode( "Egypt", 			GLOBAL_WATER_AND_LAND, 	470,240, 12 );
		loc[ 6] = new LocationNode( "Cape Town", 		GLOBAL_WATER_AND_LAND, 	420,100, 12 );
		loc[ 7] = new LocationNode( "Central Africa", 	GLOBAL_LAND, 			480,170, 18 );
		loc[ 8] = new LocationNode( "India", 			GLOBAL_LAND, 			740,200, 22 );
		loc[ 9] = new LocationNode( "Arabia", 			GLOBAL_LAND, 			600,260, 20 );
		loc[10] = new LocationNode( "Caribbean", 		GLOBAL_WATER, 			180,230, 14 );
		loc[11] = new LocationNode( "Palestine", 		GLOBAL_WATER, 			550,330, 12 );
		loc[12] = new LocationNode( "N. Atlantic", 		GLOBAL_WATER, 			325,300, 22 );
		loc[13] = new LocationNode( "S. Atlantic", 		GLOBAL_WATER, 			300,150, 22 );
		
		var con = [];
		con.length = 20;
		con[ 0] = new ConnectionNode( "", GLOBAL_WATER, loc[0],loc[1] );
		con[ 1] = new ConnectionNode( "", GLOBAL_WATER, loc[0],loc[12] );
		con[ 2] = new ConnectionNode( "", GLOBAL_WATER, loc[1],loc[12] );
		con[ 3] = new ConnectionNode( "", GLOBAL_WATER, loc[1],loc[5] );
		con[ 4] = new ConnectionNode( "", GLOBAL_LAND, 	loc[2],loc[3] );
		con[ 5] = new ConnectionNode( "", GLOBAL_WATER, loc[2],loc[10] );
		con[ 6] = new ConnectionNode( "", GLOBAL_WATER, loc[2],loc[12] );
		con[ 7] = new ConnectionNode( "", GLOBAL_LAND, 	loc[3],loc[4] );
		con[ 8] = new ConnectionNode( "", GLOBAL_WATER,	loc[3],loc[10] );
		con[ 9] = new ConnectionNode( "", GLOBAL_WATER,	loc[4],loc[10] );
		con[10] = new ConnectionNode( "", GLOBAL_WATER,	loc[4],loc[13] );
		con[11] = new ConnectionNode( "", GLOBAL_LAND,	loc[5],loc[7] );
		con[12] = new ConnectionNode( "", GLOBAL_LAND,	loc[5],loc[9] );
		con[13] = new ConnectionNode( "", GLOBAL_LAND,	loc[5],loc[11] );
		con[14] = new ConnectionNode( "", GLOBAL_LAND,	loc[6],loc[7] );
		con[15] = new ConnectionNode( "", GLOBAL_WATER,	loc[6],loc[13] );
		con[16] = new ConnectionNode( "", GLOBAL_LAND,	loc[8],loc[9] );
		con[17] = new ConnectionNode( "", GLOBAL_LAND,	loc[9],loc[11] );
		con[18] = new ConnectionNode( "", GLOBAL_WATER,	loc[10],loc[12] );
		con[19] = new ConnectionNode( "", GLOBAL_WATER,	loc[12],loc[13] );
		
		var b1 = new Movable( "SS Will", 	GLOBAL_WATER, 10 );
		var b2 = new Movable( "SS Nick", 	GLOBAL_WATER, 20 );
		var b3 = new Movable( "SS Giselle", GLOBAL_WATER, 30 );
		var b4 = new Movable( "SS Alex", 	GLOBAL_WATER, 40 );
		var b5 = new Movable( "SS Tommy", 	GLOBAL_WATER, 50 );
		
		loc[0].boatIsDocking( b1 );
		loc[0].boatIsDocking( b2 );
		loc[0].boatIsDocking( b3 );
		loc[0].boatIsDocking( b4 );
		loc[0].boatIsDocking( b5 );
		
		for ( var i=0;i<loc.length;i++ )
			MainMap.addLocation( loc[i] );
		for ( var i=0;i<con.length;i++ )
			MainMap.addConnection( con[i] );
		
		MainMap.addMovable( b1 );
		MainMap.addMovable( b2 );
		MainMap.addMovable( b3 );
		MainMap.addMovable( b4 );
		MainMap.addMovable( b5 );
		
		this.addChild( MainMap );
		
        return true;
    }
});