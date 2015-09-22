var Storm = cc.Sprite.extend({
	ctor: function() {
		this._super();
		this.scale = .2;
		this.size = cc.winSize;
		this.alive = true;
		
		cc.spriteFrameCache.addSpriteFrames(res.plist_storm);
		this.scheduleUpdate();
		
		this.x1 = randomInt( 0, this.size.width );
		this.y1 = randomInt( 0, this.size.height );
		this.x2 = randomInt( 0, this.size.width );
		this.y2 = randomInt( 0, this.size.height );
		
		this.setPosition( cc.winSize.width/2, cc.winSize.height/2 )
		
		//this.moveTo = new cc.EaseInOut( new cc.MoveTo ( 5.0, this.x1, this.y1 ), 3.0) ;
		//this.moveBack = new cc.EaseInOut( new cc.MoveTo ( 5.0, this.x2, this.y2 ), 3.0);

		//var randomMove = new cc.RepeatForever (move);
		var frames = [];
		var index, frame;
		for (index = 1; index<=2;index++){
			frame = cc.spriteFrameCache.getSpriteFrame("spr_storm"+index+".png");
			frames.push(frame);
			console.log(frame);
		}
		
		this.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("spr_storm"+1+".png"));
		this.stormAnimation = new cc.Animation(frames,0.5);
		this.stormAnimate = new cc.Animate(this.stormAnimation);
		this.stormAction = new cc.RepeatForever(this.stormAnimate);
		this.runAction(this.stormAction);
	
		this.randomMovement = new cc.RepeatForever(new cc.Sequence(
							new cc.EaseInOut( new cc.MoveTo ( 5.0, this.x1, this.y1 ), 3.0),
							new cc.DelayTime (2.0),
							new cc.EaseInOut( new cc.MoveTo ( 5.0, this.x2, this.y2 ), 3.0), cc.callFunc(this.random, this)
							));
		this.runAction(this.randomMovement);
		
		return true;
	
	},
	random: function() {
		this.x1 = randomInt( 0, this.size.width );
		this.y1 = randomInt( 0, this.size.height );
		this.x2 = randomInt( 0, this.size.width );
		this.y2 = randomInt( 0, this.size.height );
	}

});