// Main File
// create the game scene

var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new uiLayer();
        this.addChild(layer, 100);
		var lay = ccui.Layout.create();
		lay.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
		lay.setBackGroundColor(new cc.Color(180,180,180,255));
		lay.setLayoutType(ccui.Layout.ABSOLUTE);
		lay.setPosition(0,0);
		lay.setBackGroundImage(res.popup_png);
		var centerPos = cc.p(cc.winSize.width / 2, cc.winSize.height /2);
		var background = cc.Sprite.create(res.map_png);
		background.setPosition(centerPos);
		//background.setContentSize(cc.size(cc.winSize.width,cc.winSize.height));
		p = new PopUp();
		p.setContentSize(cc.size(300,200));
		layer.addChild(p,100)
		p.setPosition(cc.p(cc.winSize.width/3,cc.winSize.height*2));

		//layer.addChild(lay);
		lay.setContentSize(cc.size(300,200));
		p.addChild(lay);
		//var col = cc.LayerColor.create( new cc.Color( 90,100,255,255 )  );
        var layer = new GameLayer();
		this.addChild(background, 4);
        this.addChild(layer, 5);
    }
});

