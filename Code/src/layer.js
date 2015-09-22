var GameLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
		
		var size = cc.winSize;
		var MainMap = new MapObject( "The World" );
		
		var loc = [];
		loc.push( new LocationNode( /*00*/ "England", 			GLOBAL_WATER_AND_LAND, 	75,-78, 32 ) );
		loc.push( new LocationNode( /*01*/ "France", 			GLOBAL_WATER_AND_LAND, 	164,-168, 44 ) );
		loc.push( new LocationNode( /*02*/ "Spain", 			GLOBAL_WATER_AND_LAND, 	80,-305, 44 ) );
		loc.push( new LocationNode( /*03*/ "Italy", 			GLOBAL_WATER_AND_LAND, 	314,-198, 44 ) );
		loc.push( new LocationNode( /*04*/ "Scandinavia", 		GLOBAL_WATER_AND_LAND, 	141,126, 44 ) );
		loc.push( new LocationNode( /*05*/ "Anatolia", 			GLOBAL_WATER_AND_LAND, 	533,-82, 44 ) );
		loc.push( new LocationNode( /*06*/ "Palestine", 		GLOBAL_WATER_AND_LAND, 	639,-134, 44 ) );
		loc.push( new LocationNode( /*07*/ "Mesopotamia", 		GLOBAL_WATER_AND_LAND, 	731,-57, 44 ) );
		loc.push( new LocationNode( /*08*/ "Carthage", 			GLOBAL_WATER_AND_LAND, 	276,-331, 44 ) )
		loc.push( new LocationNode( /*09*/ "Alexandria", 		GLOBAL_WATER_AND_LAND, 	526,-246, 44 ) );
		loc.push( new LocationNode( /*10*/ "Cape Town", 		GLOBAL_WATER_AND_LAND, 	967,-846, 44 ) );
		loc.push( new LocationNode( /*11*/ "Morocco", 			GLOBAL_WATER_AND_LAND, 	51,-394, 44 ) );
		loc.push( new LocationNode( /*12*/ "Unclaimed Land", 	GLOBAL_WATER_AND_LAND, 	48,-577, 44 ) );
		loc.push( new LocationNode( /*13*/ "Unclaimed Land", 	GLOBAL_WATER_AND_LAND, 	181,-769, 44 ) );
		loc.push( new LocationNode( /*14*/ "Unclaimed Land", 	GLOBAL_WATER_AND_LAND, 	465,-614, 44 ) );
		loc.push( new LocationNode( /*15*/ "Unclaimed Land", 	GLOBAL_WATER_AND_LAND, 	733,-722, 44 ) );
		loc.push( new LocationNode( /*16*/ "Unclaimed Land", 	GLOBAL_WATER_AND_LAND, 	1057,-583, 44 ) );
		loc.push( new LocationNode( /*17*/ "Unclaimed Land", 	GLOBAL_WATER_AND_LAND, 	1025,-172, 44 ) );
		loc.push( new LocationNode( /*18*/ "Germany", 			GLOBAL_LAND, 			289,-20, 44 ) );
		loc.push( new LocationNode( /*19*/ "Moscow", 			GLOBAL_LAND, 			421,166, 44 ) );
		loc.push( new LocationNode( /*20*/ "Persia", 			GLOBAL_LAND, 			770,87, 44 ) );
		loc.push( new LocationNode( /*21*/ "Arabia", 			GLOBAL_LAND, 			798,-144, 44 ) );
		loc.push( new LocationNode( /*22*/ "Upper Nile", 		GLOBAL_LAND, 			703,-302, 44 ) );
		loc.push( new LocationNode( /*23*/ "Ethiopia", 			GLOBAL_LAND, 			927,-332, 44 ) );
		loc.push( new LocationNode( /*24*/ "N. Atlantic", 		GLOBAL_WATER, 			-237,-111, 44 ) );
		
		var con = [];
		con.push( new ConnectionNode( "English Channel", GLOBAL_WATER_AND_LAND, loc[0],loc[1] ) );
		con.push( new ConnectionNode( "North Atlantic",  GLOBAL_WATER, 			loc[0],loc[24] ) );
		con.push( new ConnectionNode( "Pyrrenes",  		 GLOBAL_WATER_AND_LAND,	loc[1],loc[2] ) );
		con.push( new ConnectionNode( "Alps",  		 	 GLOBAL_LAND,			loc[1],loc[3] ) );
		con.push( new ConnectionNode( "Western Front",	 GLOBAL_LAND,			loc[1],loc[18] ) );
		con.push( new ConnectionNode( "North Atlantic",  GLOBAL_WATER,			loc[1],loc[24] ) );
		con.push( new ConnectionNode( "Alps",  			 GLOBAL_WATER_AND_LAND, loc[2],loc[3] ) );
		con.push( new ConnectionNode( "Gibraltar",  	 GLOBAL_WATER_AND_LAND, loc[2],loc[11] ) );
		con.push( new ConnectionNode( "North Atlantic",  GLOBAL_WATER,			loc[2],loc[24] ) );
		con.push( new ConnectionNode( "Bosphorus",  	 GLOBAL_WATER_AND_LAND, loc[3],loc[5] ) );
		con.push( new ConnectionNode( "Med.",  			 GLOBAL_WATER,			loc[3],loc[8] ) );
		con.push( new ConnectionNode( "Med.",  			 GLOBAL_WATER,			loc[3],loc[9] ) );
		con.push( new ConnectionNode( "Alps",  			 GLOBAL_LAND,			loc[3],loc[18] ) );
		
		var s1 = new Storm();
		var s2 = new Storm();
		var s3 = new Storm();
		var s4 = new Storm();
		var s5 = new Storm();
		var s6 = new Storm();
		var s7 = new Storm();
		
		MainMap.addStorm(s1);
		MainMap.addStorm(s2);
		MainMap.addStorm(s3);
		MainMap.addStorm(s4);
		MainMap.addStorm(s5);
		MainMap.addStorm(s6);
		MainMap.addStorm(s7);
		
		var butt = new Movable( "Boat", 	GLOBAL_WATER, 60 );
		var cave = new Movable( "Caravan", 	GLOBAL_LAND,  20 );
		
		loc[0].boatIsDocking( butt );
		loc[0].boatIsDocking( cave );
		
		MainMap.addMovable( butt );
		MainMap.addMovable( cave );
		
		/*var loc = [];
		loc.length = 14;
		loc[ 0] = new LocationNode( "England", 			GLOBAL_WATER_AND_LAND, 	400,400, 24 );
		loc[ 1] = new LocationNode( "France", 			GLOBAL_WATER_AND_LAND, 	410,320, 24 );
		loc[ 2] = new LocationNode( "North America", 	GLOBAL_WATER_AND_LAND, 	250,375, 40 );
		loc[ 3] = new LocationNode( "Central America", 	GLOBAL_WATER_AND_LAND, 	 60,225, 32 );
		loc[ 4] = new LocationNode( "South America", 	GLOBAL_WATER_AND_LAND, 	140, 80, 36 );
		loc[ 5] = new LocationNode( "Egypt", 			GLOBAL_WATER_AND_LAND, 	470,240, 24 );
		loc[ 6] = new LocationNode( "Cape Town", 		GLOBAL_WATER_AND_LAND, 	420,100, 24 );
		loc[ 7] = new LocationNode( "Central Africa", 	GLOBAL_LAND, 			480,170, 36 );
		loc[ 8] = new LocationNode( "India", 			GLOBAL_LAND, 			740,200, 44 );
		loc[ 9] = new LocationNode( "Arabia", 			GLOBAL_LAND, 			600,260, 40 );
		loc[10] = new LocationNode( "Caribbean", 		GLOBAL_WATER, 			180,230, 28 );
		loc[11] = new LocationNode( "Palestine", 		GLOBAL_WATER, 			550,330, 24 );
		loc[12] = new LocationNode( "N. Atlantic", 		GLOBAL_WATER, 			325,300, 44 );
		loc[13] = new LocationNode( "S. Atlantic", 		GLOBAL_WATER, 			300,150, 44 );
		
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
		var b6 = new Movable( "Caravan", 	GLOBAL_LAND,  40 );
		
		loc[0].boatIsDocking( b1 );
		loc[0].boatIsDocking( b2 );
		loc[0].boatIsDocking( b3 );
		loc[0].boatIsDocking( b4 );
		loc[0].boatIsDocking( b5 );
		loc[6].boatIsDocking( b6 );
		
		for ( var i=0;i<loc.length;i++ )
			MainMap.addLocation( loc[i] );
		for ( var i=0;i<con.length;i++ )
			MainMap.addConnection( con[i] );
		
		MainMap.addMovable( b1 );
		MainMap.addMovable( b2 );
		MainMap.addMovable( b3 );
		MainMap.addMovable( b4 );
		MainMap.addMovable( b5 );
		MainMap.addMovable( b6 );*/
		
		for ( var i=0;i<loc.length;i++ )
			MainMap.addLocation( loc[i] );
		for ( var i=0;i<con.length;i++ )
			MainMap.addConnection( con[i] );
		
		this.addChild( MainMap );
		MainMap.setPosition( 500,500 );
		
        return true;
    },
});