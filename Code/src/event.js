/*var Event = function() {

	AnimationLayer: function() { cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
		
		var size = cc.winSize;
		this.setContentSize(cc.size(300,200));
		console.log("size: " + size.width + " , " + size.height);
		var MainMap = new MapObject();
		
		var loc1 = new LocationNode( "London", 0,200,10 );
		var loc2 = new LocationNode( "France", 300,200,10 );
		var con1 = new ConnectionNode( loc1, loc2 );

		
		_eventBoat = new Boat( "SS Will",10 );

		loc1.boatIsDocking( _eventBoat );
		MainMap.addLocation( loc1 );
		MainMap.addLocation( loc2 );
		MainMap.addConnection( con1 );
		MainMap.addBoat( _eventBoat );

		if (_eventTrigger){
			
			_eventBoat.runAction(
				cc.sequence(
					cc.moveTo( con1.getFullLength() / _eventBoat.speed, cc.p(300,200),0 ),
					cc.callFunc( _eventBoat.syncDock, _eventBoat )
				)
			);
			_eventBoat.unDock();
			_eventBoat.dock = loc2;
		}
		this.addChild( MainMap );
		
        return true;
    }

})};
	Window: function()  {cc.Layer.extend({
	ctor: function() {
		this._super();
		this.setContentSize(cc.size(300,200));
		this.setPosition(cc.p(cc.winSize.width/3,cc.winSize.height*2));
		this.label = new cc.LabelTTF("Event!");
		this.label.setPosition(150,310);
		this.label.setFontSize("32");
		this.addChild(this.label);
		
		var lay = ccui.Layout.create();
		lay.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
		lay.setBackGroundColor(new cc.Color(180,180,180,255));
		lay.setLayoutType(ccui.Layout.ABSOLUTE);
		lay.setPosition(0,0);
		lay.setBackGroundImage(res.popup_png);
		lay.setContentSize(cc.size(300,200));
		console.log(this.layer);
		this.addChild(lay);
		lay.addChild(this.layer);

		return true;
		
	},
});
	}
	this.layer = new AnimationLayer();

}*/
var EventLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
		
		var size = cc.winSize;
		this.setContentSize(cc.size(300,200));

		var MainMap = new MapObject();
		
		var loc1 = new LocationNode( "London", 0,200,10 );
		var loc2 = new LocationNode( "France", 300,200,10 );

		var con1 = new ConnectionNode( loc1, loc2 );

		
		_eventBoat = new Boat( "SS Will",10 );

		loc1.boatIsDocking( _eventBoat );
		MainMap.addLocation( loc1 );
		MainMap.addLocation( loc2 );
		MainMap.addConnection( con1 );
		MainMap.addBoat( _eventBoat );

		if (_eventTrigger){
			
			_eventBoat.runAction(
				cc.sequence(
					cc.moveTo( con1.getFullLength() / _eventBoat.speed, cc.p(300,200),0 ),
					cc.callFunc( _eventBoat.syncDock, _eventBoat )
				)
			);
			_eventBoat.unDock();
			_eventBoat.dock = loc2;
			if (_eventBoat.dock = loc2) {
				_eventBoat.dock = loc1;
			}
		}
		this.addChild( MainMap );
		
        return true;
    }
});
var EventWindow = cc.Layer.extend({
	ctor: function() {
		this._super();
		this.setContentSize(cc.size(300,200));
		this.setPosition(cc.p(cc.winSize.width/3,cc.winSize.height*2));
		this.label = new cc.LabelTTF("Event!");
		this.label.setPosition(150,310);
		this.label.setFontSize("32");
		this.addChild(this.label);
		
		var lay = ccui.Layout.create();
		lay.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
		lay.setBackGroundColor(new cc.Color(180,180,180,255));
		lay.setLayoutType(ccui.Layout.ABSOLUTE);
		lay.setPosition(0,0);
		lay.setBackGroundImage(res.popup_png);
		lay.setContentSize(cc.size(300,200));
		
		this.addChild(lay);
		lay.addChild(new EventLayer());

		return true;
		
	},
});
